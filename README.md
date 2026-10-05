# DSH 工作流插件 Alpha 预览版

本仓库提供一个面向 DeepSeek Harness 的可安装工作流插件。当前候选为 `dsh-workflow-plugin@0.1.0-alpha.16`，目标宿主为 DSH `0.2.0-rc.2`。本次发布范围是基础可安装、可使用的 Alpha 公开预览版；原 A01—A20 全量验收矩阵保留为 v0.1 正式版历史基线，不作为本次 Alpha 的发布门槛。当前实测状态与限制见[Alpha 预览验收报告](docs/alpha-preview-acceptance.md)和[交付报告](docs/v0.1-delivery-report.md)。

> **版本发布已撤回（2026-10-05）。** GitHub 仓库保留源码，Alpha.16 Release、下载附件和发布标签已删除；当前没有公开发行安装包。已知限制包括本机普通重启失败、普通消息后草稿入口的触发源未隔离，以及测试工作区的 Windows Shell/pwsh 沙箱授权失败。以下安装与使用说明、[验收报告](docs/alpha-preview-acceptance.md)和[历史发布说明](docs/alpha-preview-release-notes.md)保留供源码评估。
## 安装

桌面端 `desktop` profile 由 DSH 应用管理。请通过应用内 **Plugins** 页面安装；不要用公开 CLI 管理桌面 profile，也不要手改 profile 文件。

1. 下载最终 `.tgz` 包。
2. 将包解压到长期保留的目录，例如 `%LOCALAPPDATA%\DSH\Plugins\dsh-workflow-plugin\0.1.0-alpha.16`。该目录不要放在临时目录、源码构建目录或会定期清理的位置。
3. 在 DSH 左侧打开 **Plugins → 添加插件**，选择解压结果中直接包含 `package.json` 的 `package` 子目录。管理页接受插件目录，不接受 `.tgz` 文件本身。
4. 启用插件。若 DSH 提示需重启，正常退出并重新打开应用；回到 Plugins 页检查版本和运行状态。
5. 保留安装目录原位。桌面管理器会把本地目录链接到 profile，移动或删除目录会让已安装插件失效。

也可在 PowerShell 解压：

```powershell
$PluginTgz = 'C:\path\to\dsh-workflow-plugin-0.1.0-alpha.16.tgz'
$PluginInstallRoot = Join-Path $env:LOCALAPPDATA 'DSH\Plugins\dsh-workflow-plugin\0.1.0-alpha.16'
New-Item -ItemType Directory -Force -Path $PluginInstallRoot | Out-Null
tar.exe -xzf $PluginTgz -C $PluginInstallRoot
```

选择 `$PluginInstallRoot\package`。卸载插件不会删除工作流存档；除非确实要清空数据，不要删除 DSH 的 `workflow-plugin` 数据目录。

## 五分钟使用

1. 在 DSH 的 **Settings → Models** 选择一个可用模型，并在目标会话中选好工作区。
2. 普通对话输入 `/powernode` 打开当前会话的工作流面板。无参数命令只打开界面，不调用模型、不创建运行。
3. 输入目标生成可编辑草稿，例如：

   ```text
   /powernode 把一个简单介绍页拆成需求整理、页面制作、结果检查三个任务，产物包含 index.html 和 style.css，先生成流程草稿，不要运行。
   ```

   命令会显示生成状态和结果入口。打开草稿、检查任务及资料后，点击“保存”。生成草稿不会自动运行。
4. 需要参考资料时，在工作流编辑器添加 File 或 Prompt 节点，并连到对应任务。保存后再运行；File 和 Prompt 只提供上下文，不作为任务派发。
5. 点击“运行”后在运行详情查看任务、尝试、工具事件和产物。暂停、继续、停止、失败重试和人工验收均由用户明确操作。流程有未保存修改时，运行会提示先保存。

`/powernode edit <修改说明>` 会生成独立差异提案。检查差异后明确点击“应用修改”或“放弃修改”；应用和运行是分开的操作。更完整的会话归属、路径边界和数据说明见包内 README 与项目验收报告。

## 开发验证

```powershell
corepack pnpm install
corepack pnpm --dir packages/dsh-workflow-plugin run typecheck
corepack pnpm --dir packages/dsh-workflow-plugin test
corepack pnpm run pack
```

插件本地目录安装会保留链接目标，因此桌面验收也使用长期安装目录；公开安装包不依赖开发者源码目录。当前只针对 Windows 11 与 DSH `0.2.0-rc.2` 验证。其他操作系统、触屏、其他 DSH 版本、完整响应式与主题矩阵及崩溃/双宿主恢复不在本次 Alpha 验收范围。
