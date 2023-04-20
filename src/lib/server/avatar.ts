import * as jdenticon from 'jdenticon';
import { writeFile, readFile, unlink } from 'fs/promises';
import { AVATARS_DIR } from '$env/static/private';
import { secret } from '$lib/server/secret';
import { join } from 'path';
import { mimes, sizes } from '$lib/constants';

import Jimp from 'jimp';

export async function generateAvatar(): Promise<string> {
	const avatar = secret(32);

	await Promise.all(
		Object.entries(sizes).map(
			async ([s, p]) => await writeAvatar(avatar, s, 0, jdenticon.toPng(avatar, p))
		)
	);

	return avatar;
}

export async function resizeAvatar(file: File): Promise<string> {
	const avatar = secret(32);

	const _mime = mimes.indexOf(file.type);
	if (_mime === -1) {
		throw Error('Invalid mime type');
	}

	const image = await Jimp.read(Buffer.from(await file.arrayBuffer()));

	await Promise.all(
		Object.entries(sizes).map(async ([s, p]) =>
			writeAvatar(avatar, s, _mime, await image.clone().resize(p, p).getBufferAsync(file.type))
		)
	);

	return avatar;
}

export async function clearAvatar(avatar: string) {
	await Promise.all(Object.entries(sizes).map(async ([s]) => await unlinkAvatar(avatar, s)));
}

export async function unlinkAvatar(avatar: string, size: string) {
	const path = join(AVATARS_DIR, avatar + '_' + size);

	try {
		await unlink(path);
	} catch (e) {
		console.error(e);
	}
}

export async function writeAvatar(
	avatar: string,
	size: string,
	mime: string | number,
	content: Buffer | string
) {
	const path = join(AVATARS_DIR, avatar + '_' + size);

	const _mime = typeof mime === 'number' ? mime : mimes.indexOf(mime);

	if (_mime >= mimes.length || _mime < 0) {
		throw Error('Invalid mime type');
	}

	if (typeof content === 'string') {
		content = Buffer.from(content, 'utf8');
	}

	const data = Buffer.concat([new Uint8Array([_mime]), content]);

	await writeFile(path, data);
}

export async function readAvatar(avatar: string, size: string): Promise<[string, Buffer]> {
	const path = join(AVATARS_DIR, avatar + '_' + size);

	const data = await readFile(path);

	const _mime = data[0];

	if (_mime >= mimes.length || _mime < 0) {
		throw Error('Invalid mime type');
	}

	const mime = mimes[_mime];
	const content = data.subarray(1);

	return [mime, content];
}
