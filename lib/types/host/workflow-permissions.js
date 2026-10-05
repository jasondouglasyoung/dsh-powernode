/** Snapshot before async initialization: defaults for new sessions can differ
 * from the user's selection in the conversation that starts the workflow. */
export function captureWorkflowPermissions(parent) {
    if (!parent)
        return undefined;
    const presets = parent.ctx.get('permissionPresets');
    const preset = presets?.current(parent.session);
    const bundle = preset && preset !== 'custom' ? presets?.resolve(preset) : undefined;
    const sandbox = parent.ctx.get('sandboxPolicy')?.resolve({ session: parent.session }).mode ?? bundle?.sandbox;
    const approval = parent.ctx.get('approval')?.overrideOf(parent.session) ?? bundle?.approval;
    return {
        ...(preset && preset !== 'custom' ? { preset } : {}),
        ...(sandbox ? { sandbox } : {}),
        ...(approval ? { approval } : {}),
    };
}
/** Seed the child before publication. Never widen permissions or bypass an
 * approval merely because a task requires a write. */
export function applyWorkflowPermissions(session, permissions) {
    if (!permissions)
        return;
    if (permissions.preset)
        session.append('permission/preset', { preset: permissions.preset });
    if (permissions.sandbox)
        session.append('sandbox/mode', { mode: permissions.sandbox, source: 'delegation' });
    if (permissions.approval)
        session.append('approval/policy', { policy: permissions.approval, source: 'delegation' });
}
//# sourceMappingURL=workflow-permissions.js.map