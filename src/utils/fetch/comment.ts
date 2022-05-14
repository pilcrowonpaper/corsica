import type { Result } from '../../types/alaska/index';
import { createSeachParams } from '../../utils/url';
import type { Listing } from '../../types/reddit/index';
import { convertComment } from '../../utils/handle/comment';
import type { RedditComment } from '../../types/reddit/comment';
import type { Comment } from '../../types/alaska/comment';

export const getComment = async (
	id: string,
	access_token: string | null = ''
): Promise<Result<{ comment: { data: Comment } }>> => {
	const search_params = createSeachParams({
		raw_json: 1,
		id: `t1_${id}`
	});
	const domain = access_token ? 'https://oauth.reddit.com' : 'https://www.reddit.com';
	const init = access_token
		? {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
		  }
		: {};
	const url = `${domain}/api/info.json?${search_params.toString()}`;
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
	const reddit_data = (await response.json()) as Listing<RedditComment>;
	const reddit_comment = reddit_data.data.children[0];
	return {
		error: null,
		data: {
			comment: {
				data: convertComment(reddit_comment)
			}
		}
	};
};

export const getComments = async (
	ids: string[],
	access_token: string | null = ''
): Promise<Result<{ comments: { data: Comment[] } }>> => {
	const search_params = createSeachParams({
		raw_json: 1,
		id: ids.map((val) => `t1_${val}`).join()
	});
	const domain = access_token ? 'https://oauth.reddit.com' : 'https://www.reddit.com';
	const init = access_token
		? {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
		  }
		: {};
	const url = `${domain}/api/info.json?${search_params.toString()}`;
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
	const reddit_data = (await response.json()) as Listing<RedditComment>;
	const reddit_comments = reddit_data.data.children;
	return {
		error: null,
		data: {
			comments: {
				data: reddit_comments.map((val) => convertComment(val))
			}
		}
	};
};
