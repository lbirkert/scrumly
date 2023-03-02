import type { PageServerLoad } from "./$types";

import { redirect } from "@sveltejs/kit";

import { db } from "$lib/db";


export const load: PageServerLoad = async ({ locals, params }) => {
    const member = locals.member;

    if(!member) {
        throw redirect(302, "/login");
    }

    try {
        var page = parseInt((params as { page: string }).page) || 0
    } catch(e) {
        var page = 0
    }
    
    const take = 10;

    const issues = await db.issue.findMany({
        where: {
            projectId: member.projectId,
        },
        include: {
            author: true,
            assignee: true,
        },
        skip: take * page,
        take,
    });

    for(let issue of issues) {
        delete issue.author.login;
    }

    return {
        issues,
        page,
    };
};
