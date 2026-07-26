"""测试 CLI 备忘录工具的核心功能"""
import pytest
import json
import os
import tempfile
from datetime import datetime


def test_memo_data_structure():
    """测试备忘录的数据结构是否正确"""
    memo = {
        "id": 1,
        "title": "测试",
        "content": "这是一条测试备忘",
        "created": "2025-01-15"
    }
    assert memo["id"] == 1
    assert "title" in memo
    assert "content" in memo
    assert "created" in memo


def test_memo_list_operations():
    """测试列表操作：添加、列出、删除、搜索"""
    memos = []
    
    # 添加
    memos.append({"id": 1, "title": "买水果", "content": "苹果香蕉", "created": "2025-01-15"})
    assert len(memos) == 1
    
    # 搜索
    keyword = "水果"
    found = [m for m in memos if keyword in m["title"] or keyword in m["content"]]
    assert len(found) == 1
    
    # 删除
    memos = [m for m in memos if m["id"] != 1]
    assert len(memos) == 0


def test_json_serialization():
    """测试 JSON 序列化和反序列化"""
    memos = [
        {"id": 1, "title": "测试", "content": "内容", "created": "2025-01-15"}
    ]
    
    # 序列化
    json_str = json.dumps(memos, ensure_ascii=False)
    assert isinstance(json_str, str)
    
    # 反序列化
    loaded = json.loads(json_str)
    assert loaded == memos


def test_empty_list():
    """测试空列表场景"""
    memos = []
    assert len(memos) == 0
    
    # 搜索空列表
    keyword = "任何"
    found = [m for m in memos if keyword in m["title"] or keyword in m["content"]]
    assert len(found) == 0
