import type { Member, Issue, Comment } from "@prisma/client";

export type SafeMember = {
    id: number,
    role: number,
    name: string,
    createdAt: Date,
}

export function safeMember(member: Member | null): SafeMember | null {
    if(!member) return null;

    return {
        id: member.id,
        role: member.role,
        name: member.name,
        createdAt: member.createdAt,
    };
}

export type SafeIssue = {
    id: number,
    author: SafeMember,
    assignee: SafeMember | null,
    title: string,
    description: string,
    createdAt: Date,
    closedAt: Date | null,
    comments: SafeComment[],
};

export function safeIssue(
    issue: Issue & {
        author: Member,
        assignee: Member | null,
        comments: (Comment & { author: Member })[]
    } | null
): SafeIssue | null {
    if(!issue) return null;

    return {
        id: issue.id,
        author: safeMember(issue.author)!,
        assignee: safeMember(issue.assignee),
        title: issue.title,
        description: issue.description,
        createdAt: issue.createdAt,
        closedAt: issue.closedAt,
        comments: issue.comments.map(safeComment) as SafeComment[],
    };
}

export type SafeComment = {
    id: number,
    author: SafeMember,
    content: string,
    createdAt: Date,
};

export function safeComment(comment: Comment & { author: Member } | null): SafeComment | null {
    if(!comment) return null;

    return {
        id: comment.id,
        author: safeMember(comment.author)!,
        content: comment.content,
        createdAt: comment.createdAt,
    };
}
