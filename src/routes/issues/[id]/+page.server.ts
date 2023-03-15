import type { Actions, PageServerLoad } from "./$types";

import { error, redirect } from "@sveltejs/kit";

import type { Member, Prisma } from "@prisma/client";

import { prisma } from "$lib/server/prisma";
import { guard } from "$lib/server/guard";
import { form } from "$lib/server/form";
import { safeIssue, safeMember } from "$lib/server/safe";

// TODO: find out how to type these
async function findIssue<T extends Prisma.IssueInclude | undefined>(
    params: any,
    member: Member,
    include: T
) {
    try {
        const issue = await prisma.issue.findUnique({
            where: { id: parseInt(params.id) },
            include, 
        });

        if(!issue || issue.projectId !== member.projectId) {
            throw new Error();
        }
 
        return issue;
    } catch(e) {
        console.error(e);
        throw error(404, "Not found");
    }
}

export const load: PageServerLoad = async ({ locals, params, url }) => {
    const member = guard(locals);

    return {
        issue: safeIssue(await findIssue(params, member, {
            comments: { include: { author: true } }, author: true, assignee: true,
        } as const))!,
        member: safeMember(member)!,
        edit: url.searchParams.get("edit"),
    };
};

export const actions: Actions = {
    comment: async ({ locals, params, request }) => {
        const member = guard(locals);

        const issue = await findIssue(params, member, undefined);

        // TODO: Check member permissions
        
        const { content } = await form({"content": "string"} as const, request);

        const { id } = await prisma.comment.create({
            data: {
                author: {
                    connect: {
                        id: member.id,
                    },
                },
                issue: {
                    connect: {
                        id: issue.id
                    },
                },
                content,
            }
        });

        throw redirect(301, `/issues/${params.id}#comment-${id}`);
    },
    comment_delete: async({ locals, params, request }) => {
        const member = guard(locals);

        // TODO: Check member permissions
        
        const { id } = await form({"id": "number"} as const, request);

        await prisma.comment.deleteMany({
            where: {
                id: id,
                memberId: member.id,
            },
        });
        
        throw redirect(301, `/issues/${params.id}`);
    },
    comment_update: async({ locals, params, request }) => {
        const member = guard(locals);

        // TODO: Check member permissions
        
        const { id, content } = await form({"id": "number", "content": "string"} as const, request);

        await prisma.comment.updateMany({
            data: { content },
            where: {
                id: id,
                memberId: member.id,
            },
        });
        
        throw redirect(301, `/issues/${params.id}#comment-${id}`);
    },
    toggle: async({ locals, params }) => {
        const member = guard(locals);

        const issue = await findIssue(params, member, undefined);

        // TODO: Check member permissions
        
        await prisma.issue.updateMany({
            data: { closedAt: issue.closedAt ? null : new Date() },
            where: {
                id: issue.id,
                authorId: member.id,
            }
        });
       
        // TODO: Send system comment

        throw redirect(301, `/issues/${params.id}`);
    },
};
