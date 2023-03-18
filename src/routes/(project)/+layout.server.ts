import type { LayoutServerLoad } from "./$types";

import { guard } from "$lib/server/guard";
import { safeMember, safeProject } from "$lib/server/safe";

export const load: LayoutServerLoad = async ({ locals }) => {
    const { member, project } = guard(locals);

    return {
        member: safeMember(member)!,
        project: safeProject(project)!,
    };
};
