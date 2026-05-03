# WebJuice Stack MVP

Agency 从 WordPress 迁移后的精简技术栈。

---

## 技术栈总览

| # | 工具 | 用途 |
|---|------|------|
| 1 | Astro | 网站框架 |
| 2 | Tailwind CSS | 样式 |
| 3 | Cloudflare | 速度 / CDN |
| 4 | GitHub | 版本控制 |
| 5 | AI agents | 内容、QA、修复、SEO |
| 6 | Plunk + Coolify | 邮件发送 |
| 7 | Purelymail | 邮箱托管（$10/年） |
| 8 | VS Code + Opus 4.7 + GPT 5.5 | 开发环境 |
| 9 | Hermes on Discord | 操作控制台 |
| 10 | Payload CMS + Coolify | 内容管理 |

---

## 各组件如何配合

### 建站与展示
Astro 把内容和页面编译成纯静态 HTML，比 WordPress 快得多。Tailwind 管样式，写起来像搭积木。Cloudflare 把这些静态文件撒到全球节点，客户在哪访问都快。

### 内容生产与管理
Payload CMS 是内容后台，放文章、案例、客户数据。Coolify 负责把它跑起来（自托管的轻量 PaaS）。AI agents 在这里面干活——生成文章草稿、检查错别字、补 SEO 标签、甚至自动修代码 bug。

### 开发协作
VS Code 是 IDE，Opus 4.7 和 GPT 5.5 当结对程序员——写组件、重构、写测试。代码全进 GitHub，版本可控，多人不打架。

### 邮件系统
Purelymail（$10/年）收邮件——带自定义域名的企业邮箱。Plunk 发邮件——Newsletter、客户通知、自动化序列。Plunk 也挂在 Coolify 上自营，不依赖 SendGrid 这类第三方。

### Hermes 的角色
Discord 里的 Hermes 是中央控制台。@它下指令，它调动背后的 AI agents 去执行——可能是跑一趟 SEO 检查，也可能是生成一篇博客草稿推到 Payload CMS。

### 一句话流程
Payload 存内容 → Astro 编译成静态站 → Cloudflare 全球分发 → GitHub 管代码版本 → AI agents 填内容+做 QA → Hermes 当遥控器 → 邮件走 Purelymail/Plunk。

---

## 开发命令

| Command | Action |
| :------ | :----- |
| 
> hermes-agent@1.0.0 postinstall
> echo '✅ Browser tools ready. Run: python run_agent.py --help'

✅ Browser tools ready. Run: python run_agent.py --help

added 476 packages, and audited 477 packages in 1m

95 packages are looking for funding
  run `npm fund` for details

5 vulnerabilities (4 moderate, 1 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details. | Installs dependencies |
|  | Starts local dev server at  |
|  | Build your production site to  |
|  | Preview your build locally, before deploying |

---

## 项目结构


