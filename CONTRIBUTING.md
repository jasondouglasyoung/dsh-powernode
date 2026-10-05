# 开发与目录说明

## 项目布局

- `packages/dsh-workflow-plugin/src/domain`：工作流图校验、拓扑顺序与 Markdown 解析。
- `packages/dsh-workflow-plugin/src/shared`：Host/Client 共用 DTO。
- `packages/dsh-workflow-plugin/src/host`：Typert Remote、Agent 调用、存储、路径检查和任务调度。
- `packages/dsh-workflow-plugin/src/client`：DSH 原生 React Flow 插件页面与样式。
- `packages/dsh-typert-protocol`：Typert 生成器分析用的最小类型 shim；不进入工作区依赖、不打入发布包、不参与运行。
- `packages/dsh-workflow-plugin/tests`：Node 内置测试运行器执行的图、导入、存储、路径和恢复测试。

## 环境与命令

需要 Node.js 24、Corepack 和 Git。仓库固定 pnpm `11.7.0`。在仓库根目录执行：

```powershell
corepack pnpm install
corepack pnpm --dir packages/dsh-workflow-plugin run typecheck
corepack pnpm --dir packages/dsh-workflow-plugin run test
corepack pnpm --dir packages/dsh-workflow-plugin run build
corepack pnpm --dir packages/dsh-workflow-plugin pack --pack-destination artifacts
```

完整 `build` 会先生成 Host Typert Remote 契约，再编译客户端并把 React Flow 与工作流 CSS 内嵌到浏览器入口。安装实际 tarball 前，应在 DSH `0.2.0-rc.2` 独立 profile 中验证。

## 修改原则

- DSH 的共享模块需要同时列入 `peerDependencies` 与 `devDependencies`，以复用运行实例。
- Host/Client 通信签名以 `src/host/remote-contract.ts` 和 `lib/typert.remote-client.d.ts` 为准；不要手改 `lib` 生成物。
- 改动 DTO 后同时更新 domain 校验、旧数据迁移、客户端编辑器和测试 fixture。
- 路径限制通过 `realpath` 和最近现存父目录处理，不使用字符串前缀判断安全边界。
- Agent 成功并不等于业务验收通过。输出与人工检查结论由 Host 记录。
- `.env`、DSH Home、用户工作流、会话、附件和运行输出不得进入提交或安装包。
