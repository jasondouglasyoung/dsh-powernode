# Codex progress checkpoint (current Alpha preview)

公开文件边界：本机 Run/会话标识、profile/运行数据和验收截图保留在 Git 忽略的 artifacts 中；公开文档只保留匿名摘要。


## Current checkpoint (2026-10-05, frozen Alpha.16)

Release goal is the basic installable/usable public Alpha preview, not full READY_V0_1. A01–A20 remains the historical v0.1 matrix; current minimum checks are in alpha-preview-acceptance.md.

Candidate: dsh-workflow-plugin@0.1.0-alpha.16 for DSH 0.2.0-rc.2. Decision: **暂缓基础 Alpha 公开预览；仅可标记 EXPERIMENTAL PREVIEW ONLY**.

- Alpha.16 source contains the bounded data-safety fixes: unsaved edits block Run and apply-and-run; dirty canvases and active runs are protected from AI generation or Markdown import; empty objectives remain empty; generation errors preserve the canvas; Remote discard failures preserve proposals; run revision snapshots are shown.
- The frozen candidate had 74/74 automatic tests pass, typecheck pass, and build/pack success. Source and package contents have not changed during this closeout.
- The one candidate package is 312,640 bytes, SHA-256 5C577FB446E1C54EC44445DFD734D554491FC188E079D0E4A134DC39A4588088.
- DSH official Plugins UI installed/enabled Alpha.16; the last captured details page showed the component Running. The desktop profile junction resolves to the long-lived installation directory; installed Host/Client entrypoint hashes match the tarball.
- Two ordinary restart logs show desktop welcome: Web RPC failed. The main-process stack is in DSH settingsAndReference → openInitialWindow with no captured plugin exception. Official safe recovery opened DSH; Alpha.16 was re-enabled in Plugins and showed Running. A normal restart with the plugin explicitly disabled was not verified, so the fault is not attributed solely to the plugin or DSH.
- A real DSH Agent completed a three-task dependent file workflow in the isolated test workspace: Run Attempt 1 produced requirements.md, index.html, style.css and check-report.md; the UI showed 15 events and manual acceptance. The report passed 43/47 checks; four contrast checks failed.
- The desktop blocked Run on unsaved edits and blocked AI plan replacement while the canvas had unsaved changes. Directory picker, edit apply/abandon, confirmed node-drag persistence, explicit continue/stop, and failed-task retry are NOT_RUN on Alpha.16.
- Ordinary DSH pwsh and Plugin Agent pwsh both failed at the DSH Shell sandbox grantWrite preparation step with Win32 5. DSH file tools succeeded; no ACL or security policy was changed.
- One ordinary message without /powernode showed an unrequested draft entry. It was neither saved nor run; the trigger remains unisolated.
- Computer Use returned failed to activate captured window after refreshed selection. No direct desktop profile edit was made. This blocked the disabled-plugin restart control and further UI checks.
- No source edit, version bump, repackage, Git commit, push, tag, Release, or npm publish occurred during this closeout.

The exact remaining item statuses and local evidence inventory are recorded in alpha-preview-acceptance.md and v0.1-delivery-report.md.

---

## Historical checkpoint (2026-10-04, Alpha.16)

Candidate `dsh-workflow-plugin@0.1.0-alpha.16`; DSH `0.2.0-rc.2`; overall **PARTIALLY_READY**.

- Typecheck passed; automatic tests **70/70 passed**; build and pack succeeded.
- Final tarball `artifacts/dsh-workflow-plugin-0.1.0-alpha.16.tgz`: 310,354 bytes, 39 members, SHA-256 `525AAEFF97A007B98002A01ACBDFAF89D7CCF9B5CF23F11BB42643E9F1155100`.
- Alpha.14 was installed with DSH Plugins; both native picker buttons opened system dialogs, cancel preserved the value, and Chinese/internal-space path save/reopen plus workspace boundary feedback were observed.
- Alpha.14 real `edit` exposed model `type/ref` versus parser `op/target`. Alpha.15 fixed normalization and prompt. Real Alpha.15 command `（本机命令验收 ID 已省略）` created proposal `（本机验收 ID 已省略）`, retaining workflow revision 1 and creating no Run.
- Alpha.16 adds root-header progress/result access. Package is staged; workflow state was backed up. Desktop profile is still Alpha.15; Alpha.16 installation/load and UI verification are BLOCKED.
- Normal DSH restart with the plugin enabled produced `desktop welcome: Web RPC failed`. Safe recovery started with third-party plugins disabled; re-enabling Alpha.15 in Plugins showed Running. Cause is not isolated; Alpha.16 restart is NOT_RUN.
- A01, A02–A18, A20 remain BLOCKED. A19 is PASS for package/content check only. See [`v0.1-acceptance-report.md`](v0.1-acceptance-report.md).
- Electron `desktop` is managed by DSH; use Plugins UI, never CLI/direct profile replacement. No remote commit, push, tag, Release, or npm publish was done.
---

## Historical Alpha.14 checkpoint details (superseded by current checkpoint)

最后更新：2026-10-04（Asia/Shanghai）  
源码仓库：`$ProjectRoot`；分支 `master`；仍无 Git commit。  
候选：`dsh-workflow-plugin@0.1.0-alpha.14`，宿主 DSH `0.2.0-rc.2`。  
总体状态：**PARTIALLY_READY，暂缓正式发布**。只有 A19 通过；A01—A18 与 A20 中桌面交互和真实执行仍未通过。

## 当前安装和数据状态

- DSH Electron 应用已从 Windows 注册的开始菜单入口启动，窗口进程及内部 Host listener `19387` 存在。日常 desktop profile 仍装 Alpha.13；Alpha.14 没有通过 CLI 或手改文件替换进该 profile。
- DSH CLI `@deepseek-ai/dsh@0.2.0-rc.2` 源码明确拒绝 `--profile desktop`（`desktop` 由 Electron 独占管理）。安装器实际返回该错误，退出码 1；日常 profile 配置和插件状态哈希未变化。Computer Use 仍报告 `apps: []`、`browsers: []`，不能安全操作插件 UI。
- 本机 desktop profile 的备份、状态哈希和会话/运行元数据不纳入公开报告；当时执行前已在本机备份并确认受测操作未覆盖既有数据。
- 隐藏 DSH 进程组第一次非强制退出失败；确认无活动 Run/锁并完成备份后，按用户授权强制退出旧进程树，再通过 Windows 开始菜单注册入口正常重新启动。最终重启后的 DSH 正在运行，插件版本仍 Alpha.13。
- 最终 tarball：`artifacts/dsh-workflow-plugin-0.1.0-alpha.14.tgz`，308,669 bytes，39 members，SHA-256 `4569C90E19A54DD447DE40B1F1E599CA60231C38C135352F1B424091D0DD412B`。包未含源码目录链接；Host/Client/Remote Client 的安装哈希与 build 相同。
- 最终 tarball 通过官方 CLI 安装到全新、任务专用 DSH_HOME 的内置 `web` profile；bundle 含 `dsh-base`、`dsh-web-app` 和插件。启动脚本收到 ready 事件并验证 TCP `3098` 可连接；匿名 HTTP 返回 `401`，没有记录访问 token。停止该隔离 Host 后 listener 已关闭。页面 UI、保存/重开、真实 Agent 执行仍未做。
- 启动阻塞已定位：此前无端口的自定义 profile 只有 `dsh-base` + 插件，没有 `dsh-web-app`；DSH/npx 已启动但没有 Web app server。内置 `web` profile 与装有最终候选的 `web` profile 均通过启动与 listener 检查，因此此前证据不支持“下载卡住”或“插件启动失败”。
- 一次安装脚本试跑将只读 PowerShell `$HOME` 当作变量，CLI 因此在 `<本机用户目录> 新建并安装了独立测试 profile。核查该目录有 887 个文件，无 workflow state、sessions 或 credentials；与日常 `<本机用户目录> 分离。自动审批策略阻止了删除该精确目录的请求（`blocked by policy`）；没有尝试绕过。用户可按[人工验收清单](manual-acceptance-checklist-alpha14.md)末尾步骤手动核对清理。

## 修复和验证

1. **directoryPicker missing-inject**：客户端 manifest 注入/externalize workspace-controller client；挂载 Remote 后等待 `remote.directoryPicker` 子服务注册，并将真实 Cordis 子 Context 传入面板。服务不可用时仍有插件内目录浏览备用和清楚提示。测试使用真实 Cordis `Context`/`Service`，先复现仅注入 root `remote` 的错误，再验证嵌套注入后的 picker；普通属性 mock 不构成测试证据。原生系统对话框、选择回填、取消不变仍 BLOCKED。
2. **会话按钮持续 disabled**：Run poll 返回新对象导致依赖 `run/workflow` 的 `openCommandDraft` 每秒换身份；初始化 effect 因而清理重启，重复请求 session state/runs 并保持 busy。Alpha.13 报告没有 RPC 次数，故不编造数字。Alpha.14 将初始化、草稿订阅、主题订阅、Run poll 分开，回调从 refs 读状态并保持稳定，in-flight guard 防重复 dispatch，finally 恢复 busy。自动回归通过；三入口实时请求数和按钮恢复仍需桌面验证。
3. **`/powernode` 结果反馈**：命令事件映射为 session-scoped generating/complete/failed/cancelled；原命令会话提供草稿/提案入口，不覆盖聊天输入框，不自动保存、应用或运行。自动测试覆盖会话隔离；真实模型事件仍需桌面验证。
4. **启动辅助脚本**：仅当 profile bundle 包含 `@deepseek-ai/dsh-web-app` 才启动 Web profile；只在 ready 事件后连接 TCP 才输出 verified listener；遮盖 token/API key。官方安装脚本区分内置和自定义 profile，并处理 PowerShell native stderr。

验证日志：`artifacts/pre-release-alpha14-20261004/typecheck-final.log`、`test-final.log`、`build-final.log`、`pack-final-desktop-boundary.log`。完整自动测试 69/69 通过；类型检查、构建、打包退出码 0。构建保留 React Flow `use client` 与 Zustand CJS `import.meta` 上游提示。详细包内容、源文件扫描与 A01—A20 状态见[交付报告](v0.1-delivery-report.md)和[验收矩阵](v0.1-acceptance-report.md)。

## A01—A20 状态

- A01—A18：BLOCKED。自动回归和 Alpha.13 历史证据分别标示；Alpha.14 桌面交互、真实模型/Agent、控件入口、节点拖动持久化、锁争用/中断恢复、HTML/CSS 视口检查等未复验。
- A19：PASS。最终包清单、许可证、第三方声明、敏感信息扫描已更新至最终 tarball。
- A20：BLOCKED。干净安装与 Host listener 子步骤通过；Web UI、README 保存/重开和真实执行缺少证据。
- 逐点击位置、测试目录、示例命令、预期结果和截图列表见[Alpha.14 人工验收清单](manual-acceptance-checklist-alpha14.md)。

## pwsh 权限对照

历史插件 Agent 在中文空格目录报 `SetNamedSecurityInfoW failed (Win32 5): grantWrite(...)`。插件代码只向 DSH Agent 传 `meta.cwd`，没有 grantWrite/ACL 修改；普通本机 PowerShell 在英文与中文空格目录均可写并读回。真正区分普通 DSH 会话与插件 Agent 的 pwsh/file-tool 测试由于 UI 不可用为 NOT_RUN；不改 ACL、不放宽 sandbox，现阶段归因是宿主 sandbox/本机 ACL 授权边界的待证假设。

## 发布边界

- 公开仓库和 npm 包的文件清单/敏感扫描在最终文档更新后重生成；本地 artifacts、备份、profile、会话数据和截图均由 `.gitignore` 排除。
- 本轮没有 commit、push、tag、远程 Release 或 npm publish。首个提交候选清单放在忽略的 pre-release artifacts 中，最终审阅清单见交付报告。
- 需要用户实际完成 UI 插件安装和人工验收后，才能据结果继续修复并更新本轮证据。历史记录保存在 [`codex-progress-alpha13-before-update.md`]（本机 artifacts 文件不公开）、[`acceptance-alpha13-before-update.md`]（本机 artifacts 文件不公开） 及独立 Alpha.13 report/evidence。
