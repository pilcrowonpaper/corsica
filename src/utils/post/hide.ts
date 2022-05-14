import type { Result } from '../../types/corsica/index';

export const hideSubmission = async (
	id: string,
	type: 'post' | 'comment',
	access_token: string | null
): Promise<Result<null>> => {
	if (!access_token) return { error: { status: 401, message: 'Unauthorized' }, data: null };
	const id_type = new Map([
		['comment', 't1'],
		['post', 't3']
	]);
	if (!id_type.has(type)) {
		return { error: { status: 400, message: 'Invalid type parameter' }, data: null };
	}
	const url = `https://oauth.reddit.com/api/hide`;
	const fullname = `${id_type.get(type)}_${id}`;
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		body: new URLSearchParams({ id: fullname }),
		method: 'POST'
	});
	if (!response.ok) {
		return {
			error: {
				status: response.status,
				message: (await response.json()).message
			},
			data: null
		};
	}
	return { error: null, data: null };
};

export const unhideSubmission = async (
	id: string,
	type: 'post' | 'comment',
	access_token: string | null
): Promise<Result<null>> => {
	if (!access_token) return { error: { status: 401, message: 'Unauthorized' }, data: null };
	const id_type = new Map([
		['comment', 't1'],
		['post', 't3']
	]);
	if (!id_type.has(type)) {
		return { error: { status: 400, message: 'Invalid type parameter' }, data: null };
	}
	const url = `https://oauth.reddit.com/api/unhide`;
	const fullname = `${id_type.get(type)}_${id}`;
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		body: new URLSearchParams({ id: fullname }),
		method: 'POST'
	});
	if (!response.ok) {
		return {
			error: {
				status: response.status,
				message: (await response.json()).message
			},
			data: null
		};
	}
	return { error: null, data: null };
};
