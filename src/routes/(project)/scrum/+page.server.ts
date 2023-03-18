import type { PageServerLoad, Actions } from "./$types";

import { guard } from "$lib/server/guard";
import { form } from "$lib/server/form";
import { safeMember, safeProject, safeIssue, type SafeIssue } from "$lib/server/safe";
import { prisma } from "$lib/server/prisma";

import { error } from "@sveltejs/kit";


export const load: PageServerLoad = async ({ locals }) => {
    const { member, project } = guard(locals);

    const issues = await prisma.issue.findMany({
        where: {
            projectId: member.projectId,
        },
        include: {
            author: true,
            assignee: true,
            comments: {
                include: {
                    author: true,
                },
            },
        },
    });

    return {
        member: safeMember(member)!,
        project: safeProject(project)!,
        issues: issues.map(safeIssue) as SafeIssue[],
    };
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { member } = guard(locals);
        const { id, to } = await form({ "id": "number", "to": "number" } as const, request);

        const issue = await prisma.issue.findUnique({ where: { id } });

        if(!issue || issue.projectId != member.projectId) throw error(404, "Not found");

        // TODO: check member permissions
        
        if(to === 0) {
            var data: any = { assignee: null, closedAt: null };
        } else if(to === 1) {
            var data: any = { assignee: safeMember(member), closedAt: null };
        } else if(to === 2) {
            var data: any = { closedAt: new Date() };
        } else throw error(400, "Bad request");

        await prisma.issue.update({
            where: { id }, data: { closedAt: data.closedAt, assigneeId: data.assignee ? data.assignee.id : null },
        });
            
        return data;
    },
};
