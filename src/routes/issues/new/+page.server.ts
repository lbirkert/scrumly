
import type { Actions } from "./$types";

import { fail } from "@sveltejs/kit";

import { db } from "$lib/db";

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const { member } = locals;
        
        if(!member) {
            return fail(401, {
                error: "Unauthorized",
            });
        }

        // TODO: handle permissions differnently
        if(member.role === 5) {
            return fail(401, {
                error: "Not enough permissions",
            });
        }

        const formData = Object.fromEntries(await request.formData());

        if(!formData.title || !formData.description) {
            return fail(400, {
                error: "Missing fields"
            });
        }

        const { title, description } = formData as { title: string, description: string };

        const issue = await db.issue.create({
            data: {
                title,
                description,
                projectId: member.projectId,
                authorId: member.id,
            }
        });

        return {
            issue,
        };
    },
};
