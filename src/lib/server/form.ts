import { error } from '@sveltejs/kit';

type TypeNameToType = {
	/// @deprecated
	string: string;
	/// @deprecated
	_string: string | undefined;

	text: string;
	_text: string | undefined;
	file: File;
	_file: File | undefined;
	number: number;
	_number: number | undefined;
	date: Date;
	_date: Date | undefined;
};

type MapTypeNamesToTypes<T extends Record<PropertyKey, keyof TypeNameToType>> = {
	[K in keyof T]: TypeNameToType[T[K]];
};

export async function form<T extends Record<PropertyKey, keyof TypeNameToType>>(
	fields: T,
	request: Request
): Promise<MapTypeNamesToTypes<typeof fields>> {
	const formData = Object.fromEntries(await request.formData());

	return Object.entries(fields).reduce((p, [field, _type]) => {
		const value = formData[field];

		const optional = _type.startsWith('_');
		const type = optional ? _type.substring(1) : _type;

		if (value !== undefined) {
			if (type === 'number') {
				try {
					p[field] = parseInt(value as string);
				} catch (e) {
					throw error(400, `Failed to parse number on field ${field}`);
				}
			} else if (type === 'date') {
				const date = new Date(value as string);
				if (isNaN(date.valueOf())) {
					if (!optional) {
						throw error(400, `Invalid Date`);
					}
				} else {
					p[field] = date;
				}
			} else {
				p[field] = value;
			}
		} else if (!optional) throw error(400, `Missing field ${field}`);

		return p;
	}, {} as Record<string, any>) as MapTypeNamesToTypes<typeof fields>;
}
