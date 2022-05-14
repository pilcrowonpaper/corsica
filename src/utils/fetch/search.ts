import type { Result, SearchSort, Time } from '../../types/corsica/index';
import type Post from '../../types/corsica/post';
import type User from '../../types/corsica/user';
import type { Listing } from '../../types/reddit/index';
import type { RedditPost } from '../../types/reddit/post';
import type { RedditSubreddit } from '../../types/reddit/subreddit';
import type { RedditUser } from '../../types/reddit/user';
import { convertUser } from '../handle/user';
import convertPost from '../handle/post';
import { convertSubreddit } from '../handle/subreddit';
import { createSeachParams } from '../url';
import type Subreddit from '../../types/corsica/subreddit';

type PostsResult = Result<{ posts: { data: Post[]; after: string; before: string } }>;
type SubredditsResult = Result<{
	subreddits: { data: Subreddit[]; after: string; before: string };
}>;
type UsersResult = Result<{ users: { data: User[]; after: string; before: string } }>;

export const getSearchResult = async (
	query: string,
	type: 'posts' | 'subreddits' | 'users',
	options: { sort?: SearchSort; time?: Time; after?: string; before?: string; nsfw?: boolean },
	access_token: string | null = ''
): Promise<PostsResult | SubredditsResult | UsersResult> => {
	const types = new Map([
		['posts', 'link'],
		['subreddits', 'sr'],
		['users', 'user']
	]);
	if (!types.has(type)) {
		return {
			error: {
				status: 400,
				message: 'Invalid type in options'
			},
			data: null
		};
	}
	const search_params = createSeachParams({
		q: query,
		sort: options.sort,
		t: options.time,
		after: options.after,
		before: options.before,
		raw_json: 1,
		type: types.get(type),
		nsfw: options.nsfw ? 1 : 0, // not included in documentation
		include_over_18: options.nsfw ? 'on' : '' // also not included in documentation
	});
	const domain = access_token ? 'https://oauth.reddit.com' : 'https://www.reddit.com';
	const init = access_token
		? {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
		  }
		: {};
	const url = `${domain}/search.json?${search_params.toString()}`;
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
	if (type === 'posts') {
		const reddit_posts = (await response.json()) as Listing<RedditPost>;
		return {
			error: null,
			data: {
				posts: {
					data: reddit_posts.data.children.map((val) => convertPost(val)),
					after: reddit_posts.data.after,
					before: reddit_posts.data.before
				}
			}
		};
	}
	if (type === 'subreddits') {
		const reddit_subreddits = (await response.json()) as Listing<RedditSubreddit>;
		return {
			error: null,
			data: {
				subreddits: {
					data: reddit_subreddits.data.children.map((val) => convertSubreddit(val)),
					after: reddit_subreddits.data.after,
					before: reddit_subreddits.data.before
				}
			}
		};
	}
	if (type === 'users') {
		const reddit_users = (await response.json()) as Listing<RedditUser>;
		return {
			error: null,
			data: {
				users: {
					data: reddit_users.data.children.map((val) => convertUser(val)),
					after: reddit_users.data.after,
					before: reddit_users.data.before
				}
			}
		};
	}
	return {
		error: null,
		data: null
	};
};
