import type { Member } from "@prisma/client";

import { redirect} from "@sveltejs/kit";

export function guard(locals: { member: Member }): Member {
    if(!locals.member) {
        throw redirect(302, "/login");
    }

    return locals.member;
}
