# DSH 工作流插件开发准备报告

> **历史准备记录（2026-10-01 至 2026-10-02）**：本报告记录的是 Alpha.4 之前的开发准备状态，不代表当前模型或插件验收状态。其“未配置模型 / NEEDS_API_KEY”结论已过期：后续 Alpha.5 验收记录了已配置模型的真实 DSH Agent 文件读写；当前 Alpha.7 主验收 profile 的模型选择器曾显示 `已配置的测试模型`（未读取密钥）。当前版本、包和剩余验收项以 [Alpha.7 验收矩阵](v0.1-acceptance-report.md)、[交付报告](v0.1-delivery-report.md) 和 [进度记录](codex-progress.md) 为准。

整体状态：**PARTIALLY_READY**。环境、目录、精确版本、公开演示材料、启动脚本和本地 Web 启动已完成；由于开发环境没有模型 API Key，普通对话和 DSH 工具创建/读取文件尚未执行。

环境盘点与初次启动：2026-10-01；报告收尾及服务复核：2026-10-02（Asia/Shanghai）。本报告仅覆盖开发准备，不实现工作流插件。

## 已完成工作

- 检查本机 Windows 11、PowerShell、Node.js、npm、pnpm/Corepack、Git、VS Code、Edge 及 GitHub/npm/DeepSeek API 连通性。完整版本与依据见 compatibility.md。
- 新建独立插件仓库 $ProjectRoot；按约定建立 src/domain、src/shared、src/host、src/client、tests、examples、docs、scripts。空职责目录用 README 说明用途；未创建空测试或臆造协议。
- 新建演示工作区 $DemoWorkspace，并将四份公开 Markdown 示例复制到 inputs/。源文件与副本逐个比对。
- 新建 .gitignore 和项目 README。约定 DSH 宿主和浏览器代码分别构建；当前项目不是可安装插件。
- 查询 npm dist-tags，精确候选为 @deepseek-ai/dsh@0.2.0-rc.2，写入 dsh-version.txt。发布包没有 engines 字段；参考主分支开发指南判断 Node 24 环境可用，但没有把主分支接口视为预发布包保证。
- 通过 Corepack 执行 pnpm 11.7.0；未全局升级或替换现有 Node/npm。

## DSH 启动与证据

- 锁定版本：@deepseek-ai/dsh@0.2.0-rc.2。
- 启动前尝试了 npx.cmd --yes @deepseek-ai/dsh@0.2.0-rc.2 --help；30 秒内没有输出，停止了该单独的帮助命令。随后锁定版本的 Web 实例已实际启动并通过本地端口响应。
- 实际启动入口：

      powershell.exe -NoLogo -NoProfile -File "$ProjectRoot\scripts\start-dsh-dev.ps1" -Port 3080

- 启动脚本读取 dsh-version.txt，执行精确版本的 npx 命令，只在该进程及子进程设置 DSH_HOME=<本机用户目录> DSH 配置或会话。
- 当前状态：服务仍在运行，监听 127.0.0.1:3080；Edge 中实际出现 DeepSeek Harness 页面。对不带本地访问令牌的根地址探测得到 HTTP 401，说明服务要求本地令牌。DSH 官方连接文档说明每个进程会生成随机启动令牌，浏览器换取签名 Cookie 后 URL 会移除令牌参数。当前脚本默认由 DSH 自行打开浏览器，并在控制台输出中脱敏本地令牌和 API-key 形态字符串。
- 停止：在启动器所在终端按 Ctrl+C。重新启动：再次运行以上命令；若 3080 被占用，可指定空闲端口，例如 -Port 3081。可用 -NoOpen 禁止 DSH 自动打开浏览器。

## 模型验证状态

阻塞标记：**NEEDS_API_KEY**。

启动进程的环境中没有 DEEPSEEK_API_KEY 或 DEEPSEEK_BASE_URL。新 DSH_HOME 是隔离目录，未导入个人配置；DeepSeek API 连通性探测返回 HTTP 401。由此尚未验证普通对话，也未验证 DSH 自身工具创建和读取 dsh-preparation-check.md。未通过直接写盘伪装工具调用成功。

下一步：在已打开的隔离 DSH 页面进入 Settings → Models，在 DeepSeek 卡片输入并保存可用 API Key。官方说明该字段只写不读，密钥保存到隔离 DSH_HOME 的 .credentials.yaml，模型设置保留凭据引用；保存后下一个请求即可使用。请只在本机页面输入，不要把 Key 发到聊天或写进 Git。你完成后告知“已配置”，即可继续真实对话、工具写入、工具读取和磁盘复核。

## 启动输出安全处理记录

DSH 原始启动器会在 URL 中输出本地访问令牌。首次探测发现这一行为后，我停止了首个实例，更新启动脚本为默认自动打开浏览器并过滤令牌/API-key 形态字符串，再通过该脚本重启。先前一次工具输出曾短暂包含首个进程的原始本地访问 URL；该进程已停止。依据 DSH 官方认证说明，启动令牌按进程随机生成，因此首个进程的令牌随进程停止失效。历史工具记录无法由我撤回；令牌值没有进入交付文件、报告或 Git，此处不重列令牌值。

## Git 与敏感数据收尾

- 插件目标目录此前不存在，本轮执行 git init；未切换分支、提交或推送。当前分支为 master，文件均为本轮新增未提交内容。
- .gitignore 已实际核对忽略 .env、本地环境文件、node_modules、构建产物、DSH 数据、会话、附件、上传、运行日志及 outputs；examples/ 和公开源码未被忽略。
- 对交付文件扫描了 API-key/本地 token 形态，没有匹配项。隔离 DSH_HOME 在用户目录，不属于仓库。

## 新增文件

- 根目录：README.md、.gitignore、dsh-version.txt。
- src/domain、src/shared、src/host、src/client：职责 README。
- tests：验收范围 README。
- examples：requirements.md、style-guide.md、prompt-example.md、demo-workflow-spec.md。
- docs：compatibility.md、preparation-report.md、first-integration-checklist.md。
- scripts：start-dsh-dev.ps1。
- 演示工作区：README.md、.gitignore、inputs/ 下四份示例副本。

## 下一阶段

可以开始最小插件加载、三节点视图和宿主/浏览器构建契约验证。插件驱动 Agent 创建 hello.md 的真实验收仍需先完成 NEEDS_API_KEY 项；取消、禁用和资源清理也须留到插件进入运行状态后验证。
## 实现阶段收尾补充（2026-10-02）

本准备报告记录的是插件开发前基线；其中“插件视图、三节点、Host/Client 集成尚未验证”已被本轮实际实现与验收更新覆盖，不应继续作为当前进度。最终构建、隔离 profile 安装、DSH UI/Host Remote 文件读取、保存重载、4 MiB 上限和插件空闲禁用/启用结果，见 [`v0.1-delivery-report.md`](v0.1-delivery-report.md) 与 [`v0.1-acceptance-report.md`](v0.1-acceptance-report.md)。

仍然有效的阻塞是隔离 DSH profile 未配置模型 API Key。计划生成、真实 Agent 工具调用/写文件和依赖任务运行无法完成；没有读取或打印凭据文件。该项未阻止独立的构建、打包、真实文件 Host Remote、持久化和上下文总量边界验收。

## Alpha.4 Client UI 后续更新（2026-10-02）

本准备报告的范围仍然是插件开发前环境盘点。其后的 Alpha.4 已完成画布主次布局、首次使用引导、Task 内添加 File/Prompt、拖动位置保存、连线/右键删除和三种主题。代码、真实 DSH 页面操作及当前隔离 profile/端口以 [`v0.1-alpha.4-ui-acceptance-report.md`](v0.1-alpha.4-ui-acceptance-report.md) 为准；不要用本准备报告的旧端口/流程描述替代最新状态。
