import type { Result } from '../../types/corsica/index';
import type { Post } from '../../types/corsica/post';
import convertPost from '../handle/post';
import type { RedditPost } from '../../types/reddit/post';
import { createSeachParams } from '../url';
import type { Listing } from '../../types/reddit/index';
import type { FrontpageSort, Time } from '../../types/corsica/index';

export const getFrontpagePosts = async (
	options: { sort?: FrontpageSort; time?: Time; after?: string; before?: string },
	access_token: string | null = ''
): Promise<Result<{ posts: { data: Post[]; after: string; before: string } }>> => {
	const search_params = createSeachParams({
		t: options.time || 'today',
		after: options.after,
		before: options.before,
		raw_json: 1
	});
	const domain = access_token ? 'https://oauth.reddit.com' : 'https://www.reddit.com';
	const init = access_token
		? {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
		  }
		: {};
	const url = `${domain}/${options.sort || 'best'}.json?${search_params.toString()}`;
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
	const reddit_post = (await response.json()) as Listing<RedditPost>;
	return {
		error: null,
		data: {
			posts: {
				data: reddit_post.data.children.map((val) => convertPost(val)),
				after: reddit_post.data.after,
				before: reddit_post.data.before
			}
		}
	};
};
