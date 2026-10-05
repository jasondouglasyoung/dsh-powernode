# v0.1 DSH 插件集成清单与结果

本清单按 `dsh-version.txt` 锁定 DSH `0.2.0-rc.2` 实际执行，不把构建结果冒充运行结果。

| 项目 | 状态 | 实测摘要 |
|---|---|---|
| Cordis bundle/profile 包、manifest、Host 与 Client 构建 | PASS | 根目录 alpha tarball 包含构建产物，隔离 profile 安装成功 |
| DSH 原生视图及三类节点 | PASS | 侧栏“工作流”可打开；Task/File/Prompt 出现在可编辑画布 |
| 两类边及关系验证 | PASS | 真实画布显示 Task dependency 与上下文关联；确定性用例覆盖非法方向/环 |
| DSH Host Remote 文件读取 | PASS | Host 返回 UTF-8 文件正文与 SHA-256；有效 README 路径 |
| Host Remote 保存/重开 | PASS | 保存修订1，重载恢复工作流、节点、边和布局 |
| 上下文 4 MiB 汇总上限 | PASS | 3 份 1,600,003 字节文件触发真实 UI 反馈；Agent 与 Run 未创建 |
| 插件禁用/启用和数据保留 | PASS（空闲） | 侧栏按钮消失/恢复；工作流仍在 state.json。没有活动 Agent，因此不能验证活动资源取消 |
| 模型生成计划 | BLOCKED | 隔离 profile 的模型设置显示尚需 API Key |
| DSH Agent 创建输出及真实工具调用 | BLOCKED | 模型 Key 缺失；无真实对话/工具调用/产物记录 |
| 活动 Run 暂停/取消、重试、运行中断恢复 | BLOCKED | 需要可运行 Agent 的模型配置 |

详细状态与复现命令见 [`v0.1-acceptance-report.md`](v0.1-acceptance-report.md) 和 [`v0.1-delivery-report.md`](v0.1-delivery-report.md)。
