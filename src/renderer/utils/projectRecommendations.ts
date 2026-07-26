export type RecommendationLevel = 'entry' | 'intermediate' | 'expert';
export type RecommendationLanguage = 'typescript' | 'python';

export interface ProjectRecommendation {
  title: string;
  repo: string;
  stack: string;
  scale: string;
  highlight: string;
  language: RecommendationLanguage;
  level: RecommendationLevel;
}

export interface RecommendationTrack {
  language: RecommendationLanguage;
  label: string;
  description: string;
  guide: string;
  actionHint: string;
}

export const recommendationTracks: RecommendationTrack[] = [
  {
    language: 'typescript',
    label: 'TypeScript',
    description: '更适合前端、全栈、桌面端与类型驱动开发。',
    guide: '建议从 CLI 和 Todo 起步，再推进到 React + 服务端 + 数据库的一体化项目。',
    actionHint: '先做 2 个入门项目，再选 1 个进阶项目完整复刻。',
  },
  {
    language: 'python',
    label: 'Python',
    description: '更适合自动化、爬虫、API 服务、AI 工具与工程化后端。',
    guide: '建议从脚本和小型 Web 应用起步，再进入 FastAPI、异步与工作流系统。',
    actionHint: '先做 2 个基础项目，再挑 1 个 Web/API 项目做上线版。',
  },
];

export const projectRecommendations: ProjectRecommendation[] = [
  {
    title: 'CLI 计算器',
    repo: 'hassan-ak/wmd-ts-calculator',
    stack: 'TS + Inquirer + Chalk',
    scale: '~150 行',
    highlight: '加减乘除、平方、开根号、NPX 发布',
    language: 'typescript',
    level: 'entry',
  },
  {
    title: '猜数字游戏',
    repo: 'hassan-ak/wmd-ts-number-game',
    stack: 'TS + Inquirer',
    scale: '~120 行',
    highlight: '4 种难度、提示系统、历史记录',
    language: 'typescript',
    level: 'entry',
  },
  {
    title: 'CLI ATM 模拟',
    repo: 'Hira-Tech-GenAi/node_projects',
    stack: 'TS + Inquirer + Chalk',
    scale: '~200 行',
    highlight: '取款、存款、转账、余额查询',
    language: 'typescript',
    level: 'entry',
  },
  {
    title: 'Todo 全栈',
    repo: 'wpcodevo/node-react-trpc-crud-app',
    stack: 'React + tRPC + Prisma + SQLite',
    scale: '~500 行',
    highlight: '类型安全 API，端到端闭环',
    language: 'typescript',
    level: 'entry',
  },
  {
    title: '任务管理系统',
    repo: 'YogeshwaranOfficial/Task-Management-System',
    stack: 'React 19 + Express + Prisma + PostgreSQL',
    scale: '~2000 行',
    highlight: 'Swagger、深色模式、软删除、云端部署',
    language: 'typescript',
    level: 'intermediate',
  },
  {
    title: '全栈 CRUD CMS',
    repo: 'yamwoong/typescript-crud',
    stack: 'Express + MongoDB + React + Swagger',
    scale: '~3000 行',
    highlight: 'MVC 分层、JS 转 TS、自动化测试',
    language: 'typescript',
    level: 'intermediate',
  },
  {
    title: '仓库管理系统',
    repo: 'akincenk/warehouse-management-system',
    stack: 'FastAPI + React + SQLAlchemy + JWT',
    scale: '~1500 行',
    highlight: '角色权限、产品管理、前后端分离',
    language: 'typescript',
    level: 'intermediate',
  },
  {
    title: 'KingStack 全栈模板',
    repo: 'AlexanderPinkerton/kingstack',
    stack: 'Turborepo + NestJS + Next.js + Prisma',
    scale: '~15000 行',
    highlight: 'Monorepo、WebSocket、Supabase 认证',
    language: 'typescript',
    level: 'intermediate',
  },
  {
    title: 'Timewise 工时系统',
    repo: 'unaidevel/Timewise',
    stack: 'FastAPI + Django ORM + React 19',
    scale: '~5000 行',
    highlight: '清洁架构、分层设计、严格类型',
    language: 'typescript',
    level: 'intermediate',
  },
  {
    title: 'Twenty CRM',
    repo: 'twentyhq/twenty',
    stack: 'Nx + NestJS + React + GraphQL + PostgreSQL',
    scale: '⭐50K',
    highlight: 'Monorepo、多租户、消息队列、AI 集成',
    language: 'typescript',
    level: 'expert',
  },
  {
    title: 'NestJS 框架',
    repo: 'nestjs/nest',
    stack: 'TS + Express/Fastify + RxJS + WebSocket',
    scale: '⭐75K',
    highlight: 'IoC 容器、装饰器模式、微服务',
    language: 'typescript',
    level: 'expert',
  },
  {
    title: 'Vendure 电商',
    repo: 'vendurehq/vendure',
    stack: 'NestJS + GraphQL + React + PostgreSQL',
    scale: '⭐8K',
    highlight: '插件系统、电商业务建模、多语言多货币',
    language: 'typescript',
    level: 'expert',
  },
  {
    title: 'React SaaS 模板',
    repo: 'kriasoft/react-starter-kit',
    stack: 'React 19 + tRPC + Drizzle + Cloudflare',
    scale: '⭐23K',
    highlight: '端到端类型安全、认证支付、边缘计算',
    language: 'typescript',
    level: 'expert',
  },
  {
    title: 'MedCore HIS',
    repo: 'Globussoft-Technologies/medcore',
    stack: 'Next.js + Express + Prisma + 150+ 模型',
    scale: '新项目',
    highlight: '多租户医疗、复杂业务建模、React Native',
    language: 'typescript',
    level: 'expert',
  },
  {
    title: '井字棋游戏',
    repo: 'sanyokkua/cross_game_py',
    stack: 'Python + Tkinter/Qt/Flask/Django',
    scale: '~400 行',
    highlight: '同一逻辑 4 种 UI，适合对比学习',
    language: 'python',
    level: 'entry',
  },
  {
    title: 'Flask Todo 入门',
    repo: 'chandana0212/todo-flask-app',
    stack: 'Python + Flask + 文件存储',
    scale: '~50 行',
    highlight: '极简全栈，1 小时即可理解',
    language: 'python',
    level: 'entry',
  },
  {
    title: '零依赖网页爬虫',
    repo: 'LuciferForge/python-web-scraper',
    stack: 'Python 3 纯标准库',
    scale: '~300 行',
    highlight: '零 pip 安装、CSS 选择器、crawl 模式',
    language: 'python',
    level: 'entry',
  },
  {
    title: '智能比价助手',
    repo: 'prashantkoirala465/Smart-Shopping-Assistant',
    stack: 'Python + Selenium + BS4',
    scale: '~400 行',
    highlight: '多网站比价、HTML 报告、Demo 模式',
    language: 'python',
    level: 'entry',
  },
  {
    title: 'Pynvader 打字游戏',
    repo: 'santoshtvk-new/Pynvader',
    stack: 'Python + Flask + Canvas',
    scale: '~500 行',
    highlight: '太空射击学 Python 关键字、排行榜',
    language: 'python',
    level: 'entry',
  },
  {
    title: 'Flask Todo 完整版',
    repo: 'dvrone/flask-todo-app',
    stack: 'Flask + SQLAlchemy + Bootstrap',
    scale: '~800 行',
    highlight: '认证、多语言、游戏化、深色模式、归档',
    language: 'python',
    level: 'intermediate',
  },
  {
    title: 'FastAPI 仓库管理',
    repo: 'akincenk/warehouse-management-system',
    stack: 'FastAPI + React + SQLAlchemy + JWT',
    scale: '~1500 行',
    highlight: '角色权限、前后端分离、Swagger',
    language: 'python',
    level: 'intermediate',
  },
  {
    title: '价格追踪器',
    repo: 'StickySide/price-scraper',
    stack: 'Python + BS4 + Selenium + Discord',
    scale: '~800 行',
    highlight: '模块化、重试机制、Discord 通知、CSV',
    language: 'python',
    level: 'intermediate',
  },
  {
    title: '爬虫教程大全',
    repo: 'Jasonyou1995/web-scraping-tutorial',
    stack: 'Python + BS4 + Selenium + Scrapy',
    scale: '~2000 行',
    highlight: '4 个模块循序渐进，每步有练习',
    language: 'python',
    level: 'intermediate',
  },
  {
    title: 'PyAA 全栈模板',
    repo: 'paulocoutinhox/pyaa',
    stack: 'Django + FastAPI + Tailwind CSS v4',
    scale: '~5000 行',
    highlight: 'Stripe 支付、异步队列、Docker、安全',
    language: 'python',
    level: 'intermediate',
  },
  {
    title: 'FastAPI 框架',
    repo: 'fastapi/fastapi',
    stack: 'Python + Starlette + Pydantic',
    scale: '⭐99K',
    highlight: '高性能异步框架、OpenAPI、依赖注入',
    language: 'python',
    level: 'expert',
  },
  {
    title: 'Django 框架',
    repo: 'django/django',
    stack: 'Python + ORM + 模板引擎',
    scale: '⭐87K',
    highlight: 'MTV 架构、migrations、Admin 自动生成',
    language: 'python',
    level: 'expert',
  },
  {
    title: 'Airflow 工作流',
    repo: 'apache/airflow',
    stack: 'Python + DAG + Celery + Web UI',
    scale: '⭐45K',
    highlight: '工作流编排、分布式调度、数据管道',
    language: 'python',
    level: 'expert',
  },
  {
    title: 'Prefect 编排',
    repo: 'prefecthq/prefect',
    stack: 'Python + 异步 + 事件驱动',
    scale: '⭐22K',
    highlight: '现代工作流、自动重试、缓存、资源管理',
    language: 'python',
    level: 'expert',
  },
  {
    title: 'Kedro 数据科学',
    repo: 'kedro-org/kedro',
    stack: 'Python + 数据管道 + 可视化',
    scale: '⭐10K',
    highlight: '可复现数据管道、模块化、工程化 ML',
    language: 'python',
    level: 'expert',
  },
];

export const levelMeta: Record<RecommendationLevel, { label: string; description: string }> = {
  entry: {
    label: '入门级',
    description: '适合刚完成基础语法和小练习，目标是把语法变成可运行的小作品。',
  },
  intermediate: {
    label: '进阶级',
    description: '适合已经会前后端和数据库，目标是完整复刻并逐步上线。',
  },
  expert: {
    label: '高手级',
    description: '适合开始读大型源码和架构设计，重点不再只是做功能。',
  },
};

export function getRecommendationsByLanguage(language: RecommendationLanguage): ProjectRecommendation[] {
  return projectRecommendations.filter(item => item.language === language);
}

export function getFeaturedRecommendations(): ProjectRecommendation[] {
  return ['typescript', 'python'].flatMap(language =>
    ['entry', 'intermediate', 'expert'].map(level =>
      projectRecommendations.find(item => item.language === language && item.level === level),
    ).filter((item): item is ProjectRecommendation => Boolean(item)),
  );
}

export function getTrackCounts(language: RecommendationLanguage) {
  const items = getRecommendationsByLanguage(language);

  return {
    total: items.length,
    entry: items.filter(item => item.level === 'entry').length,
    intermediate: items.filter(item => item.level === 'intermediate').length,
    expert: items.filter(item => item.level === 'expert').length,
  };
}

export function getGithubUrl(repo: string): string {
  return `https://github.com/${repo}`;
}
