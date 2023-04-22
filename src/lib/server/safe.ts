import type { Member, Scrum, Task, Comment, Project, Invite, Assignee } from '@prisma/client';

/// INVITE

export type SafeInvite<A extends symbol | string, B extends symbol | string> = {
	id: string;
	creator: SafeMember<A, B>;
	project: SafeProject<A, B>;
	expires?: Date;
	usages: number;
};

export type InputInvite<A extends symbol | string, B extends symbol | string> = Invite & {
	creator: InputMember<A, B>;
	project: InputProject<A, B>;
};

export function safeInvite<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string
>(invite: Omit<InputInvite<A, B>, T>): Omit<SafeInvite<A, B>, T>;
export function safeInvite<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string
>(invite?: Omit<InputInvite<A, B>, T>): Omit<SafeInvite<A, B>, T> | undefined {
	if (!invite) return;

	const _invite = invite as InputInvite<A, B>;

	return {
		id: _invite.id,
		creator: safeMember<A, B>(_invite.creator),
		project: safeProject<A, B>(_invite.project),
		expires: _invite.expires,
		usages: _invite.usages
	} as SafeInvite<A, B>;
}

/// SCRUM

export type SafeScrum<
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string,
	E extends symbol | string,
	F extends symbol | string
> = {
	id: string;
	task?: Omit<SafeTask<B, C, D, E, F>, A>;
	content?: string;
	column: number;
};

export type InputScrum<
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string,
	E extends symbol | string,
	F extends symbol | string
> = Scrum & {
	task?: Omit<InputTask<B, C, D, E, F>, A> | null;
};

export function safeScrum<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string,
	E extends symbol | string,
	F extends symbol | string
>(issue: Omit<InputScrum<A, B, C, D, E, F>, T>): Omit<SafeScrum<A, B, C, D, E, F>, T>;
export function safeScrum<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string,
	E extends symbol | string,
	F extends symbol | string
>(scrum?: Omit<InputScrum<A, B, C, D, E, F>, T>): Omit<SafeScrum<A, B, C, D, E, F>, T> | undefined {
	if (!scrum) return;

	const _scrum = scrum as InputScrum<A, B, C, D, E, F>;

	return {
		id: _scrum.id,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		task: safeTask<A, B, C, D, E, F>(_scrum.task!),
		content: _scrum.content,
		column: _scrum.column
	} as Omit<SafeScrum<A, B, C, D, E, F>, T>;
}

/// TASK

export type SafeTask<
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string,
	E extends symbol | string
> = {
	id: string;
	assignees: Omit<SafeMember<A, B>, A>[];
	content: string;
	comments: Omit<SafeComment<D, E>, C>[];
	done: boolean;
};

export type InputTask<
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string,
	E extends symbol | string
> = Task & {
	assignees: (Assignee & { member: Omit<InputMember<A, B>, A> })[];
	comments: Omit<InputComment<D, E>, C>[];
};

export function safeTask<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string,
	E extends symbol | string
>(issue: Omit<InputTask<A, B, C, D, E>, T>): Omit<SafeTask<A, B, C, D, E>, T>;
export function safeTask<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string,
	E extends symbol | string
>(task?: Omit<InputTask<A, B, C, D, E>, T>): Omit<SafeTask<A, B, C, D, E>, T> | undefined {
	if (!task) return;

	const _task = task as InputTask<A, B, C, D, E>;

	return {
		id: _task.id,
		assignees: _task.assignees?.map((a) => safeMember<A, B>(a.member)),
		content: _task.content,
		comments: _task.comments?.map(safeComment<C, D, E>),
		done: _task.done
	} as SafeTask<A, B, C, D, E>;
}

/// COMMENT

export type SafeComment<A extends symbol | string, B extends symbol | string> = {
	id: string;
	author: Omit<SafeMember<A, B>, A>;
	content: string;
	createdAt: Date;
};

export type InputComment<A extends symbol | string, B extends symbol | string> = Comment & {
	author: Omit<InputMember<A, B>, A>;
};

export function safeComment<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string
>(comment: Omit<InputComment<A, B>, T>): Omit<SafeComment<A, B>, T>;
export function safeComment<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string
>(comment?: Omit<InputComment<A, B>, T>): Omit<SafeComment<A, B>, T> | undefined {
	if (!comment) return;

	const _comment = comment as InputComment<A, B>;

	return {
		id: _comment.id,
		author: safeMember(_comment.author),
		content: _comment.content,
		createdAt: _comment.createdAt
	} as SafeComment<A, B>;
}

/// MEMBER

export type SafeMember<A extends symbol | string, B extends symbol | string> = {
	id: string;
	role: number;
	name: string;
	project: Omit<Omit<SafeProject<A, B>, 'members'>, B>;
	avatar: string;
};

export type InputMember<A extends symbol | string, B extends symbol | string> = Member & {
	project: Omit<Omit<InputProject<A, B>, 'members'>, B>;
};

export function safeMember<A extends symbol | string, B extends symbol | string>(
	member: Omit<InputMember<A, B>, A>
): Omit<SafeMember<A, B>, A>;
export function safeMember<A extends symbol | string, B extends symbol | string>(
	member?: Omit<InputMember<A, B>, A>
): Omit<SafeMember<A, B>, A> | undefined {
	if (!member) return;

	const _member = member as InputMember<A, B>;

	return {
		id: _member.id,
		role: _member.role,
		name: _member.name,
		project: safeProject<A, B>(_member.project as Omit<InputProject<A, B>, B>),
		avatar: _member.avatar
	} as SafeMember<A, B>;
}

/// PROJECT

export type SafeProject<A extends symbol | string, B extends symbol | string> = {
	id: string;
	name: string;
	members: Omit<Omit<SafeMember<A, B>, 'project'>, A>[];
};

export type InputProject<A extends symbol | string, B extends symbol | string> = Project & {
	members: Omit<Omit<InputMember<A, B>, 'project'>, A>[];
};

export function safeProject<A extends symbol | string, B extends symbol | string>(
	project: Omit<InputProject<A, B>, B>
): Omit<SafeProject<A, B>, B>;
export function safeProject<A extends symbol | string, B extends symbol | string>(
	project?: Omit<InputProject<A, B>, B>
): Omit<SafeProject<A, B>, B> | undefined {
	if (!project) return;

	const _project = project as InputProject<A, B>;

	return {
		id: _project.id,
		name: _project.name,
		members: _project.members?.map((e) => safeMember<A, B>(e as Omit<InputMember<A, B>, A>))
	} as SafeProject<A, B>;
}
