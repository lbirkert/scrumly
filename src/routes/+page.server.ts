import type { PageServerLoad } from "./$types";

import { guard } from "$lib/server/guard";
import { safeMember } from "$lib/server/safe";

export const load: PageServerLoad = (event) => {
    return {
        member: safeMember(guard(event.locals))
    };
};
