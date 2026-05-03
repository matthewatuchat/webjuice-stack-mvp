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
| 邮件发送 | Resend | 表单通知/交易邮件 | $0 (3000封/月) |
| 邮件接收 | Cloudflare Email Routing | 收邮件转发 | $0 |
| 版本 | GitHub | 代码+内容+CI 触发 | $0 |

**总月费：$0**

---

## 邮件架构：两阶段设计

### Phase 1 — 默认上线（零配置）

所有客户站默认用你的域名发件，客户零额外操作即可上线。

```
发件人：WebJuice <hello@fengtalk.ai>
收件人：客户指定的通知邮箱（如 sales@client.com）
reply_to：网站访客填写的邮箱
```

配置：
- `FROM_EMAIL` = `WebJuice <hello@fengtalk.ai>`
- `RESEND_API_KEY` = 你的 Resend 主密钥
- 不需要为客户域名做任何邮件配置

### Phase 2 — 客户品牌升级（自动切换）

客户想用自己的域名发件（如 `hello@client.com`），运行一条命令自动完成切换。

```bash
node scripts/upgrade-client-email.js client.com
```

脚本会自动：
1. 在 Resend 添加客户域名
2. 获取 SPF/DKIM/DMARC 记录
3. 在 Cloudflare DNS 自动设置记录
4. 创建独立 API Key
5. 输出新的环境变量配置

切换后：
```
发件人：Client Name <hello@client.com>
收件人：客户指定的通知邮箱
reply_to：网站访客填写的邮箱
```

---

## 自动化流水线

### 1. 开发 → 部署
```
本地 git push → GitHub → Cloudflare Pages 自动 build → 全球上线（30 秒）
```

### 2. 内容发布
```
写 Markdown 文件 → push 到 src/content/ → 自动构建
```

### 3. 表单处理
```用户提交 → Pages Function /api/contact → Resend 发通知 → 到客户邮箱```

### 4. 客户域名上线
```bash
# 站点上线
node scripts/add-domain.js client.com

# 邮件升级（可选）
node scripts/upgrade-client-email.js client.com
```

---

## 目录结构

```
/
├── .github/workflows/          # CI/CD 工作流
├── functions/api/              # Cloudflare Pages Functions
│   └── contact.ts              # 表单处理 API (Resend)
├── scripts/                    # 自动化脚本
│   ├── add-domain.js           # 客户站点域名上线
│   └── upgrade-client-email.js # 客户邮件域名升级
├── src/
│   ├── content/
│   │   ├── blog/             # 博客文章 (Markdown)
│   │   ├── cases/            # 案例研究 (Markdown)
│   │   └── config.ts         # 内容 schema 定义
│   ├── layouts/
│   │   └── Layout.astro      # 基础布局
│   └── pages/
│       ├── index.astro         # 首页
│       ├── contact.astro       # 联系页面
│       ├── blog/
│       │   ├── index.astro       # 博客列表
│       │   └── [...slug].astro   # 博客详情
│       └── cases/
│           ├── index.astro       # 案例列表
│           └── [...slug].astro   # 案例详情
├── astro.config.mjs
├── package.json
├── wrangler.toml             # Pages 环境配置
└── tsconfig.json
```

---

## 开发命令

```bash
npm install
npm run dev      # localhost:4321
npm run build    # 输出到 dist/
npm run preview
```

---

## 部署到 Cloudflare Pages

1. Dashboard → Pages → 创建项目 → 连接此 GitHub repo
2. Build settings 保持默认（Framework: Astro, Build: `npm run build`, Output: `dist`）
3. 配置环境变量（见下表）
4. Save and Deploy

---

## 环境变量配置

在 Cloudflare Pages Dashboard → 项目 → Settings → Environment variables 中添加：

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `RESEND_API_KEY` | Resend API Key (建议设为 Secret) | 必填 |
| `NOTIFICATION_EMAIL` | 接收表单通知的邮箱 | `hello@fengtalk.ai` |
| `FROM_EMAIL` | 发件人显示 | `WebJuice <hello@fengtalk.ai>` |

**Phase 2 升级后覆盖：**
- `FROM_EMAIL` → `Client Name <hello@client.com>`
- `RESEND_API_KEY` → 客户独立的 scoped API key

---

## 客户域名上线

```bash
export CF_ACCOUNT_ID=2b67d2288df946ac22f408b60a9bcc11
export CF_API_TOKEN=你的 Cloudflare API Token

# 站点上线
node scripts/add-domain.js client.com

# 邮件升级（可选，需要 RESEND_MASTER_KEY）
export RESEND_MASTER_KEY=你的 Resend 主密钥
node scripts/upgrade-client-email.js client.com
```

---

## 技术栈对比（vs WordPress）

| | WordPress | WebJuice Stack |
|---|---|---|
| 服务器 | VPS/共享主机 | 无（静态文件） |
| 数据库 | MySQL | 无 |
| 安全更新 | 插件经常更新 | 无更新需求 |
| 页面加载 | 200-500ms | <50ms |
| 部署 | 手动/复杂 CI | Git push 自动部署 |
| 邮件月费 | SendGrid/SES $10-50+ | **$0** (Resend 免费额度) |
| 月费总计 | $10-50+ | **$0** |

---

## 待完成

- [ ] 添加 `@tailwindcss/typography` 优化文章排版
- [ ] 添加 SEO 组件（sitemap、robots、meta tags）
- [ ] 接入 AI agent API 到 `ai-content.yml`
- [ ] 添加 Google Analytics / Plausible 统计
- [ ] 在 Cloudflare Dashboard 配置 Email Routing（如需要收邮件）
