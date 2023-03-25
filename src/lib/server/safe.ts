import type { Member, Issue, Comment, Project, Invite } from '@prisma/client';

// TODO: figure out how to type these
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

/// ISSUE

export type SafeIssue<
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string,
	E extends symbol | string,
	F extends symbol | string,
	G extends symbol | string
> = {
	id: number;
	author: Omit<SafeMember<A, B>, A>;
	assignee?: Omit<SafeMember<C, D>, C>;
	title: string;
	createdAt: Date;
	closedAt?: Date;
	comments: Omit<SafeComment<F, G>, E>[];
};

export type InputIssue<
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string,
	E extends symbol | string,
	F extends symbol | string,
	G extends symbol | string
> = Issue & {
	author: Omit<InputMember<A, B>, A>;
	assignee?: Omit<InputMember<C, D>, C>;
	comments: Omit<InputComment<F, G>, E>[];
};

export function safeIssue<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string,
	E extends symbol | string,
	F extends symbol | string,
	G extends symbol | string
>(issue: Omit<InputIssue<A, B, C, D, E, F, G>, T>): Omit<SafeIssue<A, B, C, D, E, F, G>, T>;
export function safeIssue<
	T extends symbol | string,
	A extends symbol | string,
	B extends symbol | string,
	C extends symbol | string,
	D extends symbol | string,
	E extends symbol | string,
	F extends symbol | string,
	G extends symbol | string
>(
	issue?: Omit<InputIssue<A, B, C, D, E, F, G>, T>
): Omit<SafeIssue<A, B, C, D, E, F, G>, T> | undefined {
	if (!issue) return;

	const _issue = issue as InputIssue<A, B, C, D, E, F, G>;

	return {
		id: _issue.id,
		author: safeMember<A, B>(_issue.author),
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		assignee: safeMember<C, D>(_issue.assignee!),
		title: _issue.title,
		createdAt: _issue.createdAt,
		closedAt: _issue.closedAt,
		comments: _issue.comments?.map(safeComment<E, F, G>)
	} as SafeIssue<A, B, C, D, E, F, G>;
}

/// COMMENT

export type SafeComment<A extends symbol | string, B extends symbol | string> = {
	id: number;
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
	id: number;
	role: number;
	name: string;
	createdAt: Date;
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
		createdAt: _member.createdAt,
		project: safeProject<A, B>(_member.project as Omit<InputProject<A, B>, B>),
		avatar: _member.avatar
	} as SafeMember<A, B>;
}

/// PROJECT

export type SafeProject<A extends symbol | string, B extends symbol | string> = {
	id: number;
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
