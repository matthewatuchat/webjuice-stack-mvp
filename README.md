# WebJuice Stack MVP

B2B 公司官网全栈。Astro + Cloudflare，无数据库、无 WordPress、全部自动化。

---

## 技术架构

| 层级 | 技术 | 用途 | 费用 |
|------|------|------|------|
| 前端 | Astro + Tailwind | 静态站点生成 | $0 |
| 内容 | Content Collections | Markdown 博客/案例/页面 | $0 |
| 托管 | Cloudflare Pages | 构建+部署+CDN | $0 |
| 表单 | Pages Functions | 联系表单处理 | $0 |
| 邮件 | Email Routing + Sending | 收邮件+发通知 | $5/月 |
| 版本 | GitHub | 代码+内容+CI 触发 | $0 |

## 自动化流水线

### 1. 开发 → 部署
```
本地 git push → GitHub → Cloudflare Pages 自动 build → 全球上线（30 秒）
```

### 2. 内容发布
```
写 Markdown 文件 → push 到 src/content/ → 自动构建
```
或运行 GitHub Action `ai-content.yml`，AI 生成文章后自动 commit 并触发部署。

### 3. 表单处理
```用户提交 → Pages Function /api/contact → Email Sending 发通知到 sales@公司.com```

### 4. 客户上线
```
运行 scripts/add-domain.js <客户域名> → 自动添加到 Pages 项目 → 输出 CNAME 给客户 → SSL 自动下发
```

---

## 目录结构

```
/
├── .github/workflows/       # CI/CD 工作流
├── functions/api/           # Cloudflare Pages Functions
│   └── contact.ts           # 表单处理 API
├── scripts/                 # 自动化脚本
│   └── add-domain.js        # 客户域名上线
├── src/
│   ├── content/
│   │   ├── blog/          # 博客文章 (Markdown)
│   │   ├── cases/         # 案例研究 (Markdown)
│   │   └── config.ts      # 内容 schema 定义
│   ├── layouts/
│   │   └── Layout.astro   # 基础布局
│   └── pages/
│       ├── index.astro      # 首页
│       ├── contact.astro    # 联系页面
│       ├── blog/
│       │   ├── index.astro    # 博客列表
│       │   └── [...slug].astro # 博客详情
│       └── cases/
│           ├── index.astro    # 案例列表
│           └── [...slug].astro # 案例详情
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## 开发命令

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建
npm run build

# 预览
npm run preview
```

---

## 部署到 Cloudflare Pages

1. 登录 Cloudflare Dashboard → Pages → 创建项目
2. 连接此 GitHub repo
3. Build settings 保持默认：
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. 点击 Save and Deploy

---

## 邮件服务配置

Email Sending 需要 Workers Paid plan ($5/月)。

1. 在 Cloudflare Dashboard → Email → Email Sending 中添加域名
2. 在 Pages → 项目 → Settings → Functions 中绑定 Email Sending binding（名称设为 `EMAIL`）
3. 设置环境变量 `NOTIFICATION_EMAIL` 为接收表单通知的邮箱

---

## 客户域名上线

```bash
export CF_ACCOUNT_ID=your_account_id
export CF_API_TOKEN=your_api_token
node scripts/add-domain.js client-company.com
```

运行后会输出 CNAME 记录，发给客户设置即可。

---

## 增加新内容

### 手动方式
```bash
# 创建 Markdown 文件
src/content/blog/my-new-post.md

# push 后自动构建
```

### AI 自动方式
在 GitHub → Actions → ai-content 中运行 workflow，填入话题和 slug，AI 生成文章后自动提交。

---

## 技术栈对比（vs 原 WordPress 方案）

| | WordPress 方案 | WebJuice Stack |
|---|---|---|
| 服务器 | 需要 VPS/共享主机 | 无（静态文件） |
| 数据库 | MySQL | 无 |
| 安全更新 | 插件/主题常常更新 | 无更新需求 |
| 页面加载 | 200-500ms | <50ms |
| 部署 | 手动或复杂 CI | Git push 自动部署 |
| 月费 | $10-50+ | $5（邮件发送） |

---

## 待完成

- [ ] 添加 `@tailwindcss/typography` 以优化文章排版
- [ ] 配置 D1 数据库存储表单提交记录
- [ ] 接入 AI agent API 到 `ai-content.yml`
- [ ] 添加 SEO 组件（sitemap、robots、meta tags）
- [ ] 添加 Google Analytics / Plausible 统计
