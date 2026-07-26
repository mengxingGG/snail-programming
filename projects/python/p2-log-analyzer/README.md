# p2-log-analyzer — 日志分析工具

## 功能列表
- 解析 Nginx/Apache 风格日志行
- 统计独立 IP 数量
- 统计 HTTP 状态码分布
- 计算错误率（4xx + 5xx）
- 找出访问最多的路径 Top N
- 生成文本格式分析报告

## 学习目标
- 正则表达式（re 模块）
- 字典/list 数据处理
- collections.Counter 实战
- 文件读取与格式化输出

## 项目结构
```
p2-log-analyzer/
├── README.md      ← 你在这里
├── analyzer.py    ← 主程序
└── sample.log     ← 示例日志数据
```

## 如何运行
```bash
python analyzer.py sample.log
```

## 示例日志格式
```
192.168.1.1 - - [01/Jan/2024:12:00:00 +0000] "GET /index.html HTTP/1.1" 200 1024
```
