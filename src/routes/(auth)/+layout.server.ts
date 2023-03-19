import type { LayoutServerLoad } from "./$types";

import { safeMember, safeProject } from "$lib/server/safe";

export const load: LayoutServerLoad = async ({ locals }) => {
    return {
        member: safeMember(locals.member)!,
        project: safeProject(locals.project)!,
    }
}
