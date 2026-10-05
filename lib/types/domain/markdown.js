import { MAX_WORKFLOW_TEXT_BYTES, WorkflowValidationError } from './graph.js';
function byteLength(value) {
    return new TextEncoder().encode(value).byteLength;
}
export function importWorkflowMarkdown(source, defaults) {
    const text = source.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
    if (byteLength(text) > MAX_WORKFLOW_TEXT_BYTES) {
        throw new WorkflowValidationError('import.size', '导入文本超过 2 MiB。');
    }
    const lines = text.split('\n');
    const title = lines.find((line) => /^#\s+\S/.test(line))?.replace(/^#\s+/, '').trim() ?? '导入工作流';
    const objective = lines
        .slice(0, lines.findIndex((line) => /^##\s+/.test(line)) < 0 ? lines.length : lines.findIndex((line) => /^##\s+/.test(line)))
        .filter((line) => !/^#\s+/.test(line))
        .join('\n')
        .trim() || title;
    const headingIndices = lines.flatMap((line, index) => /^##\s+\S/.test(line) ? [index] : []);
    const sections = headingIndices.map((start, index) => ({
        title: lines[start].replace(/^##\s+/, '').trim(),
        body: lines.slice(start + 1, headingIndices[index + 1] ?? lines.length).join('\n').trim(),
    }));
    if (sections.length === 0)
        sections.push({ title, body: text.trim() });
    if (sections.length > 30)
        throw new WorkflowValidationError('task.limit', '导入文件包含超过 30 个任务。');
    const tasks = sections.map((section, index) => {
        const id = `task-${index + 1}`;
        const instructions = section.body || `完成“${section.title}”。`;
        return {
            type: 'task',
            id,
            title: section.title,
            instructions: instructions.replace(/^依赖\s*[:：].*$/m, '').trim() || `完成“${section.title}”。`,
            acceptanceCriteria: [`人工核对“${section.title}”的执行结果和关联产物。`],
            expectedArtifacts: [],
            expectedContents: [],
            acceptanceMode: 'manual',
            order: index,
            position: { x: 64 + (index % 4) * 285, y: 64 + Math.floor(index / 4) * 175 },
        };
    });
    const byTitle = new Map(tasks.map((task, index) => [task.title.toLocaleLowerCase(), tasks[index]]));
    const edges = [];
    for (let index = 0; index < sections.length; index += 1) {
        const section = sections[index];
        const task = tasks[index];
        const declaration = section.body.match(/^依赖\s*[:：]\s*(.+)$/m)?.[1];
        if (!declaration)
            continue;
        for (const dependencyTitle of declaration.split(/[,，、]/).map((part) => part.trim()).filter(Boolean)) {
            const dependency = byTitle.get(dependencyTitle.toLocaleLowerCase());
            if (!dependency)
                throw new WorkflowValidationError('import.dependency', `任务“${task.title}”引用了不存在的依赖“${dependencyTitle}”。`);
            edges.push({ type: 'dependency', id: `edge-${edges.length + 1}`, source: dependency.id, target: task.id });
        }
    }
    return {
        id: defaults.id,
        title,
        objective,
        workspaceDirectory: defaults.workspaceDirectory,
        outputDirectory: defaults.outputDirectory,
        schemaVersion: 1,
        revision: 0,
        nodes: tasks,
        edges,
        createdAt: defaults.now,
        updatedAt: defaults.now,
    };
}
//# sourceMappingURL=markdown.js.map