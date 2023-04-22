import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { SNAPSHOTS_DIR } from '$env/static/private';

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export const GET: RequestHandler = async ({ params }) => {
	let content: Buffer | string;

	const path = join(SNAPSHOTS_DIR, params.id);

	try {
		content = await readFile(path);
	} catch (e) {
		try {
			const parts = params.id.split(':');
			const id = parts[0];
			const affix = parts[1];

			content = await converters[affix](
				JSON.parse((await readFile(join(SNAPSHOTS_DIR, id))).toString())
			);

			await writeFile(path, content);
		} catch (e) {
			throw error(404, 'Not found');
		}
	}

	return new Response(new Blob([content], { type: 'application/json' }));
};

const converters = {
	async scrumblr(src) {
		const colors = ['yellow', 'green', 'blue', 'white'];

		const width = 996;
		const height = 466;

		const cardHeight = 60;
		const cardWidth = 100;

		const cardOffsetX = 10;
		const cardOffsetY = 60;

		const cardsPerColumn = Math.floor((height - cardOffsetY) / cardHeight);

		const findTask = (id: string) => {
			const task = src.tasks.find((t: any) => (t.id = id));
			task.assignees = src.assignees
				.filter((a: any) => a.taskId === task.id)
				.map((a: any) => src.members.find((m: any) => a.memberId === m.id).name);
			return task;
		};

		const columns: any[][] = src.scrums.reduce(
			(p: any[][], s: any) => (p[s.column].push(s.taskId ? findTask(s.taskId) : s), p),
			[[], [], [], []]
		);

		const cards = columns.reduce(
			(p: any[], c: any[], x) => (
				c.forEach((s: any, y) =>
					p.push({
						x: x * (width / 4) + cardOffsetX + Math.floor(y / cardsPerColumn) * cardWidth,
						y: (y % cardsPerColumn) * cardHeight + cardOffsetY,
						text: s.content + (s.assignees ? '\n\n' + s.assignees.join(', ') : ''),
						id: s.id,
						rot: Math.random() * 10 - 5,
						colour: colors[Math.floor(Math.random() * colors.length)],
						sticker: null
					})
				),
				p
			),
			[]
		);

		return JSON.stringify({
			columns: ['Story', 'TODO', 'Doing', 'Done'],
			theme: 'smallcards',
			size: { width, height },
			cards
		});
	}
} as { [key: string]: (src: any) => Promise<string> };
