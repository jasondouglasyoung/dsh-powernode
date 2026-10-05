# Changelog

## 0.1.0-alpha.16 - 2026-10-05 (Alpha preview candidate)

- Keep `/powernode` progress and result access visible from the root conversation header when the command session has no rendered conversation header yet. The result action retains the originating session ID.
- Add regression coverage for latest-command session attribution and root-header registration.
- Block Run and apply-and-run while a saved workflow has unsaved edits, with an explicit save-first message.
- Protect an edited canvas and any unfinished Run from AI plan replacement or Markdown import; keep the prior canvas and run view after generation errors.
- Check the Remote discard result before clearing an edit proposal, label the action “AI 生成流程草稿”, and keep a new workflow's goal empty until the user enters one.
- Add regressions for dirty-canvas/run guards, generation goals, unfinished Run protection, import protection, and failed proposal discard handling.

## 0.1.0-alpha.15 — 2026-10-04 (candidate)

- Match the edit planner's operation schema to the parser and accept the `type`/`ref` aliases returned by the real DSH model, so valid edits become reviewable proposals instead of failing before persistence.
- Add a regression using the observed model response shape; proposal generation still leaves the saved workflow unchanged until explicit apply.

## 0.1.0-alpha.14 — 2026-10-04 (candidate)

- Inject DSH 0.2.0-rc.2's `remote.directoryPicker` namespace in the Cordis context passed to the rendered panel; keep the in-plugin directory browser available with an explicit fallback message.
- Split session initialization, command-draft subscription, theme subscription, and Run polling so fresh polled Run objects no longer restart session initialization or keep session controls busy.
- Keep editor callbacks stable across Run updates, read current editor/proposal data from refs, and guard start/control actions against repeated dispatch while an action is in flight.
- Show `/powernode` draft and edit-proposal progress in the originating conversation header, with completion and error/cancel states and a button to reopen the result.
- Add regressions against Cordis's real nested namespace injection contract and session callback dependency stability.
- Document the Electron-owned desktop profile boundary and keep CLI installation examples scoped to standalone profiles; use the shipped `web` bundle for clean browser-hosted reproductions.

## 0.1.0-alpha.13 — 2026-10-03

- Add a lightweight global recovery index for unsaved command-generated drafts so slash-command-only sessions can be reopened after switching sessions or restarting DSH.
- Surface direct draft recovery guidance in `/powernode` command feedback.
- Strip chained draft-only/run-control wording from the trailing objective while preserving real business requests such as generating a workflow diagram.
- Use DSH `0.2.0-rc.2`'s public `directoryPicker.pick()` Remote for operating-system folder selection, retain the plugin browser as a fallback, and validate chosen paths through the Host before adopting them.
- Retry only bounded Windows transient file-replacement errors while persisting state; never delete the previous state file as a fallback.
- Add regressions for recovery-index persistence, operation-clause separation, native picker contract, and transient atomic-replace errors.

## 0.1.0-alpha.12 — 2026-10-03

- Keep `/powernode edit` planning inside a child of the command's real DSH Agent session; add a session-header recovery action and a global index for pending proposals, including older proposals that lack their original instruction text.
- Validate explicit edit targets and compare Host-computed graph changes against requested insertions, renames, and dependencies. Ask the isolated planner for one bounded completion when needed, then reject incomplete proposals instead of reporting success.
- Add separate workspace/output folder browsing and explicit output-directory creation. Normalize surrounding whitespace and paired copied-path quotes while preserving Chinese names and legal internal spaces; reject control characters, missing directories, non-directories, and paths escaping the workspace.
- Keep new-plan generation on the verified existing workspace when no workflow is associated. Execution still checks that the selected output directory exists and is writable; planning, saving settings, and choosing folders do not create output files or runs.
- Extend regressions for proposal recovery, partial edits, path handling, folder boundaries, and explicit run-control intent; update acceptance separately from real DSH/model evidence.

## 0.1.0-alpha.11 — 2026-10-03

- Implement `/powernode edit <instruction>` as a session-scoped, structured edit proposal. Review and explicitly apply or discard it in the shared workflow editor; generation never changes the saved workflow or starts a run.
- Preserve workflow and untouched node/edge identities, compute a visible diff, and atomically apply against workflow, association, and proposal revisions. Block edits while the workflow has an active run or the canvas has unsaved changes.
- Persist proposals separately from new-workflow drafts, migrate older state without inferring associations, and cancel planning before persistence on abort or plugin unload.
- Separate planning-control text from business goals so “generate a workflow draft” does not become a business task while actual diagram deliverables remain intact.
- Add regression coverage for structured edits, graph/path validation, proposal persistence, conflict/discard/apply, concurrent sessions, late results, cancellation, unload, and command objective parsing.

## 0.1.0-alpha.10 — 2026-10-03

- Read trusted session identity and working directory from the DSH 0.2 `SessionInspection.meta` contract; add regression coverage for the actual metadata shape.

## 0.1.0-alpha.9 — 2026-10-03

- Route `/powernode <goal>` through the native Host command handler and create a structured, editable, session-scoped draft with a separate planning Agent.
- Give planning Agents a temporary empty preset scope to satisfy DSH's preset-binding invariant without loading execution tools, prompts, or skills; reject any unexpected tool-call event. Validate explicit `@absolute-path` workspace references and preserve their File nodes and context edges.
- Persist command drafts independently from saved workflows, restore them after reload, and use revision checks when the user saves or discards them.
- Keep the no-argument command as navigation only; explicitly reject `/powernode edit <instruction>` until Phase 3.
- Add regression coverage for missing workspaces, explicit references, cancellation, duplicate submissions, concurrent sessions, model errors, draft recovery, and unload cleanup.

## 0.1.0-alpha.8 — 2026-10-03

- Register the native `/powernode` command, reject unsupported arguments with explicit feedback, and add a native Conversation `工作流` view using the same editor component.
- Add session-to-workflow associations with optimistic revisions, migration from schema v1/v2 without auto-binding legacy workflows, atomic save-and-link, and tombstones for deleted workflows.
- Validate session identity through the Host SessionController and scope workflow and run RPCs to that session; opening the editor does not create a run or call a model.
- Retain editor state per session and ignore late results after navigating to another session; add regression coverage for command/view lifecycle, association conflicts, migration, deletion, and cross-session run isolation.

## 0.1.0-alpha.7 — 2026-10-03

- Return the active-run cleanup promise from the Cordis effect disposer so plugin unload waits for runs to cancel and release their resources.
- Add a regression test that holds an Agent active and confirms unload cleanup stays pending until the Agent exits.

## 0.1.0-alpha.6 — 2026-10-02

- 增加“应用修改并运行”：从暂停或结束的运行基于已保存修订创建子运行，暂停中的旧运行先取消并记录 superseded 关系。
- 仅复用任务语义、上下文、依赖结果和产物哈希全部匹配的成功结果；复用任务没有伪造本次 Agent 尝试，并保留来源运行与尝试编号。
- 新增回归覆盖修订影响范围、依赖后继失效、跨修订结果复用、磁盘产物变更检测、暂停运行替代和重复启动请求去重。

## 0.1.0-alpha.5 — 2026-10-02

- Create workflow Agents with the DSH default model selection and preset composition through the public `setup` hook, so normal tools and permissions are mounted.
- Persist the resumed state before waking pause waiters, serialize run actions, return the latest run record, and keep the page polling shared state.
- Recover runs only while holding the profile run lock; a live owner is left alone, and interrupted runs now have an explicit recovery action that preserves human-review boundaries.
- Treat aborts during Agent work, pause waits, and task review waits as cancellation rather than execution failure.
- Clear and filter run details when the current workflow changes.
- Place AI-generated tasks and reference nodes in separate non-overlapping canvas lanes.
- Add regression coverage for Agent setup/tool events, resume dispatch, cancellation stages, live and invalid locks, manual-review recovery, workflow history ownership, and draft layout.

## 0.1.0-alpha.4 — 2026-10-02

- Preserve React Flow node measurements when controlled workflow state updates positions, so nodes remain visible, hit-testable, and editable after dragging.
- Continue persisting only workflow data and node positions; layout measurements stay in the client view state.

## 0.1.0-alpha.3 — 2026-10-02

- Rebuilt the workflow entry as a first-use screen with explicit create/open actions and a short guide to tasks, files, prompts, dependencies, and context.
- Made the canvas the main work area, moved objective/workspace/output fields into collapsible settings, and made node details conditional with independent scrolling.
- Added task-node controls to create and auto-link file/prompt context nodes; fixed their placement and kept edges while React Flow reports drag/selection changes.
- Added node context-menu deletion with edge cleanup, host-persisted light/dark/system theme selection, and DSH token-based canvas styling.
- Fixed the sidebar icon so the host-rendered label remains horizontal.

## 0.1.0-alpha.1 — 2026-10-02

- Added DSH Host/Client plugin entry points and a React Flow workflow canvas.
- Added task, file, and enabled prompt nodes; dependency/context edge validation; deterministic topological dispatch order.
- Added Markdown import, model-generated editable plans, optimistic workflow revisions, per-run workflow/context snapshots, and SHA-256 metadata.
- Added serialized Agent execution, pause-at-boundary, stop, failed task retry, manual review, automatic file existence/content checks, and interrupted-run recovery.
- Added workspace containment and symlink-aware path checks, atomic local persistence, and a 64 MiB store limit.
- Known alpha limits: no model API key was available for real LLM/tool execution; command checks, immutable managed asset copies, and full crash/disable integration are not verified; only Windows has been exercised.
