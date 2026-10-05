# Alpha.14 人工验收清单

状态：**待执行 / BLOCKED**。Computer Use 当前没有返回 DSH 窗口；代码测试、tarball 安装和 TCP listener 不替代以下桌面证据。报告里不得把未执行步骤改成 PASS。请把截图、Run/Attempt 号和工具事件存入本机被 `.gitignore` 排除的验收目录，不要把凭据或访问令牌拍进截图。

## 0. 准备独立测试空间

在 PowerShell 中从仓库根目录运行。这个目录只放本轮 fixture、测试输出和证据，不会改动既有工作流：

```powershell
$ProjectRoot = (Resolve-Path .).Path
$EvidenceRoot = Join-Path $ProjectRoot 'artifacts\pre-release-alpha14-20261004\acceptance-20261004'
$Workspace = Join-Path $EvidenceRoot '验收工作区 中文 20261004'
$OutputDirectory = Join-Path $Workspace 'outputs'
$DshHome = Join-Path $ProjectRoot 'artifacts\pre-release-alpha14-20261004\dsh-home-alpha14-final-final2'
$Brief = Join-Path $Workspace 'inputs\需求说明.md'
$Constraints = Join-Path $Workspace 'inputs\设计约束.md'
Get-FileHash -Algorithm SHA256 $Brief, $Constraints
```

预期：两个输入文件哈希与 [`workspace-fixture-manifest.json`]（本机 artifacts 文件不公开） 相同；`outputs` 初始为空。所有真实 Agent 产物放在该 Workspace 中。

## 1. 在 DSH 桌面端安装候选

Electron `desktop` profile 由 DSH 应用独占管理，CLI 对 `desktop` 返回拒绝。不要用 CLI、文本编辑器或包管理器直接改日常 profile。桌面版本从 Alpha.13 升级前已做本地备份，位置见交付报告。

1. 如 DSH 尚未打开，从 Windows“开始”菜单启动 **DeepSeek Harness**；不要直接双击安装目录中的 exe（本机观察到它会以 0 退出，不创建窗口）。
2. 在应用中的 **Plugins** 管理页（若侧栏没有该项，检查 Settings 内的插件管理入口）查看当前 `dsh-workflow-plugin` 版本。
3. 解压最终 tarball 到新的临时包目录，再选择其 `package` 子目录。不要选择 `.tgz` 文件本身：

   ```powershell
   $PackageStage = Join-Path $EvidenceRoot 'desktop-package-alpha14'
   New-Item -ItemType Directory -Force $PackageStage | Out-Null
   tar.exe -xzf (Join-Path $ProjectRoot 'artifacts\dsh-workflow-plugin-0.1.0-alpha.14.tgz') -C $PackageStage
   $PluginPackage = Join-Path $PackageStage 'package'
   (Get-Content -Raw -Encoding UTF8 (Join-Path $PluginPackage 'package.json') | ConvertFrom-Json) |
     Select-Object name, version
   ```

4. 在 Plugins 管理页按其正常操作替换/加载本地包；如提示先卸载 Alpha.13，确认是插件本身，不要选择清除 DSH Home、会话或插件数据。预期版本为 `0.1.0-alpha.14`。
5. 完全退出并从开始菜单重启 DSH。确认应用窗口正常、插件入口出现；记录插件管理页版本和 DSH Host 启动状态。

截图：插件版本页、工作流侧栏入口、会话中的 `/powernode` 面板。若管理 UI 不接受解压目录或报错，保留报错截图和文字，不手改 profile。

## 2. 工作区、输出目录和原生目录选择

在工作流设置分别点击工作区和输出目录旁的 **选择文件夹**：

- 两次都应打开操作系统目录对话框；选中上面的 Workspace 和 `outputs` 后，输入框正确回填。
- 再打开一次并取消；输入值应完全不变。
- 另将路径首尾加空格并用成对引号包裹后提交；保存应去掉包围空格/引号，同时保留路径内部的中文和空格。
- 保存工作流、切换会话再返回并重开，路径保持一致。
- 输出目录不存在、已存在但位于 Workspace 之外、目录权限不足时应出现明确错误，不能创建 Run 或写出文件。
- 原生 picker 不可用时，检查明确提示和插件内“浏览目录”备用入口；记录实际结果。

截图：Workspace picker、output picker、取消前后值、规范化保存后重开、错误提示。对话框截图应避开其他私人目录名。

## 3. 编辑器、命令草稿和提案

在画布创建 Task、File、Prompt 三类节点；用鼠标建立合法依赖边和上下文边；尝试环路/错误类型边，确认被拒绝并有反馈；删除节点后确认相关边一并清理。确认 File/Prompt 不作为派发任务。

拖动一个 Task 后松开，再次点击该节点，确认仍能选中和编辑；保存并刷新页面，再完全重启 DSH，按 workflowId 比较节点坐标。未能真实完成鼠标拖动时不要用自动静态测试冒充通过。

使用两个普通 DSH 会话 A/B：

- A：发送 `/powernode 请根据 @"<Workspace 的绝对路径>\inputs\需求说明.md" 规划静态介绍页工作流`。观察生成中、完成/失败/取消状态；生成结果只应成为 A 的可编辑草稿，不得自动保存或运行。点击结果入口能回到 A 草稿。
- 在 A 编辑器增加一个未保存改动，切到 B 再返回 A；A 的草稿和改动不能被轮询覆盖，B 不应看到 A 的关联或结果。
- B：先关联一条已保存流程，再发送 `/powernode edit 根据设计约束补齐响应式与深色主题`。记录提案生成；分别验证放弃不改原流程、应用后 revision 增加且 Run 不自动开始。
- 生成提案后在另一个会话修改同一流程，再应用旧提案；预期冲突提示、旧提案仍可查看、更新后的原流程不回滚。准备未发送的聊天草稿，命令完成后确认聊天输入仍保留。
- 普通聊天不输入 `/powernode` 时，不应出现插件模型规划调用。

截图和证据：A/B 会话标识（可脱敏）、生成中与完成入口、应用前 diff、放弃/冲突/应用后 revision。记录每个 Run/Attempt、command/tool 事件和相关 workflow JSON 哈希。

## 4. 独立 Web profile 的真实 Agent 和运行控制

为中断、禁用和双 Host 测试使用专用 DSH_HOME，不在日常 workflow state 上做故障注入。最终候选已装在 `$DshHome` 的 `web` profile；启动命令会经 DSH 正常方式打开本机 UI：

```powershell
Set-Location $ProjectRoot
& '.\scripts\start-dsh-dev.ps1' -DshHome $DshHome -Profile web -Port 3098
```

如隔离 profile 的 Settings → Models 未配置，先在本地 UI 配置一个可用模型；密钥不要写入证据、截图或仓库。保留原有 DSH 安全策略，不扩大 pwsh 权限。

在上述中文空格 Workspace 中建立以下流程：

1. Task 1 读取 `inputs/需求说明.md`，产出 `outputs/plan.md`。
2. Task 2 依赖 Task 1，读取 `inputs/设计约束.md`，产出 `outputs/demo/index.html` 和 `outputs/demo/style.css`。
3. Task 3 依赖 Task 2，核对文件存在、UTF-8、语义结构和 CSS 规则，产出 `outputs/acceptance-report.md`；视口/主题检查设为人工验收。

分别确认工具事件有序、文件内容和 SHA-256 正确。复制一份专用工作流，将预期产物名改成必然缺失文件，验证失败 Attempt 保留、下游阻塞、修改后重试创建新 Attempt。人工验收先驳回再通过，分别留痕。

从 `/powernode` 面板、会话顶部 **工作流** 标签、全局侧栏工作流视图，对同一专用 Run 测试暂停、继续、人工通过、驳回、重试、停止；包括活动中停止及暂停后停止。完成后切换会话再返回。每个入口记录可用/禁用状态、Run/Attempt 和 tool event；同一次点击只应派发一次。保存未发送聊天草稿，切换期间不能被覆盖。

暂停后更改 File/Prompt 并应用新 revision，记录受影响 task、未受影响有效结果复用、旧 Run 快照与产物哈希不变。对同一专用 DSH_HOME 启动第二个 Host（例如另一终端使用端口 `3099`）：第二 Host 应被锁拒绝，不能调度任务。中断测试只终止命令行明确指向 `$DshHome` 的专用 Host PID；重启后应显示 interrupted/恢复提示而不自动重放，重复启动请求应去重。禁用/重新启用只在此 profile 做，并确认运行清理完成、工作流数据未删除。

pwsh 权限对照使用专用的英文目录和 `中文 空格` 目录。普通 DSH Agent 与 Powernode 插件 Agent 各执行文件工具读、写、读回，再用 `pwsh Get-Location` 和创建/读回同名测试文件；分别保存工具名、Run/Attempt、原始错误码和文件哈希。历史 Alpha.13 的 `grantWrite (Win32 5)` 不能代替本轮四格对照。若 file tools 成功而 pwsh 失败，记录为 DSH sandbox/Windows ACL 边界；不改 ACL、不扩权。

## 5. 演示和干净安装闭环

使用上一步最终 Run 输出的 `index.html` + `style.css` 正常打开页面。用浏览器开发者工具响应式模式设为 360px，确认没有横向滚动；记录桌面尺寸、一个中间尺寸、浅/深主题。检查 CSS 无外部 CDN；保留最终文件哈希和浏览器截图。

对干净 profile 重复 README 的 tarball 安装流程，记录安装版本为 Alpha.14、bundle 清单包含 `dsh-web-app`、三个 build 文件 SHA 与安装文件匹配；正常启动 Web Host。通过已认证页面实际打开插件，保存一个测试 workflow，关闭并重开页面/DSH 后比较 workflowId、revision、坐标和目录；触发一次真实 Run，保存 Run/Attempt、工具事件和最终产物。匿名 HTTP `401` 只表示认证开启，不算 UI 访问通过。

截图：360px、桌面浅/深主题、无横向滚动、干净安装的保存前后 workflow、真实 Run 详情与产物。不得截到令牌或 API key。

## 6. 证据与完成回传

每项用 `PASS`、`FAIL`、`BLOCKED` 或 `NOT_RUN` 标记。自动测试、Alpha.13 历史证据和 Alpha.14 本轮真机证据分开；禁止沿用旧版截图作 Alpha.14 通过证据。记录：验证方式、候选版本、入口、Run/Attempt、工具事件、文件内容摘要/SHA-256、截图相对路径及失败原因。将材料保存在：

```powershell
Join-Path $EvidenceRoot 'manual-evidence'
```

把该目录的脱敏副本或关键结果交回后，可继续逐项核对并修复。本清单本身不代表验收通过。

## 可选：核对本轮误建 profile

本轮一次 PowerShell 命令误用了自动变量 `$HOME`，在 `<本机用户目录> 新建了 Alpha.14 CLI profile；无 workflow state、sessions 或 credentials。递归清理请求被环境策略拒绝。若要清理，请先用资源管理器地址栏打开该**单独的 `profiles\web` 子目录**并检查 package manifest；确认它只指向本轮 Alpha.14 后，只删除 `web` 子目录。不要删除 `profiles` 父目录、`.dsh` 或任何其他 profile。
