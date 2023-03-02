import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (event) => {
    event.cookies.delete("Authorization");

    throw redirect(302, "/login");
};
