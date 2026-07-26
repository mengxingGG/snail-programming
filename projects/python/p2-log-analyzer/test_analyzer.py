"""测试日志分析工具的核心功能"""
import pytest
import re
from collections import Counter


SAMPLE_LOG = """192.168.1.1 - - [15/Jan/2025:10:00:00 +0800] "GET /index.html HTTP/1.1" 200 1234
192.168.1.2 - - [15/Jan/2025:10:01:00 +0800] "POST /api/login HTTP/1.1" 302 0
192.168.1.1 - - [15/Jan/2025:10:02:00 +0800] "GET /about.html HTTP/1.1" 200 567
192.168.1.3 - - [15/Jan/2025:10:03:00 +0800] "GET /nonexistent.html HTTP/1.1" 404 234
192.168.1.1 - - [15/Jan/2025:10:04:00 +0800] "POST /api/data HTTP/1.1" 500 0
"""

LOG_PATTERN = re.compile(
    r'(?P<ip>\d+\.\d+\.\d+\.\d+)\s+.*?\[(?P<time>[^\]]+)\]\s+'
    r'"(?P<method>\w+)\s+(?P<path>[^\s]+)\s+[^"]*"\s+'
    r'(?P<status>\d+)\s+(?P<size>\d+)'
)


def test_log_pattern_matches():
    """测试日志正则表达式能正确解析日志行"""
    match = LOG_PATTERN.match(SAMPLE_LOG.split('\n')[0])
    assert match is not None
    assert match.group('ip') == '192.168.1.1'
    assert match.group('method') == 'GET'
    assert match.group('status') == '200'
    assert match.group('size') == '1234'


def test_parse_all_lines():
    """测试解析所有日志行"""
    entries = []
    for line in SAMPLE_LOG.strip().split('\n'):
        match = LOG_PATTERN.match(line)
        if match:
            entries.append(match.groupdict())
    
    assert len(entries) == 5


def test_ip_counting():
    """测试 IP 统计功能"""
    entries = []
    for line in SAMPLE_LOG.strip().split('\n'):
        match = LOG_PATTERN.match(line)
        if match:
            entries.append(match.groupdict())
    
    ip_counter = Counter(e['ip'] for e in entries)
    assert ip_counter['192.168.1.1'] == 3
    assert ip_counter['192.168.1.2'] == 1
    assert ip_counter['192.168.1.3'] == 1
    
    # Top 1
    most_common = ip_counter.most_common(1)
    assert most_common[0][0] == '192.168.1.1'


def test_status_code_distribution():
    """测试状态码分布统计"""
    entries = []
    for line in SAMPLE_LOG.strip().split('\n'):
        match = LOG_PATTERN.match(line)
        if match:
            entries.append(match.groupdict())
    
    status_counter = Counter(e['status'] for e in entries)
    assert status_counter['200'] == 2
    assert status_counter['302'] == 1
    assert status_counter['404'] == 1
    assert status_counter['500'] == 1
