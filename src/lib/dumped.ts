import type { SafeMember, SafeTask, SafeComment, SafeScrum } from '$lib/server/safe';

export type DumpedMember = {
	id: string;
	projectId: string;
	avatar: string;
	name: string;
	role: number;
};

export type DumpedTask = {
	id: string;
	projectId: string;
	content: string;
	done: boolean;
};

export type DumpedScrum = {
	id: string;
	projectId: string;
	content?: string;
	taskId?: string;
};

export type DumpedComment = {
	id: string;
	projectId: string;
	taskId: string;
	content: string;
	authorId: string;
	system: boolean;
	createdAt: string;
};

export type DumpedAssignee = {
	projectId: string;
	taskId: string;
	memberId: string;
};

export type Dumped = {
	id: string;
	name: string;
	members: DumpedMember[];
	tasks: DumpedTask[];
	scrums: DumpedScrum[];
	comments: DumpedComment[];
	assignees: DumpedAssignee[];
};

export function undump(dumped: Dumped): {
	id: string;
	name: string;
	members: SafeMember[];
	tasks: SafeTask<'', '', ''>[];
	scrums: SafeScrum<'', '', '', ''>[];
} {
	const { members } = dumped;

	const comments = dumped.comments.map((comment) => {
		const _comment = comment as unknown as SafeComment<''>;
		_comment.author = members.find((m) => m.id === comment.authorId)!;
		return _comment;
	});

	const tasks = dumped.tasks.map((task) => {
		const _task = task as unknown as SafeTask<'', '', ''>;
		_task.assignees = dumped.assignees
			.filter((a) => a.taskId === task.id)
			.map((a) => members.find((m) => m.id === a.memberId)!);
		_task.comments = comments.filter((c) => c.taskId === task.id);
		return _task;
	});

	const scrums = dumped.scrums.map((scrum) => {
		const _scrum = scrum as unknown as SafeScrum<'', '', '', ''>;
		_scrum.task = scrum.taskId ? tasks.find((t) => t.id === scrum.taskId) : undefined;
		return _scrum;
	});

	return {
		id: dumped.id,
		name: dumped.name,
		members,
		tasks,
		scrums
	};
}
