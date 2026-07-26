# memo.py — CLI 备忘录主程序
#
# 所属项目：p1-cli-memo
#
# 功能说明：
# 基于命令行的备忘录管理工具，支持添加、列出、搜索、删除备忘录。
# 数据持久化到本地 memos.json 文件（JSON 数组）。
#
# 你需要实现：
# 1. load_memos() — 从 memos.json 读取备忘录列表，文件不存在时返回空列表
# 2. save_memos(memos) — 将备忘录列表写入 memos.json
# 3. add_memo(title, content) — 添加新备忘录（自动生成 id 和时间戳）
# 4. list_memos() — 打印所有备忘录的编号、标题和创建日期
# 5. search_memos(keyword) — 按关键词搜索标题和内容，打印匹配项
# 6. delete_memo(memo_id) — 按编号删除备忘录
# 7. main() — 使用 argparse 解析命令行参数并分发到对应函数
#
# 相关文件：
# - memos.json：数据持久化文件（自动创建）
# - README.md：项目说明
#
# 运行方式：
# python memo.py add "标题" "内容"
# python memo.py list
# python memo.py search "关键词"
# python memo.py delete 1
#
# 关键 API：
# - argparse：命令行参数解析
# - json：JSON 序列化/反序列化
# - datetime：时间戳生成

import argparse
import json
import os
from datetime import datetime

DATA_FILE = "memos.json"


def load_memos():
    """从 memos.json 加载备忘录列表。
    
    Returns:
        list[dict]: 备忘录列表，每个备忘录包含 id, title, content, created_at。
        文件不存在时返回空列表。
    """
    # TODO: 实现 JSON 文件读取，处理 FileNotFoundError
    pass


def save_memos(memos):
    """将备忘录列表保存到 memos.json。
    
    Args:
        memos (list[dict]): 要保存的备忘录列表
    """
    # TODO: 实现 JSON 文件写入（使用 indent=2 格式化）
    pass


def add_memo(title, content):
    """添加一条新备忘录并保存。
    
    Args:
        title (str): 备忘录标题
        content (str): 备忘录内容
    
    自动生成 id（自增）和 created_at（ISO 格式时间戳）。
    """
    # TODO: 加载现有备忘录 → 生成新 id → 追加 → 保存
    pass


def list_memos():
    """列出所有备忘录的摘要信息（id、标题、创建日期）。"""
    # TODO: 加载备忘录 → 遍历打印（格式化输出）
    pass


def search_memos(keyword):
    """按关键词搜索备忘录（匹配标题和内容）。
    
    Args:
        keyword (str): 搜索关键词
    """
    # TODO: 加载备忘录 → 过滤匹配项 → 打印结果
    pass


def delete_memo(memo_id):
    """按 id 删除一条备忘录。
    
    Args:
        memo_id (int): 要删除的备忘录编号
    """
    # TODO: 加载备忘录 → 查找并删除 → 保存
    pass


def main():
    """命令行入口：使用 argparse 解析子命令并调用对应函数。
    
    子命令：
        add    — 添加备忘录（需要 title 和 content 参数）
        list   — 列出所有备忘录
        search — 搜索备忘录（需要 keyword 参数）
        delete — 删除备忘录（需要 id 参数）
    """
    # TODO: 配置 argparse，添加子命令和参数，分发调用
    pass


if __name__ == "__main__":
    main()
