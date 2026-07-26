# p1-cli-memo — 命令行备忘录

## 功能列表
- 添加备忘录（标题 + 内容）
- 列出所有备忘录（编号、标题、日期）
- 搜索备忘录（按关键词搜索标题和内容）
- 删除备忘录（按编号删除）

## 学习目标
- Python 文件 I/O（JSON 读写）
- 命令行参数解析（argparse）
- 函数组织与模块设计
- 异常处理

## 项目结构
```
p1-cli-memo/
├── README.md   ← 你在这里
└── memo.py     ← 主程序
```

## 如何运行
```bash
python memo.py add "标题" "内容"
python memo.py list
python memo.py search "关键词"
python memo.py delete 1
```

## 数据存储
备忘录保存在 `memos.json` 文件中，格式为 JSON 数组。
