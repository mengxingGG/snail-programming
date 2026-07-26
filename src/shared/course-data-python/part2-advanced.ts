// 🌿 第二部分：Python 进阶 — Ch10 ~ Ch12 + P2 实战项目（22 节）
// 参考：Python Crash Course (3rd Ed), Think Python (3rd Ed)
// 模块、面向对象、错误处理——写出更 Pythonic 的代码

import type { Chapter, SectionValidation } from '../types/course';

const pythonImportRuntimeValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '16 的平方根是 4.0' },
    { type: 'exact', value: '圆周率约等于 3.14' },
    { type: 'regex', value: '^掷骰子：\\d+$' },
    { type: 'prefix', value: '现在时间是 ' },
  ],
};

const pythonWithTimerValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '⏱️ 开始计时...' },
    { type: 'exact', value: '计算结果：499999500000' },
    { type: 'prefix', value: '⏱️ 结束——耗时 ' },
    { type: 'exact', value: '' },
    { type: 'exact', value: 'with 块已结束，资源自动清理' },
    { type: 'exact', value: '📂 打开文件' },
    { type: 'exact', value: '📝 读写文件...' },
    { type: 'exact', value: '📂 关闭文件（自动！）' },
  ],
};

const pythonClassMethodValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'exact', value: '你好，我是 小明，18 岁' },
    { type: 'regex', value: '^你好，我是 小红，\\d+ 岁$' },
    { type: 'exact', value: '18岁合法？True' },
    { type: 'exact', value: '200岁合法？False' },
  ],
  expectedHint: `你好，我是 小明，18 岁
你好，我是 小红，21 岁
18岁合法？True
200岁合法？False`,
};

const pythonLoggingValidation: SectionValidation = {
  mode: 'dynamic_lines',
  outputRules: [
    { type: 'regex', value: '^\\d{2}:\\d{2}:\\d{2} \\| INFO\\s+\\| 程序启动$' },
    { type: 'regex', value: '^\\d{2}:\\d{2}:\\d{2} \\| INFO\\s+\\| 开始处理 3 条数据$' },
    { type: 'regex', value: '^\\d{2}:\\d{2}:\\d{2} \\| INFO\\s+\\| 处理完成$' },
    { type: 'regex', value: '^\\d{2}:\\d{2}:\\d{2} \\| WARNING \\| 内存使用超过 80%$' },
    { type: 'regex', value: '^\\d{2}:\\d{2}:\\d{2} \\| INFO\\s+\\| 程序结束$' },
  ],
  expectedHint: `12:00:00 | INFO    | 程序启动
12:00:00 | INFO    | 开始处理 3 条数据
12:00:00 | INFO    | 处理完成
12:00:00 | WARNING | 内存使用超过 80%
12:00:00 | INFO    | 程序结束`,
};

// ─────────────────────────────────────────────────────────────
//  Ch10 — 模块与包管理（4 节）
// ─────────────────────────────────────────────────────────────
const ch10: Chapter = {
  id: 'ch10',
  title: '模块与包管理',
  description: '用 import 引入标准库和第三方库，用 pip 管理依赖，写自己的模块，掌握 lambda',
  sections: [
    {
      id: '10.1',
      kind: 'demo',
      chapterId: 'ch10',
      title: 'import — 引入标准库和第三方库',
      content: `## import：把别人写好的代码拿过来用

Python 自带了一个庞大的**标准库**——就像买房子时已经装修好的厨房，开箱即用。

---

### 基本语法

\`\`\`python
import math                # 引入整个模块
from math import sqrt      # 只引入某个函数
from math import sqrt, pi  # 引入多个
import math as m           # 起个短名字
\`\`\`

---

### 常用标准库一览

| 模块 | 用途 | 示例 |
|------|------|------|
| \`math\` | 数学函数 | \`math.sqrt(9) → 3.0\` |
| \`random\` | 随机数 | \`random.randint(1, 10)\` |
| \`datetime\` | 日期时间 | \`datetime.now().strftime(...)\` |
| \`os\` | 操作系统接口 | \`os.getenv("HOME")\` |
| \`json\` | JSON 读写 | \`json.loads('{"a":1}')\` |
| \`re\` | 正则表达式 | \`re.search(r'\\d+', s)\` |

---

### 使用前先导入

Python 不会自动加载所有模块——你需要什么就 \`import\` 什么。这既节省内存，也让代码的依赖一目了然。`,
      starterCode: `import math
import random
from datetime import datetime

# 数学运算
print(f"16 的平方根是 {math.sqrt(16)}")
print(f"圆周率约等于 {math.pi:.2f}")

# 随机数
random.seed(42)  # 固定种子使结果可预测
print(f"掷骰子：{random.randint(1, 6)}")

# 日期时间
now = datetime.now()
print(f"现在时间是 {now.strftime('%Y-%m-%d %H:%M:%S')}")`,
      expectedOutput: `16 的平方根是 4.0
圆周率约等于 3.14
掷骰子：**随机数**
现在时间是 2026-01-15 10:30:00（**实际时间会不同**）`,
      hint: 'strftime 中的 %Y 是四位年份，%m 是月份，%d 是日期——格式化日期的小咒语',
      validation: pythonImportRuntimeValidation,
    },
    {
      id: '10.2',
      kind: 'demo',
      chapterId: 'ch10',
      title: 'pip — Python 的包管理器',
      content: `## pip：安装别人分享的第三方库

标准库能做的事情有限。当你想做 Web 开发、数据分析、机器学习时，就需要**第三方库**。\`pip\` 就是 Python 的"应用商店"。

---

### 常用命令

\`\`\`bash
pip install requests        # 安装一个包
pip install flask==2.3.0   # 安装指定版本
pip list                    # 看已安装的包
pip uninstall requests      # 卸载
pip install -r requirements.txt  # 批量安装
\`\`\`

---

### 第三方库 vs 标准库

\`\`\`python
# 标准库—不用安装，直接 import
import math, os, json, re

# 第三方库—需要先用 pip install 安装
import requests    # HTTP 请求
import flask       # Web 框架
import pandas      # 数据分析
\`\`\`

---

### 虚拟环境（venv）

每个项目最好有自己的"隔离环境"，避免不同项目需要的包版本冲突：

\`\`\`bash
python -m venv myenv         # 创建虚拟环境
source myenv/bin/activate    # 激活（macOS/Linux）
myenv\\Scripts\\activate      # 激活（Windows）
\`\`\`

> 💡 **小贴士**：新手阶段不用太纠结虚拟环境，但知道它的存在很重要。`,
      starterCode: `# 这段代码展示：如何用 pip 安装的第三方库（以 requests 为例）
# 运行前请先在终端执行：pip install requests

# 模拟 requests 的使用（本环境已安装）
import json

# 用标准库 json 来模拟一个 API 响应
# 实际项目中你会用 requests.get("https://api.example.com")
data = '{"name": "Python", "version": "3.12", "awesome": true}'
info = json.loads(data)

print(f"语言：{info['name']}")
print(f"版本：{info['version']}")
print(f"很棒？{'👍 当然！' if info['awesome'] else '😅'}")`,
      expectedOutput: `语言：Python
版本：3.12
很棒？👍 当然！`,
      hint: 'json.loads() 把 JSON 字符串变成 Python 字典——标准库就有的功能，不用装任何东西',
    },
    {
      id: '10.3',
      kind: 'exercise',
      chapterId: 'ch10',
      title: '写自己的模块 — 一个 .py 文件就是一个模块',
      content: `## 每一个 .py 文件，都是天然的模块

不需要任何特殊语法——你写的任何 \`.py\` 文件都可以被其他文件 \`import\`。

---

### 创建模块

假设你写了一个 \`mymath.py\`：

\`\`\`python
# mymath.py — 一个简单的数学工具模块

PI = 3.14159

def add(a: int, b: int) -> int:
    """返回两个数的和"""
    return a + b

def multiply(a: int, b: int) -> int:
    """返回两个数的积"""
    return a * b
\`\`\`

---

### 使用模块

\`\`\`python
# main.py — 在同一目录下使用 mymath

import mymath
# 或者
from mymath import add, PI

print(mymath.add(3, 4))      # 7
print(PI)                    # 3.14159
\`\`\`

---

### if __name__ == "__main__"

这是 Python 模块系统中最经典的一行代码：

\`\`\`python
# mymath.py
def add(a, b):
    return a + b

if __name__ == "__main__":
    # 只有直接运行这个文件时才执行这里
    # 被 import 时不会执行
    print("测试：", add(1, 2))
\`\`\`

- 直接运行 \`python mymath.py\` → 打印"测试"
- 被 \`import mymath\` → 不打印，只导入函数

> 💡 这样同一个文件既可以当模块用，又可以当脚本测试。`,
      starterCode: `# 模拟两个"文件"互相配合
# mymath "模块" — 假设这在一个单独的文件里
def factorial(n: int) -> int:
    """计算 n 的阶乘 n!"""
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

def is_prime(n: int) -> bool:
    """判断一个数是否为质数"""
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

# 下面的 if 保证作为脚本直接运行时才执行测试
if __name__ == "__main__":
    print("测试：", factorial(5))
    print("测试：", is_prime(7))

# main "使用模块" — 模拟 import mymath 后使用
print(f"5! = {factorial(5)}")
print(f"7 是质数？{is_prime(7)}")
print(f"10 是质数？{is_prime(10)}")`,
      expectedOutput: `测试：120
测试：True
5! = 120
7 是质数？True
10 是质数？False`,
      hint: 'int(n ** 0.5) 是判断质数的经典技巧——只用检查到平方根就够了，效率提高一大截',
    },
    {
      id: '10.4',
      kind: 'demo',
      chapterId: 'ch10',
      title: 'lambda — Python 的匿名函数',
      content: `## lambda：一行搞定小函数

当函数体只有**一个表达式**时，用 lambda 比 def 更简洁：

\`\`\`python
# 普通函数
def double(x):
    return x * 2

# lambda 写法
double = lambda x: x * 2
\`\`\`

---

### lambda 语法

\`\`\`python
lambda 参数: 返回值表达式
\`\`\`

- 不需要 \`def\`、不需要 \`return\`、不需要名字
- 只能写**一个表达式**（不能有循环、if/else 块等）
- 主要用于需要函数当参数的地方

---

### lambda 最实用的场景：key 参数

\`\`\`python
# sort 按第二个元素排序
pairs = [(1, 3), (4, 1), (2, 5)]
pairs.sort(key=lambda p: p[1])    # [(4,1), (1,3), (2,5)]

# max 按自定义规则
max(words, key=lambda w: len(w))  # 找最长的单词

# sorted 按字典的某个字段
students = [{"name": "小明", "score": 92}, ...]
sorted(students, key=lambda s: s["score"])
\`\`\`

---

### lambda 配合 map / filter

\`\`\`python
# map：对每个元素做变换
list(map(lambda x: x**2, [1, 2, 3]))       # [1, 4, 9]

# filter：筛选符合条件的元素
list(filter(lambda x: x % 2 == 0, range(10)))  # [0,2,4,6,8]
\`\`\`

---

### lambda vs def：什么时候用哪个？

| lambda | def |
|--------|-----|
| 一行表达式 | 多行逻辑 |
| 用完就扔 | 需要复用 |
| 作为参数传递 | 独立功能 |
| 不需要名字 | 需要好名字 |

> 💡 lambda 就像"一次性筷子"——简单、方便、用完即弃。不要把复杂逻辑塞进 lambda。`,
      starterCode: `# lambda 基础
square = lambda n: n * n
is_odd = lambda n: n % 2 == 1

print("5的平方：", square(5))
print("7是奇数？", is_odd(7))

# sort 按第二个元素排序
pairs = [(1, 3), (4, 1), (2, 5), (3, 2)]
pairs.sort(key=lambda p: p[1])
print("\\n按第二个数排序：", pairs)

# filter + lambda
nums = [1, 2, 3, 4, 5, 6, 7, 8]
evens = list(filter(lambda n: n % 2 == 0, nums))
print("偶数：", evens)

# map + lambda
squares = list(map(lambda x: x**2, [1, 2, 3, 4, 5]))
print("平方：", squares)`,
      expectedOutput: `5的平方： 25
7是奇数？ True

按第二个数排序： [(4, 1), (3, 2), (1, 3), (2, 5)]
偶数： [2, 4, 6, 8]
平方： [1, 4, 9, 16, 25]`,
      hint: 'lambda 就像一个"一次性函数"——用完就扔，不用专门 def 定义。最常用于 sorted/max/min 的 key 参数',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch11 — 面向对象入门（7 节）
// ─────────────────────────────────────────────────────────────
const ch11: Chapter = {
  id: 'ch11',
  title: '面向对象入门',
  description: 'class 创建对象、__init__ 初始化、属性与方法、继承、@property、@classmethod、魔术方法',
  sections: [
    {
      id: '11.1',
      kind: 'demo',
      chapterId: 'ch11',
      title: '类是什么 — 创建对象的模板',
      content: `## 类（class）：制造对象的"图纸"

类比现实世界：

- **类（class）** = 饼干的**模具**
- **对象（object）** = 用模具做出来的**饼干**

一个模具可以做出很多块饼干——每块饼干有自己的"属性"（口味、形状），但结构都一样。

---

### 定义一个最简单的类

\`\`\`python
class Dog:
    """狗这个物种的蓝图"""
    pass   # pass 表示"什么都不做，只是占位"

# 用类创建对象（也叫"实例化"）
my_dog = Dog()
your_dog = Dog()

print(type(my_dog))    # <class '__main__.Dog'>
print(my_dog is your_dog)  # False——两个不同的狗！
\`\`\`

---

### 从函数到类：为什么需要类？

当你发现好几个函数都在操作同一组数据时，就是"用类"的信号：

\`\`\`python
# ❌ 面向过程——数据和操作分离
dog_name = "旺财"
dog_age = 3

def bark(name):
    return f"{name}：汪汪！"

def age_in_human_years(name, age):
    return f"{name} 相当于人类 {age * 7} 岁"

# ✅ 面向对象——数据和操作封装在一起
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        return f"{self.name}：汪汪！"

    def human_age(self):
        return f"{self.name} 相当于人类 {self.age * 7} 岁"
\`\`\``,
      starterCode: `class Pet:
    """宠物基类——展示最基本的类结构"""
    pass

class Cat:
    """猫的蓝图"""
    pass

# 创建实例
cat1 = Cat()
cat2 = Cat()

# 即使类里面什么都没有，它们也是独立的对象
print(f"cat1 的类型：{type(cat1).__name__}")
print(f"cat2 的类型：{type(cat2).__name__}")
print(f"它们是同一个对象吗？{cat1 is cat2}")

pet = Pet()
print(f"pet 的类型：{type(pet).__name__}")
print(f"pet 的文档：{Pet.__doc__}")`,
      expectedOutput: `cat1 的类型：Cat
cat2 的类型：Cat
它们是同一个对象吗？False
pet 的类型：Pet
pet 的文档：宠物基类——展示最基本的类结构`,
      hint: 'type() 返回对象的类，__name__ 取类的名字，__doc__ 取类的文档字符串——三个实用的内省工具',
    },
    {
      id: '11.2',
      kind: 'demo',
      chapterId: 'ch11',
      title: '__init__ — 初始化方法',
      content: `## __init__：对象出生时自动执行的"初始化代码"

当你调用 \`Dog()\` 创建对象时，Python 自动调用 \`__init__\` 方法——就像婴儿出生时护士做的一系列检查。

---

### 基本用法

\`\`\`python
class Dog:
    def __init__(self, name: str, age: int):
        """创建狗对象时自动调用"""
        self.name = name   # 把 name 存到对象上
        self.age = age     # 把 age 存到对象上
        print(f"{self.name} 诞生了！🐶")

# 创建对象时传入参数
dog1 = Dog("旺财", 3)   # 打印：旺财 诞生了！🐶
dog2 = Dog("来福", 1)   # 打印：来福 诞生了！🐶

print(dog1.name)  # 旺财
print(dog2.age)   # 1
\`\`\`

---

### __init__ 不是构造函数！

严格来说，\`__new__\` 才是真正的构造函数——但 99% 的情况下你只需要关心 \`__init__\`。把它当成"初始化方法"就好。

---

### 双下划线方法（dunder methods）

Python 里 \`__xxx__\` 这种格式的方法叫 **dunder**（double underscore），是 Python 的"魔法方法"。除了 \`__init__\`，还有：

- \`__str__\` — 控制 \`print(对象)\` 的输出
- \`__len__\` — 控制 \`len(对象)\` 的行为
- \`__eq__\` — 控制 \`==\` 比较的逻辑`,
      starterCode: `class Book:
    """一本书的蓝图"""

    def __init__(self, title: str, author: str, pages: int):
        self.title = title
        self.author = author
        self.pages = pages
        # 自动计算的属性
        self.is_long = pages > 300

    def __str__(self) -> str:
        """控制 print() 的输出"""
        status = "厚书 📖" if self.is_long else "薄书 📄"
        return f"《{self.title}》— {self.author}（{self.pages}页）{status}"


# 创建三本书
book1 = Book("Python 编程：从入门到实践", "Eric Matthes", 500)
book2 = Book("流畅的 Python", "Luciano Ramalho", 850)
book3 = Book("Python 极简讲义", "张三", 150)

print(book1)
print(book2)
print(book3)`,
      expectedOutput: `《Python 编程：从入门到实践》— Eric Matthes（500页）厚书 📖
《流畅的 Python》— Luciano Ramalho（850页）厚书 📖
《Python 极简讲义》— 张三（150页）薄书 📄`,
      hint: '在 __init__ 里可以根据传入的参数计算派生属性（如 is_long），对象的属性不一定直接来自参数',
    },
    {
      id: '11.3',
      kind: 'demo',
      chapterId: 'ch11',
      title: '属性与方法 — self 是什么',
      content: `## self：指向"当前这个对象"的引用

每个方法的第一个参数 \`self\` 不是关键字——你可以叫它任何名字（但约定叫 \`self\`）。它指向**调用这个方法的那个对象**。

---

### 属性 vs 方法

\`\`\`python
class BankAccount:
    def __init__(self, owner: str, balance: float = 0):
        self.owner = owner       # ← 属性（数据）
        self.balance = balance   # ← 属性（数据）

    def deposit(self, amount: float) -> None:   # ← 方法（行为）
        """存款"""
        self.balance += amount

    def withdraw(self, amount: float) -> bool:  # ← 方法（行为）
        """取款，成功返回 True"""
        if amount <= self.balance:
            self.balance -= amount
            return True
        return False
\`\`\`

---

### self 到底是怎么传的？

\`\`\`python
acc = BankAccount("小明", 100)
acc.deposit(50)   # Python 内部等价于 BankAccount.deposit(acc, 50)
                  # 自动把 acc 传给 self！
\`\`\`

---

### 属性 vs 方法：什么时候用什么？

| 属性 | 方法 |
|------|------|
| 名词——**是什么** | 动词——**做什么** |
| \`self.name\` | \`self.bark()\` |
| 直接访问，不用括号 | 调用时加括号 |
| 存储数据 | 执行逻辑 |

> 💡 简单记：**属性是"数据"，方法是"动作"**。`,
      starterCode: `class Counter:
    """一个简单的计数器"""

    def __init__(self, name: str):
        self.name = name     # 属性：计数器的名字
        self.count = 0       # 属性：当前计数

    def increment(self) -> int:
        """加 1，返回新的计数值"""
        self.count += 1
        return self.count

    def reset(self) -> None:
        """归零"""
        self.count = 0

    def status(self) -> str:
        """返回当前状态描述"""
        return f"[{self.name}] 当前计数：{self.count}"


# 使用计数器
c1 = Counter("点赞")
c2 = Counter("浏览")

c1.increment()
c1.increment()
c1.increment()
c2.increment()

print(c1.status())
print(c2.status())

c1.reset()
print(f"重置后 — {c1.status()}")`,
      expectedOutput: `[点赞] 当前计数：3
[浏览] 当前计数：1
重置后 — [点赞] 当前计数：0`,
      hint: '每个对象有自己的属性空间——c1.count 和 c2.count 互不影响，self 确保了这一点',
    },
    {
      id: '11.4',
      kind: 'demo',
      chapterId: 'ch11',
      title: '继承 — 复用父类的能力',
      content: `## 继承：把已有的类"复制一份"，再加自己的东西

如果两个类有大量重复代码，可以提取出一个**父类**，让子类**继承**它。

---

### 基本语法

\`\`\`python
class Animal:              # 父类（基类）
    def __init__(self, name: str):
        self.name = name

    def speak(self) -> str:
        return "..."

class Dog(Animal):         # 子类——继承 Animal
    def speak(self) -> str:
        return f"{self.name}：汪汪！🐶"   # 覆盖父类的方法

class Cat(Animal):
    def speak(self) -> str:
        return f"{self.name}：喵喵！🐱"
\`\`\`

---

### super()：调用父类的方法

\`\`\`python
class Dog(Animal):
    def __init__(self, name: str, breed: str):
        super().__init__(name)   # 调用父类的 __init__
        self.breed = breed       # 再加上自己的属性
\`\`\`

\`super()\` 的意思是"找我的父类"，这样你不用重复写父类已经写好的逻辑。

---

### isinstance()：检查你是谁

\`\`\`python
dog = Dog("旺财", "金毛")
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True——狗也是动物！
print(isinstance(dog, Cat))     # False
\`\`\``,
      starterCode: `class Employee:
    """员工基类"""

    def __init__(self, name: str, salary: float):
        self.name = name
        self.salary = salary

    def describe(self) -> str:
        return f"{self.name} — 月薪 ¥{self.salary:,.0f}"

    def bonus(self) -> float:
        """年终奖：默认 1 个月工资"""
        return self.salary


class Manager(Employee):
    """经理——继承 Employee"""

    def __init__(self, name: str, salary: float, team_size: int):
        super().__init__(name, salary)
        self.team_size = team_size

    def describe(self) -> str:
        base = super().describe()
        return f"{base}，团队 {self.team_size} 人"

    def bonus(self) -> float:
        """经理年终奖：3 个月工资"""
        return self.salary * 3


# 创建实例
e1 = Employee("张三", 8000)
m1 = Manager("李四", 15000, 8)

print(e1.describe())
print(f"  年终奖：¥{e1.bonus():,.0f}")

print(m1.describe())
print(f"  年终奖：¥{m1.bonus():,.0f}")

print(f"\\n李四是 Employee 吗？{isinstance(m1, Employee)}")
print(f"李四是 Manager 吗？{isinstance(m1, Manager)}")`,
      expectedOutput: `张三 — 月薪 ¥8,000
  年终奖：¥8,000
李四 — 月薪 ¥15,000，团队 8 人
  年终奖：¥45,000

李四是 Employee 吗？True
李四是 Manager 吗？True`,
      hint: '子类可以覆盖（override）父类的方法——同样的方法名，不同的实现。这叫"多态"',
    },
    {
      id: '11.5',
      kind: 'demo',
      chapterId: 'ch11',
      title: '@property — 把方法当属性用',
      content: `## @property：方法变身属性

有时候你觉得 \`obj.name()\` 很别扭，想要 \`obj.name\` 的写法——但背后还能执行逻辑。\`@property\` 就是做这个的。

---

### 没有 @property 的尴尬

\`\`\`python
class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2

c = Circle(5)
print(c.area())    # 需要括号——但它明明是"数据"
\`\`\`

---

### 加上 @property

\`\`\`python
class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        return 3.14 * self.radius ** 2

c = Circle(5)
print(c.area)      # 不用括号！像属性一样
\`\`\`

---

### setter：让属性可写

\`\`\`python
class Student:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if len(value) < 2:
            raise ValueError("名字至少 2 个字符")
        self._name = value
\`\`\`

---

### @property 的三大好处

1. **语法优雅**：\`obj.attr\` 而不是 \`obj.attr()\`
2. **可以加验证**：setter 里检查数据合法性
3. **向后兼容**：原本是属性，后来想加逻辑？加 @property 即可，调用方式不变`,
      starterCode: `class Temperature:
    """温度类——演示 @property 和 setter"""

    def __init__(self, celsius=0):
        self._celsius = celsius    # 私有属性（约定用 _ 开头）

    @property
    def celsius(self):
        """获取摄氏度"""
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        """设置摄氏度，自动计算华氏度"""
        if value < -273.15:
            raise ValueError("温度不能低于绝对零度！")
        self._celsius = value

    @property
    def fahrenheit(self):
        """华氏度——只读属性（没有 setter）"""
        return self._celsius * 9 / 5 + 32


t = Temperature(25)
print(f"摄氏度：{t.celsius}°C")      # 像属性一样访问
print(f"华氏度：{t.fahrenheit}°F")   # 只读属性

t.celsius = 30                      # 通过 setter 修改
print(f"\\n修改后：{t.celsius}°C = {t.fahrenheit:.1f}°F")`,
      expectedOutput: `摄氏度：25°C
华氏度：77.0°F

修改后：30°C = 86.0°F`,
      hint: '用 @property 把方法伪装成属性——调用者不用关心背后是存好的值还是计算出来的，Pythonic！',
    },
    {
      id: '11.6',
      kind: 'demo',
      chapterId: 'ch11',
      title: '@classmethod + @staticmethod — 什么时候用哪个',
      content: `## @classmethod 和 @staticmethod

除了普通方法（需要 self），类还有两种特殊方法：

---

### @staticmethod — 不需要 self 的工具函数

\`\`\`python
class Math:
    @staticmethod
    def add(a, b):
        return a + b

Math.add(3, 5)    # 不需要创建实例，直接用类调用
\`\`\`

静态方法和普通函数的区别：它属于类的**命名空间**，逻辑上和类相关，但不需要访问实例数据。

---

### @classmethod — 需要类本身的工厂方法

\`\`\`python
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def from_birth_year(cls, name, year):
        """从出生年份创建用户——工厂方法"""
        from datetime import datetime
        age = datetime.now().year - year
        return cls(name, age)     # cls 就是 User 类本身

# 两种创建方式
u1 = User("小明", 18)                        # 普通方式
u2 = User.from_birth_year("小红", 2005)       # 工厂方法 ✨
\`\`\`

---

### 三种方法对比

| 类型 | 第一个参数 | 何时使用 |
|------|-----------|---------|
| 普通方法 | \`self\`（实例） | 需要访问/修改实例数据 |
| \`@classmethod\` | \`cls\`（类） | 工厂方法、需要类本身 |
| \`@staticmethod\` | 无 | 工具函数、不需要实例和类 |

---

### 典型场景

- **@classmethod**：提供多种创建对象的方式（如从 JSON、从数据库加载）
- **@staticmethod**：把相关的工具函数组织在一起（如 \`Math.add\`）`,
      starterCode: `from datetime import datetime

class User:
    """用户类——演示三种方法类型"""

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        """普通方法——需要 self"""
        return f"你好，我是 {self.name}，{self.age} 岁"

    @classmethod
    def from_birth_year(cls, name, birth_year):
        """类方法——从出生年份创建用户"""
        age = 2026 - birth_year  # 固定年份2026
        return cls(name, age)

    @staticmethod
    def validate_age(age):
        """静态方法——工具函数"""
        return 0 <= age <= 150

# 三种方式
u1 = User("小明", 18)
u2 = User.from_birth_year("小红", 2005)

print(u1.greet())
print(u2.greet())
print(f"18岁合法？{User.validate_age(18)}")
print(f"200岁合法？{User.validate_age(200)}")`,
      expectedOutput: `你好，我是 小明，18 岁
你好，我是 小红，21 岁
18岁合法？True
200岁合法？False`,
      hint: 'classmethod 最经典的用途是"工厂方法"——提供多种创建对象的方式，让 __init__ 保持简洁',
      validation: pythonClassMethodValidation,
    },
    {
      id: '11.7',
      kind: 'demo',
      chapterId: 'ch11',
      title: '魔术方法 — __str__/__repr__/__eq__/__lt__',
      content: `## 魔术方法：让对象可打印、可比较

Python 的"魔术方法"（dunder methods）让你自定义对象如何与 Python 内置功能交互。

---

### __str__ vs __repr__

\`\`\`python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"     # 给人看

    def __repr__(self):
        return f"Point({self.x}, {self.y})" # 给开发者看

p = Point(3, 5)
print(p)          # (3, 5) —— 调用 __str__
print(repr(p))    # Point(3, 5) —— 调用 __repr__
\`\`\`

---

### __eq__ — 让对象可以用 == 比较

\`\`\`python
class Point:
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

p1 = Point(3, 5)
p2 = Point(3, 5)
print(p1 == p2)    # True（没有 __eq__ 的话会是 False！）
\`\`\`

---

### __lt__ — 让对象可以排序

\`\`\`python
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def __lt__(self, other):
        return self.score < other.score   # 按分数比大小

students = [Student("小明", 92), Student("小红", 88)]
students.sort()    # 现在可以直接排序了！
\`\`\`

---

### 常用魔术方法速查

| 方法 | 触发方式 | 用途 |
|------|---------|------|
| \`__str__\` | \`print(obj)\`, \`str(obj)\` | 人类可读 |
| \`__repr__\` | \`repr(obj)\`, 交互环境 | 开发者可读 |
| \`__eq__\` | \`obj1 == obj2\` | 相等比较 |
| \`__lt__\` | \`obj1 < obj2\`, \`sort()\` | 小于比较 |
| \`__len__\` | \`len(obj)\` | 长度 |
| \`__getitem__\` | \`obj[key]\` | 索引访问 |`,
      starterCode: `class Student:
    """学生类——演示魔术方法"""

    def __init__(self, name, score):
        self.name = name
        self.score = score

    def __str__(self):
        return f"{self.name}({self.score}分)"

    def __repr__(self):
        return f"Student('{self.name}', {self.score})"

    def __eq__(self, other):
        return self.name == other.name and self.score == other.score

    def __lt__(self, other):
        return self.score < other.score


s1 = Student("小明", 92)
s2 = Student("小红", 88)
s3 = Student("小明", 92)

print("str：", str(s1))
print("repr：", repr(s1))
print("s1 == s3？", s1 == s3)     # True —— 同名同分
print("s1 == s2？", s1 == s2)     # False

students = [s1, s2, Student("小刚", 75)]
students.sort()                     # 按分数排序（__lt__）
print("\\n排序后：")
for s in students:
    print(f"  {s}")`,
      expectedOutput: `str： 小明(92分)
repr： Student('小明', 92)
s1 == s3？ True
s1 == s2？ False

排序后：
  小刚(75分)
  小红(88分)
  小明(92分)`,
      hint: '实现 __lt__ 后，sort() 就能直接排序你的对象——不需要每次写 key=lambda，代码更简洁',
    },
    {
      id: '11.8',
      kind: 'demo',
      chapterId: 'ch11',
      title: '组合 vs 继承 — has-a vs is-a',
      content: `## 组合 vs 继承：设计类的关系

当两个类产生关联时，有两种方式：**继承**（is-a）和**组合**（has-a）。

---

### 继承：is-a 关系

\`\`\`python
class Animal: ...      # 动物
class Dog(Animal): ...  # 狗 IS-A 动物 ✅
class Cat(Animal): ...  # 猫 IS-A 动物 ✅
\`\`\`
狗是一种动物 → 用继承。子类**是**父类的一种。

---

### 组合：has-a 关系

\`\`\`python
class Engine: ...       # 引擎
class Car:
    def __init__(self):
        self.engine = Engine()  # 车 HAS-A 引擎 ✅
\`\`\`
车有引擎，但车不是引擎 → 用组合。一个类**拥有**另一个类的实例。

---

### 什么时候用哪个？

| | 继承 (is-a) | 组合 (has-a) |
|------|-----------|-------------|
| 关系 | "是一种" | "有一个" |
| 代码复用 | 自动获得父类方法 | 需要显式委托 |
| 灵活性 | 编译时确定 | 运行时可以换 |
| 耦合度 | 高（子类依赖父类） | 低 |

---

### 经典原则

**优先使用组合而非继承**。

继承是"最强"的耦合——子类紧密绑定父类。组合更灵活，可以在运行时替换组件。大多数情况下，组合是更好的选择。

\`\`\`python
# ✅ 组合：灵活
class Robot:
    def __init__(self, arm, leg):
        self.arm = arm       # 可以随时换不同的 arm
        self.leg = leg

# 继承也行但更僵化
class WalkingRobot(Robot):  # 只能走路
    ...
\`\`\``,
      starterCode: `# 继承：is-a
class Person:
    def __init__(self, name):
        self.name = name
    def introduce(self):
        return f"我叫{self.name}"

class Student(Person):  # Student IS-A Person
    def __init__(self, name, school):
        super().__init__(name)
        self.school = school
    def introduce(self):
        return f"{super().introduce()}，在{self.school}上学"

# 组合：has-a
class Engine:
    def start(self):
        return "引擎轰鸣 🔥"
    def stop(self):
        return "引擎熄火"

class Car:  # Car HAS-A Engine
    def __init__(self, brand):
        self.brand = brand
        self.engine = Engine()  # 组合！
    def drive(self):
        return f"{self.brand}：{self.engine.start()} → 出发！"

# 测试
s = Student("小明", "阳光小学")
print("继承示例：", s.introduce())

c = Car("特斯拉")
print("组合示例：", c.drive())
print(f"  {c.brand} 有引擎：{isinstance(c.engine, Engine)}")

# 组合可以随时换组件
class SuperEngine:
    def start(self):
        return "超强引擎启动 🚀"

c.engine = SuperEngine()  # 换引擎！
print(f"升级后：{c.brand}：{c.engine.start()} → 出发！")`,
      expectedOutput: `继承示例： 我叫小明，在阳光小学上学
组合示例： 特斯拉：引擎轰鸣 🔥 → 出发！
  特斯拉 有引擎：True
升级后：特斯拉：超强引擎启动 🚀 → 出发！`,
      hint: '组合让你可以"换零件"——在运行时替换组件，继承做不到。这是组合比继承更灵活的根本原因',
    },
    {
      id: '11.9',
      kind: 'demo',
      chapterId: 'ch11',
      title: 'dataclasses — 现代 Python 数据类',
      content: `## dataclasses：告别样板代码

写一个数据类要写 \`__init__\`、\`__repr__\`、\`__eq__\`……dataclass 装饰器帮你自动生成。

---

### 传统写法 vs dataclass

\`\`\`python
# ❌ 传统写法——大量重复代码
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

# ✅ dataclass——三行搞定！
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

p1 = Point(3, 5)
p2 = Point(3, 5)
print(p1)           # Point(x=3, y=5)
print(p1 == p2)    # True —— 自动比较！
\`\`\`

---

### dataclass 自动生成什么？

- \`__init__\` — 根据类型注解自动生成
- \`__repr__\` — 可读的字符串表示
- \`__eq__\` — 按字段值比较

---

### 常用参数

\`\`\`python
@dataclass(frozen=True)    # 不可变（类似元组）
class Config:
    host: str = "localhost"
    port: int = 8080

@dataclass(order=True)    # 支持排序（__lt__ 等）
class Student:
    name: str
    score: int
\`\`\`

---

### 什么时候用？

- DTO（数据传输对象）
- 配置类
- 简单的数据结构
- 任何"主要是存数据"的类`,
      starterCode: `from dataclasses import dataclass, field
from typing import List

@dataclass
class Product:
    """商品数据类——dataclass 自动生成 __init__/__repr__/__eq__"""
    name: str
    price: float
    stock: int = 0  # 默认值

@dataclass
class Order:
    """订单数据类"""
    order_id: int
    items: List[Product] = field(default_factory=list)
    # field(default_factory=list) 避免可变默认值的陷阱！

    @property
    def total(self) -> float:
        return sum(item.price for item in self.items)

# 创建商品
p1 = Product("键盘", 299, 50)
p2 = Product("鼠标", 149, 100)
p3 = Product("键盘", 299, 50)  # 和 p1 相同

print("商品：", p1)
print("p1 == p3？", p1 == p3)  # True！值比较
print("p1 == p2？", p1 == p2)  # False

# 创建订单
order = Order(1, [p1, p2])
print(f"\\n订单 #{order.order_id}")
for item in order.items:
    print(f"  {item.name}：¥{item.price}")
print(f"总价：¥{order.total}")`,
      expectedOutput: `商品： Product(name='键盘', price=299, stock=50)
p1 == p3？ True
p1 == p2？ False

订单 #1
  键盘：¥299
  鼠标：¥149
总价：¥448`,
      hint: 'dataclass 让你专注于"数据是什么"而不是"类怎么写"——Python 3.7+ 的标准库，现代 Python 项目的标配',
    },
    {
      id: '11.10',
      kind: 'demo',
      chapterId: 'ch11',
      title: '类型提示入门 — def greet(name: str) -> str:',
      content: `## 类型提示：让代码更清晰

Python 是动态类型语言，但可以加**类型注解**来提升代码可读性和 IDE 支持。

---

### 基本语法

\`\`\`python
# 变量类型注解
name: str = "小明"
age: int = 18
scores: list[int] = [95, 88, 76]

# 函数类型注解
def greet(name: str) -> str:
    return f"你好，{name}！"

def divide(a: float, b: float) -> float | None:
    if b == 0:
        return None
    return a / b
\`\`\`

\`-> str\` 表示返回值类型，\`float | None\` 表示可能是 float 或 None。

---

### 复杂类型

\`\`\`python
from typing import List, Dict, Tuple, Optional

# Python 3.10+ 可以用内置写法
def process(data: list[dict[str, int]]) -> tuple[int, float]:
    ...
# 等价于旧版：
# def process(data: List[Dict[str, int]]) -> Tuple[int, float]:
\`\`\`

---

### 重要：类型提示不强制检查！

\`\`\`python
def add(a: int, b: int) -> int:
    return a + b

add("hello", "world")  # 运行不会报错！返回 "helloworld"
\`\`\`
Python **不会在运行时检查类型**。类型提示用于：
1. IDE 智能提示和自动补全
2. mypy / pyright 等静态检查工具
3. 团队沟通——看签名就知道怎么用`,
      starterCode: `from typing import List

# 类型注解函数
def calculate_stats(scores: List[int]) -> dict[str, float]:
    """计算分数统计——类型提示让意图一目了然"""
    return {
        "average": sum(scores) / len(scores),
        "max": max(scores),
        "min": min(scores),
    }

def format_score(name: str, score: int) -> str:
    """格式化分数输出"""
    return f"{name}: {score}分"

# 带默认值和可选类型
def greet(name: str, title: str | None = None) -> str:
    """问候——title 是可选的"""
    if title:
        return f"{title} {name}，你好！"
    return f"{name}，你好！"

# 使用
stats = calculate_stats([95, 88, 76, 92])
print("统计结果：")
for key, value in stats.items():
    print(f"  {key}: {value:.1f}")

print()
print(format_score("小明", 95))
print(greet("小红"))
print(greet("张老师", "教授"))`,
      expectedOutput: `统计结果：
  average: 87.8
  max: 95.0
  min: 76.0

小明: 95分
小红，你好！
教授 张老师，你好！`,
      hint: '类型提示就像"使用说明书"——Python 不会强制检查，但 IDE 和同事会感谢你。Python 3.10+ 支持 str | None 语法',
    },
    {
      id: '11.11',
      kind: 'demo',
      chapterId: 'ch11',
      title: '抽象基类 (ABC) 入门',
      content: `## 抽象基类：定义"必须实现什么"

当你想确保子类一定实现某些方法时，使用抽象基类（ABC）。

---

### 为什么需要 ABC？

\`\`\`python
# ❌ 没有 ABC——子类可能忘记实现方法
class Animal:
    def speak(self):
        raise NotImplementedError  # 运行时才发现！

# ✅ 用 ABC——定义时就检查
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self) -> str:
        """子类必须实现这个方法"""
        ...

class Dog(Animal):
    def speak(self) -> str:
        return "汪汪！"

# class Cat(Animal):  # ❌ 不实现 speak 就无法实例化！
#     pass
\`\`\`

---

### @abstractmethod

被 \`@abstractmethod\` 装饰的方法必须在子类中实现，否则子类无法实例化：

\`\`\`python
class DataSource(ABC):
    @abstractmethod
    def read(self) -> str: ...
    
    @abstractmethod
    def write(self, data: str) -> None: ...

class FileSource(DataSource):
    def read(self) -> str:      # ✅ 必须实现
        return "读取文件..."
    def write(self, data: str):  # ✅ 必须实现
        print(f"写入：{data}")
\`\`\`

---

### ABC vs 鸭子类型

Python 讲究"鸭子类型"——不关心对象类型，只关心它有没有需要的方法。ABC 在"鸭子类型太宽松"时提供约束，适合大型项目和框架设计。`,
      starterCode: `from abc import ABC, abstractmethod
import math

class Shape(ABC):
    """形状抽象基类——所有形状必须实现 area 和 perimeter"""
    
    @abstractmethod
    def area(self) -> float:
        """计算面积"""
        ...
    
    @abstractmethod
    def perimeter(self) -> float:
        """计算周长"""
        ...
    
    def describe(self) -> str:  # 普通方法可以有默认实现
        return f"面积={self.area():.1f}，周长={self.perimeter():.1f}"

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius
    
    def area(self) -> float:
        return math.pi * self.radius ** 2
    
    def perimeter(self) -> float:
        return 2 * math.pi * self.radius

class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height
    
    def area(self) -> float:
        return self.width * self.height
    
    def perimeter(self) -> float:
        return 2 * (self.width + self.height)

# 多态：统一处理不同形状
shapes: list[Shape] = [Circle(5), Rectangle(4, 6), Circle(3)]
for shape in shapes:
    print(f"{type(shape).__name__}：{shape.describe()}")`,
      expectedOutput: `Circle：面积=78.5，周长=31.4
Rectangle：面积=24.0，周长=20.0
Circle：面积=28.3，周长=18.8`,
      hint: 'ABC 定义"契约"——子类必须遵守。这让多态更安全：你可以放心地遍历 Shape 列表调用 area()，因为每个子类一定实现了它',
    },
    {
      id: '11.12',
      kind: 'demo',
      chapterId: 'ch11',
      title: 'OOP 综合练习 — 银行账户系统',
      content: `## OOP 综合练习：银行账户系统

综合运用本章所有知识，构建一个简单的银行账户系统。

---

### 需求

1. **BankAccount 基类**：账号、户主、余额、存款、取款
2. **SavingsAccount**：储蓄账户，有利率，可计算利息
3. **CreditAccount**：信用账户，有透支额度
4. 使用 \`@property\` 保护余额
5. 使用 \`__str__\` 让账户可打印
6. 交易记录用组合（Transaction 类）

---

### 类关系

\`\`\`
BankAccount (ABC 基类)
  ├── SavingsAccount (is-a)
  └── CreditAccount (is-a)

Transaction (组合——Account HAS Transactions)
\`\`\`

---

### 设计要点

- 余额不能为负（储蓄账户）
- 信用账户允许透支，但不能超过额度
- 每笔交易记录时间、类型、金额
- 使用 dataclass 定义 Transaction`,
      starterCode: `from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime

@dataclass
class Transaction:
    """交易记录（dataclass）"""
    type: str      # "存款" 或 "取款"
    amount: float
    time: str = ""

    def __post_init__(self):
        if not self.time:
            self.time = datetime.now().strftime("%Y-%m-%d %H:%M")

class BankAccount(ABC):
    """银行账户抽象基类"""
    
    def __init__(self, account_id: str, owner: str):
        self.account_id = account_id
        self.owner = owner
        self._balance: float = 0
        self.transactions: list[Transaction] = []
    
    @property
    def balance(self) -> float:
        return self._balance
    
    @abstractmethod
    def can_withdraw(self, amount: float) -> bool:
        """子类定义各自的取款规则"""
        ...
    
    def deposit(self, amount: float):
        self._balance += amount
        self.transactions.append(Transaction("存款", amount))
        return f"✅ 存入 ¥{amount:.2f}，余额 ¥{self.balance:.2f}"
    
    def withdraw(self, amount: float):
        if not self.can_withdraw(amount):
            return f"❌ 余额不足！余额 ¥{self.balance:.2f}"
        self._balance -= amount
        self.transactions.append(Transaction("取款", amount))
        return f"✅ 取出 ¥{amount:.2f}，余额 ¥{self.balance:.2f}"
    
    def __str__(self):
        return f"[{self.account_id}] {self.owner} — ¥{self.balance:.2f}"

class SavingsAccount(BankAccount):
    """储蓄账户——不能透支"""
    
    def __init__(self, account_id: str, owner: str, interest_rate: float = 0.02):
        super().__init__(account_id, owner)
        self.interest_rate = interest_rate
    
    def can_withdraw(self, amount: float) -> bool:
        return self.balance >= amount
    
    def add_interest(self):
        interest = self.balance * self.interest_rate
        return self.deposit(interest)

class CreditAccount(BankAccount):
    """信用账户——可透支"""
    
    def __init__(self, account_id: str, owner: str, credit_limit: float = 1000):
        super().__init__(account_id, owner)
        self.credit_limit = credit_limit
    
    def can_withdraw(self, amount: float) -> bool:
        return self.balance + self.credit_limit >= amount

# ─── 测试 ───
print("🏦 蜗牛银行系统\\n")

# 储蓄账户
sa = SavingsAccount("SA001", "小明", interest_rate=0.03)
print(sa)
print(sa.deposit(5000))
print(sa.withdraw(2000))
print(sa.withdraw(5000))  # 余额不足
print(sa.add_interest())
print(f"交易记录：{len(sa.transactions)} 笔")

print()

# 信用账户
ca = CreditAccount("CA001", "小红", credit_limit=2000)
print(ca)
print(ca.deposit(1000))
print(ca.withdraw(2500))  # 透支 1500
print(f"余额：¥{ca.balance:.2f}（可透支 ¥{ca.credit_limit}）")`,
      expectedOutput: `🏦 蜗牛银行系统

[SA001] 小明 — ¥0.00
✅ 存入 ¥5000.00，余额 ¥5000.00
✅ 取出 ¥2000.00，余额 ¥3000.00
❌ 余额不足！余额 ¥3000.00
✅ 存入 ¥90.00，余额 ¥3090.00
交易记录：3 笔

[CA001] 小红 — ¥0.00
✅ 存入 ¥1000.00，余额 ¥1000.00
✅ 取出 ¥2500.00，余额 ¥-1500.00
余额：¥-1500.00（可透支 ¥2000）`,
      hint: '这个练习综合了：ABC、@property、dataclass、继承、组合、__str__——回头看，你已经能设计一个完整的 OOP 系统了！',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch12 — 错误处理与调试（5 节）
// ─────────────────────────────────────────────────────────────
const ch12: Chapter = {
  id: 'ch12',
  title: '错误处理与调试',
  description: 'try/except 优雅处理错误、常见异常类型、调试技巧、with 上下文管理器、logging 日志',
  sections: [
    {
      id: '12.1',
      kind: 'demo',
      chapterId: 'ch12',
      title: 'try/except — 优雅地处理错误',
      content: `## try/except：给代码装上"安全气囊"

程序运行时可能会出错——用户输入了字母而不是数字、文件不存在、网络断了……\`try/except\` 让程序不至于"崩溃"，而是优雅地处理这些意外。

---

### 基本语法

\`\`\`python
try:
    # 尝试执行——可能出错的代码
    result = 10 / 0
except ZeroDivisionError:
    # 出错了——执行这里
    print("除数不能为零！")
\`\`\`

---

### 完整结构

\`\`\`python
try:
    num = int(input("输入一个数字："))
    print(f"100 ÷ {num} = {100 / num}")
except ValueError:
    print("请输入一个有效的数字！")
except ZeroDivisionError:
    print("除数不能为零！")
except Exception as e:
    print(f"未知错误：{e}")
else:
    print("没有发生任何错误，太好了！")
finally:
    print("无论对错，我都会执行。")
\`\`\`

---

### 各部分的含义

| 块 | 何时执行 |
|----|---------|
| \`try\` | 总是先执行 |
| \`except\` | try 里出了对应的错才执行 |
| \`else\` | try 里没出错才执行（可选） |
| \`finally\` | 不管出不出错，最后一定执行（可选） |

> 💡 捕获具体的异常类型（如 \`ValueError\`），不要用 \`except:\` 裸捕获——那会吞掉所有错误，包括你打的错字。`,
      starterCode: `def safe_divide(a: float, b: float) -> str:
    """安全除法——输入任意值都不会崩"""
    try:
        result = a / b
        return f"{a} ÷ {b} = {result:.2f}"
    except ZeroDivisionError:
        return f"{a} ÷ {b} = 错误：除数不能为零！"
    except TypeError:
        return f"错误：两个参数都必须是数字！"


def safe_get(items: list, index: int) -> str:
    """安全取值——索引越界也不崩"""
    try:
        return f"items[{index}] = {items[index]}"
    except IndexError:
        return f"items[{index}] = 错误：索引超出范围（列表长度 {len(items)}）"
    except TypeError:
        return f"错误：索引必须是整数！"


# 测试除法
print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide(10, 3))

# 测试取值
fruits = ["苹果", "香蕉", "橘子"]
print(safe_get(fruits, 1))
print(safe_get(fruits, 5))
print(safe_get(fruits, -1))`,
      expectedOutput: `10 ÷ 2 = 5.00
10 ÷ 0 = 错误：除数不能为零！
10 ÷ 3 = 3.33
items[1] = 香蕉
items[5] = 错误：索引超出范围（列表长度 3）
items[-1] = 橘子`,
      hint: '一个 try 可以跟多个 except——Python 按顺序匹配，找到第一个匹配的就执行，后面的忽略',
    },
    {
      id: '12.2',
      kind: 'demo',
      chapterId: 'ch12',
      title: '常见异常类型 + 自定义异常',
      content: `## Python 内置的异常家族

Python 的异常类型是一个**继承层级**，了解它们能帮你写出更精确的错误处理。

---

### 常见异常速查表

| 异常类型 | 触发条件 | 示例 |
|---------|---------|------|
| \`ValueError\` | 值不对 | \`int("abc")\` |
| \`TypeError\` | 类型不对 | \`"a" + 1\` |
| \`IndexError\` | 列表索引越界 | \`[1,2][5]\` |
| \`KeyError\` | 字典键不存在 | \`{}.get("x")\` → 不抛，\`{}["x"]\` → 抛 |
| \`FileNotFoundError\` | 文件不存在 | \`open("nope.txt")\` |
| \`ZeroDivisionError\` | 除以零 | \`1 / 0\` |
| \`AttributeError\` | 属性/方法不存在 | \`"hello".non_exist()\` |
| \`ImportError\` | 模块导入失败 | \`import not_a_module\` |

---

### 异常层级简图

\`\`\`
BaseException
 └── Exception          ← 几乎所有异常的父类
      ├── ValueError
      ├── TypeError
      ├── IndexError
      ├── KeyError
      ├── OSError
      │    └── FileNotFoundError
      └── RuntimeError
\`\`\`

---

### 自定义异常

当内置异常不够精确时，创建你自己的：

\`\`\`python
class InsufficientFundsError(Exception):
    """余额不足异常"""
    def __init__(self, balance: float, amount: float):
        self.balance = balance
        self.amount = amount
        super().__init__(f"余额不足：当前 {balance}，需要 {amount}")

# 使用
raise InsufficientFundsError(100, 500)
\`\`\``,
      starterCode: `# 自定义异常
class InvalidAgeError(ValueError):
    """年龄不合法异常"""
    pass

class UnderageError(Exception):
    """未成年人异常"""
    def __init__(self, age: int):
        self.age = age
        super().__init__(f"未满 18 岁（当前 {age} 岁）")


def register(name: str, age: int) -> str:
    """注册用户——年龄必须在 0~150 之间，且满 18 岁"""
    if age < 0 or age > 150:
        raise InvalidAgeError(f"年龄 {age} 不合法，须在 0~150 之间")
    if age < 18:
        raise UnderageError(age)
    return f"✅ {name}（{age}岁）注册成功！"


# 测试
test_cases = [("张三", 25), ("李四", -5), ("王五", 16), ("赵六", 30)]

for name, age in test_cases:
    try:
        print(register(name, age))
    except InvalidAgeError as e:
        print(f"❌ {name} — 年龄不合法：{e}")
    except UnderageError as e:
        print(f"❌ {name} — 未成年：{e}")`,
      expectedOutput: `✅ 张三（25岁）注册成功！
❌ 李四 — 年龄不合法：年龄 -5 不合法，须在 0~150 之间
❌ 王五 — 未成年：未满 18 岁（当前 16 岁）
✅ 赵六（30岁）注册成功！`,
      hint: '自定义异常类继承自 Exception（或它的子类），体现代码的业务语义，比用"魔术数字"清晰一百倍',
    },
    {
      id: '12.3',
      kind: 'demo',
      chapterId: 'ch12',
      title: 'print 调试法 + pdb 入门',
      content: `## 调试：找 bug 的艺术

"我的代码不工作"——这是每个程序员最常说的话。调试就是在代码里找线索、定位问题。

---

### 方法一：print 大法（最常用！）

最简单也最实用——在可疑的地方插入 \`print()\` 看变量值：

\`\`\`python
def calculate(a, b):
    print(f"DEBUG: a={a}, b={b}")   # 看输入
    result = a * b + (a - b)
    print(f"DEBUG: result={result}")  # 看中间结果
    return result
\`\`\`

> 💡 **80% 的 bug 用 print 就够了**。别觉得它"不专业"——实用才是王道。

---

### 方法二：pdb（Python Debugger）

当 print 不够时，pdb 让你**逐行执行**代码，随时检查变量：

\`\`\`python
import pdb

def buggy_function(a, b):
    pdb.set_trace()   # 程序在这里暂停，进入交互模式
    return a / b
\`\`\`

常用 pdb 命令：

| 命令 | 作用 |
|------|------|
| \`n\` (next) | 执行下一行 |
| \`s\` (step) | 进入函数内部 |
| \`c\` (continue) | 继续执行直到下一个断点 |
| \`p 变量\` | 打印变量的值 |
| \`l\` (list) | 显示当前代码位置 |
| \`q\` (quit) | 退出调试 |

---

### 方法三：日志（logging）

正式项目中用 \`logging\` 模块代替 print：

\`\`\`python
import logging
logging.basicConfig(level=logging.DEBUG)

logging.debug("详细调试信息")
logging.info("一般信息")
logging.warning("警告")
logging.error("错误")
\`\`\``,
      starterCode: `# 调试实战：修复"找最大值"的 bug
# 下面这个函数有个 bug——你能通过 print 找到吗？

def find_max(numbers: list[int]) -> int | None:  # Python 3.10+ 语法:
    """返回列表中的最大值，空列表返回 None"""
    if not numbers:
        return None

    max_val = 0          # <-- BUG 在这里！应该用 numbers[0]
    for n in numbers:
        print(f"  [DEBUG] 当前值={n}, 当前最大={max_val}")  # print 调试
        if n > max_val:
            max_val = n

    return max_val


def find_max_fixed(numbers: list[int]) -> int | None:
    """修复后的版本"""
    if not numbers:
        return None

    max_val = numbers[0]    # 用第一个元素初始化
    for n in numbers:
        if n > max_val:
            max_val = n

    return max_val


# 测试：全是负数的情况
test = [-5, -2, -10, -1, -8]
print(f"有 bug 的版本：find_max({test}) = {find_max(test)}")
print()
print(f"修复后的版本：find_max_fixed({test}) = {find_max_fixed(test)}")
print()
print("💡 看到了吗？max_val 初始化为 0，但列表全是负数！")
print("   这就是典型的初始化错误——print 能帮你一眼发现。")`,
      expectedOutput: `  [DEBUG] 当前值=-5, 当前最大=0
  [DEBUG] 当前值=-2, 当前最大=0
  [DEBUG] 当前值=-10, 当前最大=0
  [DEBUG] 当前值=-1, 当前最大=0
  [DEBUG] 当前值=-8, 当前最大=0
有 bug 的版本：find_max([-5, -2, -10, -1, -8]) = 0

修复后的版本：find_max_fixed([-5, -2, -10, -1, -8]) = -1

💡 看到了吗？max_val 初始化为 0，但列表全是负数！
   这就是典型的初始化错误——print 能帮你一眼发现。`,
      hint: 'print 调试的核心：在关键步骤前后打印变量值，观察数据流是否和预期一致。简单的办法往往最有效',
    },
    {
      id: '12.4',
      kind: 'demo',
      chapterId: 'ch12',
      title: 'with 语句与上下文管理器',
      content: `## with 语句：资源管理的"自动开关"

你已经用过 \`with open(...) as f:\`——离开 with 块时文件自动关闭。这就是**上下文管理器**。

---

### with 的本质

\`\`\`python
with open("data.txt") as f:
    content = f.read()
# 到这里文件已自动关闭——即使中间出了异常！
\`\`\`

等价于：

\`\`\`python
f = open("data.txt")
try:
    content = f.read()
finally:
    f.close()           # with 帮你省了这行
\`\`\`

---

### 不止文件——任何资源都可以用 with

\`\`\`python
import threading
lock = threading.Lock()

with lock:               # 自动获取和释放锁
    # 临界区代码
    pass
\`\`\`

---

### 自定义上下文管理器

\`\`\`python
class Timer:
    """测量代码执行时间"""
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, *args):
        self.elapsed = time.time() - self.start
        print(f"耗时：{self.elapsed:.3f}秒")

with Timer():
    sum(range(1000000))      # 自动计时
# 耗时：0.042秒
\`\`\`

---

### 关键方法

| 方法 | 时机 |
|------|------|
| \`__enter__\` | 进入 with 块时调用 |
| \`__exit__\` | 离开 with 块时调用（即使有异常） |`,
      starterCode: `import time

class Timer:
    """计时器上下文管理器"""

    def __enter__(self):
        self.start = time.time()
        print("⏱️ 开始计时...")
        return self

    def __exit__(self, *args):
        elapsed = time.time() - self.start
        print(f"⏱️ 结束——耗时 {elapsed:.4f} 秒")


# 使用自定义上下文管理器
with Timer():
    total = 0
    for i in range(1_000_000):
        total += i
    print(f"  计算结果：{total}")

print("\\nwith 块已结束，资源自动清理")

# 模拟文件操作的 with
class FileSimulator:
    def __enter__(self):
        print("📂 打开文件")
        return self

    def __exit__(self, *args):
        print("📂 关闭文件（自动！）")

with FileSimulator() as f:
    print("  📝 读写文件...")`,
      expectedOutput: `⏱️ 开始计时...
  计算结果：499999500000
⏱️ 结束——耗时 **实际时间（每次不同）**

with 块已结束，资源自动清理
📂 打开文件
  📝 读写文件...
📂 关闭文件（自动！）`,
      hint: '__enter__ 在进入 with 时调用，__exit__ 在离开时调用——即使出异常也会调用 __exit__，保证资源释放',
      validation: pythonWithTimerValidation,
    },
    {
      id: '12.5',
      kind: 'demo',
      chapterId: 'ch12',
      title: 'logging 模块入门 — 替代 print 调试',
      content: `## logging：专业的日志系统

当项目变大，\`print()\` 调试就不够用了——你需要能开关、分级别、输出到文件的**日志系统**。

---

### 快速开始

\`\`\`python
import logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s'
)

logging.debug("调试信息")    # 不会显示（级别不够）
logging.info("程序启动")     # 会显示
logging.warning("警告！")    # 会显示
logging.error("出错了！")    # 会显示
\`\`\`

---

### 日志级别（从低到高）

| 级别 | 用途 | 数值 |
|------|------|------|
| DEBUG | 详细调试信息 | 10 |
| INFO | 一般运行信息 | 20 |
| WARNING | 警告（默认级别） | 30 |
| ERROR | 错误 | 40 |
| CRITICAL | 严重错误 | 50 |

设置 \`level=logging.INFO\` → DEBUG 不显示，INFO 及以上显示。

---

### 输出到文件

\`\`\`python
logging.basicConfig(
    filename='app.log',
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s'
)
\`\`\`

---

### logging vs print

| | print | logging |
|------|-------|---------|
| 开关 | 需要注释/删除代码 | 改 level 一行搞定 |
| 输出位置 | 只能终端 | 终端、文件、网络… |
| 格式 | 手动拼接 | 自动加时间、级别 |
| 适用 | 临时调试 | 生产环境 |`,
      starterCode: `import logging
import sys

# 配置日志：INFO 级别，带时间戳
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s | %(levelname)-7s | %(message)s',
    datefmt='%H:%M:%S',
    stream=sys.stdout
)

# 模拟一个程序的不同阶段
logging.info("程序启动")
logging.debug("加载配置...")      # 不会显示（级别不够）

def process_data(items):
    logging.info(f"开始处理 {len(items)} 条数据")
    for i, item in enumerate(items):
        logging.debug(f"  处理第 {i+1} 条：{item}")
    logging.info("处理完成")

try:
    process_data(["A", "B", "C"])
    # 模拟一个警告
    logging.warning("内存使用超过 80%")
except Exception as e:
    logging.error(f"发生错误：{e}")

logging.info("程序结束")`,
      expectedOutput: `12:00:00 | INFO    | 程序启动
12:00:00 | INFO    | 开始处理 3 条数据
12:00:00 | INFO    | 处理完成
12:00:00 | WARNING | 内存使用超过 80%
12:00:00 | INFO    | 程序结束`,
      hint: 'logging 最大的好处：一行 level 配置就能控制所有日志的显隐。调试时设 DEBUG，上线后设 WARNING，不用改任何代码',
      validation: pythonLoggingValidation,
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch12a — 测试基础（5 节）
// ─────────────────────────────────────────────────────────────
const ch12a: Chapter = {
  id: 'ch12a',
  title: '测试基础',
  description: '学会用 pytest 写测试、用 assert 验证、用 fixtures 管理数据——写出可靠的 Python 代码',
  sections: [
    {
      id: '12a.1',
      kind: 'demo',
      chapterId: 'ch12a',
      title: '为什么要写测试？',
      content: `## 为什么要写测试？

---

### 没有测试的痛苦

你改了一行代码，然后5个地方崩了——却不知道是哪里引起的。这就是没有测试的日常。

---

### 测试的三大好处

1. **防止回归**：改了代码，测试告诉你有没有破坏原有功能
2. **活文档**：测试比注释更可信——它描述了代码实际的行为
3. **设计反馈**：如果很难写测试，说明代码设计有问题

---

### 手动测试 vs 自动测试

\`\`\`python
# 手动测试——每次改代码都要重新在终端试
print(add(1, 2))  # 3？看起来对了...
print(add(-1, 1)) # 0？嗯...

# 自动测试——运行一次验证所有情况
def test_add():
    assert add(1, 2) == 3
    assert add(-1, 1) == 0
    assert add(0, 0) == 0
\`\`\`

手动测试效率低、容易漏、不可重复。**自动测试让你有底气重构代码**。

---

### 测试金字塔

\`\`\`
       / E2E \\         ← 少量端到端测试
      / 集成测试 \\      ← 中等数量
     /   单元测试   \\    ← 大量单元测试（快速、稳定）
\`\`\`

初学阶段专注于**单元测试**——测试单个函数的行为。`,
      starterCode: `# 没有测试的代码 vs 有测试的代码

# 假设这是一个"付款计算"函数
def calculate_total(price, quantity, discount=0):
    """计算总价"""
    subtotal = price * quantity
    if discount > 0:
        subtotal = subtotal * (1 - discount)
    return subtotal

# 手动测试——每次都要目视检查
print("=== 手动测试 ===")
print(f"正常：{calculate_total(100, 2)}")      # 期望 200
print(f"折扣：{calculate_total(100, 2, 0.1)}") # 期望 180
print(f"零数量：{calculate_total(100, 0)}")     # 期望 0
print(f"大折扣：{calculate_total(100, 1, 0.5)}")# 期望 50

print("\\n💡 上面是手动测试——每次改代码都要重新目视检查")
print("   自动测试 = 把这些验证写成代码，一键运行！")`,
      expectedOutput: `=== 手动测试 ===
正常：200
折扣：180.0
零数量：0
大折扣：50.0

💡 上面是手动测试——每次改代码都要重新目视检查
   自动测试 = 把这些验证写成代码，一键运行！`,
      hint: '想象你有一个按钮，按下后 3 秒内验证所有功能是否正常——那就是自动测试的威力',
    },
    {
      id: '12a.2',
      kind: 'demo',
      chapterId: 'ch12a',
      title: 'assert 语句入门',
      content: `## assert：Python 内置的"断言"

\`assert\` 是最简单的测试工具——如果条件为 False，就抛出 AssertionError。

---

### 基本语法

\`\`\`python
assert 条件, "可选的错误信息"

assert 2 + 2 == 4           # ✅ 什么都不发生
assert 2 + 2 == 5           # ❌ AssertionError
assert 2 + 2 == 5, "数学崩了！"  # ❌ AssertionError: 数学崩了！
\`\`\`

---

### 用 assert 做单元测试

\`\`\`python
def add(a, b):
    return a + b

# 测试
assert add(1, 2) == 3
assert add(-1, 1) == 0
assert add(0, 0) == 0
assert add(1.5, 2.5) == 4.0
print("所有测试通过！✅")
\`\`\`

---

### assert vs if/raise

\`\`\`python
# assert——用于"这绝不应该出错"的检查
assert len(items) > 0, "列表不应该为空"

# if/raise——用于"用户可能输入错误"的检查
if amount < 0:
    raise ValueError("金额不能为负")
\`\`\`

- \`assert\` 用于**开发者错误**（bug），可被 \`-O\` 优化模式禁用
- \`raise\` 用于**运行时错误**（用户输入），不应该被禁用

---

### 注意

\`assert\` 可以用 \`python -O\` 禁用！生产环境不要依赖 assert 做数据验证。`,
      starterCode: `# assert 基础
print("=== assert 示例 ===\\n")

# 测试工具函数
def double(x):
    return x * 2

def is_even(n):
    return n % 2 == 0

# 断言测试
try:
    assert double(5) == 10, "double(5) 应该等于 10"
    print("✅ double(5) == 10 通过")
    
    assert double(0) == 0, "double(0) 应该等于 0"
    print("✅ double(0) == 0 通过")
    
    assert is_even(4), "4 应该是偶数"
    print("✅ is_even(4) 通过")
    
    assert not is_even(7), "7 不应该是偶数"
    print("✅ not is_even(7) 通过")
    
    # 这个会失败
    assert double(3) == 7, "double(3) 不等于 7！"
    print("这行不会执行")
    
except AssertionError as e:
    print(f"❌ 断言失败：{e}")

print("\\n💡 assert 就像代码里的'安全检查点'——")
print("   如果某个条件必须为真，就用 assert 明确表达")`,
      expectedOutput: `=== assert 示例 ===

✅ double(5) == 10 通过
✅ double(0) == 0 通过
✅ is_even(4) 通过
✅ not is_even(7) 通过
❌ 断言失败：double(3) 不等于 7！

💡 assert 就像代码里的'安全检查点'——
   如果某个条件必须为真，就用 assert 明确表达`,
      hint: 'assert 是最轻量的测试方式——不需要安装任何库。但正式项目建议用 pytest，它提供更丰富的断言信息',
    },
    {
      id: '12a.3',
      kind: 'demo',
      chapterId: 'ch12a',
      title: 'pytest 安装与第一个测试',
      content: `## pytest：Python 最流行的测试框架

\`pip install pytest\` 安装后，写测试就像写普通函数——函数名以 \`test_\` 开头即可。

---

### 第一个 pytest 测试

\`\`\`python
# test_math.py
def add(a, b):
    return a + b

def test_add():
    assert add(1, 2) == 3
    assert add(-1, 1) == 0
    assert add(0.1, 0.2) == 0.3  # 浮点数陷阱！

def test_add_strings():
    assert add("hello ", "world") == "hello world"

def test_add_lists():
    assert add([1, 2], [3, 4]) == [1, 2, 3, 4]
\`\`\`

运行：\`pytest test_math.py -v\`

---

### pytest 命名约定

| 对象 | 命名规则 |
|------|---------|
| 测试文件 | \`test_*.py\` 或 \`*_test.py\` |
| 测试函数 | \`test_*\` 开头 |
| 测试类 | \`Test*\` 开头 |

---

### pytest vs 手动 assert

\`\`\`python
# 手动：报错信息不清晰
assert add(1, 2) == 4
# AssertionError（不知道 add(1, 2) 实际是多少）

# pytest：自动显示实际值 vs 期望值
# > assert 3 == 4
# E   assert 3 == 4
\`\`\`

pytest 会**自动分析**断言失败的原因，给出丰富的对比信息。`,
      starterCode: `# 模拟 pytest 风格的测试（不用安装 pytest 也能理解概念）

def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        raise ValueError("除数不能为零")
    return a / b

# pytest 风格：每个测试函数独立
def test_add_positive():
    assert add(1, 2) == 3

def test_add_negative():
    assert add(-1, -1) == -2

def test_add_zero():
    assert add(5, 0) == 5

def test_divide_normal():
    assert divide(10, 2) == 5.0

def test_divide_by_zero():
    try:
        divide(10, 0)
        assert False, "应该抛出 ValueError"
    except ValueError as e:
        assert str(e) == "除数不能为零"

# 运行所有测试
tests = [
    ("正数相加", test_add_positive),
    ("负数相加", test_add_negative),
    ("加零", test_add_zero),
    ("正常除法", test_divide_normal),
    ("除以零", test_divide_by_zero),
]

passed = 0
for name, test_func in tests:
    try:
        test_func()
        print(f"✅ {name} 通过")
        passed += 1
    except AssertionError as e:
        print(f"❌ {name} 失败：{e}")

print(f"\\n{passed}/{len(tests)} 个测试通过")`,
      expectedOutput: `✅ 正数相加 通过
✅ 负数相加 通过
✅ 加零 通过
✅ 正常除法 通过
✅ 除以零 通过

5/5 个测试通过`,
      hint: 'pytest 不需要继承任何类、不需要任何装饰器——只要函数名以 test_ 开头就行。这是 Python "约定优于配置"的体现',
    },
    {
      id: '12a.4',
      kind: 'demo',
      chapterId: 'ch12a',
      title: 'pytest fixtures 与参数化',
      content: `## pytest fixtures 与参数化

---

### fixtures：准备测试数据

当多个测试需要相同的数据时，用 fixture 避免重复：

\`\`\`python
import pytest

@pytest.fixture
def sample_students():
    """准备测试用的学生数据"""
    return [
        {"name": "小明", "score": 92},
        {"name": "小红", "score": 88},
        {"name": "小刚", "score": 75},
    ]

def test_top_student(sample_students):
    best = max(sample_students, key=lambda s: s["score"])
    assert best["name"] == "小明"

def test_average(sample_students):
    avg = sum(s["score"] for s in sample_students) / len(sample_students)
    assert avg == 85.0
\`\`\`

---

### 参数化：一组数据跑同一个测试

\`\`\`python
@pytest.mark.parametrize("a,b,expected", [
    (1, 2, 3),
    (-1, 1, 0),
    (0, 0, 0),
    (100, 200, 300),
])
def test_add(a, b, expected):
    assert a + b == expected
\`\`\`
一个测试函数跑 4 次！每次用不同的输入。

---

### 为什么要参数化？

\`\`\`python
# ❌ 重复代码
def test_add_1_2(): assert add(1, 2) == 3
def test_add_neg(): assert add(-1, 1) == 0
def test_add_zero(): assert add(0, 0) == 0

# ✅ 参数化——优雅！
@pytest.mark.parametrize("a,b,expected", [(1,2,3), (-1,1,0), (0,0,0)])
def test_add(a, b, expected):
    assert add(a, b) == expected
\`\`\``,
      starterCode: `# 模拟 pytest fixtures 和参数化

# fixture 概念：共享的测试数据
def create_sample_data():
    """模拟 fixture——准备测试数据"""
    return [
        {"name": "小明", "score": 92},
        {"name": "小红", "score": 88},
        {"name": "小刚", "score": 75},
    ]

def get_top_student(students):
    return max(students, key=lambda s: s["score"])

def get_average(students):
    return sum(s["score"] for s in students) / len(students)

# 参数化概念：同一个测试跑多次
test_cases = [
    (1, 2, 3),
    (-1, 1, 0),
    (0, 0, 0),
    (100, 200, 300),
    (-5, -3, -8),
]

print("=== 参数化测试 ===")
for a, b, expected in test_cases:
    result = a + b
    status = "✅" if result == expected else "❌"
    print(f"  {status} {a} + {b} = {result}（期望 {expected}）")

# 使用 fixture 数据
print("\\n=== 使用 fixture 数据 ===")
data = create_sample_data()
best = get_top_student(data)
avg = get_average(data)
assert best["name"] == "小明", f"最高分应该是小明，实际是{best['name']}"
assert avg == 85.0, f"平均分应该是85，实际是{avg}"
print(f"  ✅ 最高分：{best['name']} ({best['score']}分)")
print(f"  ✅ 平均分：{avg:.1f}")`,
      expectedOutput: `=== 参数化测试 ===
  ✅ 1 + 2 = 3（期望 3）
  ✅ -1 + 1 = 0（期望 0）
  ✅ 0 + 0 = 0（期望 0）
  ✅ 100 + 200 = 300（期望 300）
  ✅ -5 + -3 = -8（期望 -8）

=== 使用 fixture 数据 ===
  ✅ 最高分：小明 (92分)
  ✅ 平均分：85.0`,
      hint: '参数化的精髓：用数据驱动测试，而不是写一大堆相似的测试函数。加一个测试用例只需加一行数据',
    },
    {
      id: '12a.5',
      kind: 'demo',
      chapterId: 'ch12a',
      title: '测试异常 — pytest.raises',
      content: `## 测试异常：验证"应该出错"的情况

好的测试不光验证"正常情况"，还要验证"异常情况真的会抛异常"。

---

### pytest.raises

\`\`\`python
import pytest

def divide(a, b):
    if b == 0:
        raise ValueError("除数不能为零")
    return a / b

def test_divide_by_zero():
    with pytest.raises(ValueError, match="除数不能为零"):
        divide(10, 0)
\`\`\`

\`pytest.raises\` 确保代码块抛出了指定类型的异常，且异常信息匹配。

---

### 验证"不抛异常"

\`\`\`python
def test_divide_normal():
    # 正常情况不应该抛异常
    result = divide(10, 2)
    assert result == 5.0
\`\`\`

---

### 手动版本（不用 pytest）

\`\`\`python
def test_divide_by_zero_manual():
    try:
        divide(10, 0)
        assert False, "应该抛出 ValueError！"
    except ValueError as e:
        assert str(e) == "除数不能为零"
\`\`\`

---

### 测试异常的检查清单

1. ✅ 验证抛出了**正确的异常类型**
2. ✅ 验证**异常信息**符合预期
3. ✅ 验证异常在**正确的时机**抛出`,
      starterCode: `# 模拟 pytest.raises 的功能
def assert_raises(expected_exception, match_text=None):
    """手动版的 pytest.raises 上下文管理器"""
    class RaisesContext:
        def __enter__(self):
            return self
        
        def __exit__(self, exc_type, exc_val, exc_tb):
            if exc_type is None:
                raise AssertionError(f"期望抛出 {expected_exception.__name__}，但没有异常发生")
            if not issubclass(exc_type, expected_exception):
                raise AssertionError(
                    f"期望 {expected_exception.__name__}，实际 {exc_type.__name__}"
                )
            if match_text and match_text not in str(exc_val):
                raise AssertionError(
                    f"异常信息不匹配：期望包含 '{match_text}'，实际 '{exc_val}'"
                )
            return True  # 吞掉异常
    return RaisesContext()

# ─── 测试 ───
def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError("取款金额必须为正数")
    if amount > balance:
        raise ValueError(f"余额不足（余额¥{balance}，取款¥{amount}）")
    return balance - amount

print("=== 测试异常 ===\\n")

# 正常情况
result = withdraw(100, 50)
assert result == 50
print(f"✅ 正常取款：余额 100，取 50 → 余额 {result}")

# 金额为负
try:
    with assert_raises(ValueError, "必须为正数"):
        withdraw(100, -10)
    print("✅ 负数金额：正确抛出 ValueError")
except AssertionError as e:
    print(f"❌ {e}")

# 余额不足
try:
    with assert_raises(ValueError, "余额不足"):
        withdraw(50, 100)
    print("✅ 余额不足：正确抛出 ValueError")
except AssertionError as e:
    print(f"❌ {e}")

# 不应该抛异常的情况——验证没抛
try:
    result = withdraw(100, 30)
    print(f"✅ 正常取款30：余额变为 {result}（没有异常）")
except Exception as e:
    print(f"❌ 不应该抛异常，但抛了 {type(e).__name__}")`,
      expectedOutput: `=== 测试异常 ===

✅ 正常取款：余额 100，取 50 → 余额 50
✅ 负数金额：正确抛出 ValueError
✅ 余额不足：正确抛出 ValueError
✅ 正常取款30：余额变为 70（没有异常）`,
      hint: '测试异常时，不仅要验证"抛了异常"，还要验证"抛了正确的异常"和"正确的信息"。错误的异常类型本身就是 bug',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch12b — 正则表达式（6 节）
// ─────────────────────────────────────────────────────────────
const ch12b: Chapter = {
  id: 'ch12b',
  title: '正则表达式',
  description: '掌握正则表达式：字符类、量词、分组、re 模块——文本处理的终极武器',
  sections: [
    {
      id: '12b.1',
      kind: 'demo',
      chapterId: 'ch12b',
      title: '正则表达式是什么？',
      content: `## 正则表达式：文本匹配的"搜索语言"

正则表达式（RegEx）是一种**描述文本模式**的语法，用来在字符串中查找、提取、替换特定格式的内容。

---

### 不需要正则 vs 需要正则

\`\`\`python
# 简单匹配——字符串方法就够了
"hello".startswith("he")     # True
"abc@email.com".find("@")    # 5

# 复杂匹配——需要正则
# "从文本中找出所有电话号码"
# "验证邮箱格式是否正确"
# "提取 HTML 中所有的链接"
\`\`\`

---

### 第一个正则

\`\`\`python
import re
pattern = r"\\d{3}-\\d{4}-\\d{4}"  # 匹配 138-1234-5678 格式
text = "我的电话是 138-1234-5678，有事联系"
match = re.search(pattern, text)
print(match.group())  # 138-1234-5678
\`\`\`

---

### 正则 = 字符类 + 量词 + 分组

三个核心概念：
- **字符类**：匹配什么字符（数字、字母、空格…）
- **量词**：匹配多少个（1个、多个、0个…）
- **分组**：把匹配内容"提取"出来

---

### 为什么用 r"..."？

正则里 \`\\\` 很多，\`r"..."\`（原始字符串）让 \`\\\` 不被 Python 当成转义符：

\`\`\`python
"\\\\d"    # Python 先解释 \\\\ → \\，正则引擎收到 \\d
r"\\d"     # 直接给正则引擎 \\d ✅
\`\`\``,
      starterCode: `import re

# 没有正则的生活
text = "联系我：138-1234-5678 或 139-8765-4321"
print("原始文本：", text)
print()

# 用字符串方法找电话号码——很难！
print("=== 字符串方法 vs 正则 ===\\n")

# 字符串方法：只能做简单匹配
if "@" in text:
    print("字符串方法：找到 @")
else:
    print("字符串方法：没找到 @（无法识别电话号码）")

# 正则：精确匹配电话号码格式
pattern = r"\\d{3}-\\d{4}-\\d{4}"
matches = re.findall(pattern, text)
print(f"正则方法：找到 {len(matches)} 个电话号码")
for phone in matches:
    print(f"  📞 {phone}")

# 验证邮箱格式
email_pattern = r"\\w+@\\w+\\.\\w+"
test_emails = ["test@example.com", "not_an_email", "a@b.c"]
print("\\n=== 邮箱验证 ===")
for email in test_emails:
    if re.match(email_pattern, email):
        print(f"  ✅ {email}")
    else:
        print(f"  ❌ {email}")`,
      expectedOutput: `原始文本： 联系我：138-1234-5678 或 139-8765-4321

=== 字符串方法 vs 正则 ===

字符串方法：没找到 @（无法识别电话号码）
正则方法：找到 2 个电话号码
  📞 138-1234-5678
  📞 139-8765-4321

=== 邮箱验证 ===
  ✅ test@example.com
  ❌ not_an_email
  ✅ a@b.c`,
      hint: '正则表达式是一门"微型编程语言"——学会它，处理文本的能力会上一个大台阶。r"..." 是写正则的标准做法',
    },
    {
      id: '12b.2',
      kind: 'exercise',
      chapterId: 'ch12b',
      title: '基本匹配 — 字符类 \\d \\w \\s .',
      content: `## 字符类：匹配特定类型的字符

正则使用**转义序列**来表示某一类字符：

---

### 常用字符类

| 符号 | 匹配 | 例子 |
|------|------|------|
| \`\\d\` | 数字 0-9 | \`\\d{3}\` → "138" |
| \`\\w\` | 字母/数字/下划线 | \`\\w+\` → "hello_123" |
| \`\\s\` | 空白（空格/Tab/换行）| \`a\\sb\` → "a b" |
| \`.\` | **任意字符**（除换行）| \`a.b\` → "a你b" |
| \`\\D\` | 非数字 | \`\\D+\` → "abc" |
| \`\\W\` | 非字母数字 | \`\\W\` → "@" |
| \`\\S\` | 非空白 | \`\\S+\` → "hello" |

---

### 自定义字符类：[...]

\`\`\`python
[aeiou]     # 匹配任意一个元音字母
[a-z]       # 匹配任意一个小写字母
[A-Za-z]    # 匹配任意一个字母（不分大小写）
[0-9a-f]    # 匹配十六进制数字
[^0-9]      # 匹配非数字（^ 在开头表示"非"）
\`\`\`

---

### 锚点：匹配位置

| 符号 | 含义 |
|------|------|
| \`^\` | 字符串开头 |
| \`$\` | 字符串结尾 |
| \`\\b\` | 单词边界 |

\`\`\`python
r"^\\d{3}"    # 以 3 个数字开头
r"\\d{3}$"    # 以 3 个数字结尾
r"\\bcat\\b"   # 完整单词 "cat"（不匹配 "catch"）
\`\`\``,
      starterCode: `import re

text = "我的账号是 user_123，注册于 2025年，邮箱 admin@test.com"

print("原文：", text)
print()

# \\d — 数字
print("\\\\d（数字）：", re.findall(r"\\d+", text))

# \\w — 单词字符
print("\\\\w（单词）：", re.findall(r"\\w+", text))

# \\s — 空白分割
print("\\\\s（空白分割）：", re.split(r"\\s+", text.strip()))

# 自定义字符类
print("\\n自定义字符类：")
print("  [a-z]+：", re.findall(r"[a-z]+", text))
print("  [0-9a-f]+：", re.findall(r"[0-9a-f]+", text))

# 锚点
print("\\n锚点：")
lines = ["123abc", "abc123", "123", "abc"]
for line in lines:
    if re.match(r"^\\d+", line):
        print(f"  以数字开头：'{line}'")
    if re.search(r"\\d+$", line):
        print(f"  以数字结尾：'{line}'")

# . 匹配任意字符
print("\\n点号匹配：", re.findall(r"u.e", "use u_e u1e u你e"))`,
      expectedOutput: `原文： 我的账号是 user_123，注册于 2025年，邮箱 admin@test.com

\d（数字）： ['123', '2025']
\w（单词）： ['我的账号是', 'user_123', '注册于', '2025年', '邮箱', 'admin', 'test', 'com']
\s（空白分割）： ['我的账号是', 'user_123，注册于', '2025年，邮箱', 'admin@test.com']

自定义字符类：
  [a-z]+： ['user', 'admin', 'test', 'com']
  [0-9a-f]+： ['e', '123', '2025', 'ad', 'e', 'c']

锚点：
  以数字开头：'123abc'
  以数字结尾：'abc123'
  以数字开头：'123'
  以数字结尾：'123'

点号匹配： ['use', 'u_e', 'u1e', 'u你e']`,
      hint: '\\d \\w \\s 是正则三剑客——分别匹配数字、单词、空白。记熟这三个，就掌握了 60% 的正则使用场景',
    },
    {
      id: '12b.3',
      kind: 'demo',
      chapterId: 'ch12b',
      title: '量词 — * + ? {n,m}',
      content: `## 量词：控制匹配次数

字符类说"匹配什么"，量词说"匹配几个"。

---

### 常用量词

| 量词 | 含义 | 例子 |
|------|------|------|
| \`*\` | 0 次或多次 | \`a*\` → "", "a", "aaa" |
| \`+\` | 1 次或多次 | \`a+\` → "a", "aaa"（不匹配空） |
| \`?\` | 0 次或 1 次 | \`a?\` → "", "a" |
| \`{n}\` | 恰好 n 次 | \`\\d{3}\` → "123" |
| \`{n,}\` | 至少 n 次 | \`\\d{2,}\` → "12", "12345" |
| \`{n,m}\` | n 到 m 次 | \`\\d{2,4}\` → "12", "123", "1234" |

---

### 贪婪 vs 非贪婪

默认**贪婪**：尽可能多匹配。加 \`?\` 变非贪婪：

\`\`\`python
text = "<h1>标题</h1><p>正文</p>"

re.findall(r"<.*>", text)     # ['<h1>标题</h1><p>正文</p>'] 贪婪
re.findall(r"<.*?>", text)    # ['<h1>', '</h1>', '<p>', '</p>'] 非贪婪
\`\`\`

---

### 量词搭配字符类

\`\`\`python
r"\\d+"          # 一个或多个数字 → "12345"
r"\\w{3,8}"      # 3-8 个单词字符 → "hello"
r"\\s*"          # 零个或多个空白
r"[a-z]{2,4}"   # 2-4 个小写字母
\`\`\``,
      starterCode: `import re

text = "ID: 00123, 价格: 99, 数量: 1500, 电话: 13812345678"

print("原文：", text)
print()

# 量词演示
print("\\\\d+（至少1个数字）：", re.findall(r"\\d+", text))
print("\\\\d{3}（恰好3个）：  ", re.findall(r"\\d{3}", text))
print("\\\\d{2,4}（2-4个）：  ", re.findall(r"\\d{2,4}", text))
print("\\\\d{4,}（至少4个）： ", re.findall(r"\\d{4,}", text))

# 量词用于字符
print()
text2 = "color colour colouur"
print("文本：", text2)
print("colou?r：", re.findall(r"colou?r", text2))    # u 可选
print("colou*r：", re.findall(r"colou*r", text2))    # u 0到多次  
print("colou+r：", re.findall(r"colou+r", text2))    # u 1到多次

# 贪婪 vs 非贪婪
print()
html = "<div>内容A</div><span>内容B</span>"
print("HTML：", html)
print("贪婪 <.*>： ", re.findall(r"<.*>", html)[0])
print("非贪婪 <.*?>：", re.findall(r"<.*?>", html))

# 实用：提取价格
print()
prices = "商品A ¥299，商品B ¥149，商品C ¥1299"
amounts = re.findall(r"¥(\\d+)", prices)
print(f"价格列表：{amounts}")
print(f"总价：{sum(int(p) for p in amounts)}")`,
      expectedOutput: `原文： ID: 00123, 价格: 99, 数量: 1500, 电话: 13812345678

\\d+（至少1个数字）： ['00123', '99', '1500', '13812345678']
\\d{3}（恰好3个）：   ['001', '150', '138', '123', '456']
\\d{2,4}（2-4个）：   ['0012', '99', '1500', '1381', '2345', '678']
\\d{4,}（至少4个）：  ['00123', '1500', '13812345678']

文本： color colour colouur
colou?r： ['color', 'colour']
colou*r： ['color', 'colour', 'colouur']
colou+r： ['colour', 'colouur']

HTML： <div>内容A</div><span>内容B</span>
贪婪 <.*>：  <div>内容A</div><span>内容B</span>
非贪婪 <.*?>： ['<div>', '</div>', '<span>', '</span>']

价格列表：['299', '149', '1299']
总价：1747`,
      hint: '贪婪是默认行为——非贪婪加 ? 后缀。记住：在量词 * + ? {} 后面再加一个 ?，就变成非贪婪模式',
    },
    {
      id: '12b.4',
      kind: 'demo',
      chapterId: 'ch12b',
      title: '分组与捕获 — ()',
      content: `## 分组与捕获：( )

用括号 \`()\` 把正则的一部分"分组"，匹配后可以单独提取。

---

### 基本分组

\`\`\`python
# 电话号码：区号-号码
pattern = r"(\\d{3})-(\\d{4})-(\\d{4})"
match = re.search(pattern, "138-1234-5678")
match.group()     # "138-1234-5678"（全部）
match.group(1)    # "138"（第一组）
match.group(2)    # "1234"（第二组）
match.group(3)    # "5678"（第三组）
\`\`\`

---

### 命名分组

\`\`\`python
# 给分组起名字
pattern = r"(?P<area>\\d{3})-(?P<mid>\\d{4})-(?P<last>\\d{4})"
match = re.search(pattern, "138-1234-5678")
match.group("area")   # "138"
match.group("mid")    # "1234"
\`\`\`

---

### 非捕获分组

\`\`\`python
# (?:...) 分组但不捕获——节省内存
r"(?:http|https)://(.*)"  # 只捕获域名，不捕获协议
\`\`\`

---

### 或运算：|

\`\`\`python
r"cat|dog"          # 匹配 "cat" 或 "dog"
r"https?://"        # 匹配 "http://" 或 "https://"
r"(红|黄|蓝)色"     # 匹配 "红色"、"黄色"、"蓝色"
\`\`\``,
      starterCode: `import re

# 电话号码分组提取
phone_pattern = r"(\\d{3})-(\\d{4})-(\\d{4})"
text = "客服：400-1234-5678，销售：139-8765-4321"

print("=== 分组提取电话号码 ===")
for match in re.finditer(phone_pattern, text):
    print(f"  完整号码：{match.group()}")
    print(f"    区号：{match.group(1)}")
    print(f"    中间：{match.group(2)}")
    print(f"    末尾：{match.group(3)}")

# 命名分组提取日期
print("\\n=== 命名分组提取日期 ===")
date_text = "日期：2025-01-15 至 2025-06-30"
date_pattern = r"(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})"
for match in re.finditer(date_pattern, date_text):
    y, m, d = match.group("year"), match.group("month"), match.group("day")
    print(f"  {y}年{m}月{d}日")

# 非捕获分组
print("\\n=== 非捕获分组 ===")
urls = "http://example.com 和 https://test.org"
# 捕获域名，协议不捕获
pattern = r"(?:https?://)([\\w.]+)"
domains = re.findall(pattern, urls)
print(f"  域名：{domains}")

# 或运算
print("\\n=== 或运算 ===")
color_text = "红色 蓝色 绿色 黄色"
colors = re.findall(r"(红|蓝|黄)色", color_text)
print(f"  匹配的颜色：{colors}")`,
      expectedOutput: `=== 分组提取电话号码 ===
  完整号码：400-1234-5678
    区号：400
    中间：1234
    末尾：5678
  完整号码：139-8765-4321
    区号：139
    中间：8765
    末尾：4321

=== 命名分组提取日期 ===
  2025年01月15日
  2025年06月30日

=== 非捕获分组 ===
  域名：['example.com', 'test.org']

=== 或运算 ===
  匹配的颜色：['红', '蓝', '黄']`,
      hint: '分组让你从"找到了什么"升级到"把找到的东西拆开用"——提取电话号码的区号、日期的年月日，全靠分组',
    },
    {
      id: '12b.5',
      kind: 'demo',
      chapterId: 'ch12b',
      title: 're 模块 — search/match/findall/sub',
      content: `## re 模块：Python 的正则工具箱

---

### 四大核心函数

| 函数 | 作用 | 返回值 |
|------|------|--------|
| \`re.search()\` | 在字符串中**搜索**第一个匹配 | Match 对象或 None |
| \`re.match()\` | 从字符串**开头**匹配 | Match 对象或 None |
| \`re.findall()\` | 找到**所有**匹配 | 字符串列表 |
| \`re.sub()\` | 查找并**替换** | 新字符串 |

---

### search vs match

\`\`\`python
text = "abc123"
re.search(r"\\d+", text)    # ✅ 找到 "123"（在中间）
re.match(r"\\d+", text)     # ❌ None（不在开头！）
re.match(r"\\w+", text)     # ✅ "abc123"（在开头）
\`\`\`
\`match\` 只在字符串**开头**匹配，\`search\` 在整个字符串里搜索。

---

### findall vs finditer

\`\`\`python
text = "a1 b2 c3"
re.findall(r"\\d", text)         # ['1', '2', '3']（字符串列表）

for match in re.finditer(r"\\d", text):  # Match 对象迭代器
    print(match.group(), match.start())   # 可以获得位置
\`\`\`

---

### sub：正则替换

\`\`\`python
# 屏蔽电话号码中间四位
text = "电话：138-1234-5678"
re.sub(r"(\\d{3})-(\\d{4})-(\\d{4})", r"\\1-****-\\3", text)
# "电话：138-****-5678"
\`\`\`

\`\\1\`、\`\\2\` 引用分组内容。`,
      starterCode: `import re

text = "价格：¥299、¥149、¥1299。日期：2025-01-15。电话：138-1234-5678"

# search — 找第一个
match = re.search(r"¥\\d+", text)
print(f"search：{match.group()}（位置 {match.start()}-{match.end()}）")

# match — 从开头匹配
print(f"match '价格'：{re.match(r'价格', text) is not None}")
print(f"match '¥'：   {re.match(r'¥', text) is not None}")

# findall — 找所有
print(f"\\nfindall 所有价格：{re.findall(r'¥(\\d+)', text)}")
print(f"findall 所有数字：{re.findall(r'\\d+', text)}")

# finditer — 迭代所有匹配（含位置信息）
print("\\nfinditer 价格及位置：")
for m in re.finditer(r"¥(\\d+)", text):
    print(f"  ¥{m.group(1)} 在位置 {m.start()}-{m.end()}")

# sub — 替换
masked = re.sub(r"(\\d{3})-(\\d{4})-(\\d{4})", r"\\1-****-\\3", text)
print(f"\\nsub 电话脱敏：{masked}")

# sub 替换价格
cleaned = re.sub(r"¥\\d+", "[价格已隐藏]", text)
print(f"sub 隐藏价格：{cleaned}")`,
      expectedOutput: `search：¥299（位置 3-7）
match '价格'：True
match '¥'：   False

findall 所有价格：['299', '149', '1299']
findall 所有数字：['299', '149', '1299', '2025', '01', '15', '138', '1234', '5678']

finditer 价格及位置：
  ¥299 在位置 3-7
  ¥149 在位置 8-12
  ¥1299 在位置 13-18

sub 电话脱敏：价格：¥299、¥149、¥1299。日期：2025-01-15。电话：138-****-5678
sub 隐藏价格：价格：[价格已隐藏]、[价格已隐藏]、[价格已隐藏]。日期：2025-01-15。电话：138-1234-5678`,
      hint: 're.sub 的替换字符串中，\\1 \\2 引用分组、\\g<name> 引用命名分组。这是数据脱敏、格式转换的利器',
    },
    {
      id: '12b.6',
      kind: 'demo',
      chapterId: 'ch12b',
      title: '实践 — 电话号码/邮箱提取器',
      content: `## 实践：构建电话号码和邮箱提取器

综合运用正则，从一段文本中提取所有电话号码和邮箱地址。

---

### 电话号码模式

\`\`\`python
# 中国手机号：1 开头，第二位 3-9，共 11 位
phone_pattern = r"1[3-9]\\d{9}"

# 带分隔符：138-1234-5678 或 138 1234 5678
phone_pattern2 = r"1[3-9]\\d[-\\s]?\\d{4}[-\\s]?\\d{4}"
\`\`\`

---

### 邮箱模式

\`\`\`python
# 基本邮箱：用户名@域名.后缀
email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"
\`\`\`

---

### 完整提取器

\`\`\`python
def extract_contacts(text):
    phones = re.findall(phone_pattern, text)
    emails = re.findall(email_pattern, text)
    return {"phones": phones, "emails": emails}
\`\`\`

---

### 正则学习建议

1. 从简单开始，逐步添加复杂度
2. 用 re.findall 快速测试模式
3. 利用在线工具（regex101.com）可视化
4. 记住：**正则写得越复杂，越难维护**——能用字符串方法就不用正则`,
      starterCode: `import re

# 实践：从文本中提取联系方式
sample_text = """
联系人信息：
- 张三，电话：13812345678，邮箱：zhangsan@example.com
- 李四，电话：139-8765-4321，邮箱：lisi@test.org
- 王五，电话：150 1234 5678，邮箱：wangwu_2025@company.cn
- 技术支持：400-1234-5678
- 无效号码：12345678901（第二位不是3-9）
"""

print("📄 原始文本：")
print(sample_text)

# 手机号：1[3-9] 开头，后面 9 位数字，可能带分隔符
phone_pattern = r"1[3-9]\\d[-\\s]?\\d{4}[-\\s]?\\d{4}"
# 邮箱
email_pattern = r"[\\w.+-]+@[\\w-]+\\.[\\w.]+"

# 提取
phones = re.findall(phone_pattern, sample_text)
emails = re.findall(email_pattern, sample_text)

print("=" * 50)
print("📊 提取结果：")
print(f"\\n📞 电话号码（{len(phones)}个）：")
for phone in phones:
    clean = re.sub(r"[-\\s]", "", phone)  # 去掉分隔符
    print(f"  {phone} → 纯数字：{clean}")

print(f"\\n📧 邮箱地址（{len(emails)}个）：")
for email in emails:
    parts = email.split("@")
    print(f"  {email}")
    print(f"    用户名：{parts[0]}，域名：{parts[1]}")

# 数据脱敏
print(f"\\n🔒 脱敏后：")
masked = re.sub(phone_pattern, "[手机号已隐藏]", sample_text)
masked = re.sub(email_pattern, "[邮箱已隐藏]", masked)
print(masked.strip())`,
      expectedOutput: `📄 原始文本：

联系人信息：
- 张三，电话：13812345678，邮箱：zhangsan@example.com
- 李四，电话：139-8765-4321，邮箱：lisi@test.org
- 王五，电话：150 1234 5678，邮箱：wangwu_2025@company.cn
- 技术支持：400-1234-5678
- 无效号码：12345678901（第二位不是3-9）

==================================================
📊 提取结果：

📞 电话号码（3个）：
  13812345678 → 纯数字：13812345678
  139-8765-4321 → 纯数字：13987654321
  150 1234 5678 → 纯数字：15012345678

📧 邮箱地址（3个）：
  zhangsan@example.com
    用户名：zhangsan，域名：example.com
  lisi@test.org
    用户名：lisi，域名：test.org
  wangwu_2025@company.cn
    用户名：wangwu_2025，域名：company.cn

🔒 脱敏后：
联系人信息：
- 张三，电话：[手机号已隐藏]，邮箱：[邮箱已隐藏]
- 李四，电话：[手机号已隐藏]，邮箱：[邮箱已隐藏]
- 王五，电话：[手机号已隐藏]，邮箱：[邮箱已隐藏]
- 技术支持：400-1234-5678
- 无效号码：12345678901（第二位不是3-9）`,
      hint: '这个提取器可以直接用于实际项目——从网页、文档、邮件中批量提取联系方式。正则 + re.sub = 数据脱敏利器',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch12c — 命令行与日志（4 节）
// ─────────────────────────────────────────────────────────────
const ch12c: Chapter = {
  id: 'ch12c',
  title: '命令行与日志',
  description: '构建专业的 CLI 工具：argparse 参数解析、logging 日志系统——让脚本像专业软件',
  sections: [
    {
      id: '12c.1',
      kind: 'demo',
      chapterId: 'ch12c',
      title: 'sys.argv — 读取命令行参数',
      content: `## sys.argv：命令行参数的入口

\`sys.argv\` 是一个列表，包含了运行脚本时传入的所有参数。

---

### 基本用法

\`\`\`bash
python script.py hello world 42
\`\`\`

\`\`\`python
import sys
print(sys.argv)
# ['script.py', 'hello', 'world', '42']
\`\`\`

- \`sys.argv[0]\` — 脚本文件名
- \`sys.argv[1]\` — 第一个参数
- \`sys.argv[2]\` — 第二个参数
- ……

---

### 简单 CLI 脚本

\`\`\`python
import sys

def main():
    if len(sys.argv) < 2:
        print("用法：python script.py <名字>")
        return
    
    name = sys.argv[1]
    count = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    for _ in range(count):
        print(f"你好，{name}！")

if __name__ == "__main__":
    main()
\`\`\`

---

### sys.argv 的局限性

- 参数位置固定——用户必须按顺序输入
- 无法优雅处理 \`--name\` \`--count\` 这样的命名参数
- 类型转换要手动处理
- 帮助信息要自己写

→ 这就是为什么需要 **argparse**。`,
      starterCode: `import sys

# 保存原始 argv
orig_argv = sys.argv.copy()

# 模拟不同的命令行调用
def simulate_cli(args):
    sys.argv = args
    print(f"$ python {' '.join(args[1:])}")
    
    if len(sys.argv) < 2:
        print("⚠️ 用法：python script.py <操作> [参数...]")
        print("   操作：greet <名字> [次数]")
        print("   操作：calc <数字> <数字> <运算符>")
        return
    
    command = sys.argv[1]
    
    if command == "greet":
        name = sys.argv[2] if len(sys.argv) > 2 else "世界"
        count = int(sys.argv[3]) if len(sys.argv) > 3 else 1
        for _ in range(count):
            print(f"  你好，{name}！")
    
    elif command == "calc":
        if len(sys.argv) < 5:
            print("⚠️ calc 需要：数字1 数字2 运算符")
            return
        a, b, op = float(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
        ops = {"+": a+b, "-": a-b, "*": a*b, "/": a/b if b else "错误"}
        print(f"  {a} {op} {b} = {ops.get(op, '不支持的运算')}")
    
    else:
        print(f"❌ 未知操作：{command}")

# 模拟调用
simulate_cli(["script.py", "greet", "小明", "3"])
print()
simulate_cli(["script.py", "calc", "10", "3", "+"])
print()
simulate_cli(["script.py"])
print()
print(f"\\n原始 argv 已恢复：{orig_argv}")`,
      expectedOutput: `$ python greet 小明 3
  你好，小明！
  你好，小明！
  你好，小明！

$ python calc 10 3 +
  10.0 + 3.0 = 13.0

$ python 
⚠️ 用法：python script.py <操作> [参数...]
   操作：greet <名字> [次数]
   操作：calc <数字> <数字> <运算符>


原始 argv 已恢复：['/path/to/script.py']`,
      hint: 'sys.argv 是最基本的 CLI 方式——适合简单脚本。一旦参数多了，就该升级到 argparse',
      validation: {
        mode: 'dynamic_lines',
        outputRules: [
          { type: 'exact', value: '$ python greet 小明 3' },
          { type: 'exact', value: '  你好，小明！' },
          { type: 'exact', value: '  你好，小明！' },
          { type: 'exact', value: '  你好，小明！' },
          { type: 'exact', value: '' },
          { type: 'exact', value: '$ python calc 10 3 +' },
          { type: 'exact', value: '  10.0 + 3.0 = 13.0' },
          { type: 'exact', value: '' },
          { type: 'exact', value: '$ python ' },
          { type: 'exact', value: '⚠️ 用法：python script.py <操作> [参数...]' },
          { type: 'exact', value: '   操作：greet <名字> [次数]' },
          { type: 'exact', value: '   操作：calc <数字> <数字> <运算符>' },
          { type: 'exact', value: '' },
          { type: 'exact', value: '' },
          { type: 'regex', value: '^原始 argv 已恢复：\\[' },
        ]
      }
    },
    {
      id: '12c.2',
      kind: 'demo',
      chapterId: 'ch12c',
      title: 'argparse 模块入门',
      content: `## argparse：专业的命令行参数解析

argparse 自动帮你解析参数、生成帮助信息、验证类型。

---

### 最小例子

\`\`\`python
import argparse

parser = argparse.ArgumentParser(description="问候程序")
parser.add_argument("name", help="你的名字")
parser.add_argument("-c", "--count", type=int, default=1, help="问候次数")
parser.add_argument("-l", "--loud", action="store_true", help="大声模式")

args = parser.parse_args()
greeting = f"你好，{args.name}！"
if args.loud:
    greeting = greeting.upper()
for _ in range(args.count):
    print(greeting)
\`\`\`

\`\`\`bash
python greet.py 小明 -c 3 --loud
# 你好，小明！
# 你好，小明！
# 你好，小明！
\`\`\`

---

### 参数类型

| 参数 | 说明 | 示例 |
|------|------|------|
| 位置参数 | 必须按顺序提供 | \`name\` |
| 可选参数 | \`-\` 或 \`--\` 前缀 | \`-c\`, \`--count\` |
| flag | \`action="store_true"\` | \`--verbose\` |
| 带默认值 | \`default=...\` | \`default=1\` |
| 带类型 | \`type=int\` | 自动转换 |

---

### 自动帮助

argparse 自动生成 \`--help\`：
\`\`\`
usage: greet.py [-h] [-c COUNT] [-l] name

问候程序

positional arguments:
  name                  你的名字

optional arguments:
  -h, --help            show this help message
  -c COUNT, --count COUNT  问候次数
  -l, --loud            大声模式
\`\`\``,
      starterCode: `import argparse
import sys

# 使用 argparse 构建 CLI（模拟）
print("=== argparse CLI 工具演示 ===\\n")

# 模拟 argparse 的行为
def parse_args(argv):
    """模拟 argparse 解析"""
    args = {"count": 1, "loud": False, "output": None}
    i = 1
    while i < len(argv):
        if argv[i] in ("-c", "--count"):
            args["count"] = int(argv[i+1])
            i += 2
        elif argv[i] in ("-l", "--loud"):
            args["loud"] = True
            i += 1
        elif argv[i] == "-o":
            args["output"] = argv[i+1]
            i += 2
        elif argv[i] in ("-h", "--help"):
            print("usage: tool.py <输入文件> [-c COUNT] [-l] [-o 输出文件]")
            print()
            print("文件处理工具")
            print()
            print("位置参数：")
            print("  输入文件          要处理的文件路径")
            print()
            print("可选参数：")
            print("  -h, --help        显示帮助")
            print("  -c, --count COUNT  处理次数（默认1）")
            print("  -l, --loud         详细输出模式")
            print("  -o, --output FILE  输出文件路径")
            return None
        elif not argv[i].startswith("-"):
            args["input"] = argv[i]
            i += 1
        else:
            i += 1
    return args

# 测试各种调用
def run_tool(argv):
    print(f"$ python tool.py {' '.join(argv[1:])}")
    args = parse_args(argv)
    if args is None:
        print()
        return
    print(f"  解析结果：{args}")
    print()

run_tool(["tool.py", "data.txt", "-c", "3", "--loud"])
run_tool(["tool.py", "data.txt", "-o", "output.txt"])
run_tool(["tool.py", "--help"])`,
      expectedOutput: `=== argparse CLI 工具演示 ===

$ python tool.py data.txt -c 3 --loud
  解析结果：{'count': 3, 'loud': True, 'output': None, 'input': 'data.txt'}

$ python tool.py data.txt -o output.txt
  解析结果：{'count': 1, 'loud': False, 'output': 'output.txt', 'input': 'data.txt'}

$ python tool.py --help
usage: tool.py <输入文件> [-c COUNT] [-l] [-o 输出文件]

文件处理工具

位置参数：
  输入文件          要处理的文件路径

可选参数：
  -h, --help        显示帮助
  -c, --count COUNT  处理次数（默认1）
  -l, --loud         详细输出模式
  -o, --output FILE  输出文件路径
`,
      hint: 'argparse 的核心价值：自动生成 --help、自动验证类型、自动报错。用户用 --help 就能了解你的工具怎么用',
    },
    {
      id: '12c.3',
      kind: 'exercise',
      chapterId: 'ch12c',
      title: 'logging 模块 — 为什么不用 print 调试',
      content: `## logging：生产级的日志系统

在 CLI 工具中使用 logging 替代 print，让输出可控、可分级别。

---

### 快速配置

\`\`\`python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)-7s] %(message)s",
    datefmt="%H:%M:%S",
)

logging.info("程序启动")
logging.warning("磁盘空间不足")
logging.error("处理失败")
\`\`\`

---

### CLI 工具中的日志最佳实践

\`\`\`python
# -v 增加详细程度，-q 减少
def setup_logging(verbose=0):
    levels = [logging.WARNING, logging.INFO, logging.DEBUG]
    level = levels[min(verbose, len(levels)-1)]
    logging.basicConfig(level=level, format="%(message)s")

# --verbose: INFO, -vv: DEBUG, 默认: WARNING
\`\`\`

---

### 日志 vs print

| | print | logging |
|------|-------|---------|
| 开关 | 注释/删代码 | 改 level |
| 输出 | 只能 stdout | stdout + 文件 + 网络 |
| 格式 | 手动拼接 | 自动时间戳 |
| 适用 | 临时调试 | **CLI 工具和长期项目** |

---

### CLI 日志模式

\`\`\`python
# 结果 → print（用户要看的）
print("处理完成：3 个文件")

# 诊断 → logging（开发者要看的）
logging.info("读取 data.txt…")
logging.debug(f"解析第 {i} 行：{line}")
\`\`\``,
      starterCode: `import logging
import sys

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-7s | %(message)s",
    datefmt="%H:%M:%S",
    stream=sys.stdout,
)

# CLI 工具：用 print 输出结果，用 logging 输出诊断
print("=" * 40)
print("📁 文件处理工具 v1.0")
print("=" * 40)

def process_file(filepath, verbose=False):
    """处理文件——print 给用户，logging 给开发者"""
    logging.info(f"开始处理：{filepath}")
    
    # 模拟文件处理
    lines = ["第一行数据", "第二行数据", "第三行数据"]
    logging.debug(f"读取了 {len(lines)} 行")
    
    results = []
    for i, line in enumerate(lines, 1):
        logging.debug(f"  处理第 {i} 行...")
        # 模拟处理
        processed = line.upper()
        results.append(processed)
        if verbose:
            print(f"  [{i}] {line} → {processed}")
    
    logging.info(f"处理完成，共 {len(results)} 行")
    
    # 最终结果用 print
    print(f"\\n✅ 成功处理 {filepath}")
    print(f"   共 {len(results)} 行，输出 {sum(len(r) for r in results)} 字符")
    
    return results

# 模拟不同详细级别
print("\\n--- 默认模式（INFO）---")
process_file("data.txt")

# 调整为 DEBUG 级别
print("\\n--- 调试模式（DEBUG）---")
logging.getLogger().setLevel(logging.DEBUG)
process_file("debug.txt", verbose=True)

print("\\n💡 观察：INFO 模式安静，DEBUG 模式显示详细诊断")`,
      expectedOutput: `========================================
📁 文件处理工具 v1.0
========================================

--- 默认模式（INFO）---
12:00:00 | INFO    | 开始处理：data.txt
12:00:00 | INFO    | 处理完成，共 3 行

✅ 成功处理 data.txt
   共 3 行，输出 15 字符

--- 调试模式（DEBUG）---
12:00:00 | INFO    | 开始处理：debug.txt
12:00:00 | DEBUG   | 读取了 3 行
12:00:00 | DEBUG   |   处理第 1 行...
12:00:00 | DEBUG   |   处理第 2 行...
12:00:00 | DEBUG   |   处理第 3 行...
12:00:00 | INFO    | 处理完成，共 3 行
  [1] 第一行数据 → 第一行数据
  [2] 第二行数据 → 第二行数据
  [3] 第三行数据 → 第三行数据

✅ 成功处理 debug.txt
   共 3 行，输出 15 字符

💡 观察：INFO 模式安静，DEBUG 模式显示详细诊断`,
      hint: 'CLI 工具的金科玉律：用户关心的结果用 print（如"处理完成"），开发者关心的诊断用 logging（如"读取了 3 行"）',
      validation: {
        mode: 'dynamic_lines',
        outputRules: [
          { type: 'exact', value: '========================================' },
          { type: 'exact', value: '📁 文件处理工具 v1.0' },
          { type: 'exact', value: '========================================' },
          { type: 'exact', value: '' },
          { type: 'exact', value: '--- 默认模式（INFO）---' },
          { type: 'regex', value: '^\\d{2}:\\d{2}:\\d{2} \\| INFO\\s+\\| 开始处理：data\\.txt$' },
          { type: 'regex', value: '^\\d{2}:\\d{2}:\\d{2} \\| INFO\\s+\\| 处理完成，共 3 行$' },
          { type: 'exact', value: '' },
          { type: 'exact', value: '✅ 成功处理 data.txt' },
          { type: 'exact', value: '   共 3 行，输出 15 字符' },
          { type: 'exact', value: '' },
          { type: 'exact', value: '--- 调试模式（DEBUG）---' },
          { type: 'regex', value: '^\\d{2}:\\d{2}:\\d{2} \\| INFO\\s+\\| 开始处理：debug\\.txt$' },
          { type: 'regex', value: '^\\d{2}:\\d{2}:\\d{2} \\| DEBUG\\s+\\| 读取了 3 行$' },
          { type: 'regex', value: '^\\d{2}:\\d{2}:\\d{2} \\| DEBUG\\s+\\|   处理第 1 行\\.\\.\\.$' },
          { type: 'regex', value: '^\\d{2}:\\d{2}:\\d{2} \\| DEBUG\\s+\\|   处理第 2 行\\.\\.\\.$' },
          { type: 'regex', value: '^\\d{2}:\\d{2}:\\d{2} \\| DEBUG\\s+\\|   处理第 3 行\\.\\.\\.$' },
          { type: 'regex', value: '^\\d{2}:\\d{2}:\\d{2} \\| INFO\\s+\\| 处理完成，共 3 行$' },
          { type: 'exact', value: '  [1] 第一行数据 → 第一行数据' },
          { type: 'exact', value: '  [2] 第二行数据 → 第二行数据' },
          { type: 'exact', value: '  [3] 第三行数据 → 第三行数据' },
          { type: 'exact', value: '' },
          { type: 'exact', value: '✅ 成功处理 debug.txt' },
          { type: 'exact', value: '   共 3 行，输出 15 字符' },
          { type: 'exact', value: '' },
          { type: 'exact', value: '💡 观察：INFO 模式安静，DEBUG 模式显示详细诊断' }
        ]
      }
    },
    {
      id: '12c.4',
      kind: 'demo',
      chapterId: 'ch12c',
      title: '实践 — 构建 CLI 文件处理工具',
      content: `## 实践：构建一个 CLI 文件处理工具

综合运用 argparse + logging + 文件操作，做一个实用的命令行工具。

---

### 功能需求

一个"文本统计工具"：
1. 接收文件路径作为输入
2. 统计行数、单词数、字符数
3. 支持 \`--verbose\` 详细输出
4. 支持 \`-o\` 输出结果到文件
5. 使用 logging 记录诊断信息

---

### 架构

\`\`\`python
# text_stats.py
import argparse
import logging
import sys

def count_stats(text):
    return {
        "chars": len(text),
        "words": len(text.split()),
        "lines": text.count("\\n") + 1
    }

def main():
    parser = argparse.ArgumentParser(description="文本统计工具")
    parser.add_argument("file", help="要统计的文件路径")
    parser.add_argument("-o", "--output", help="输出结果到文件")
    parser.add_argument("-v", "--verbose", action="store_true", help="详细输出")
    args = parser.parse_args()
    
    # 设置日志级别
    level = logging.DEBUG if args.verbose else logging.INFO
    logging.basicConfig(level=level, format="%(message)s")
    
    # 读取 + 统计 + 输出
    with open(args.file, encoding="utf-8") as f:
        text = f.read()
    
    stats = count_stats(text)
    report = f"行数={stats['lines']} 单词={stats['words']} 字符={stats['chars']}"
    print(report)
    
    if args.output:
        with open(args.output, "w") as f:
            f.write(report)
        logging.info(f"报告已保存到 {args.output}")

if __name__ == "__main__":
    main()
\`\`\``,
      starterCode: `# CLI 文件统计工具——完整实现
import os
import sys
from datetime import datetime

def count_stats(text):
    """统计文本的行数、单词数、字符数"""
    return {
        "chars": len(text),
        "words": len(text.split()),
        "lines": text.count("\\n") + (1 if text else 0),
    }

# 模拟命令行参数解析
def run_stats_tool(file_content, output_path=None, verbose=False):
    """模拟 CLI 工具运行"""
    
    # 统计
    stats = count_stats(file_content)
    
    # 生成报告
    report_lines = [
        "=" * 40,
        "📊 文本统计报告",
        "=" * 40,
        f"生成时间：2026-01-15 10:30:00  # 固定时间（实际应用中用datetime.now()）",
        f"行数：{stats['lines']}",
        f"单词数：{stats['words']}",
        f"字符数：{stats['chars']}",
        f"平均每行单词：{stats['words'] / max(stats['lines'], 1):.1f}",
        "=" * 40,
    ]
    
    report = "\\n".join(report_lines)
    print(report)
    
    # 详细模式额外信息
    if verbose:
        print(f"\\n🔍 详细诊断：")
        print(f"  原始字节数：{len(file_content.encode('utf-8'))}")
        print(f"  空行数：{sum(1 for line in file_content.split(chr(10)) if not line.strip())}")
        print(f"  最长行：{max(len(line) for line in file_content.split(chr(10)))} 字符")
    
    # 输出到文件
    if output_path:
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(report)
        print(f"\\n💾 报告已保存到：{output_path}")

# 示例文本
sample_text = """Python 是一门优雅的编程语言
它强调代码可读性
用缩进来组织代码块
内置了丰富的数据结构
非常适合初学者和专业开发者"""

print("📁 CLI 文件统计工具\\n")

# 基本模式
print("--- 基本模式 ---")
run_stats_tool(sample_text)

# 详细模式 + 输出到文件
print("\\n--- 详细模式 + 输出到文件 ---")
run_stats_tool(sample_text, output_path="report.txt", verbose=True)

# 验证输出文件
if os.path.exists("report.txt"):
    print(f"\\n📄 report.txt 已创建：{os.path.getsize('report.txt')} 字节")`,
      expectedOutput: `📁 CLI 文件统计工具

--- 基本模式 ---
========================================
📊 文本统计报告
========================================
生成时间：2026-01-15 10:30:00  # 固定时间（实际应用中用datetime.now()）
行数：5
单词数：6
字符数：61
平均每行单词：1.2
========================================

--- 详细模式 + 输出到文件 ---
========================================
📊 文本统计报告
========================================
生成时间：2026-01-15 10:30:00  # 固定时间（实际应用中用datetime.now()）
行数：5
单词数：6
字符数：61
平均每行单词：1.2
========================================

🔍 详细诊断：
  原始字节数：161
  空行数：0
  最长行：17 字符

💾 报告已保存到：report.txt

📄 report.txt 已创建：308 字节`,
      hint: '这个工具模板可以直接用于实际项目——换个统计逻辑就能变成任何 CLI 工具。argparse + logging + 文件操作 = CLI 三件套',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  P2 实战项目 — 日志分析脚本（3 节）
// ─────────────────────────────────────────────────────────────
const p2: Chapter = {
  id: 'p2',
  title: '实战项目：日志分析脚本',
  description: '综合运用 Part2 知识，写一个分析服务器日志的脚本：读取、解析、统计、生成报告',
  sections: [
    {
      id: 'p2.1',
      kind: 'demo',
      chapterId: 'p2',
      title: '需求分析 + 读取日志文件',
      content: `## 需求分析：分析什么？

做一个**Web 服务器日志分析脚本**，功能：
1. 读取日志文件
2. 统计访问量最高的 IP
3. 统计 HTTP 状态码分布
4. 统计请求最多的资源路径
5. 生成格式化的分析报告

---

### 日志格式（模拟）

典型的 Nginx/Apache 日志格式：

\`\`\`
192.168.1.1 - - [15/Jan/2025:10:30:00] "GET /index.html HTTP/1.1" 200 5120
192.168.1.2 - - [15/Jan/2025:10:30:01] "POST /api/login HTTP/1.1" 302 0
192.168.1.1 - - [15/Jan/2025:10:30:02] "GET /images/logo.png HTTP/1.1" 200 8192
\`\`\`

---

### 数据结构设计

用**列表装字典**来存储解析后的日志：

\`\`\`python
log_entry = {
    "ip": "192.168.1.1",
    "method": "GET",
    "path": "/index.html",
    "status": 200,
    "size": 5120
}
\`\`\`

---

### 读取日志文件

\`\`\`python
def read_logs(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        return f.readlines()
\`\`\`

然后逐行用 \`split()\` 解析。`,
      starterCode: `# 模拟日志数据
log_lines = [
    '192.168.1.1 - - [15/Jan/2025:10:30:00] "GET /index.html HTTP/1.1" 200 5120',
    '192.168.1.2 - - [15/Jan/2025:10:30:01] "POST /api/login HTTP/1.1" 302 0',
    '192.168.1.1 - - [15/Jan/2025:10:30:02] "GET /images/logo.png HTTP/1.1" 200 8192',
    '192.168.1.3 - - [15/Jan/2025:10:30:03] "GET /index.html HTTP/1.1" 200 5120',
    '192.168.1.2 - - [15/Jan/2025:10:30:04] "GET /api/data HTTP/1.1" 404 0',
    '192.168.1.1 - - [15/Jan/2025:10:30:05] "GET /index.html HTTP/1.1" 200 5120',
    '192.168.1.4 - - [15/Jan/2025:10:30:06] "POST /api/upload HTTP/1.1" 500 0',
]

print(f"📂 读取了 {len(log_lines)} 行日志")
print("\\n前 3 行预览：")
for line in log_lines[:3]:
    print(f"  {line[:80]}...")

# 显示文件元信息
print(f"\\n总字符数：{sum(len(l) for l in log_lines)}")
print(f"平均行长：{sum(len(l) for l in log_lines) // len(log_lines)} 字符")`,
      expectedOutput: `📂 读取了 7 行日志

前 3 行预览：
  192.168.1.1 - - [15/Jan/2025:10:30:00] "GET /index.html HTTP/1.1" 200 5120...
  192.168.1.2 - - [15/Jan/2025:10:30:01] "POST /api/login HTTP/1.1" 302 0...
  192.168.1.1 - - [15/Jan/2025:10:30:02] "GET /images/logo.png HTTP/1.1" 200 8192...

总字符数：742
平均行长：106 字符`,
      hint: '日志分析的第一步永远是"读取"和"了解数据长什么样"——用 len、切片、预览来快速熟悉数据',
    },
    {
      id: 'p2.2',
      kind: 'demo',
      chapterId: 'p2',
      title: '解析日志 + 统计分析',
      content: `## 解析与统计：从文本到洞察

---

### 解析每一行

\`\`\`python
def parse_line(line):
    parts = line.split()
    return {
        "ip": parts[0],
        "method": parts[5].strip('"'),
        "path": parts[6],
        "status": int(parts[8]),
        "size": int(parts[9])
    }
\`\`\`

---

### 用 Counter 做统计

\`\`\`python
from collections import Counter

entries = [parse_line(line) for line in lines]

# IP 访问次数排名
ip_counter = Counter(e["ip"] for e in entries)
top_ips = ip_counter.most_common(3)

# 状态码统计
status_counter = Counter(e["status"] for e in entries)

# 路径访问排名
path_counter = Counter(e["path"] for e in entries)
\`\`\`

\`Counter\` 是 Python 的"计数神器"——自动统计每个元素出现次数，\`.most_common(n)\` 直接取前 n 名。

---

### 其他有用统计

\`\`\`python
# 总流量
total_bytes = sum(e["size"] for e in entries)

# 错误率
error_count = sum(1 for e in entries if e["status"] >= 400)
error_rate = error_count / len(entries) * 100
\`\`\``,
      starterCode: `from collections import Counter

# 模拟解析后的数据
entries = [
    {"ip": "192.168.1.1", "method": "GET", "path": "/index.html", "status": 200, "size": 5120},
    {"ip": "192.168.1.2", "method": "POST", "path": "/api/login", "status": 302, "size": 0},
    {"ip": "192.168.1.1", "method": "GET", "path": "/images/logo.png", "status": 200, "size": 8192},
    {"ip": "192.168.1.3", "method": "GET", "path": "/index.html", "status": 200, "size": 5120},
    {"ip": "192.168.1.2", "method": "GET", "path": "/api/data", "status": 404, "size": 0},
    {"ip": "192.168.1.1", "method": "GET", "path": "/index.html", "status": 200, "size": 5120},
    {"ip": "192.168.1.4", "method": "POST", "path": "/api/upload", "status": 500, "size": 0},
]

# IP 访问排名
ip_counter = Counter(e["ip"] for e in entries)
print("📊 IP 访问排名：")
for ip, count in ip_counter.most_common(3):
    print(f"  {ip} — {count} 次")

# 状态码统计
status_counter = Counter(e["status"] for e in entries)
print(f"\\n📊 状态码分布：")
for code, count in status_counter.most_common():
    label = "✅" if code < 300 else ("⚠️" if code < 400 else "❌")
    print(f"  {label} {code}: {count} 次")

# 路径访问排名
path_counter = Counter(e["path"] for e in entries)
print(f"\\n📊 热门路径 Top 3：")
for path, count in path_counter.most_common(3):
    print(f"  {path} — {count} 次")

# 总流量
total_bytes = sum(e["size"] for e in entries)
print(f"\\n📊 总流量：{total_bytes:,} 字节")`,
      expectedOutput: `📊 IP 访问排名：
  192.168.1.1 — 3 次
  192.168.1.2 — 2 次
  192.168.1.3 — 1 次

📊 状态码分布：
  ✅ 200: 4 次
  ⚠️ 302: 1 次
  ❌ 404: 1 次
  ❌ 500: 1 次

📊 热门路径 Top 3：
  /index.html — 3 次
  /api/login — 1 次
  /images/logo.png — 1 次

📊 总流量：23,552 字节`,
      hint: 'Counter 是 Python 的"统计瑞士军刀"——一行代码就能完成频率统计，.most_common(n) 直接给你排行',
    },
    {
      id: 'p2.3',
      kind: 'exercise',
      chapterId: 'p2',
      title: '生成分析报告',
      content: `## 输出报告：把结果写成文件

---

### 格式化输出到终端

\`\`\`python
def print_report(entries):
    print("=" * 50)
    print("📊 Web 服务器日志分析报告")
    print("=" * 50)
    print(f"总请求数：{len(entries)}")

    # IP 排名
    ip_counter = Counter(e["ip"] for e in entries)
    print("\\n🏆 IP 访问量 Top 5：")
    for ip, count in ip_counter.most_common(5):
        bar = "█" * (count * 2)
        print(f"  {ip:<18} {count:>3} {bar}")
\`\`\`

---

### 写入报告文件

\`\`\`python
def write_report(entries, filepath="report.txt"):
    with open(filepath, "w", encoding="utf-8") as f:
        # 用 print 的 file 参数写入
        print("📊 日志分析报告", file=f)
        print(f"生成时间：{datetime.now()}", file=f)
        # ... 更多内容
\`\`\`

---

### 完整流程

\`\`\`
读取日志 → 逐行解析 → Counter 统计 → 格式化输出 → 写入报告文件
\`\`\`

---

### 知识点总结

| 步骤 | 用到的技能 |
|------|-----------|
| 读取文件 | \`with open()\`、\`readlines()\` |
| 解析文本 | \`split()\`、列表推导式 |
| 统计分析 | \`Counter\`、\`sum()\` |
| 输出报告 | f-string、格式化、写文件 |

> 🎉 恭喜！你已经能写出一个完整的 Python 实用脚本了——从数据采集到分析报告，一条龙搞定。`,
      starterCode: `from collections import Counter
from datetime import datetime

# 模拟数据
entries = [
    {"ip": "192.168.1.1", "method": "GET", "path": "/index.html", "status": 200, "size": 5120},
    {"ip": "192.168.1.2", "method": "POST", "path": "/api/login", "status": 302, "size": 0},
    {"ip": "192.168.1.1", "method": "GET", "path": "/images/logo.png", "status": 200, "size": 8192},
    {"ip": "192.168.1.3", "method": "GET", "path": "/index.html", "status": 200, "size": 5120},
    {"ip": "192.168.1.2", "method": "GET", "path": "/api/data", "status": 404, "size": 0},
    {"ip": "192.168.1.1", "method": "GET", "path": "/index.html", "status": 200, "size": 5120},
    {"ip": "192.168.1.4", "method": "POST", "path": "/api/upload", "status": 500, "size": 0},
]

# 生成报告
print("=" * 50)
print("📊 Web 服务器日志分析报告")
print("=" * 50)
print(f"生成时间：2026-01-15 10:30:00  # 固定时间")
print(f"总请求数：{len(entries)}")
print(f"总流量：{sum(e['size'] for e in entries):,} 字节")

# IP 排名
ip_counter = Counter(e["ip"] for e in entries)
print(f"\\n🏆 IP 访问量 Top 3：")
for ip, count in ip_counter.most_common(3):
    bar = "#" * count
    print(f"  {ip:<18} {count:>3} 次 {bar}")

# 状态码统计
status_counter = Counter(e["status"] for e in entries)
print(f"\\n📋 状态码分布：")
total = len(entries)
for code, count in status_counter.most_common():
    pct = count / total * 100
    print(f"  {code}: {count:>3} 次 ({pct:.1f}%)")

# 保存报告
with open("report.txt", "w", encoding="utf-8") as f:
    f.write(f"日志分析报告\\n")
    f.write(f"总请求：{len(entries)}\\n")
    f.write(f"总流量：{sum(e['size'] for e in entries)} 字节\\n")

print(f"\\n💾 报告已保存到 report.txt")`,
      expectedOutput: `==================================================
📊 Web 服务器日志分析报告
==================================================
生成时间：2025-01-15 10:30:00
总请求数：7
总流量：23,552 字节

🏆 IP 访问量 Top 3：
  192.168.1.1          3 次 ###
  192.168.1.2          2 次 ##
  192.168.1.3          1 次 #

📋 状态码分布：
  200:   4 次 (57.1%)
  302:   1 次 (14.3%)
  404:   1 次 (14.3%)
  500:   1 次 (14.3%)

💾 报告已保存到 report.txt`,
      hint: 'from 数据采集 to 分析报告——这就是 Python 在运维和数据分析领域的典型工作流。Counter + f-string + 文件写入 = 专业报告',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch12d — 迭代器与生成器（4 节）
// ─────────────────────────────────────────────────────────────
const ch12d: Chapter = {
  id: 'ch12d',
  title: '迭代器与生成器',
  description: '理解 Python 的迭代协议，学会用 yield 创建懒序列，写出更省内存的代码',
  sections: [
    {
      id: '12d.1',
      kind: 'demo',
      chapterId: 'ch12d',
      title: '可迭代对象 vs 迭代器',
      content: `## 一切皆可迭代

Python 中 \`for x in y\` 几乎可以遍历任何东西。这背后是**迭代协议**。

---

### 可迭代对象（Iterable）

可以用 \`for\` 遍历的对象都是**可迭代的**：

\`\`\`python
# 这些都是可迭代对象
"Hello"            # 字符串 → 逐个字符
[1, 2, 3]          # 列表 → 逐个元素
(1, 2, 3)          # 元组
{1, 2, 3}          # 集合
{"a": 1, "b": 2}   # 字典 → 遍历键
range(10)          # range

# 检查是否可迭代
from collections.abc import Iterable
print(isinstance([1,2], Iterable))  # True
\`\`\`

---

### for 循环内部发生了什么？

\`\`\`python
# 你写的：
for x in [1, 2, 3]:
    print(x)

# Python 内部做的：
it = iter([1, 2, 3])       # 1. 调用 iter() 拿到迭代器
while True:
    try:
        x = next(it)       # 2. 不断调用 next() 取下一个
        print(x)
    except StopIteration:  # 3. 没有更多元素了
        break
\`\`\`

---

### 为什么需要迭代器？

**节省内存**——迭代器一次只产生一个元素，不把全部数据加载到内存：
- 列表 \`[1, 2, ..., 1000000]\` → 占用大量内存
- 迭代器 \`range(1000000)\` → 几乎不占内存`,
      starterCode: `# 列表 vs 迭代器——看看区别
from collections.abc import Iterable, Iterator

# 列表是可迭代的，但不是迭代器
my_list = [1, 2, 3]
print(f"列表是可迭代？{isinstance(my_list, Iterable)}")
print(f"列表是迭代器？{isinstance(my_list, Iterator)}")

# 用 iter() 从可迭代对象获取迭代器
list_iter = iter(my_list)
print(f"\\n迭代器是可迭代？{isinstance(list_iter, Iterable)}")
print(f"迭代器是迭代器？{isinstance(list_iter, Iterator)}")

# 手动迭代
print(f"\\n手动调用 next():")
print(f"  next = {next(list_iter)}")
print(f"  next = {next(list_iter)}")
print(f"  next = {next(list_iter)}")
# 再调用一次会触发 StopIteration
try:
    next(list_iter)
except StopIteration:
    print(f"  next = StopIteration！（遍历完了）")`,
      expectedOutput: `列表是可迭代？True
列表是迭代器？False

迭代器是可迭代？True
迭代器是迭代器？True

手动调用 next():
  next = 1
  next = 2
  next = 3
  next = StopIteration！（遍历完了）`,
      hint: '迭代器就像一本书的书签——一次记住一个位置，下次从这里继续。而列表就像把整本书摊在地上，每个字都看得见',
    },
    {
      id: '12d.2',
      kind: 'demo',
      chapterId: 'ch12d',
      title: '生成器函数：yield 关键字',
      content: `## 生成器：简单的迭代器

生成器（Generator）是用 \`yield\` 代替 \`return\` 的函数。每次调用 \`next()\` 它从上次停下的地方继续。

---

### yield vs return

\`\`\`python
def count_up_to(n):
    i = 1
    while i <= n:
        yield i          # 产生一个值，但函数没有结束
        i += 1
    # 函数结束时自动触发 StopIteration

# 使用
counter = count_up_to(3)
print(next(counter))  # 1
print(next(counter))  # 2
print(next(counter))  # 3
# print(next(counter))  # StopIteration
\`\`\`

---

### 执行流程

\`\`\`python
def simple_gen():
    print("开始")
    yield 1
    print("又开始了")
    yield 2
    print("结束了")

g = simple_gen()
next(g)  # 打印"开始"，返回 1，暂停
next(g)  # 打印"又开始了"，返回 2，暂停
next(g)  # 打印"结束了"，StopIteration
\`\`\`

---

### 生成器 vs 列表

| | 列表 | 生成器 |
|--|------|--------|
| 存所有元素 | ✅ 是 | ❌ 不存 |
| 可重复遍历 | ✅ 无数次 | ❌ 只能用一次 |
| 内存占用 | 大 | 几乎为零 |
| 用途 | 需要反复读取 | 只需遍历一次 |

> 生成器是"用完即弃"的——遍历完了就没了。想再用？重新调用生成器函数。`,
      starterCode: `# yield 的执行流程演示
def simple_generator():
    print("  [生成器] 第一次 next() —— 从开始到第一个 yield")
    yield "🥚 第一个鸡蛋"
    print("  [生成器] 第二次 next() —— 从第一个 yield 到第二个")
    yield "🥚 第二个鸡蛋"
    print("  [生成器] 第三次 next() —— 没有 yield 了，StopIteration")

print("创建生成器对象...")
gen = simple_generator()

print("\\n调用 next() #1:")
result1 = next(gen)
print(f"  返回：{result1}")

print("\\n调用 next() #2:")
result2 = next(gen)
print(f"  返回：{result2}")

print("\\n调用 next() #3 (会结束):")
try:
    next(gen)
except StopIteration:
    print("  StopIteration —— 生成器已耗尽")`,
      expectedOutput: `创建生成器对象...

调用 next() #1:
  [生成器] 第一次 next() —— 从开始到第一个 yield
  返回：🥚 第一个鸡蛋

调用 next() #2:
  [生成器] 第二次 next() —— 从第一个 yield 到第二个
  返回：🥚 第二个鸡蛋

调用 next() #3 (会结束):
  [生成器] 第三次 next() —— 没有 yield 了，StopIteration
  StopIteration —— 生成器已耗尽`,
      hint: 'yield 就像给函数装了一个"暂停/继续"按钮——每次 next() 从上次暂停的地方继续，直到没有更多 yield',
    },
    {
      id: '12d.3',
      kind: 'exercise',
      chapterId: 'ch12d',
      title: '生成器表达式',
      content: `## 生成器表达式：() 代替 []

列表推导式 \`[x*2 for x in range(10)]\` 会创建完整列表。
生成器表达式 \`(x*2 for x in range(10))\` 只创建迭代器。

---

### 语法对比

\`\`\`python
# 列表推导式——立即算出所有值
squares = [x*x for x in range(1000)]
print(type(squares))  # <class 'list'>
print(sys.getsizeof(squares))  # 很大！

# 生成器表达式——只是"配方"
squares_gen = (x*x for x in range(1000))
print(type(squares_gen))  # <class 'generator'>
print(sys.getsizeof(squares_gen))  # 非常小！
\`\`\`

---

### 什么时候用哪个？

\`\`\`python
# 只需要遍历一次 → 生成器（省内存）
total = sum(x*x for x in range(1000000))

# 需要反复访问 → 列表（存下来）
squares = [x*x for x in range(100)]
for s in squares: ...  # 可以用无数次
\`\`\`

---

### 常见生成器用法

\`\`\`python
# 和 sum/min/max/any/all 配合
sum(x**2 for x in range(10))        # 285
any(x > 5 for x in [1, 3, 5])       # False
all(x > 0 for x in [1, 2, -3])      # False

# 从文件读取——生成器一行一行读
lines = (line.strip() for line in open("file.txt"))
\`\`\`

---

### 动手练习

1. 把 \`gen_squares\` 从列表推导式 \`[...]\` 改成生成器表达式 \`(...)\`，观察内存变化
2. 把 \`total = 0\` 改成用生成器表达式计算平方和`,
      starterCode: `# 列表推导式 vs 生成器表达式
import sys

# 列表推导式：生成全部
list_squares = [x*x for x in range(1000)]
print(f"列表大小：{sys.getsizeof(list_squares):,} 字节")
print(f"前 5 个：{list_squares[:5]}")

# TODO: 把下面的列表推导式改成生成器表达式（把 [] 换成 ()）
gen_squares = [x*x for x in range(1000)]
print(f"\\n生成器大小：{sys.getsizeof(gen_squares)} 字节")
print(f"生成器类型：{type(gen_squares).__name__}")

# 两种方式都可以 for 遍历
print(f"\\n生成器前 5 个：", end=" ")
for i, val in enumerate(gen_squares):
    if i >= 5:
        break
    print(val, end=" ")
print()

# TODO: 用生成器表达式计算 0~9 的平方和（替换 0）
total = 0
print(f"\\nsum(x*x for x in range(10)) = {total}")`,
      expectedOutput: `列表大小：8,856 字节
前 5 个：[0, 1, 4, 9, 16]

生成器大小：208 字节
生成器类型：generator

生成器前 5 个： 0 1 4 9 16 

sum(x*x for x in range(10)) = 285`,
      hint: '生成器表达式用 () 包裹，列表推导式用 []。把 gen_squares 的 [] 改成 ()，内存会从约 8KB 降到约 200 字节。sum 可以直接接收生成器表达式。',
    },
    {
      id: '12d.4',
      kind: 'demo',
      chapterId: 'ch12d',
      title: '实战：用生成器处理大文件',
      content: `## 实战：处理百万行日志

生成器最经典的用途——逐行读取大文件而不把整个文件加载到内存。

---

### 逐行读取

\`\`\`python
def read_large_file(file_path):
    \"\"\"生成器：一行一行读，不加载整个文件\"\"\"
    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            yield line.strip()

# 使用 —— 无论文件多大，内存占用始终很小
for line in read_large_file("huge_log.txt"):
    process(line)  # 处理每一行
\`\`\`

---

### 生成器链

\`\`\`python
# 多个生成器串联，形成"处理流水线"
def filter_errors(lines):
    for line in lines:
        if "ERROR" in line:
            yield line

def extract_time(lines):
    for line in lines:
        yield line.split()[0]  # 假设时间是第一个字段

# 使用
lines = read_large_file("log.txt")
errors = filter_errors(lines)  # 筛选错误行
times = extract_time(errors)   # 提取时间

for t in times:
    print(t)  # 只输出错误日志的时间
\`\`\`

---

### 生成器的三种写法对比

\`\`\`python
# 1. 列表（全部加载，不推荐用于大文件）
[line.strip() for line in f]

# 2. 生成器表达式
(line.strip() for line in f)

# 3. 生成器函数（最灵活）
def clean_lines(f):
    for line in f:
        yield line.strip()
\`\`\`

> 面试题：处理 10GB 的日志文件，如何保证内存不爆炸？
> 答案：生成器 + 流式处理，一次只处理一行！`,
      starterCode: `# 模拟大文件处理 —— 用生成器分步处理
import sys

# 模拟数据
log_lines = [
    "2025-01-15 10:00:00 INFO 服务启动",
    "2025-01-15 10:01:00 ERROR 数据库连接失败",
    "2025-01-15 10:02:00 INFO 重试连接",
    "2025-01-15 10:03:00 ERROR 连接超时",
    "2025-01-15 10:04:00 INFO 服务恢复正常",
]

# 生成器 1：过滤 ERROR 行
def filter_errors(lines):
    for line in lines:
        if "ERROR" in line:
            yield line

# 生成器 2：提取时间
def extract_times(lines):
    for line in lines:
        yield line.split()[0]

# 生成器 3：格式化输出
def format_output(times):
    for t in times:
        yield f"  ⚠️  {t} 发生错误"

# 串联生成器链 —— 零额外内存
error_times = format_output(extract_times(filter_errors(log_lines)))

print("错误日志时间线：")
for item in error_times:
    print(item)

# 对比：如果全部加载到内存
all_errors = [line for line in log_lines if "ERROR" in line]
print(f"\\n列表方式内存消耗：~{sys.getsizeof(all_errors)} 字节")
print(f"生成器方式：只处理不存储，近乎零额外内存")`,
      expectedOutput: `错误日志时间线：
  ⚠️  2025-01-15 发生错误
  ⚠️  2025-01-15 发生错误

列表方式内存消耗：~88 字节
生成器方式：只处理不存储，近乎零额外内存`,
      hint: '生成器链是 Python 中最优雅的设计模式之一——每个生成器只做一件事，组合起来就是强大的处理流水线，且几乎不占内存',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Ch12e — 装饰器入门（4 节）
// ─────────────────────────────────────────────────────────────
const ch12e: Chapter = {
  id: 'ch12e',
  title: '装饰器入门',
  description: '理解 Python 装饰器模式：@语法糖、函数包装器、带参数的装饰器、实际应用场景',
  sections: [
    {
      id: '12e.1',
      kind: 'demo',
      chapterId: 'ch12e',
      title: '函数是一等公民——函数也可以当参数',
      content: `## 函数也是对象

Python 中函数和数字、字符串一样是对象——可以赋值给变量，可以作为参数传递。

---

### 前提：函数是"一等公民"

\`\`\`python
def say_hello(name):
    return f"你好，{name}"

# 1. 把函数赋值给变量
greet = say_hello
print(greet("小明"))  # 你好，小明

# 2. 把函数当作参数传递
def run(func, arg):
    return func(arg)

print(run(say_hello, "小红"))  # 你好，小红

# 3. 在函数里面定义函数
def outer():
    def inner():
        print("我是内部函数")
    inner()
\`\`\`

---

### 为什么需要这个？

**装饰器就是利用"把函数当参数传"和"在函数里定义函数"这两个特性**，在不修改原函数的前提下给它"加点料"。

---

### 热身：一个简单的"日志"包装器

\`\`\`python
def with_logging(func):
    def wrapper(x):
        print(f"[LOG] 调用 {func.__name__}({x})")
        result = func(x)
        print(f"[LOG] 返回 {result}")
        return result
    return wrapper

def double(x):
    return x * 2

# 手动包装
logged_double = with_logging(double)
logged_double(5)  # [LOG] 调用 double(5)
                   # [LOG] 返回 10
\`\`\``,
      starterCode: `# 函数作为一等公民的演示
def apply_twice(func, value):
    \"\"\"对 value 应用 func 两次\"\"\"
    return func(func(value))

def add_one(x):
    return x + 1

def square(x):
    return x * x

print(f"apply_twice(add_one, 5) = {apply_twice(add_one, 5)}")
print(f"apply_twice(square, 5) = {apply_twice(square, 5)}")

# 函数返回函数
def make_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

print(f"\\ndouble(10) = {double(10)}")
print(f"triple(10) = {triple(10)}")

# 验证函数是对象
print(f"\\n函数名：{double.__name__}")
print(f"函数有没有属性？试试：double.custom_attr = 'hello'")
double.custom_attr = "hello"
print(f"  double.custom_attr = {double.custom_attr}")`,
      expectedOutput: `apply_twice(add_one, 5) = 7
apply_twice(square, 5) = 625

double(10) = 20
triple(10) = 30

函数名：multiplier
函数有没有属性？试试：double.custom_attr = 'hello'
  double.custom_attr = hello`,
      hint: '理解"函数是对象"是掌握装饰器的钥匙。如果你能接受"函数可以作为参数传"，那装饰器就是"传一个函数进去，返回一个增强版的函数出来"',
    },
    {
      id: '12e.2',
      kind: 'demo',
      chapterId: 'ch12e',
      title: '@装饰器语法 — @ 符号的魔力',
      content: `## @ 语法糖：装饰器就像"印章"

\`@decorator\` 等价于 \`func = decorator(func)\`——给函数盖个章，它就变强了。

---

### 最简单的装饰器

\`\`\`python
def my_decorator(func):
    def wrapper():
        print("装饰器：函数执行前")
        func()
        print("装饰器：函数执行后")
    return wrapper

@my_decorator
def say_hi():
    print("你好！")

say_hi()
# 输出：
# 装饰器：函数执行前
# 你好！
# 装饰器：函数执行后
\`\`\`

---

### 装饰有参数的函数

\`\`\`python
def log_call(func):
    def wrapper(*args, **kwargs):  # 接收任意参数
        print(f"📞 调用 {func.__name__}()")
        return func(*args, **kwargs)
    return wrapper

@log_call
def add(a, b):
    return a + b

add(3, 5)  # 📞 调用 add()
           # 8
\`\`\`

\`*args\` 接收位置参数，\`**kwargs\` 接收关键字参数——万能接收器！

---

### 保留原函数的元信息

\`\`\`python
from functools import wraps

def my_decorator(func):
    @wraps(func)  # 保留原函数的名字、文档等信息
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper
\`\`\`

> 永远记得加 \`@wraps(func)\`——否则原函数的名字和文档字符串会被装饰器"吃掉"！`,
      starterCode: `from functools import wraps

# 一个完整的、专业的装饰器
def timer(func):
    \"\"\"打印函数执行时间的装饰器\"\"\"
    @wraps(func)  # 保留原函数的元信息
    def wrapper(*args, **kwargs):
        print(f"⏱️ 开始执行 {func.__name__}...")
        result = func(*args, **kwargs)
        print(f"✅ {func.__name__} 执行完成")
        return result
    return wrapper

@timer
def slow_function(name):
    \"\"\"一个需要点时间的函数\"\"\"
    total = 0
    for i in range(100000):
        total += i
    return f"{name} 的计算结果：{total}"

# 使用装饰器
result = slow_function("测试")
print(f"\\n返回：{result}")

# 验证元信息被保留
print(f"\\n函数名：{slow_function.__name__}")
print(f"文档：{slow_function.__doc__}")`,
      expectedOutput: `⏱️ 开始执行 slow_function...
✅ slow_function 执行完成

返回：测试 的计算结果：4999950000

函数名：slow_function
文档：一个需要点时间的函数`,
      hint: '@wraps(func) 就像给装饰器"化妆"——让它看起来和原函数一模一样。不加的话函数的 __name__ 和 __doc__ 都会变成 wrapper',
    },
    {
      id: '12e.3',
      kind: 'demo',
      chapterId: 'ch12e',
      title: '实战：最常见的 Python 装饰器',
      content: `## 实际项目中的装饰器

---

### 1. 缓存（记忆化）

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

fibonacci(50)  # 瞬间返回！不缓存的话要算很久
\`\`\`

---

### 2. 登录验证

\`\`\`python
def login_required(func):
    @wraps(func)
    def wrapper(user, *args, **kwargs):
        if not user.get("logged_in"):
            return "请先登录！"
        return func(user, *args, **kwargs)
    return wrapper

@login_required
def view_profile(user):
    return f"用户资料：{user['name']}"

view_profile({"logged_in": False})  # "请先登录！"
view_profile({"logged_in": True, "name": "小明"})  # "用户资料：小明"
\`\`\`

---

### 3. 重试机制

\`\`\`python
def retry(max_attempts=3):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for i in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"第{i+1}次失败：{e}")
            raise
        return wrapper
    return decorator
\`\`\`

---

### 4. Flask 中的 @app.route

\`\`\`python
@app.route("/hello")
def hello():
    return "Hello World!"
\`\`\`

当你学到 Flask 时会看到大量 \`@\`——现在你知道它只是在函数上"盖章"！`,
      starterCode: `from functools import wraps

# 实用装饰器：频率限制（演示版）
def rate_limit(max_calls, period=10):
    \"\"\"限制函数调用频率：max_calls 次 / period 秒\"\"\"
    def decorator(func):
        call_times = []  # 记录每次调用时间
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            from time import time
            now = time()
            # 清除 period 秒之前的记录
            while call_times and call_times[0] < now - period:
                call_times.pop(0)
            if len(call_times) >= max_calls:
                return f"⛔ 频率限制：{period}秒内最多调用{max_calls}次"
            call_times.append(now)
            return func(*args, **kwargs)
        return wrapper
    return decorator

@rate_limit(max_calls=3, period=5)
def api_call(name):
    return f"✅ API 响应：你好 {name}"

# 测试
for i in range(5):
    result = api_call(f"用户{i+1}")
    print(result)`,
      expectedOutput: `✅ API 响应：你好 用户1
✅ API 响应：你好 用户2
✅ API 响应：你好 用户3
⛔ 频率限制：5秒内最多调用3次
⛔ 频率限制：5秒内最多调用3次`,
      hint: '装饰器是 Python 最强大的特性之一。理解它之后，你会发现很多框架（Flask/Django/FastAPI）的 "魔法" 其实就是精心设计的装饰器',
    },
    {
      id: '12e.4',
      kind: 'demo',
      chapterId: 'ch12e',
      title: '多个装饰器叠加 + 综合练习',
      content: `## 多个装饰器：像洋葱一样层层包裹

\`@A\` \`@B\` \`@C\` 等价于 \`func = A(B(C(func)))\`——从下往上装饰，从上往下执行。

---

### 装饰器执行顺序

\`\`\`python
def bold(func):
    def wrapper():
        return f"<b>{func()}</b>"
    return wrapper

def italic(func):
    def wrapper():
        return f"<i>{func()}</i>"
    return wrapper

@bold     # 第二步：在外面加 <b>
@italic   # 第一步：先在里面加 <i>
def hello():
    return "Hello"

print(hello())  # <b><i>Hello</i></b>
\`\`\`

---

### 带参数的装饰器（三层嵌套）

\`\`\`python
def repeat(n):          # 接收参数
    def decorator(func):  # 接收函数
        @wraps(func)
        def wrapper(*args, **kwargs):  # 接收函数的参数
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say(msg):
    print(msg)

say("Hi")  # 打印 3 次 Hi
\`\`\`

---

### 装饰器速查表

| 装饰器 | 来源 | 作用 |
|--------|------|------|
| \`@property\` | 内置 | 把方法变属性 |
| \`@staticmethod\` | 内置 | 静态方法 |
| \`@classmethod\` | 内置 | 类方法 |
| \`@wraps\` | functools | 保留元信息 |
| \`@lru_cache\` | functools | 缓存结果 |
| \`@dataclass\` | dataclasses | 自动生成 \_\_init\_\_ |

> 装饰器就是"包装"，不改变函数内部，只在外面加一层——就像给手机套个壳，手机功能不变，但多了保护。`,
      starterCode: `from functools import wraps

# 多个装饰器叠加——演示执行顺序
def log_step(step_name):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            print(f"  [装饰器 {step_name}] 开始")
            result = func(*args, **kwargs)
            print(f"  [装饰器 {step_name}] 结束")
            return result
        return wrapper
    return decorator

@log_step("A - 最外层")
@log_step("B - 中间层")
@log_step("C - 最内层（先被装饰）")
def core_func():
    print("  [核心函数] 正在执行！")
    return "完成"

print("执行顺序：从外到内（A→B→C→核心），结束从内到外（核心→C→B→A）")
print()
result = core_func()
print(f"\\n结果：{result}")`,
      expectedOutput: `执行顺序：从外到内（A→B→C→核心），结束从内到外（核心→C→B→A）

  [装饰器 A - 最外层] 开始
  [装饰器 B - 中间层] 开始
  [装饰器 C - 最内层（先被装饰）] 开始
  [核心函数] 正在执行！
  [装饰器 C - 最内层（先被装饰）] 结束
  [装饰器 B - 中间层] 结束
  [装饰器 A - 最外层] 结束

结果：完成`,
      hint: '多个装饰器像洋葱：从离函数最近的那个开始装饰（先包内层），执行时从最外层开始（后包的外层先执行）',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
//  导出
// ─────────────────────────────────────────────────────────────
export const part2Chapters: Chapter[] = [ch10, ch11, ch12, ch12a, ch12b, ch12c, ch12d, ch12e, p2];
