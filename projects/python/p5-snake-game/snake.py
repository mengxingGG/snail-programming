# snake.py — 贪吃蛇游戏主程序
#
# 所属项目：p5-snake-game
#
# 功能说明：
# 使用 Pygame 实现的经典贪吃蛇游戏。蛇在网格上移动，吃食物增长身体，
# 撞到墙壁或自身时游戏结束。支持键盘控制和得分统计。
#
# 你需要实现：
# 1. GameState 枚举 — RUNNING, GAME_OVER, PAUSED 三个状态
# 2. Snake 类
#    - __init__：初始化蛇身列表、方向
#    - move()：根据当前方向移动蛇头，处理身体跟随
#    - grow()：标记蛇需要增长
#    - check_collision(grid_width, grid_height)：检测撞墙/撞自己
#    - draw(screen)：在屏幕上绘制蛇
#    - change_direction(new_dir)：改变方向（禁止反向）
# 3. Food 类
#    - __init__：随机生成食物位置（避免与蛇身重叠）
#    - draw(screen)：在屏幕上绘制食物
# 4. draw_grid(screen) — 绘制背景网格
# 5. draw_score(screen, score) — 显示得分
# 6. main() — 游戏主循环
#    - 初始化 Pygame
#    - 创建 Snake、Food 实例
#    - 事件处理（键盘输入）
#    - 更新游戏状态
#    - 渲染画面
#    - 控制帧率
#
# 相关文件：
# - README.md：项目说明
#
# 运行方式：
# python snake.py
#
# 关键 API：
# - pygame：游戏框架
# - enum：枚举定义
# - random：随机位置生成

import pygame
import random
from enum import Enum, auto

# 游戏常量
GRID_SIZE = 20          # 每格像素大小
GRID_WIDTH = 30         # 网格宽度（格数）
GRID_HEIGHT = 20        # 网格高度（格数）
WINDOW_WIDTH = GRID_SIZE * GRID_WIDTH
WINDOW_HEIGHT = GRID_SIZE * GRID_HEIGHT
FPS = 10                # 帧率（控制蛇的速度）

# 颜色定义
COLOR_BG = (20, 20, 30)
COLOR_GRID = (40, 40, 50)
COLOR_SNAKE_HEAD = (100, 255, 100)
COLOR_SNAKE_BODY = (60, 200, 60)
COLOR_FOOD = (255, 80, 80)
COLOR_TEXT = (255, 255, 255)


class GameState(Enum):
    """游戏状态枚举。"""
    RUNNING = auto()
    GAME_OVER = auto()
    PAUSED = auto()


class Snake:
    """贪吃蛇类。
    
    Attributes:
        body (list[tuple[int, int]]): 蛇身坐标列表（第一个为蛇头）
        direction (tuple[int, int]): 当前移动方向 (dx, dy)
        grow_flag (bool): 是否需要在下次移动时增长
    """
    
    def __init__(self):
        """初始化蛇：放在网格中央，初始方向向右，长度为 3。"""
        # TODO: 初始化 body 列表（3 节），direction = (1, 0)，grow_flag = False
        pass
    
    def move(self):
        """移动蛇：在头部前方添加新头，移除尾部（除非需要增长）。
        
        Returns:
            bool: 移动成功返回 True（供后续碰撞检测使用）
        """
        # TODO: 计算新头部位置 → 插入 body[0] → 如果 grow_flag 则保留尾部否则移除
        pass
    
    def grow(self):
        """标记蛇在下次移动时增长一节。"""
        # TODO: 设置 grow_flag = True
        pass
    
    def check_collision(self):
        """检测碰撞：撞墙或撞到自己。
        
        Returns:
            bool: 碰撞返回 True
        """
        # TODO: 检查蛇头是否超出边界或与身体重叠
        pass
    
    def change_direction(self, new_dir):
        """改变蛇的移动方向（禁止 180° 反向）。
        
        Args:
            new_dir (tuple[int, int]): 新的方向向量
        """
        # TODO: 检查不是反方向后更新 direction
        pass
    
    def draw(self, screen):
        """在屏幕上绘制蛇（蛇头颜色不同于身体）。"""
        # TODO: 遍历 body，用 pygame.draw.rect 绘制每节
        pass


class Food:
    """食物类。
    
    Attributes:
        position (tuple[int, int]): 食物在网格上的坐标
    """
    
    def __init__(self, snake_body=None):
        """随机生成食物位置，避免与蛇身重叠。
        
        Args:
            snake_body (list[tuple[int, int]]): 蛇身坐标列表
        """
        # TODO: 随机生成 (x, y)，确保不在 snake_body 中
        pass
    
    def draw(self, screen):
        """在屏幕上绘制食物（圆形或矩形）。"""
        # TODO: 用 pygame.draw.rect 或 circle 绘制食物
        pass


def draw_grid(screen):
    """绘制背景网格线。"""
    # TODO: 用 pygame.draw.line 绘制水平和垂直线
    pass


def draw_score(screen, score):
    """在屏幕左上角显示得分。
    
    Args:
        score (int): 当前得分
    """
    # TODO: 使用 pygame.font 渲染得分文本
    pass


def main():
    """游戏主循环：初始化 → 事件处理 → 更新 → 渲染 → 控制帧率。
    
    流程：
        1. pygame.init() 创建窗口
        2. 创建 Clock、Snake、Food 实例
        3. 主循环 while True：
            a. 处理事件（QUIT、KEYDOWN）
            b. 根据 GameState 执行移动和碰撞检测
            c. 检测吃食物 → 增长蛇 → 生成新食物 → 加分
            d. 清屏 → 绘制网格 → 绘制蛇 → 绘制食物 → 绘制得分 → 刷新
            e. clock.tick(FPS)
    """
    # TODO: 实现完整游戏循环
    pass


if __name__ == "__main__":
    main()
