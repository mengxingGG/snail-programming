# M12 - AI 助教接口

## 基本信息
- **职责**：OpenAI 兼容 API 客户端，提供代码审查、概念解释、答疑功能（预留模块，Phase 4 开发）
- **依赖**：无
- **被依赖方**：M09 学习工作台（未来在 ConceptCard/Console 旁加"问 AI"按钮）
- **预估代码量**：100 行
- **优先级**：P2（预留）

## 文件清单

| 文件路径 | 用途 |
|---------|------|
| src/services/ai/client.ts | OpenAI 兼容 HTTP 客户端 |
| src/services/ai/prompts.ts | 系统提示词模板 |
| src/renderer/components/learner/AiPanel.tsx | AI 对话面板 UI（后续） |

## 对外接口

```typescript
interface AiConfig {
  baseUrl: string;     // API 端点，如 https://api.openai.com/v1
  apiKey: string;      // API 密钥
  model: string;       // 模型名，如 gpt-4o-mini
}

interface AiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// 核心接口
export function configure(config: AiConfig): void;
//  设置 API 配置（用户在设置页面填入）

export async function ask(messages: AiMessage[]): Promise<string>;
//  发送对话请求，返回 AI 回复
//  @param messages 对话历史
//  @returns AI 回复文本

export async function reviewCode(code: string, task: string): Promise<string>;
//  代码审查：检查用户代码并给出建议
//  @param code 用户代码
//  @param task 题目描述
//  @returns 审查意见（Markdown格式）

export async function explainConcept(concept: string): Promise<string>;
//  解释编程概念
//  @param concept 概念名称，如 "Promise"
//  @returns 通俗易懂的解释

export async function getHint(sectionId: string): Promise<string>;
//  获取当前小节提示（不解密答案，给方向性指导）
```

## 系统提示词模板

```typescript
export const SYSTEM_PROMPTS = {
  codeReview: `你是一个编程助教。检查学生的代码，指出问题并给出改进建议。
要求：
1. 先肯定做得好的地方
2. 指出具体问题（行号）
3. 给出修改建议但不直接给完整答案
4. 用中文回复`,

  explain: `你是一个耐心的编程老师。用通俗易懂的语言解释编程概念。
要求：
1. 从日常类比开始（如"Promise 就像点外卖"）
2. 逐步过渡到技术细节
3. 给出简单代码示例
4. 用中文回复`,

  hint: `你是编程助教。学生卡在某个练习上，给他们方向性提示。
要求：
1. 不要直接给答案
2. 引导思路（"想想你之前学的..."）
3. 最多3句话
4. 用中文回复`,
};
```

## 函数实现清单

| 函数名 | 签名 | 职责 | 预估行数 |
|--------|------|------|:---:|
| configure | (config: AiConfig) => void | 保存 API 配置到内存 | 5 |
| chat | (messages: AiMessage[]) => Promise\<string\> | HTTP POST /chat/completions | 25 |
| reviewCode | (code, task) => Promise\<string\> | 构建 review prompt → chat | 15 |
| explainConcept | (concept) => Promise\<string\> | 构建 explain prompt → chat | 10 |
| getHint | (sectionId) => Promise\<string\> | 构建 hint prompt → chat | 15 |
| registerIpcHandlers | () => void | 注册 IPC 通道 | 15 |

## 关键逻辑

```typescript
// async function chat(messages):
//   1. 如果 !config.apiKey → throw Error("请先配置 AI API")
//   2. response = await fetch(config.baseUrl + '/chat/completions', {
//        method: 'POST',
//        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + config.apiKey },
//        body: JSON.stringify({ model: config.model, messages, temperature: 0.7, max_tokens: 1000 })
//      })
//   3. 如果 !response.ok → throw Error(await response.text())
//   4. data = await response.json()
//   5. return data.choices[0].message.content

// async function reviewCode(code, task):
//   1. messages = [
//        { role:'system', content: SYSTEM_PROMPTS.codeReview },
//        { role:'user', content: `任务：${task}\n\n学生代码：\n\`\`\`typescript\n${code}\n\`\`\`` }
//      ]
//   2. return await chat(messages)
```

## 错误处理

| 错误场景 | 处理方式 |
|---------|---------|
| 未配置 API Key | throw Error("请先在设置中配置AI API密钥") |
| API Key 无效 | throw Error("API密钥无效，请检查") |
| 网络超时 | throw Error("AI 服务连接超时，请检查网络") |
| 模型不存在 | throw Error("模型配置错误") |
| 返回内容为空 | 返回默认提示 "AI 未能生成回复，请重试" |
| 请求频率过高 | 客户端限流，1秒内最多1次请求 |

## 配置存储

```typescript
// AI 配置存储在 electron-store 或 config.json
// 路径: app.getPath('userData') + '/ai-config.json'
interface StoredAiConfig {
  baseUrl: string;
  apiKey: string;       // 加密存储（至少 base64，未来用 keytar）
  model: string;
  enabled: boolean;      // 用户可开关
}
```

## 开发状态
- **状态**：⏳ 待开发（Phase 4 预留）
- **实现文件**：src/services/ai/client.ts, prompts.ts
- **开发者备注**：初期只实现基础设施（配置+HTTP调用），UI 交互面后续迭代。API Key 安全存储未来使用 electron safeStorage 加密
- **提交时间**：
