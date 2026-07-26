# p4-dashboard — 交互式仪表盘

## 功能列表
- 响应式卡片网格布局（CSS Grid）
- 亮色 / 暗色主题切换（CSS 变量 + 按钮）
- 数据卡片动态渲染（TypeScript 生成 DOM）
- 移动端适配（媒体查询）

## 学习目标
- CSS 自定义属性（变量）与主题切换
- CSS Grid 布局
- TypeScript DOM 操作
- 响应式设计（Media Queries）
- 纯前端项目构建

## 项目结构
```
p4-dashboard/
├── README.md          ← 你在这里
├── index.html         ← HTML 结构
└── src/
    ├── styles.css     ← 样式（Grid、主题、响应式）
    └── main.ts        ← 数据与渲染逻辑
```

## 如何运行
直接在浏览器中打开 `index.html` 即可。

或者使用 Live Server：
```bash
npx live-server .
```
