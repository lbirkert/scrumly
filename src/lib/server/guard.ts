import type { Member, Project } from "@prisma/client";

import { redirect } from "@sveltejs/kit";

export function guard(locals: { member?: Member, project?: Project }): { member: Member, project: Project } {
    if(!locals.member || !locals.project) {
        throw redirect(302, "/login");
    }

    return locals as { member: Member, project: Project };
}
