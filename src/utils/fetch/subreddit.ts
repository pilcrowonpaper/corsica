import type { Result, SubredditSort, Time } from '../../types/alaska/index';
import type Post from '../../types/alaska/post';
import convertPost from '../handle/post';
import type { RedditPost } from '../../types/reddit/post';
import { createSeachParams } from '../url';
import type { Listing } from '../../types/reddit/index';
import type Subreddit from '../../types/alaska/subreddit';
import type { RedditSubreddit } from '../../types/reddit/subreddit';
import { convertSubreddit } from '../handle/subreddit';

export const getSubredditPosts = async (
	name: string,
	options: { sort?: SubredditSort; time?: Time; after?: string; before?: string },
	access_token: string | null = ''
): Promise<Result<{ posts: { data: Post[]; after: string; before: string } }>> => {
	const search_params = createSeachParams({
		sort: options.sort,
		t: options.time,
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
	const url = `${domain}/r/${name}.json?${search_params.toString()}`;
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

export const getSubredditAbout = async (
	name: string,
	access_token: string | null
): Promise<Result<{ about: { data: Subreddit } }>> => {
	const search_params = createSeachParams({
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
	const url = `${domain}/r/${name}/about.json?${search_params.toString()}`;
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
	const reddit_about = (await response.json()) as RedditSubreddit;
	return {
		error: null,
		data: {
			about: {
				data: convertSubreddit(reddit_about)
			}
		}
	};
};

export const getSubreddits = async (
	ids: string[],
	access_token: string | null = ''
): Promise<Result<{ posts: { data: Subreddit[] } }>> => {
	const search_params = createSeachParams({
		raw_json: 1,
		id: ids.map((val) => `t5_${val}`).join()
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
	const reddit_data = (await response.json()) as Listing<RedditSubreddit>;
	const reddit_posts = reddit_data.data.children;
	return {
		error: null,
		data: {
			posts: {
				data: reddit_posts.map((val) => convertSubreddit(val))
			}
		}
	};
};

export const getSubredditComment = async () => {}
