// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Member } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			member: Member;
			project: Project;
			auth: boolean;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
