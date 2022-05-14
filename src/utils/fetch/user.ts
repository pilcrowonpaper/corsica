import type { Result, SubredditSort, Time, UserCommentSort } from '../../types/alaska/index';
import convertPost from '../handle/post';
import type { RedditPost } from '../../types/reddit/post';
import { createSeachParams } from '../url';
import type { Listing } from '../../types/reddit/index';
import type User from '../../types/alaska/user';
import type { RedditUser, RedditUserCompact } from '../../types/reddit/user';
import { convertUser, convertUserCompact } from '../handle/user';
import type Post from '../../types/alaska/post';
import type { Comment } from '../../types/alaska/comment';
import type { RedditComment } from '../../types/reddit/comment';
import { convertUserComment } from '../handle/comment';
import type { UserCompact } from '../../types/alaska/user';

type PostsResult = Result<{ posts: { data: Post[]; after: string; before: string } }>;
type CommentsResult = Result<{ comments: { data: Comment[]; after: string; before: string } }>;

export const getUserPosts = async (
	name: string,
	options: {
		sort?: SubredditSort;
		time?: Time;
		after?: string;
		before?: string;
	},
	access_token: string | null = ''
): Promise<PostsResult> => {
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
	const url = `${domain}/user/${name}/submitted.json?${search_params.toString()}`;
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

export const getUserComments = async (
	name: string,
	options: {
		sort?: UserCommentSort;
		time?: Time;
		after?: string;
		before?: string;
	},
	access_token: string | null = ''
): Promise<CommentsResult> => {
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
	const url = `${domain}/user/${name}/comments.json?${search_params.toString()}`;
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
	const reddit_post = (await response.json()) as Listing<RedditComment>;
	return {
		error: null,
		data: {
			comments: {
				data: reddit_post.data.children.map((val) => convertUserComment(val)),
				after: reddit_post.data.after,
				before: reddit_post.data.before
			}
		}
	};
};

export const getUserAbout = async (
	name: string,
	access_token: string | null
): Promise<Result<{ user: { data: User } }>> => {
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
	const url = `${domain}/user/${name}/about.json?${search_params.toString()}`;
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
	const reddit_user = (await response.json()) as RedditUser;
	return {
		error: null,
		data: {
			user: {
				data: convertUser(reddit_user)
			}
		}
	};
};

export const getUsers = async (
	ids: string[]
): Promise<Result<{ users: { data: UserCompact[] } }>> => {
	const search_params = createSeachParams({
		raw_json: 1,
		ids: ids.map((val) => `t2_${val}`).join(',')
	});
	const url = `https://www.reddit.com/api/user_data_by_account_ids.json?${search_params.toString()}`;
	const response = await fetch(url);
	if (!response.ok) {
		return {
			error: {
				status: response.status,
				message: (await response.json()).message
			},
			data: null
		};
	}
	const reddit_data = (await response.json()) as Record<string, RedditUserCompact>;
	const reddit_users: UserCompact[] = [];
	for (const id in reddit_data) {
		reddit_users.push(convertUserCompact(id.split('_')[1], reddit_data[id]));
	}
	return {
		error: null,
		data: {
			users: {
				data: reddit_users
			}
		}
	};
};
