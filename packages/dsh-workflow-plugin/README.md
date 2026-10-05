# DSH 工作流插件

当前候选包为 `dsh-workflow-plugin@0.1.0-alpha.16`，面向 DeepSeek Harness `0.2.0-rc.2`。Alpha.14 的真实桌面目录选择已复测；Alpha.15 修复了真实模型结构化 edit 响应的操作字段兼容；Alpha.16 加入空白会话中的命令进度入口，并保护未保存画布和运行数据。本包不包含桌面截图或用户历史数据；完整发布结论见源码仓库的 `docs/alpha-preview-acceptance.md`。

## 五分钟使用

1. 在 DSH **Settings → Models** 选择可用模型，并在目标会话选择工作区。
2. 输入 `/powernode` 打开当前会话的工作流面板；无参数打开不调用模型或启动运行。
3. 输入 `/powernode 把一个简单介绍页拆成需求整理、页面制作、结果检查三个任务，产物包含 index.html 和 style.css，先生成流程草稿，不要运行。` 生成可编辑草稿；从命令状态入口打开草稿并检查。
4. 点击“保存”，按需关联 File/Prompt 资料；再次点击“保存”后再运行。
5. 点击“运行”查看任务进度、工具事件和产物；人工验收、暂停、继续、停止与重试都需用户明确操作。

## 命令

- `/powernode`：打开当前会话的工作流编辑面板。没有关联流程时，可手动新建或选择已保存流程。该入口不调用模型，也不创建 `WorkflowRun`。
- `/powernode <目标>`：用 DSH 当前默认模型创建会话专属的可编辑草稿。草稿会跨刷新恢复，不会覆盖已有编辑或改变原关联；用户检查后点“保存”才保存并关联，之后点“运行”才开始执行。
- `/powernode edit <说明>`：对当前会话关联的已保存流程生成结构化编辑建议。命令只保存独立提案；在“工作流”界面检查节点和连线差异，再明确点击“应用修改”或“放弃修改”。应用前原流程不变，不会自动运行。无关联流程、空说明、未处理草稿、未保存画布或活动运行都会给出提示。
- `/powernode <目标>` 和 `/powernode edit <说明>` 会在命令所属会话标题栏显示生成中、完成、失败或取消；成功后提供打开草稿或查看建议的入口。结果仍归属原会话，切换会话不会改写聊天输入框；全局工作流页可恢复待处理草稿/提案。编辑建议只有用户明确应用后才修改流程。
- “工作流设置”中的工作区和输出目录都可输入路径或打开文件夹浏览器。浏览器仅列出文件夹；取消不改变设置。输出目录不存在时，可明确点击“创建输出目录”；这一步不会保存工作流或启动运行。
- 手动粘贴路径支持首尾空格及成对双引号；保留中文与内部空格。换行、控制字符、未配对引号、缺失目录和工作区外路径会被拒绝。
- 运行控制位于工作流界面。`/powernode run/status/pause/resume/stop/retry` 不作为目标提交给模型。

目标里可明确引用工作区内资料：`/powernode 按 @"C:\\path\\to\\workspace\\brief.md" 规划一个介绍页`。Host 核验会话和工作区路径，读取资料时使用 UTF-8 校验；文件最多 2 MiB，文件/提示词总量最多 4 MiB。没有有效工作区时命令会在模型调用前提示补填已存在的绝对目录。

规划专用 Agent 使用 DSH Agent setup、模型选择接口和临时空 preset scope。空 scope 满足 DSH preset 绑定契约，但不加载工作流执行 preset、工具、提示词或技能。规划只解析结构化任务、依赖、验收条件和相对输出产物路径，不启动任务、不写入输出目录、不新增运行记录；意外出现工具调用事件时 Host 会拒绝保存结果。普通聊天 Agent 没有注入工作流工具或提示词。

## 编辑与会话数据

Conversation 顶部“工作流”标签和左侧全局“工作流”入口复用同一个编辑器。顶部标签展示当前会话关联的流程/运行；命令草稿也按 `sessionId` 持久化并经结构化 RPC 加载。全局入口管理所有已保存流程。切换会话不会把其他会话的草稿、关联流程或运行记录放进当前画布。

保存新建命令草稿时，Host 在同一存储事务内检查工作流 revision、会话关联 revision 和草稿 revision；只有显式保存才清除草稿并建立关联。编辑建议有独立 proposalId、基础流程快照和 workflow/association/proposal revision；应用时 Host 再计算差异、检查活动运行并在一次存储事务中将原 workflowId 更新到新 revision，同时清除提案。冲突保留提案和原流程，要求用户重载或重新规划。旧工作流和运行兼容保留，迁移不会推断会话归属。

编辑规划只读取当前关联流程及命令中明确引用的工作区资料，不读取聊天历史。它使用独立规划 Agent 的临时空 preset scope，不挂载执行 preset；支持任务增删改、依赖调整和明确指定的 File/Prompt 调整。文件路径仍需在有效工作区内。已关联流程存在活动运行时，生成和应用编辑提案都会被阻止；运行快照和历史记录不会被编辑改写。

## 开发

```powershell
corepack pnpm --dir packages/dsh-workflow-plugin run typecheck
corepack pnpm --dir packages/dsh-workflow-plugin test
corepack pnpm run pack
```

## 安装

DSH 将 Electron 桌面端的 `desktop` profile 保留给应用自身管理；公开 CLI 会拒绝对它执行启动、配置读取和插件管理。不要对正在使用的 desktop profile 运行 `dsh plugin`，也不要手改其 manifest 或锁文件。

在 DSH 桌面应用的 **Plugins** 管理页安装本地 tarball 时，先解压到长期保留的本机目录，例如 `%LOCALAPPDATA%\DSH\Plugins\dsh-workflow-plugin\0.1.0-alpha.16`，再选择其中直接包含 `package.json` 的 `package` 子目录。管理页接受插件包目录，不接受 `.tgz` 文件路径。该页面会把本地包目录链接到 desktop profile，不能移动或删除此目录；不要选择源码仓库或易清理的临时目录。若准备替换包，先备份工作流状态及需改动的非敏感 profile 配置。插件运行数据位于 `$DSH_HOME/workflow-plugin`，卸载插件不会删除它。

独立复现可使用公开 CLI 管理单独的 DSH profile。以下命令将本地 tarball 安装到随包提供 Web Host 的 `web` profile；命令不会安装到 Electron 桌面端：

```powershell
$dsh = 'C:\path\to\dsh.cmd' # Replace with the dsh.cmd path from your DSH installation.
$profile = 'web'
$package = 'C:\path\to\dsh-workflow-plugin-0.1.0-alpha.16.tgz'
& $dsh plugin --profile $profile add $package
```

首次运行 CLI profile 时，DSH 会从内置 `web` 模板初始化 base 与 Web app。仅包含 `@deepseek-ai/dsh-base` 的自定义 profile 不挂载 Web Host，即使传入 `--port` 也不会创建 Web listener。升级 CLI profile 时可先移除旧包，再添加新包：

```powershell
& $dsh plugin --profile $profile remove dsh-workflow-plugin
& $dsh plugin --profile $profile add $package
```

公开 CLI 的 `desktop` 拒绝行为已在 DSH `0.2.0-rc.2` 上复核。本文中的 CLI 示例仅适用于独立 profile。

验收状态见源码仓库的 Alpha 预览验收与交付报告。禁用或卸载插件不会删除 `$DSH_HOME/workflow-plugin` 下的工作流存档。A01—A20 是 v0.1 全量历史矩阵；本次发布只按 Alpha 预览最低验收清单判断，不宣称 `READY_V0_1`。
