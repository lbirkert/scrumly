import { prisma } from './prisma';
import { secret } from './secret';

export enum SystemAction {
	ASSIGN_SELF = 'assign_self',
	UNASSIGN_SELF = 'unassign_self',
	TASK_CREATE = 'task_create',
	TASK_EDIT = 'task_edit',
	TASK_CLOSE = 'task_close',
	TASK_REOPEN = 'task_reopen'
}

export async function system(
	projectId: string,
	taskId: string,
	action: SystemAction,
	authorId?: string
) {
	return await prisma.comment.create({
		data: {
			id: secret(5),
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			authorId: authorId!,
			taskId: taskId,
			projectId: projectId,
			system: true,
			content: action
		}
	});
}
