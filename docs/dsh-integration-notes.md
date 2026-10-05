# DSH 接入记录

## 锁定基线

- DSH CLI 与运行时：`@deepseek-ai/dsh@0.2.0-rc.2`
- Cordis：`~4.0.4`
- Host/Client 实现依赖全部锁定到 DSH `0.2.0-rc.2`
- React Flow：`@xyflow/react@12.11.6`
- Node.js：本机 `v24.15.0`；Corepack pnpm `11.7.0`

不以 DSH 主分支 API 代替锁定包类型。Host 服务继承 `TypertRemoteService` 并通过 `@Remote` 描述方法；`tsdown` 的 `typertPlugin({mode:'package', faces:['host']})` 生成 Host 与 remote-client 契约。客户端用 `ctx.remote.dshWorkflow` 调用，结果必须经 `RemoteResult` 解包。

生成器在本机独立工作区中会把 Host/Client 项目纳入 Typert 分析。DSH protocol 包的发布包不包含生成器扫描所需的完整 source 树，且 Agent/Session 的 TypertLookup ambient declaration 会扩大扫描范围。为此 `packages/dsh-typert-protocol` 放置只用于分析的最小声明，Host 聚合 tsconfig 将其纳入引用；该目录不是 pnpm workspace 项目，也不会发布或进入运行代码。运行时仍外部引用真实 DSH protocol peer dependency。

## Agent 与会话生命周期

Alpha.5 按 DSH `0.2.0-rc.2` 普通会话使用的公开组合方式创建独立 Agent：通过 `ctx.agentPresets.resolve()` 取得当前默认 preset，在 `agents.create` 的 `setup` 中调用 `installModelSelection(agentCtx, selectionRef)` 并 `ctx.agentPresets.mount(agentCtx, presetId)`，同时写入 `meta.agentPreset`。因此模型路由、preset 声明的工具、权限和工作区服务来自 DSH 的正常组合与审批机制；插件不解析 DSML，也不自行替宿主授予工具权限。`createUserMessage`、`agent.whenIdle()`、取消时的 `agent.cancel()`、最后 `handle.dispose()` 仍按原生命周期使用。插件监听 `session/event`，仅接受本次 `sessionId` 的 assistant 最终消息与真实工具调用事件。

该机制依据当前安装的 `@deepseek-ai/dsh-api-session-controller@0.2.0-rc.2` 普通会话实现 `composeAgent`（源码中先 resolve preset、在 setup 内安装模型选择并 mount preset，再传给 `agents.create`），以及 `@deepseek-ai/dsh-agent` 的 `AgentSetup` / `installModelSelection` 公共类型，`@deepseek-ai/dsh-agent-preset-registry` 的 `resolve` / `mount` API。插件将 preset registry 声明为 `0.2.0-rc.2` peer dependency，并在 Host service injection 中声明 `agentPresets`。

AgentHandle `dispose()` 会注销 Agent 并移除其 session；因此本插件把运行摘要和最终回复写入自己的持久记录，不承诺卸载后仍可从 DSH 会话面板恢复执行 session 原始日志。工具权限沿用 profile 当前配置；插件 prompt 会约束写入输出目录，但无法在插件层强制 DSH OS 工具的只读沙箱。

## 客户端入口

浏览器入口为 `src/client/index.tsx`，bundle 输出 `lib/client.js`。客户端导入 API Gateway、Layout、Sidebar、Renderer 的 `/client` 面，使用 Slots 注册原生主面板与侧栏入口；第三方 DSH 模块通过 `dsh.client.inject/external` 外部化。React Flow 及其 CSS 与本插件 CSS 打入一份浏览器 JavaScript，免去安装时遗漏样式资源。

## 版本化安装

插件包声明 DSH peer 版本与 `dsh.bundle.patch`。隔离 profile 通过 DSH 官方 `dsh plugin --profile <name> add <package>` 安装预构建 tarball；CLI 会调用 profile 本地 pnpm 并重启 profile 才加载新的 bundle 层。实际命令是否通过与本地 profile 名称、端口记录在 `v0.1-delivery-report.md`。

## 验证记录

Alpha.4 初期 UI 检查曾记录模型尚未配置；之后的 Alpha.4 独立验收确认同一 profile 已配置模型，普通 DSH 会话真实完成文件 `write` 和 `read`。这两条记录时间不同，不能用较早的 UI 报告覆盖后续状态。插件 Alpha.4 Agent 本身仍未产生真实工具事件；Alpha.5 的代码测试、真实 DSH Agent 结果和剩余阻塞以 [`v0.1-alpha.5-fix-and-acceptance-report.md`](v0.1-alpha.5-fix-and-acceptance-report.md) 为准。不得把模拟器结果当作真实 DSH 工具调用。

## 参考

- [DSH Agent package README](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/core/agent/README.md)
- [DSH Typert generator README](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/typert/generator/README.md)
- [DSH plugin publish guide](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/develop/basic/publish.md)
- [DSH model provider settings](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/providers.zh.md)

## 最终包在 DSH 0.2.0-rc.2 的真实客户端生命周期

实际安装后，Remote 服务被注册且 Host 端文件预览、工作流保存/重载均成功。Client 需要按以下时序绑定：

1. 插件 `inject` 静态依赖只声明 `remote` 根服务、`layout`、`slots`。
2. 在 `apply(ctx)` 中执行 `await ctx.remote.$mount(TYPERT_REMOTE)`，加载 Typert 生成的客户端 Remote namespace。
3. mount 完成后，再动态 `await ctx.inject(['remote.dshWorkflow'], callback)`，于 callback 中读取 `remote.dshWorkflow` 并注册 UI。

如果把 `remote.dshWorkflow` 静态列入插件 `inject`，Cordis 会在调用插件 `apply` 之前等待该 namespace；而 namespace 只能由 `apply` 里的 `$mount()` 创建，形成循环等待。动态 inject 避免了这个启动死锁。

Typert Remote namespace 下的方法名不能与子服务名冲突。最初方法 `remove` 与 `dshWorkflow/remove` namespace 服务冲突；改为 `removeWorkflow` 后可以挂载。两项问题均通过真实页面首次打开、调用 Host Remote 文件读取及保存重载复核。

模型与 Agent 调用仍需 API Key；本次真实验证没有把边界检查异常误报为 Agent Run。

## Alpha.14 候选：原生目录选择器注入

Alpha.13 桌面截图复现 `cannot get property "remote.directoryPicker" without inject`。锁定的 `@deepseek-ai/dsh-api-workspace-controller@0.2.0-rc.2` 把 `directoryPicker` 暴露为独立 Cordis Remote 子服务；注入 `remote` 根命名空间只允许访问 `remote`，不能直接读 `ctx.remote.directoryPicker`。

Alpha.14 在 `dsh.client.inject` 声明 `@deepseek-ai/dsh-api-workspace-controller`，并在 `dsh.client.external` 与客户端副作用导入中声明 `/client`。`apply()` 先 `$mount(TYPERT_REMOTE)`，再注入 `remote.dshWorkflow`；检测到 `remote.directoryPicker` 后继续执行 `await remoteCtx.inject(['remote.directoryPicker'], ...)`，并把该子注入 Context 传给真实渲染面板。嵌套 Fiber 等待注册完成，Fiber 销毁时负责释放 UI listener/style。服务缺失时面板仍注册，原生按钮明确提示使用插件内“浏览目录”备用入口。

`tests/client-bundle.test.mjs` 以锁定依赖的真实 Cordis `Context` 和 `Service` 验证命名空间规则：只 inject 根服务时对子服务访问必须抛出 missing-inject；再 inject 子服务才可调用 picker。它没有预置一个普通对象属性来掩盖作用域约束。Alpha.14 安装 tarball 的 Client SHA-256 与构建输出一致，但由于 Computer Use 无法取得真实窗口，系统原生对话框尚未在 Alpha.14 桌面确认。

## Alpha.14 候选：会话控制与 slash 命令反馈

Run 轮询由 `sessionGetRun` 返回新对象。Alpha.13 的 `openCommandDraft` 同时依赖 `run`、`workflow`，会话初始化 effect 又依赖该回调；每次 poll 更新 Run 都会让 effect cleanup/restart，重复请求 `sessionState/sessionRuns`，期间反复把 `busy` 置为 `true`。Alpha.13 的独立 UI 证据显示会话面板控制按钮一直 disabled，而全局视图能操作同一 Run。报告没有原始 RPC 计数，因此不补写猜测数字。

Alpha.14 将订阅、初始化、主题监听和 Run polling 拆开，打开草稿/提案回调通过 refs 读取最新编辑状态，减少依赖变化；开始和运行控制用同步 ref 防止重复 dispatch。`/powernode` 进度监听 `session/event` 的 `command/run` 与 `command/done`，状态按源 sessionId 保存；标题栏有完成/失败/取消状态和对应草稿/提案入口，不改聊天输入框或自动启动 Run。自动测试覆盖 callback 依赖、会话状态隔离和终态；逐入口的真实请求次数、按钮恢复与切换会话行为仍需 Alpha.14 桌面复验。


