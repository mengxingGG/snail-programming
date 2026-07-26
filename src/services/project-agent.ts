// 项目教学 Agent — 独立于课程 AI
// 拥有控制台执行权限、文件读写权限
// 教学策略：解释优先、引导自主编写、代码评审、Bug 修复
import { ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { getConfig } from './ai/client';
import { executeProjectCommand, getProjectDir, resolveProjectFilePath } from './project-utils';

// ─── 类型 ────────────────────────────────────────────────

interface AgentMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  tool_call_id?: string;
  tool_calls?: ToolCall[];
}

interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

interface ProjectContext {
  projectId: string;
  projectTitle: string;
  projectDescription: string;
  projectDir: string;
  files: { name: string; content: string }[];
  activeFile: string;
  activeContent: string;
}

// ─── 系统提示词（项目教学专用，不同于课程 AI）─────────────

function buildProjectSystemPrompt(ctx: ProjectContext): string {
  return `你是蜗牛编程的**项目教学助手**🐌，负责指导学生完成实战项目。

## 你的角色
你不是课程讲师（那是另一个 AI），你是**项目导师**——像 code review 同事 + 技术 mentor 的结合体。

## 核心原则
1. **解释优先，不直接给答案**：先引导学生思考，解释思路，鼓励他们自己写代码
2. **代码必须中文注释**：如果要提供代码示例，每一行关键逻辑都要用中文注释说明功能和语法
3. **善用工具**：你有权力读取项目文件、写入文件、执行命令——用这些来帮学生诊断问题
4. **渐进式引导**：先给 hint → 再给伪代码 → 最后才给完整代码

## 当前项目上下文
- 项目：${ctx.projectTitle}
- 描述：${ctx.projectDescription}
- 项目目录：${ctx.projectDir}
- 当前打开的文件：${ctx.activeFile}

## 项目文件列表
${ctx.files.map(f => `- ${f.name} (${f.content.length} 字符)`).join('\n')}

## 当前文件内容 (${ctx.activeFile})
\`\`\`
${ctx.activeContent}
\`\`\`

## 可用工具
你有以下工具可以调用来帮助学生：

### 1. read_file — 读取项目中的任意文件
参数：filePath (相对项目目录的路径)

### 2. write_file — 写入内容到文件
参数：filePath (路径), content (内容)
⚠️ 只在以下情况写入：
- 学生明确要求修改
- 发现 bug 需要修复，且已解释清楚是什么问题
- 学生说"帮我写"或类似请求

### 3. exec_command — 执行终端命令
参数：command (要执行的命令，如 "pip install -r requirements.txt", "run-python main.py", "run-typescript src/index.ts", "npm run test")
⚠️ 执行命令前先向学生解释这个命令会做什么

### 4. review_code — 评审当前文件
参数：无（自动分析当前打开的文件）
返回：代码质量评估、潜在 bug、改进建议

## 回复格式
- 用温暖、鼓励的语气
- 代码块用正确语言标记（\`\`\`python 或 \`\`\`typescript）
- 代码中写中文注释
- 每次回复聚焦一个具体问题，不要一次讲太多
- 学生问"怎么做"时，先解释思路和原理，再引导写代码`;
}

// ─── 工具函数 ───────────────────────────────────────────

function safeResolve(projectDir: string, filePath: string): string {
  return resolveProjectFilePath(projectDir, filePath);
}

// ─── Agent 核心逻辑 ──────────────────────────────────────

async function chatWithAgent(
  messages: AgentMessage[],
  ctx: ProjectContext,
): Promise<string> {
  const config = getConfig();
  if (!config.enabled || !config.apiKey) {
    return 'AI 教学助手未启用。请在设置中配置 API Key。';
  }

  const systemMsg: AgentMessage = {
    role: 'system',
    content: buildProjectSystemPrompt(ctx),
  };

  const allMessages = [systemMsg, ...messages];

  // 调用 OpenAI 兼容 API
  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: allMessages,
      max_tokens: 2000,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? '（AI 未返回内容）';
}

// ─── 工具执行 ───────────────────────────────────────────

async function executeToolCall(
  call: ToolCall,
  ctx: ProjectContext,
): Promise<string> {
  const { name, arguments: argsStr } = call.function;
  let args: any;
  try {
    args = JSON.parse(argsStr);
  } catch {
    return `参数解析失败: ${argsStr}`;
  }

  switch (name) {
    case 'read_file': {
      const fullPath = safeResolve(ctx.projectDir, args.filePath);
      if (!fs.existsSync(fullPath)) return `文件不存在: ${args.filePath}`;
      return fs.readFileSync(fullPath, 'utf-8');
    }

    case 'write_file': {
      const fullPath = safeResolve(ctx.projectDir, args.filePath);
      fs.writeFileSync(fullPath, args.content, 'utf-8');
      return `✅ 已写入 ${args.filePath}`;
    }

    case 'exec_command': {
      try {
        const output = executeProjectCommand(ctx.projectDir, args.command);
        return output || '(命令执行成功，无输出)';
      } catch (e: any) {
        return `❌ 命令失败: ${e.stderr || e.message}`;
      }
    }

    case 'review_code': {
      const issues: string[] = [];
      const content = ctx.activeContent;
      const ext = path.extname(ctx.activeFile);

      // 基础检查
      if (content.includes('TODO')) {
        issues.push('⚠️ 文件中还有 TODO 标记未完成');
      }
      if (ext === '.py' || ext === '.ts') {
        if (!content.trim()) {
          issues.push('⚠️ 文件为空，请开始编写代码');
        }
        // 检查是否有未实现的函数（def xxx(): pass / function xxx() {}）
        const emptyFuncs = content.match(/(?:def|function)\s+(\w+)[^(]*\([^)]*\)\s*(?::\s*\w+)?\s*:\s*pass/g);
        if (emptyFuncs) {
          issues.push(`⚠️ 以下函数只有 pass 占位，尚未实现：${emptyFuncs.join(', ')}`);
        }
      }

      return issues.length > 0
        ? `## 代码评审 (${ctx.activeFile})\n\n${issues.join('\n')}\n\n继续加油！每完成一个函数就运行测试看看效果 💪`
        : `## 代码评审 (${ctx.activeFile})\n\n✅ 代码结构看起来不错！没有发现明显问题。\n建议：运行项目测试来验证功能是否正常。`;
    }

    default:
      return `未知工具: ${name}`;
  }
}

// ─── IPC 注册 ──────────────────────────────────────────

export function registerProjectAgentIpcHandlers(): void {
  ipcMain.handle('project-agent:chat', async (_event, payload: {
    messages: AgentMessage[];
    context: {
      projectId: string;
      projectTitle: string;
      projectDescription: string;
      activeFile: string;
      activeContent: string;
    };
  }) => {
    try {
      const projectDir = getProjectDir(payload.context.projectId);

      // 获取项目所有文件列表
      const files = listProjectFiles(projectDir).map(f => ({
        name: f,
        content: '',
      }));

      // 读取当前文件内容
      const ctx: ProjectContext = {
        projectId: payload.context.projectId,
        projectTitle: payload.context.projectTitle,
        projectDescription: payload.context.projectDescription,
        projectDir,
        files,
        activeFile: payload.context.activeFile,
        activeContent: payload.context.activeContent,
      };

      const reply = await chatWithAgent(payload.messages, ctx);
      return { success: true, data: reply };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  });

  // 工具调用（用于 agent 循环）
  ipcMain.handle('project-agent:tool', async (_event, payload: {
    projectId: string;
    projectTitle: string;
    projectDescription: string;
    activeFile: string;
    activeContent: string;
    toolCall: ToolCall;
  }) => {
    try {
      const ctx: ProjectContext = {
        projectId: payload.projectId,
        projectTitle: payload.projectTitle,
        projectDescription: payload.projectDescription,
        projectDir: getProjectDir(payload.projectId),
        files: [],
        activeFile: payload.activeFile,
        activeContent: payload.activeContent,
      };
      const result = await executeToolCall(payload.toolCall, ctx);
      return { success: true, data: result };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  });
}

function listProjectFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const result: string[] = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (['node_modules', '__pycache__', '.git'].includes(item.name)) continue;
      result.push(...listProjectFiles(fullPath).map(f => path.join(item.name, f)));
    } else {
      result.push(item.name);
    }
  }
  return result;
}
