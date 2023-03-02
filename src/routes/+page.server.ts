import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

import { makeSafe, publicMember } from "$lib/db";

export const load: PageServerLoad = (event) => {
    const member = event.locals.member;

    if(!member) {
        throw redirect(302, "/login"); 
    }

    return {
        member: makeSafe(member, publicMember)
    };
};
