import { prisma } from './prisma';
import { secret } from './secret';

export enum SystemAction {
	ASSIGN_SELF = 'assign_self',
	UNASSIGN_SELF = 'unassign_self',
	TASK_CREATE = 'task_create',
	TASK_EDIT = 'task_edit',
	TASK_CLOSE = 'task_close',
	TASK_REOPEN = 'task_reopen',

	// SCRUM_ASSIGN = 'scrum_assign',
	// SCRUM_UNASSIGN = 'scrum_unassign',

	SCRUM_STORY = 'scrum_story',
	SCRUM_TODO = 'scrum_todo',
	SCRUM_DOING = 'scrum_doing',
	SCRUM_DONE = 'scrum_done'
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
