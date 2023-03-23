import type { Member, Issue, Comment, Project, Invite } from '@prisma/client';

// TODO: figure out how to type these
export type SafeInvite = {
	id: string;
	creator: SafeMember;
	project: SafeProject;
	expires?: Date;
	usages: number;
};

export type InputInvite = Invite & {
	creator: Member;
	project: Project;
};

export function safeInvite<T extends keyof InputInvite & keyof SafeInvite>(
	invite?: Pick<InputInvite, T>
): Pick<SafeInvite, T> | undefined {
	if (!invite) return;

	const _invite = invite as InputInvite;

	return {
		id: _invite.id,
		creator: safeMember(_invite.creator),
		project: safeProject(_invite.project),
		expires: _invite.expires,
		usages: _invite.usages
	} as SafeInvite;
}

export type SafeProject = {
	id: number;
	name: string;
	members: SafeMember[];
};

export type InputProject = Project & {
	members: Member[];
};

export function safeProject<T extends keyof InputProject & keyof SafeProject>(
	project?: Pick<InputProject, T>
): Pick<SafeProject, T> | undefined {
	if (!project) return;

	const _project = project as InputProject;

	return {
		id: _project.id,
		name: _project.name,
		members: _project.members?.map(safeMember)
	} as SafeProject;
}

export type SafeMember = {
	id: number;
	role: number;
	name: string;
	createdAt: Date;
	project: SafeProject;
	avatar: string;
};

export type InputMember = Member & {
	project: InputProject;
};

export function safeMember<T extends Partial<InputMember>>(
	member?: T
): (T & SafeMember) | undefined {
	if (!member) return;

	return {
		id: member.id,
		role: member.role,
		name: member.name,
		createdAt: member.createdAt,
		project: safeProject(member.project),
		avatar: member.avatar
	} as T & SafeMember;
}

export type SafeIssue = {
	id: number;
	author: SafeMember;
	assignee?: SafeMember;
	title: string;
	description: string;
	createdAt: Date;
	closedAt?: Date;
	comments: SafeComment[];
};

export type InputIssue = Issue & {
	author: Member;
	assignee?: Member | null;
	comments: (Comment & { author: Member })[];
};

export function safeIssue<T extends Partial<InputIssue>>(issue?: T): (T & SafeIssue) | undefined {
	if (!issue) return;

	return {
		id: issue.id,
		author: safeMember(issue.author),
		assignee: safeMember(issue.assignee ?? undefined),
		title: issue.title,
		createdAt: issue.createdAt,
		closedAt: issue.closedAt,
		comments: issue.comments?.map(safeComment)
	} as unknown as T & SafeIssue;
}

export type SafeComment = {
	id: number;
	author: SafeMember;
	content: string;
	createdAt: Date;
};

export type InputComment = Comment & {
	author: Member;
};

export function safeComment<T extends Partial<InputComment>>(
	comment?: T
): (T & SafeComment) | undefined {
	if (!comment) return;

	return {
		id: comment.id,
		author: safeMember(comment.author),
		content: comment.content,
		createdAt: comment.createdAt
	} as T & SafeComment;
}
