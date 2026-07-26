# React 个人博客

用 React + TypeScript 搭建个人博客。

## 功能
- 文章列表（卡片展示）
- 文章详情（Markdown 渲染）
- 搜索过滤
- 暗色模式切换

## 项目结构
```
p5-react-blog/
├── README.md
├── package.json
└── src/
    ├── App.tsx          ← 主组件
    ├── types.ts         ← 类型定义
    └── components/
        ├── PostList.tsx  ← 文章列表
        └── SearchBar.tsx ← 搜索栏
```

## 启动方式
```bash
npm install
npm run dev
```

## 学习目标
- React 函数组件和 Props 类型
- useState 状态管理
- 条件渲染和列表渲染
- 组件拆分和复用
