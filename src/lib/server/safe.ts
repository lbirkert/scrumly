import type { Member, Issue, Comment, Project } from "@prisma/client";

export type SafeProject = {
    id: number,
    name: string,
    members: SafeMember[],
};

export type InputProject = Project & {
    members: Member[]
};

export function safeProject<T extends Partial<InputProject>>(
    project?: T
): T & SafeProject | undefined {
    if(!project) return;

    return {
        id: project.id,
        name: project.name,
        members: project.members?.map(safeMember),
    } as unknown as T & SafeProject;
}

export type SafeMember = {
    id: number,
    role: number,
    name: string,
    createdAt: Date,
    project: SafeProject,
};

export type InputMember = Member & {
    project: Project
};

export function safeMember<T extends Partial<InputMember>>(
    member?: T
): T & SafeMember | undefined {
    if(!member) return;

    return {
        id: member.id,
        role: member.role,
        name: member.name,
        createdAt: member.createdAt,
        project: safeProject(member.project),
    } as T & SafeMember;
}

export type SafeIssue = {
    id: number,
    author: SafeMember,
    assignee?: SafeMember,
    title: string,
    description: string,
    createdAt: Date,
    closedAt?: Date,
    comments: SafeComment[],
};

export type InputIssue = Issue & {
    author: Member,
    assignee?: Member | null,
    comments: (Comment & { author: Member })[]
};

export function safeIssue<T extends Partial<InputIssue>>(
    issue?: T
): T & SafeIssue | undefined {
    if(!issue) return;

    return {
        id: issue.id,
        author: safeMember(issue.author),
        assignee: safeMember(issue.assignee ?? undefined),
        title: issue.title,
        createdAt: issue.createdAt,
        closedAt: issue.closedAt,
        comments: issue.comments?.map(safeComment),
    } as unknown as T & SafeIssue;
}

export type SafeComment = {
    id: number,
    author: SafeMember,
    content: string,
    createdAt: Date,
};

export type InputComment = Comment & {
    author: Member
};

export function safeComment<T extends Partial<InputComment>>(
    comment?: T
): T & SafeComment | undefined {
    if(!comment) return;

    return {
        id: comment.id,
        author: safeMember(comment.author),
        content: comment.content,
        createdAt: comment.createdAt,
    } as T & SafeComment;
}
