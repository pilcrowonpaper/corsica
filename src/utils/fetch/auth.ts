import type { Result } from '../../types/corsica/index';
import type { AuthUser } from '../../types/corsica/auth';
import type { RedditAuthUser } from '../../types/reddit/auth';
import { convertUser } from '../handle/auth';
import { createSeachParams } from '../url';

export const getAuth = async (
	access_token: string | null
): Promise<Result<{ user: { data: AuthUser } }>> => {
	const search_params = createSeachParams({
		raw_json: 1
	});
	const init = {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	};
	const url = `https://oauth.reddit.com/api/v1/me.json?${search_params.toString()}`;
	const response = await fetch(url, init);
	if (!response.ok) {
		return {
			error: {
				status: response.status,
				message: (await response.json()).message
			},
			data: null
		};
	}
	const reddit_user = (await response.json()) as RedditAuthUser;
	return {
		error: null,
		data: {
			user: {
				data: convertUser(reddit_user)
			}
		}
	};
};
