import type { Member, Scrum, Task, Comment, Project, Invite, Assignee } from '@prisma/client';

/// INVITE

export type SafeInvite<
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string
> = {
	id: string;
	creator: Omit<SafeMember, A>;
	project: Omit<SafeProject<C>, B>;
	expires?: Date;
	usages: number;
};

export type InputInvite<
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string
> = Invite & {
	creator: Omit<InputMember, A>;
	project: Omit<InputProject<C>, B>;
};

export function safeInvite<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string
>(invite: Omit<InputInvite<A, B, C>, T>): Omit<SafeInvite<A, B, C>, T>;
export function safeInvite<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string
>(invite?: Omit<InputInvite<A, B, C>, T>): Omit<SafeInvite<A, B, C>, T> | undefined {
	if (!invite) return;

	const _invite = invite as InputInvite<A, B, C>;

	return {
		id: _invite.id,
		creator: safeMember<A>(_invite.creator),
		project: safeProject<B, C>(_invite.project),
		expires: _invite.expires,
		usages: _invite.usages
	} as SafeInvite<A, B, C>;
}

/// SCRUM

export type SafeScrum<
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string
> = {
	id: string;
	task?: Omit<SafeTask<B, C, D>, A>;
	content?: string;
	column: number;
};

export type InputScrum<
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string
> = Scrum & {
	task?: Omit<InputTask<B, C, D>, A> | null;
};

export function safeScrum<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string
>(issue: Omit<InputScrum<A, B, C, D>, T>): Omit<SafeScrum<A, B, C, D>, T>;
export function safeScrum<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string
>(scrum?: Omit<InputScrum<A, B, C, D>, T>): Omit<SafeScrum<A, B, C, D>, T> | undefined {
	if (!scrum) return;

	const _scrum = scrum as InputScrum<A, B, C, D>;

	return {
		id: _scrum.id,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		task: safeTask<A, B, C, D>(_scrum.task!),
		content: _scrum.content,
		column: _scrum.column
	} as Omit<SafeScrum<A, B, C, D>, T>;
}

/// TASK

export type SafeTask<
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string
> = {
	id: string;
	assignees: Omit<SafeMember, A>[];
	content: string;
	comments: Omit<SafeComment<C>, B>[];
	done: boolean;
};

export type InputTask<
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string
> = Task & {
	assignees: (Assignee & { member: Omit<InputMember, A> })[];
	comments: Omit<InputComment<C>, B>[];
};

export function safeTask<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string
>(issue: Omit<InputTask<A, B, C>, T>): Omit<SafeTask<A, B, C>, T>;
export function safeTask<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string
>(task?: Omit<InputTask<A, B, C>, T>): Omit<SafeTask<A, B, C>, T> | undefined {
	if (!task) return;

	const _task = task as InputTask<A, B, C>;

	return {
		id: _task.id,
		assignees: _task.assignees?.map((a) => safeMember<A>(a.member)),
		content: _task.content,
		comments: _task.comments?.map(safeComment<B, C>),
		done: _task.done
	} as SafeTask<A, B, C>;
}

/// COMMENT

export type SafeComment<A extends symbol | string> = {
	id: string;
	taskId: string;
	author: Omit<SafeMember, A>;
	content: string;
	createdAt: Date;
	system: boolean;
};

export type InputComment<A extends symbol | string> = Comment & {
	author: Omit<InputMember, A>;
};

export function safeComment<T extends symbol | string, A extends symbol | string>(
	comment: Omit<InputComment<A>, T>
): Omit<SafeComment<A>, T>;
export function safeComment<T extends symbol | string, A extends symbol | string>(
	comment?: Omit<InputComment<A>, T>
): Omit<SafeComment<A>, T> | undefined {
	if (!comment) return;

	const _comment = comment as InputComment<A>;

	return {
		id: _comment.id,
		taskId: _comment.taskId,
		author: safeMember(_comment.author),
		content: _comment.content,
		createdAt: _comment.createdAt,
		system: _comment.system
	} as SafeComment<A>;
}

/// MEMBER

export type SafeMember = {
	id: string;
	role: number;
	name: string;
	avatar: string;
};

export type InputMember = Member;

export function safeMember<T extends symbol | string>(
	member: Omit<InputMember, T>
): Omit<SafeMember, T>;
export function safeMember<T extends symbol | string>(
	member?: Omit<InputMember, T>
): Omit<SafeMember, T> | undefined {
	if (!member) return;

	const _member = member as InputMember;

	return {
		id: _member.id,
		role: _member.role,
		name: _member.name,
		avatar: _member.avatar
	} as SafeMember;
}

/// PROJECT

export type SafeProject<A extends symbol | string> = {
	id: string;
	name: string;
	members: Omit<SafeMember, A>[];
};

export type InputProject<A extends symbol | string> = Project & {
	members: Omit<SafeMember, A>[];
};

export function safeProject<T extends symbol | string, A extends symbol | string>(
	project: Omit<InputProject<A>, T>
): Omit<SafeProject<A>, T>;
export function safeProject<T extends symbol | string, A extends symbol | string>(
	project?: Omit<InputProject<A>, T>
): Omit<SafeProject<A>, T> | undefined {
	if (!project) return;

	const _project = project as InputProject<A>;

	return {
		id: _project.id,
		name: _project.name,
		members: _project.members?.map((e) => safeMember<A>(e as Omit<InputMember, A>))
	} as SafeProject<A>;
}
