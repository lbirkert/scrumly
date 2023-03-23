import * as jdenticon from 'jdenticon';
import { writeFile, readFile } from 'fs/promises';
import { AVATARS_DIR } from '$env/static/private';
import { secret } from '$lib/server/secret';
import { join } from 'path';

export const mimes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif', 'image/bmp'];

export function generateAvatar(): string {
	const avatar = secret(32);
	writeAvatar(avatar, 's', 0, jdenticon.toSvg(avatar, 16));
	writeAvatar(avatar, 'm', 0, jdenticon.toSvg(avatar, 32));
	writeAvatar(avatar, 'l', 0, jdenticon.toSvg(avatar, 128));
	return avatar;
}

export async function writeAvatar(
	avatar: string,
	size: string,
	mime: string | number,
	content: any
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
