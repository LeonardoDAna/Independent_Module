<img src="/markdown/claudeCode_logo.png" alt="Claude Code" />

# Claude Code 分享与实际应用

## 一、Claude Code 的来源与发展历史

### 1.1 Anthropic 公司背景

Anthropic 由 **Dario Amodei**、**Daniela Amodei** 等前 OpenAI 核心研究人员于 2021 年创立，公司核心理念是：

- 构建强大且可被人类理解和控制的 AI 系统
- 以"宪法 AI"（Constitutional AI）方法论驯化大模型行为
- 长期专注于 AI 安全研究，而非单纯追求能力竞赛

### 1.2 发展时间线

<style>
  .timeline-wrap {
    border-left: 3px solid #F57C00;
    padding-left: 24px;
    margin: 24px 0;
  }
  .timeline-wrap p {
    position: relative;
    padding: 10px 14px;
    margin-bottom: 12px;
    background: #FAFAFA;
    border-radius: 6px;
    font-size: 18px;
    line-height: 1.7;
    color: #333;
  }
  .timeline-wrap p::before {
    content: '';
    position: absolute;
    left: -30px;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
    border: 2.5px solid #F57C00;
  }
  .timeline-wrap p.competitor {
    background: #F5F5F5;
    color: #888;
  }
  .timeline-wrap p.competitor::before {
    border-color: #BDBDBD;
  }
  .timeline-wrap p strong {
    color: #F57C00;
    margin-right: 6px;
    white-space: nowrap;
  }
  .timeline-wrap p.competitor strong {
    color: #BDBDBD;
  }
</style>
<div class="timeline-wrap">
  <p><strong>2021 年</strong> — Anthropic 由前 OpenAI 核心成员创立，专注安全可靠的 AI 研究</p>
  <p><strong>2023 年 3 月</strong> — Claude 1 发布，以宪法 AI（Constitutional AI）为核心设计理念</p>
  <p><strong>2023 年 7 月</strong> — Claude 2 上线，上下文窗口突破 100K tokens，代码能力大幅提升</p>
  <p><strong>2024 年 3 月</strong> — Claude 3 系列（Haiku / Sonnet / Opus）发布，编程基准测试超越 GPT-4</p>
  <p><strong>2024 年 9 月</strong> — Boris Cherny（TypeScript 书籍作者）加入 Anthropic，开始原型化开发者工具</p>
  <p><strong>2024 年 10 月</strong> — Claude Code 内测，专为软件开发场景打造的 Agentic AI 工具链</p>
  <p><strong>2024 年 11 月</strong> — MCP（Model Context Protocol）开放标准发布，为工具扩展能力奠定基础</p>
  <p><strong>2025 年 2 月</strong> — Claude Code 研究预览版正式上线，随 Claude 3.7 Sonnet 同步发布，支持终端调用、MCP 协议、复杂多步任务</p>
  <p class="competitor"><strong>2025 年 4 月</strong> — OpenAI 发布 Codex CLI，行业跟进终端 Agent 架构</p>
  <p><strong>2025 年 5 月</strong> — Claude 4（Sonnet 4 / Opus 4）发布，Claude Code 正式 GA，新增代码执行、Files API，成为业界标杆</p>
  <p class="competitor"><strong>2025 年 6 月</strong> — Google 发布 Gemini CLI，终端 AI 编程工具成为行业主流范式</p>
  <p><strong>2025 年 11 月</strong> — Claude Opus 4.5 发布，价格下降 67%，重夺编程基准测试榜首</p>
<p><strong>2026 年 1 月</strong> — Claude Code 企业版正式落地，支持私有 Git 仓库对接、本地部署与团队权限管理</p>
<p><strong>2026 年 2 月</strong> — NASA 公开 Claude Code 成功用于火星探测器路线规划（任务执行于2025年12月，官方公布于2026年2月）</p>
<p><strong>2026 年 2 月</strong> — Claude Opus 4.6 / Sonnet 4.6 发布，Claude Code 同步上线 Agent Teams、Rewind、自动记忆等核心能力</p>
<p><strong>2026 年 3 月</strong> — Claude Code 密集迭代，上线语音模式、Computer Use、远程控制、1M token 上下文、Auto 模式，全面进入 Agent 时代</p>
<p><strong>2026 年 3 月</strong> — Claude 最新模型正式接入 Microsoft 365 Copilot，面向企业级市场全面开放</p>
<p><strong>未来？</strong> — 新模型Capybara, Opus 4.7, and Sonnet 4.8</p>
</div>

>  从「实验性副项目」到「行业标杆」，Claude Code 只用了不到一年时间。
### 1.3 Claude Code 诞生的背景

传统 AI 编程助手（如 GitHub Copilot）的核心模式是"补全"——你写代码，AI 给建议。

Claude Code 从根本上改变了这一范式：

- **从"代码补全"进化到"任务执行"**：你描述需求，AI 完整实现
- **具备真正的 Agentic 能力**：可以读文件、搜索代码库、执行命令、自我纠错
- **深度理解大型工程代码库上下文**：不是单文件补全，而是全局架构感知
- **支持 MCP（Model Context Protocol）协议**：可扩展对接任意外部工具

---

## 二、Claude Code 快速上手

### 2.1 安装与启动

安装非常简单，通过 npm 全局安装即可：


```shell [id:windows]
# npm
$ npm install -g @anthropic-ai/claude-code
$ cd your-project && claude
```

```shell [id:macOS]
#Homebrew 
brew install --cask claude-code
#curl
curl -fsSL https://claude.ai/install.sh | bash
```

```shell [id:Linux]
curl -fsSL https://claude.ai/install.sh | bash
```

### 2.2 登录方式

claude code 一共有三种登录方式：
```
    # 通过浏览器登录 Claude.ai 账号
    1. Claude account with subscription · Pro, Max, Team, or Enterprise

    # 通过 API Key 方式登录
    2. Anthropic Console account · API usage billing

    # 第三方云平台
    3. 3rd-party platform · Amazon Bedrock, Microsoft Foundry, or Vertex AI
```

| 对比维度 | Claude 订阅账号<br/>（Pro/Max/Team/Enterprise） | Anthropic Console<br/>（API 计费） | 第三方平台<br/>（Bedrock/Vertex/Azure） |
|----------|------------------------------------------|-----------------------------|------------------------------------|
| **本质定位** | 给「人」用的订阅产品 | 给「程序」用的 API 后台 | 通过云厂商中转调用 Claude |
| **计费方式** | 固定月费 | 按 token 用量计费 | 按云厂商定价计费 |
| **适合规模** | 个人 / 小团队 | 中小团队 / 开发者 | 中大型企业 |
| **技术门槛** | 低，开箱即用 | 中，需要集成 API | 高，需要配置云平台权限 |
 
--- 
 
**选型建议**
```
个人学习 / 日常使用
└─ Pro 订阅
 
个人高频开发
└─ Max 订阅
 
5~20 人前端团队协作
└─ Team 订阅
 
开发 AI 产品 / 需要 API 集成
└─ Anthropic Console
```
 

<img src="/markdown/claudeCode_bash.jpg" alt="Claude Code 三种模式" />

### 2.2 常用命令

## 三、 Skills

### 3.1 什么是 Skills？
**Skills** 是将你的专业知识打包成可组合资源的模块，能把通用 AI 助手转变为针对特定领域的专家。本质上就是一个包含 SKILL.md 文件的文件夹，里面放着 Claude 执行特定任务所需的指令、脚本和资源。
Skills 就像「可执行的专业知识」——它们是结构化的、可强制执行的工作流，能引导 Claude 以严谨的方式完成复杂任务，避免 AI 急于写代码而跳过必要的检查步骤。

### 3.2 核心优势

Skills 极大地减少了 token 消耗。每个 skill 在扫描时只占用约 100 个 token（仅读取 name + description），只有在真正触发时才加载完整内容（约 5000 token）。这意味着你可以同时挂载多个 skill，而不会撑爆上下文窗口。

### 3.3 Skill 文件结构
每个 skill 的基本结构如下：

```
my-skill/
    ├── SKILL.md        # 主文件，包含 frontmatter 配置和指令
    ├── scripts/        # 可选：可执行脚本
    │   └── helper.py
    └── resources/      # 可选：模板、配置等支撑文件
        └── template.json
```
SKILL.md 示例：
``` 
---
name: explain-code
description: 解释代码结构，使用类比和图示。当用户问"这段代码怎么工作的"时自动触发。
---

解释代码时，请按以下步骤进行：
1. 先用生活中的类比描述
2. 画 ASCII 图展示结构和流程
3. 逐步讲解代码执行过程
4. 指出一个常见误区
```

### 3.4 Skill 安装
```bash
    # 从官方市场安装
    /plugin marketplace add anthropics/skills

    # 或安装本地目录
    /plugin add /path/to/skill-directory

    # 放到全局目录（所有项目可用）
    ~/.claude/skills/your-skill/SKILL.md

    # 放到项目目录（仅当前项目可用）
    .claude/skills/your-skill/SKILL.md
```

### 3.5 Skills 使用

### Skills 推荐
* `frontend-design` — 高质量 UI 生成
这个 skill 的核心价值不只是让界面好看，而是让 Claude 生成的代码摆脱「AI 味」视觉风格，达到生产级别的 UI 质量。对于任何需要面向用户的产品，这是首选 skill。用 `/frontend-design` 调用，描述你想构建的内容即可。
* `docx` / `xlsx` / `pptx` — 文档生成
这三个是 Anthropic 官方维护的内置 skill，分别用于创建和编辑 Word 文档、Excel 表格和 PPT 演示文稿，支持样式、公式、追踪修改等高级功能。
* `pdf` — PDF 处理
完整的 PDF 工具链，支持文本提取、表格解析、创建新 PDF、合并/拆分文档、处理表单等操作。
* `explain-code` — 代码讲解
自定义 skill 的经典示例，能让 Claude 用类比 + ASCII 图 + 逐步讲解的方式解释代码，非常适合 Code Review 或团队分享时使用。
* `Figma` / `Notion` / `Atlassian` Skills
官方 Skills 目录中有来自 `Figma`、`Notion`、`Atlassian` 等平台的合作 skill，配合对应的 MCP 连接器使用，能实现跨工具的自动化工作流。
## 三、Claude Code vs OpenAI Codex 深度对比

### 3.1 全维度对比矩阵

| 对比维度 | OpenAI Codex / Copilot | Claude Code |
|---------|----------------------|-------------|
| **核心定位** | 代码补全 & 建议 | **Agentic 任务执行引擎** |
| **交互方式** | 内嵌 IDE，行级补全 | **终端对话，任务级驱动** |
| **上下文窗口** | 8K ~ 32K tokens | **200K tokens（Claude 3.5+）** |
| **代码库理解** | 当前文件为主 | **全项目索引，跨文件感知** |
| **命令执行** | 不支持 | **支持（授权后）** |
| **多步骤推理** | 有限 | **强大，支持复杂任务拆解** |
| **自动修复** | 不支持 | **支持测试驱动的自动修复闭环** |
| **MCP 扩展** | 不支持 | **支持，可对接任意外部系统** |
| **安全性设计** | 通用 RLHF | **宪法 AI，企业级合规** |
| **隐私保护** | 数据用于训练（默认） | **可配置，企业版不训练** |
| **中文理解** | 一般 | **优秀，中文需求描述无歧义** |

### 3.2 优势与局限

| Claude Code 优势 | Claude Code 局限 |
|-----------------|-----------------|
| 200K 超长上下文，理解整个项目 | 按 token 计费，大项目成本较高 |
| Agentic 多步执行，真正的任务自动化 | 网络依赖，无法完全离线使用 |
| 中文需求理解优秀，沟通无障碍 | 复杂任务需要精准的 Prompt 技巧 |
| MCP 协议可无限扩展工具链 | 国内访问需要稳定的网络环境 |
| 宪法 AI 安全设计，企业级可信 | 新手学习曲线：Prompt 工程要求 |
| 自动修复闭环，减少人工干预 | |

### 3.3 为什么选择 Claude Code？

**对于前端/全栈团队，Claude Code 的选择逻辑：**

- 需求描述用中文 → Claude Code 理解准确率显著高于 Codex
- 老项目重构/框架升级 → 超长上下文是核心竞争力，Codex 无法做到
- 需要任务自动化（如批量迁移组件）→ Agentic 能力是唯一选择
- 团队需要安全合规 → 宪法 AI 设计更贴合企业诉求

---

## 四、Demo 实战


### 4.1 下载项目&skills
下载项目 https://github.com/LeonardoDAna/ai_tech_share.git

新建&切换分支 `git checkout -b demo`

### 4.2 提出需求
> plan mode on 模式下

1. **需求描述**
    帮我实现一个待办列表功能，要求实现以下功能：
    - 增、删、改、查待办事项
    - 模糊查询搜索待办事项
    - 待办事项的状态有进行中、已完成、已取消三种状态

2. **添加需求描述** 
   - 给待办事项增加三种级别：高、中、低。
3. **运行项目**
   - 切换至bash模式 
   - 运行项目 npm run dev 

4. **使用Skills** 
   - fronted-design
   ```bash
   /fronted-design 重新修改页面样式
   ```
   - 运行项目 

5. **提交代码**


### 6.2 Prompt 最佳实践

#### ✅ 好的 Prompt 模板

```markdown
【角色】你是一个资深 Vue3 前端工程师，熟悉 Element Plus 和 TypeScript

【背景】这是一个 B 端后台管理系统，已有的代码风格参考 src/views/example

【任务】实现订单管理列表页，要求：分页、筛选、导出 Excel、批量操作

【约束】不使用 any 类型，所有接口调用用 src/api 下封装的 request，错误统一用 this.$message 处理
```

#### ❌ 低效的 Prompt

```markdown
【错误示例】"帮我写一个列表页" —— 信息缺失，Claude 会做大量假设，结果偏差大
```

### 6.3 团队协作规范建议

- 建立 `CLAUDE.md` 项目上下文文件，记录技术栈、代码规范、常用模式
- 复杂任务先让 Claude 输出"执行计划"，确认后再执行
- 每次提交前让 Claude 做 Code Review，生成 Review 报告
- 框架升级使用"灰度迁移"策略，逐模块迁移，每步验证
- 建立 Prompt 模板库，沉淀团队高频场景的最佳提示词

### 6.4 注意事项

- **安全红线**：绝对不要将密钥、数据库密码等敏感信息粘贴到 Prompt 中
- **知识产权**：AI 生成代码需人工 Review，确保合规性和准确性
- **不要盲信**：复杂业务逻辑必须人工验证，AI 可能产生"幻觉"
- **版本控制**：重大操作前先 `git commit`，便于回滚

---

## 七、总结与展望

### 7.1 核心价值总结

**Claude Code 不是"更聪明的自动补全"，而是一个真正的 AI 编程协作者：**

- 从"人写代码"到"人描述需求，AI 完成实现"的范式转变
- 超长上下文 + Agentic 能力，是处理大型工程问题的核心竞争力
- 在新项目开发和老项目升级两个场景都有显著的效率提升
- 团队工程师的角色从"代码生产者"升级为"需求架构师 + AI 协调者"

### 7.2 适合使用的场景

- 需要快速原型验证的新项目
- 技术债务较重、需要系统性重构的老项目
- 有大量重复性工作（CRUD、表单、列表）的业务系统
- 框架/依赖版本升级迁移
- 编写单元测试、文档、Code Review

### 7.3 团队落地建议

1. 从低风险项目开始试点，建立信心和经验
2. 制定 Prompt 规范和模板库，降低使用门槛
3. 明确 AI 生成代码的 Review 流程，保障代码质量
4. 定期分享使用心得，沉淀团队最佳实践
5. 持续跟进 Claude Code 版本更新，保持竞争力

---

*如果你想要深入学习claude code 推荐这个*[点击这里](https://imzbf.github.io/md-editor-v3/)

