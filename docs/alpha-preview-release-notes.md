# dsh-workflow-plugin 0.1.0-alpha.16 实验性预览说明

**发布类型：Alpha.16 实验性公开预览。** 用户已决定在上一轮结束开发与验收，按现有包分发；以下已知限制随发布保留。

候选安装包：artifacts/dsh-workflow-plugin-0.1.0-alpha.16.tgz  
大小：312,640 字节  
SHA-256：5C577FB446E1C54EC44445DFD734D554491FC188E079D0E4A134DC39A4588088  
验证宿主：Windows 11，DeepSeek Harness 0.2.0-rc.2。当前桌面 Plugins 页面安装并显示组件运行中。

## Alpha.16 内容

- /powernode 命令可生成按会话归属的工作流草稿；草稿需显式保存，流程需显式运行。
- 编辑建议独立展示；用户检查后才应用。运行控制和 Agent 工具事件在工作流面板显示。
- 未保存流程不能直接运行；未保存编辑不能被草稿生成或 Markdown 导入静默覆盖。
- 详细安装和五分钟使用说明见仓库 README.md。

## 本机已知限制

- 启用插件后普通退出再启动出现 desktop welcome: Web RPC failed。官方安全恢复后可以重新打开 DSH 并在 Plugins 页面重新启用，但这不是正常启动通过。
- DSH Shell/pwsh 在测试工作区启动前遇到 SetNamedSecurityInfoW failed (Win32 5): grantWrite。该调用没有产生 stdout；插件 Agent 的 DSH 文件读写工具工作正常。没有修改 ACL 或安全策略，不承诺 Windows Shell 可用。
- 有一条不含 /powernode 的普通会话消息出现过 Powernode 草稿入口；没有保存或运行，但触发源未隔离。不要依赖普通消息绝不会触发草稿的保证。
- 本次真实 Agent 生成的简单介绍页检查报告有 4/47 项颜色对比度未通过。桌面排版尺寸/主题和其他宿主未完整验证。
- 文件夹原生选择、edit 应用/放弃、节点拖动后坐标、停止控制、明确继续按钮、失败重试尚未在 Alpha.16 最终安装包上完成全部实机复验。历史 Alpha.14/15 证据另行标明，不代替当前候选。

## 安装与五分钟试用

1. 将 tgz 解压到长期保留目录；在 DSH 的 Plugins → 添加插件中选择含 package.json 的 package 子目录。
2. 启用后到 Plugins 详情确认版本与运行状态。当前测试宿主的普通重启存在上述已知失败。
3. 在 DSH Settings → Models 配置模型并选择工作区；输入 /powernode 打开面板，或输入 /powernode <目标> 生成草稿。
4. 检查任务和资料，点“保存”。再次确认后点“运行”；File 与 Prompt 只提供上下文，不派发为 Agent 任务。
5. 在运行详情检查 Attempt、工具事件、输出文件及人工验收状态。草稿不会自动运行。

完整逐项状态见 docs/alpha-preview-acceptance.md。
