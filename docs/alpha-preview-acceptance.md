# Alpha 公开预览最低验收报告（2026-10-05 当前实测）

## 发布决定（2026-10-05）

用户已决定结束本轮开发与新增验收，以现有 Alpha.16 包发布实验性公开预览。本报告保留原有 PASS、FAIL、NOT_RUN 与历史验收结论，作为发布时的实际能力和已知限制说明。外部上传是否完成以发布记录为准。

公开文件边界：本机 Run/会话标识、profile/运行数据和验收截图保留在 Git 忽略的 artifacts 中；公开文档只保留匿名摘要。


## 结论

状态：**EXPERIMENTAL_PREVIEW_ONLY / PARTIALLY_READY**。唯一候选仍为 dsh-workflow-plugin 0.1.0-alpha.16。它已由 DSH 官方 Plugins 页面安装并可在当前会话运行，但启用插件后的普通重启再次失败；另有一次非斜杠普通消息产生 Powernode 草稿的异常。当前不具备“基础可安装、可使用的 Alpha 公开预览版”发布条件。不得标记 READY_V0_1，也不得把下文未完成项目列作已通过。

原 A01—A20 矩阵仍保存在 docs/v0.1-acceptance-report.md，作为完整 v0.1 的历史验收范围。本报告只记录本次冻结 Alpha 的最低验收和当前证据。

## 候选包与桌面状态

- 包：artifacts/dsh-workflow-plugin-0.1.0-alpha.16.tgz，312,640 字节，SHA-256 5C577FB446E1C54EC44445DFD734D554491FC188E079D0E4A134DC39A4588088。
- DSH：Windows 11，DeepSeek Harness 0.2.0-rc.2。
- 官方安装位置：%LOCALAPPDATA%\DSH\Plugins\dsh-workflow-plugin\0.1.0-alpha.16\package；desktop profile 的官方 junction 指向该长期目录。Plugins 详情最后显示 v0.1.0-alpha.16、组件运行中。
- 包与安装目标文件校验：Host lib/index.js SHA-256 FEBD65389040D8903DF30C058459BBA310F9F0CDDEE7431884BA0E9FF9AADDE4；Client lib/client.js SHA-256 EF59A3FB749D3D28B53D05B67646D1C8488462A921A1A659356E7DECEF017E7C。两者与最终 tarball 清单一致；由 desktop profile junction 解析到上述安装目录。该检查确认当前可加载文件与包一致，不读取进程内存页。
- 安装和运行状态截图保留于 Git 忽略的本机 evidence 目录，不随公开源码分发；包文件校验见本报告与安装清单。

## A. 安装与持久化

| 检查项 | 状态 | 证据 |
|---|---|---|
| 官方 Plugins 安装并启用 Alpha.16 | PASS（当前运行态） | 详情页最后显示 1 个组件运行中；Host/Client 文件由 desktop junction 解析到长期安装目录，哈希与 tarball 一致。 |
| 启用插件后普通退出、重启 | FAIL | 经 DSH 菜单正常退出后启动，窗口明确显示 desktop welcome: Web RPC failed。日志 crash-alpha16-normal-restart-main.log，SHA-256 BE3D17D4388802331BAAF7023826B036703304CD0BAE1E6B235722D912F67AC7。栈停在 DSH 0.2.0-rc.2 的 settingsAndReference → openInitialWindow；未记录插件加载异常，也没有 renderer 错误输出。 |
| 安全恢复后恢复插件和工作流数据 | PASS（仅恢复流程） | 官方安全恢复禁用第三方插件后，DSH 回到欢迎设置；跳过充值提示后返回应用。随后从 Plugins 官方页面重新启用 Alpha.16，详情显示运行中。全局工作流列表可重开本次测试流程，并看到原 Run 和 Attempt；截图保留于本机忽略目录。此项不等同普通重启通过。 |
| 工作区/输出目录原生选择与取消不变 | NOT_RUN（Alpha.16） | Alpha.14 的历史系统对话框证据保留；本轮未在最终候选重复按两个按钮。 |
| 正常退出、无插件对照启动 | NOT_RUN | 本轮重启的安全恢复路径关闭了所有第三方插件，并落到欢迎设置；未单独建立“插件禁用后普通重启”的对照。 |

## B. 生成与编辑

| 检查项 | 状态 | 证据 |
|---|---|---|
| /powernode 带目标生成可编辑草稿，不自动运行 | PASS | 独立 DSH 会话生成三任务介绍页草稿；显式保存为修订 6，之后才手动点击运行。 |
| 无参数 /powernode 只开面板 | NOT_RUN | 本轮未单独执行无参数命令。 |
| edit 提案应用、放弃、冲突 | NOT_RUN | Alpha.15 真实模型生成提案的历史证据保留，但本轮未在 Alpha.16 上实际应用或放弃。 |
| 节点拖动、重开坐标 | NOT_RUN | 已尝试桌面拖动手势，画布坐标没有可确认变化；不记为通过。 |
| 会话切换不串流程 | NOT_RUN | 本轮未完成关联流程会话的切换后操作矩阵。 |
| Task/File/Prompt 和任务依赖 | PASS（结构） | 修订 6 流程有 3 个 Task、1 个 File、1 个 Prompt，依赖链为需求整理→页面制作→结果检查；两个上下文节点连接到任务。运行事件只派发 Task。 |

## C. 真实 DSH Agent 执行

- Run：（本机验收 ID 已省略）；Attempt 1；会话标题为“把一个简单介绍页拆成需求整理、页面制作、结果检查三个任务，产物包含 index.html 和 style.css”；事件共 15 条。最终 UI 为“已完成 / 人工验收完成”，包含 run.accepted。
- Task 1 由真实 DSH Agent 读取 requirements.md 并写出需求文件，之后人工通过；Task 2 读取资料后由 Agent 写出 index.html 和 style.css；Task 3 由 Agent 读取这两个文件并写出 check-report.md，之后人工通过。未使用 Shell 或手工补写代替 Agent 产物。
- 实际文件和 SHA-256：
  - output/requirements.md：10,005 字节，526F75518E1BF50D749A0D6D18F59D33B8C735233EA933202D19336B7AD78BF7。
  - output/index.html：6,954 字节，9605031E001139CC9F39E13E22026682251F74153F5A86F9D4ABF61A11A10EAC。
  - output/style.css：10,481 字节，46D15FA946800826F661767C37468B7343507528D2EA558813B81D1E119B3EE3。
  - output/check-report.md：23,702 字节，60E11409284F3FCF9284D48CC9122913C22858B13F0A7FCCE776CD762A481AF6。
- check-report 对 47 项内容检查标为 43 通过、4 未通过；4 项均涉及文字/链接的颜色对比度。Agent 回读和 Host 的文件存在/内容检查完成，但 Host 明确指出仍需人工核对视觉和测试命令。Run 被人工验收通过不等于 47/47 通过。
- 人工验收：Task 1 与 Task 3 均实际通过；Run 最终通过。Task 2 自动完成。
- 暂停：Run 期间发出 pause 请求，运行在任务边界停下；人工通过后继续处理。未单独点击并验证“继续”按钮，故暂停已观察，明确继续动作 NOT_RUN。
- 停止、停止后无下游派发、缺少预期产物失败和修复后重试：NOT_RUN。

## D. 数据保护与命令边界

- 保存后修改 Task 标题但不保存，点击运行，Alpha.16 桌面显示“有未保存修改，请先保存。”没有启动 Run。恢复并保存后修订为 6。PASS（桌面）。
- 未保存画布时点击“AI 生成流程草稿”，桌面显示先保存或放弃的提示，原画布保留。PASS（桌面）。
- 生成失败保留画布、未保存导入保护、Remote 丢弃提案失败保留提案、空目标不调用模型：PASS（自动回归）；本轮未逐项作真实桌面负向操作。
- 普通聊天边界观察：普通问候“你好，请只用一句话回答你好，不要创建工作流或调用任何插件”只收到普通回复，未见流程草稿。PASS（该输入）。
- 异常输入观察：另一个普通 DSH 消息请求只读 pwsh 检查、没有输入 /powernode，却出现了 Powernode 草稿状态。命令 （本机命令验收 ID 已省略）、草稿 （本机验收 ID 已省略）；没有保存工作流或启动 Run。异常截图为 evidence/desktop-alpha16-unrequested-draft-on-ordinary-chat.jpg。触发源尚未确认，不能宣称所有普通聊天都不会调用工作流命令；该命令边界为 FAIL/未隔离。
- 自动回归、类型检查、构建：候选源码 74/74 测试通过、类型检查退出码 0、构建/打包成功。源代码自该包生成后未改动，本轮只更新交付资料和忽略目录中的证据，因此没有重打 tarball或递增版本。

## E. pwsh / 文件工具范围

插件 Agent 的第一任务调用 pwsh 时曾在工作目录准备阶段报 SetNamedSecurityInfoW failed (Win32 5): grantWrite(…/workspace/output)。需求文件的 read/write 工具仍成功，随后页面制作与结果检查也通过 DSH 文件工具读写。

本轮另在普通 DSH 会话以只读请求运行 pwsh 版本查询。两次命令均在 PowerShell 启动前返回 SetNamedSecurityInfoW failed (Win32 5): grantWrite(…/workspace)；无 stdout，Get-Location 也失败。普通 DSH 与 Powernode Agent 的错误相同，足以定位到 DSH Shell 沙箱准备工作目录时的 ACL 授权限制，而非插件对 ACL 的设置；本轮没有修改 ACL 或放宽安全策略。已验证范围：DSH Agent 的文件读/写/目录/搜索工具可工作；DSH Shell/pwsh 在本测试 workspace 无法通过 grantWrite。未验证 PowerShell 能否在 ACL 不同的目录运行，不能宣传 Windows Shell 兼容。

## 自动化和桌面证据区分

- 自动测试/类型检查/构建：来自 Alpha.16 当前源码；不替代桌面结果。
- 历史证据：Alpha.14 原生文件夹选择、Alpha.15 真实 edit 提案及既有运行控制记录，分别按版本标注，不视为 Alpha.16 复验。
- 本轮真实桌面证据：官方 Plugins 安装/Running、普通重启失败、官方安全恢复及再次启用、修订 6 流程重开、Run/Attempt/工具事件、真实 Agent 文件与哈希、两项未保存保护提示、普通 DSH Shell 对照。
- 本机 artifacts 和截图受 .gitignore 排除，不进入公开源码或 tarball。

## 剩余限制与发布决定

剩余基础阻塞：启用 Alpha.16 时普通重启失败；普通消息出现未请求的 Powernode 草稿。最低清单里 edit 应用/放弃、拖动坐标、文件夹选择、明确继续/停止、失败重试尚未在 Alpha.16 最终包真实复验。其他浏览器/系统、触屏、完整主题/窗口尺寸矩阵、双宿主与崩溃恢复不在本次 Alpha 门槛。

最终结论：**暂缓作为基础可用的 Alpha 公开预览版发布**。只可将现有包标为实验性预览候选，并同步说明上述限制；不得标记 READY_V0_1 或声称桌面重启稳定。
