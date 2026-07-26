# p3-price-monitor — 商品价格监控

## 功能列表
- 从网页抓取商品价格（requests + BeautifulSoup）
- 记录历史价格到 CSV 文件
- 检测价格下降并触发提醒
- 支持监控多个商品

## 学习目标
- HTTP 请求与网页抓取（requests, beautifulsoup4）
- 数据类（dataclass）的使用
- CSV 文件读写（csv 模块）
- 模块化设计

## 需要的库
```bash
pip install requests beautifulsoup4
```

## 项目结构
```
p3-price-monitor/
├── README.md     ← 你在这里
├── monitor.py    ← 主程序
└── prices.csv    ← 价格历史数据
```

## 如何运行
```bash
python monitor.py
```

## prices.csv 格式
| url | title | price | currency | timestamp |
