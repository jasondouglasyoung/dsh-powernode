# 兼容性与环境基线

> **历史环境快照（2026-10-01 至 2026-10-02）**：本文的 `NEEDS_API_KEY`、3081 模型未配置等结论只描述早期的 `workflow-final` 环境快照，不是当前插件状态。Alpha.5 的真实 DSH Agent 记录验证了文件读写；最新兼容性范围见本文末尾的 Alpha.16 复核；Alpha.14 内容为历史快照，以及 [当前交付报告](v0.1-delivery-report.md)。

## Current Alpha.16 compatibility and known limits (2026-10-05)

Verified target: Windows 11, DSH 0.2.0-rc.2, Node 24.18.1 as reported by the desktop host. Alpha.16 was installed and enabled through the official Plugins page; the last captured details page showed Running. The installed Host and Client entrypoint hashes match the candidate tarball.

Two ordinary DSH restarts with the plugin enabled ended at desktop welcome: Web RPC failed. The main-process trace is in DSH welcome initialization and contains no captured plugin exception. Safe recovery launched DSH, then Alpha.16 could be re-enabled in Plugins. A standard restart with the plugin disabled was not completed, so attribution remains unresolved.

DSH file tools succeeded in the isolated acceptance workspace. Ordinary-chat pwsh and Plugin Agent pwsh both failed before process launch while DSH Shell prepared the workspace, with SetNamedSecurityInfoW failed (Win32 5): grantWrite. No ACL or security policy was changed. Do not claim Windows Shell/pwsh support for this host and workspace.

Native directory picker behavior has historical Alpha.14 evidence only; it was NOT_RUN on Alpha.16. Edit apply/abandon, confirmed node-drag persistence, explicit continue/stop, and failed-task retry also remain NOT_RUN on Alpha.16. Other DSH versions and operating systems are unverified. See alpha-preview-acceptance.md for item statuses and release decision.
环境盘点：2026-10-01；收尾复核：2026-10-02（Asia/Shanghai）

| 项目 | 本机结果 | 依据与范围 |
|---|---|---|
| 操作系统与终端 | Windows 11，版本 10.0.26200；Windows PowerShell 5.1.26100.9444 | 本机 PowerShell 进程读取；不是云端 Linux 结果 |
| Node.js | v24.15.0；C:\Program Files\nodejs\node.exe | PATH 中仅发现这一份 Node；符合当前官方 DSH 开发指南列出的 Node 24 支持线 |
| npm | 11.12.1；C:\Program Files\nodejs\npm.cmd | 本机命令可用；registry 包元数据 HTTP 200 |
| pnpm | PATH 中没有独立 pnpm 命令；Corepack 0.34.6 可用，corepack pnpm@11.7.0 输出 11.7.0 | 与当前官方 DSH 开发指南记录的仓库固定版本一致；通过精确 Corepack 调用，未替换全局 Node 或 npm |
| Git | 2.52.0.windows.1；C:\Program Files\Git\cmd\git.exe | 满足官方开发指南要求的 Git 2.26+ |
| VS Code | 1.139.1；<本机用户目录> VS Code\bin\code.cmd | 命令可运行 |
| 浏览器 | Microsoft Edge 154.0.4258.37；C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe | DSH 启动后在 Edge 中出现标题为 DeepSeek Harness 的本地页面 |
| DSH npm 候选 | @deepseek-ai/dsh 0.2.0-rc.2（精确候选） | npm dist-tags 查询时 latest/next 均指向该版；发布包 bin 为 dsh；npm 发布元数据没有 engines 字段 |
| 网络 | github.com HTTP 200；registry.npmjs.org 包元数据 HTTP 200；api.deepseek.com HTTP 401 | GitHub/npm/模型服务网络可达；模型服务 401 表示该探测未认证，不代表 API Key 可用 |

## DSH 依据与适用边界

当前主分支官方开发指南列出 Node 22.19+ 或 24+、Corepack pnpm 11.7.0 和 Git 2.26+；它说明主分支开发环境，不构成 npm 预发布包 API 兼容保证。当前仓库 README 说明通过 npx 启动已发布 Web UI，默认地址为 127.0.0.1:3080；命令行支持 --no-open 与 --port。发布指南说明 DSH 插件 bundle/profile 及 Cordis patch 的打包安装方式。

本机用 @deepseek-ai/dsh@0.2.0-rc.2 的 Web 命令实际启动成功。DSH Home 使用独立目录 <本机用户目录> HTTP 401；DSH 启动时自动打开的 Edge 页面标题为 DeepSeek Harness。启动器不会打印令牌值。

## 已验证范围

- 本机 Node/npm/pnpm/Git/VS Code/Edge 版本与路径已记录；PATH 中只发现一个 Node。
- 插件目录、演示目录、隔离 DSH_HOME、示例和本轮报告文件已建立；演示输入与 examples 中的源文件逐一比较。
- DSH 精确版本实际启动，Edge 中已打开本地页面，服务监听 127.0.0.1:3080。
- 未配置 DEEPSEEK_API_KEY；普通模型对话、DSH 工具写文件/读文件均标为 NEEDS_API_KEY / 未执行，没有用静态或模拟结果代替。

## 尚未验证

插件视图加载、三节点编辑、插件控制 Agent、依赖与上下文边的真实操作、取消及禁用生命周期均属于下一阶段。此基线不表示插件兼容性已经确定。

## 插件实现阶段复核：2026-10-02

| 项目 | 实测结果 | 依据与范围 |
|---|---|---|
| TypeScript Host | 通过 | DSH Host 服务与图、存储和 Agent 适配代码；`corepack pnpm --dir packages/dsh-workflow-plugin run build:host` |
| TypeScript Client | 通过 | React Flow 客户端项目与 DSH Client Remote augmentation；`build:client` |
| 自动化测试 | 8 项通过 | Node 
ode:test`：DAG/边约束、Markdown 依赖、乐观 revision、UTF-8/BOM/大小/hash、输出文件内容检查、junction 路径逃逸、活动运行恢复 |
| DSH UI 与打包加载 | 待隔离 tarball 安装复核 | 仅编译通过尚不等于 DSH 加载通过 |
| 模型/Agent 工具 | NEEDS_API_KEY | 设置页仍显示未配置模型凭据；真实生成与工具调用未执行 |

以上验证仅限 Windows 11、Node v24.15.0 与 DSH `0.2.0-rc.2`。其他平台未验证。
## 官方依据链接

- [DSH 项目 README 与 npm Web 启动方式](https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md)
- [DSH 当前主分支开发指南](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/development.md)
- [DSH 发布插件 bundle/profile 指南](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/develop/basic/publish.md)
- [DSH Agent API 参考](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/core/agent/README.md)
- [DSH 设置卡片示例](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/cookbook/adding-a-settings-card.md)
- [npm 上的 @deepseek-ai/dsh 发布版本信息](https://www.npmjs.com/package/@deepseek-ai/dsh?activeTab=versions)- [官方模型配置指南（DeepSeek API Key：Settings → Models）](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/providers.zh.md)
- [官方浏览器令牌与会话认证说明](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/connection/README.md)

## 最终包实测更新（2026-10-02）

本节更新前面的准备阶段基线。“尚未验证”是插件尚未实现时的历史记录，不再代表当前状态。最终 alpha tarball 已在独立 DSH Home/profile 安装；实际确认工作流画布、三类节点、两类边、Host Remote 文件预览与 SHA-256、保存和重载，以及 4 MiB 上下文限制反馈。A01–A20 的状态与边界见 [`v0.1-acceptance-report.md`](v0.1-acceptance-report.md)。

本次隔离 profile 为 `workflow-final`，DSH Home 为 `<本机用户目录> 3081。既有开发 Home/3080 服务未改动。Settings → Models 未配置 API Key，故模型生成和真实 DSH Agent 工具调用仍未验证。

仓库构建通过 Corepack pnpm 11.7.0；DSH 的 profile 插件安装器在隔离 Home 中通过 pnpm shim 完成安装。验证仅覆盖 Windows 11、Node 24.15.0 和 DSH 0.2.0-rc.2，不表示其它平台/版本已兼容。

## Historical Alpha.14 release-candidate review（2026-10-04）

候选版本 `0.1.0-alpha.14` 仍锁定 DSH `0.2.0-rc.2`、Cordis `~4.0.4`、Node `24.15.0` 和 Corepack pnpm `11.7.0`。完整类型检查、69/69 自动测试、Host/Client build 通过。最终 tarball 为 308,669 bytes、39 个成员；独立 DSH Home 的内置 `web` profile 安装退出码 0，bundle 含 `dsh-base`、`dsh-web-app` 与插件。Host/Client/Remote client 的安装 SHA 与构建完全一致，启动 ready 后 TCP listener 可连接；不带访问令牌的 HTTP 返回 401。该检查确认 DSH Web Host 启动和认证边界，不表示实际画布、保存/重开或 Agent 执行已经验收。

此前无 listener 的 CLI 实例是 base-only 自定义 profile，缺少 `@deepseek-ai/dsh-web-app`；这类 profile 不会挂载 Web server。使用随包 `web` 模板后，未安装插件的对照与最终 Alpha.14 profile 均能正常启动并监听，因此没有证据将前次现象归因于 npx 下载或插件 loader。

DSH CLI 对 `desktop` profile 显式返回 `profile "desktop" is managed exclusively by the Electron application`。当前正常桌面应用已重新启动，日常 `<本机用户目录> 仍安装 Alpha.13；本轮没有通过直接写 profile 文件绕过 Electron 管理。Computer Use 没有返回可用 app/window，因此 Alpha.14 的原生 picker、三个入口的运行控制、生成反馈、桌面响应尺寸、保存重开和真实模型/Agent 仍未确认。兼容范围仍仅限 Windows 11 / DSH 0.2.0-rc.2，不作跨平台声明；候选结论为 `PARTIALLY_READY`。



---

## Alpha.16 desktop compatibility update (2026-10-04)

实测平台：Windows 11 / DSH `0.2.0-rc.2` / Node 24.15.0 / pnpm 11.7.0。Alpha.14 通过 Plugins 页加载，工作区与输出原生目录选择器都打开系统对话框。Alpha.15 真实模型 edit 建议成功保存为会话提案。

普通退出后，第三方插件保持启用时 DSH welcome 初始化出现 `Web RPC failed`；官方 safe recovery 先禁用插件后可进入，再从 Plugins 页重新启用 Alpha.15 显示 Running。错误与插件启用共现，但仍没有隔离出具体插件还是 DSH 宿主原因。Alpha.16 未重启验证；不作跨版本或跨平台兼容通过宣称。
