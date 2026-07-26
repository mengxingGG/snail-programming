# monitor.py — 商品价格监控主程序
#
# 所属项目：p3-price-monitor
#
# 功能说明：
# 定期抓取指定商品页面价格，记录历史数据到 CSV 文件，
# 当检测到价格下降时发送提醒。
#
# 你需要实现：
# 1. ProductPrice dataclass — 定义价格数据模型（url, title, price, currency, timestamp）
# 2. fetch_price(url) — 使用 requests + BeautifulSoup 抓取价格
#                     （选择器需要根据目标网站调整，使用占位选择器）
# 3. load_history() — 从 prices.csv 加载历史记录
# 4. save_price(price) — 将一条价格记录追加写入 prices.csv
# 5. check_price_drop(current_price, history) — 比较最新两次价格判断是否下降
# 6. send_alert(message) — 打印降价提醒（可扩展为邮件/通知）
# 7. monitor() — 主循环：遍历商品列表，抓取价格，比较并提醒
#
# 相关文件：
# - prices.csv：价格历史数据文件
# - README.md：项目说明
#
# 运行方式：
# python monitor.py
#
# 关键 API：
# - requests：HTTP GET 请求
# - beautifulsoup4 (bs4)：HTML 解析
# - dataclasses：数据类定义
# - csv：CSV 文件读写
# - datetime：时间戳

import csv
import os
from dataclasses import dataclass, fields
from datetime import datetime

# 如果使用 requests/bs4，取消以下注释
# import requests
# from bs4 import BeautifulSoup

DATA_FILE = "prices.csv"

# 待监控商品 URL 列表（学生可替换为真实商品页面）
WATCH_LIST = [
    "https://example.com/product/1",
    "https://example.com/product/2",
]


@dataclass
class ProductPrice:
    """商品价格数据模型。
    
    Attributes:
        url (str): 商品页面 URL
        title (str): 商品名称
        price (float): 价格数值
        currency (str): 货币符号（如 ¥, $）
        timestamp (str): 抓取时间 ISO 格式
    """
    url: str
    title: str
    price: float
    currency: str
    timestamp: str


def fetch_price(url):
    """从指定 URL 抓取商品名称和价格。
    
    Args:
        url (str): 商品页面 URL
    
    Returns:
        ProductPrice | None: 抓取成功返回 ProductPrice 实例，失败返回 None
    
    提示：
        1. 使用 requests.get(url) 获取 HTML
        2. 使用 BeautifulSoup 解析 HTML
        3. 根据实际网站的 CSS 选择器定位价格元素
        4. 当前用占位代码：返回一个模拟的 ProductPrice
    """
    # TODO: 实现网页抓取逻辑
    # 1. requests.get(url, headers={'User-Agent': '...'})
    # 2. soup = BeautifulSoup(response.text, 'html.parser')
    # 3. 定位价格元素并提取文本
    # 4. 清理并转换为 float
    # 5. 返回 ProductPrice 实例
    pass


def load_history():
    """从 prices.csv 加载价格历史记录。
    
    Returns:
        list[ProductPrice]: 历史价格列表
    """
    # TODO: 读取 CSV 文件（不存在则返回空列表），按行解析为 ProductPrice
    pass


def save_price(price):
    """将一条价格记录追加写入 prices.csv。
    
    Args:
        price (ProductPrice): 要保存的价格记录
    
    首次写入时自动添加表头。
    """
    # TODO: 以追加模式写入 CSV，首次写入时添加表头
    pass


def check_price_drop(current_price, history):
    """检查当前价格相比上次是否下降。
    
    Args:
        current_price (ProductPrice): 当前抓取的价格
        history (list[ProductPrice]): 历史价格列表
    
    Returns:
        bool: 价格下降返回 True，否则 False
    """
    # TODO: 找到同一 URL 的最近一次记录，比较 price 值
    pass


def send_alert(message):
    """发送降价提醒。
    
    Args:
        message (str): 提醒消息
    
    当前实现为打印到控制台，可扩展为邮件或推送通知。
    """
    # TODO: 打印格式化提醒消息（可扩展为其他通知方式）
    pass


def monitor():
    """主监控循环：遍历 WATCH_LIST，抓取价格，保存记录，检测降价。
    
    流程：
        1. 加载历史数据
        2. 遍历待监控 URL 列表
        3. 对每个 URL 调用 fetch_price
        4. 保存价格记录
        5. 检测是否降价，若是则调用 send_alert
    """
    # TODO: 实现监控主循环
    pass


if __name__ == "__main__":
    monitor()
