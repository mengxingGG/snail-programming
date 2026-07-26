# p3-express-api — Express REST API

## API 设计

| 方法 | 路径 | 功能 |
|------|------|------|
| GET | /api/items | 获取所有项目 |
| GET | /api/items/:id | 获取单个项目 |
| POST | /api/items | 创建项目 |
| PUT | /api/items/:id | 更新项目 |
| DELETE | /api/items/:id | 删除项目 |

## 数据模型

```typescript
interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
}
```

## 学习目标
- Express.js 路由与中间件
- RESTful API 设计
- SQLite 数据库操作（better-sqlite3）
- 错误处理模式
- 请求验证

## 项目结构
```
p3-express-api/
├── README.md           ← 你在这里
├── package.json        ← 依赖与脚本
├── tsconfig.json       ← TS 配置
└── src/
    ├── db.ts           ← 数据库层
    ├── server.ts       ← Express 应用入口
    └── routes/
        └── items.ts    ← /api/items 路由
```

## 如何运行
```bash
npm install
npx ts-node src/server.ts
```

## 测试方法
```bash
# 获取所有项目
curl http://localhost:3000/api/items

# 创建项目
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"A test item","price":9.99}'

# 获取单个项目
curl http://localhost:3000/api/items/1

# 更新项目
curl -X PUT http://localhost:3000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated"}'

# 删除项目
curl -X DELETE http://localhost:3000/api/items/1
```
