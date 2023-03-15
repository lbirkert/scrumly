
import type { Actions } from "./$types";

import { prisma } from "$lib/server/prisma";
import { guard } from "$lib/server/guard";
import { form } from "$lib/server/form";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const member = guard(locals);
        
        // TODO: check member permissions

        const { title } = await form({"title": "string"} as const, request);

        const { id } = await prisma.issue.create({
            data: {
                title,
                projectId: member.projectId,
                authorId: member.id,
            }
        });

        throw redirect(301, `/issues/${id}`);
    },
};
