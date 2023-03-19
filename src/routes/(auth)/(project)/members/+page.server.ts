import type { PageServerLoad } from "./$types";

import { prisma } from "$lib/server/prisma";

import { safeProject } from "$lib/server/safe";

export const load: PageServerLoad = async ({ locals }) => {
    const project = (await prisma.project.findUnique({
        where: { id: locals.project.id },
        include: { members: true }
    }))!;

    return {
        project: safeProject(project)!,
    };
};
