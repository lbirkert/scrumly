
import type { Actions } from "./$types";

import { prisma } from "$lib/server/prisma";
import { guard } from "$lib/server/guard";
import { form } from "$lib/server/form";

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const member = guard({ locals });
        
        // TODO: check member permissions

        const { title, description } = await form({"title": "string", "description": "string"} as const, request);

        const issue = await prisma.issue.create({
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
