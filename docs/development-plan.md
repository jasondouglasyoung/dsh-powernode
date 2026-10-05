# v0.1 开发阶段记录

## 当前进度：Alpha.5 六项缺陷修复

2026-10-02 已修复 Alpha.4 独立验收提出的六项问题。依据 DSH `0.2.0-rc.2` 已安装包中的公共 Agent preset registry、Agent setup 和普通会话组合方式接入模型/preset；补充暂停继续、run action 并发、中断恢复、取消分类、workflowId 隔离与草稿布局回归。`corepack pnpm --dir packages/dsh-workflow-plugin test` 构建通过、20/20 测试通过；Alpha.5 包已安装到 `workflow-ui-alpha4`，3084 宿主启动。

真实页面验收尚未执行：本环境的 CUA 返回 `Browser is not available: iab`，`cua.getState()` 只列出 Edge 扩展。遵从本轮要求没有改用 Edge；Alpha.5 的真实 Agent、六项页面操作、双宿主以及真实宿主退出恢复目前均为 BLOCKED/NOT_RUN。完整矩阵和日志见 [Alpha.5 修复与验收报告](v0.1-alpha.5-fix-and-acceptance-report.md)。

## 当前进度：Alpha.4 UI 修订

2026-10-02 完成 Client 排版与画布交互改造，构建为 `0.1.0-alpha.4` 并安装到隔离 DSH profile。真实 UI 验收覆盖节点内新建/自动关联 File 与 Prompt、拖拽和位置重载、dependency 连线、右键删除清理、浅色/深色/系统主题、长路径和多窗口尺寸。测试时还发现并修复了 Alpha.3 拖动后节点不可命中的问题。详见 [Alpha.4 UI 验收报告](v0.1-alpha.4-ui-acceptance-report.md)。

Alpha.4 的 DSH Host 文件预览与保存重载真实通过；本地 Node 测试 8/8 通过。测试 profile 未配模型密钥，因此 AI 计划生成与真实 Agent 派发仍未运行。本轮没有读取密钥内容，也没有改动既有 `workflow-final` profile。

下表是 v0.1 核心功能阶段的历史记录；Alpha.4 的当前 UI 状态以新验收报告为准。

| 阶段 | 内容 | 状态与证据 |
|---|---|---|
| 0. 环境复核 | 阅读准备报告/指南，复核 DSH 锁定包、profile、模型与工具 | 完成；隔离测试 profile 的模型未配 API Key |
| 1. 插件契约与骨架 | Host/Client 双构建、manifest、Typert Remote、画布入口 | 完成；Alpha.1 包已真实安装并在 DSH 中打开 |
| 2. 领域模型与画布 | Task/File/Prompt、两类边、编辑、Markdown 导入、计划草稿入口 | 完成；当前 Alpha.4 UI 交互另见新验收报告；计划生成需模型 |
| 3. 上下文与存储 | UTF-8/BOM、大小/路径、SHA-256、快照、revision、原子持久化 | 完成；8 项测试及真实文件 Remote、保存重载和 4 MiB 限制通过 |
| 4. Agent 执行与验收 | 独立 session、串行 DAG、暂停/停止/重试、文件/文本检查、人工验收 | 代码与确定性验证完成；真实 Agent 行为受模型 API Key 阻塞 |
| 5. 故障与恢复 | 图反例、路径越界、陈旧 revision、恢复中断、不自动重放 | 代码/单测覆盖完成；真实活动进程中断及多 Host 并发未验收 |
| 6. 本机 DSH 集成 | 隔离安装、插件菜单/画布、Host Remote、Alpha.4 UI 交互 | 完成；Windows 11 / DSH `0.2.0-rc.2` / `workflow-ui-alpha4`，真实 Agent 未运行 |
| 7. 打包交付 | 包清单、SHA-256、兼容性、验收/交付报告 | Alpha.4 已打包并安装；SHA-256、截图和复现命令见 Alpha.4 UI 报告 |

## 范围边界

该阶段未提交、推送或发布；未访问/输出凭据内容；未改动 `workflow-final` 与原 DSH Home 的已有工作流数据。具体 Agent 和故障恢复限制见 [验收矩阵](v0.1-acceptance-report.md)。
