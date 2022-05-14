import type { Result } from '../../types/alaska/index';

export const followUser = async (
	name: string,
	access_token: string | null
): Promise<Result<null>> => {
	if (!access_token) return { error: { status: 401, message: 'Unauthorized' }, data: null };
	const url = `https://oauth.reddit.com/api/subscribe`;
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		body: new URLSearchParams({
			skip_initial_defaults: 'true',
			sr_name: `r/u_${name}`,
			action: 'sub'
		}),
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

export const unfollowUser = async (
	name: string,
	access_token: string | null
): Promise<Result<null>> => {
	if (!access_token) return { error: { status: 401, message: 'Unauthorized' }, data: null };
	const url = `https://oauth.reddit.com/api/subscribe`;
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		body: new URLSearchParams({ sr_name: `r/u_${name}`, action: 'unsub' }),
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
