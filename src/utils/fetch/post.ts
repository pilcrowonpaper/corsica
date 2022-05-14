import type { Result, CommentSort, Time } from '../../types/corsica/index';
import type { Post } from '../../types/corsica/post';
import convertPost from '../../utils/handle/post';
import { convertPostComment } from '../handle/comment';
import type { PostComment } from '../../types/corsica/comment';
import type { MoreComments } from '../../types/reddit/comment';
import type { RedditPost } from '../../types/reddit/post';
import { createSeachParams } from '../../utils/url';
import type { Listing } from '../../types/reddit/index';

export const getPost = async (
	id: string,
	options: { sort?: CommentSort; time?: Time },
	access_token: string | null = ''
): Promise<Result<{ post: { data: Post }; comments: { data: PostComment[]; more: string[] } }>> => {
	const search_params = createSeachParams({ sort: options.sort, t: options.time, raw_json: 1 });
	const domain = access_token ? 'https://oauth.reddit.com' : 'https://www.reddit.com';
	const init = access_token
		? {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
		  }
		: {};
	const url = `${domain}/comments/${id}.json?${search_params.toString()}`;
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
	const reddit_data = await response.json();
	const reddit_post = reddit_data[0] as Listing<RedditPost>;
	const reddit_comments = reddit_data[1] as Listing<any>;
	const more_listing = reddit_comments.data.children.filter(
		(val) => val.kind === 'more'
	) as MoreComments[];
	const more = more_listing.length ? more_listing[0].data.children : [];
	return {
		error: null,
		data: {
			post: {
				data: convertPost(reddit_post.data.children[0])
			},
			comments: {
				data: reddit_comments.data.children
					.filter((val) => val.kind !== 'more')
					.map((val) => convertPostComment(val)),
				more
			}
		}
	};
};

export const getPosts = async (
	ids: string[],
	access_token: string | null = ''
): Promise<Result<{ posts: { data: Post[] } }>> => {
	const search_params = createSeachParams({
		raw_json: 1,
		id: ids.map((val) => `t3_${val}`).join()
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
	const reddit_data = (await response.json()) as Listing<RedditPost>;
	const reddit_posts = reddit_data.data.children;
	return {
		error: null,
		data: {
			posts: {
				data: reddit_posts.map((val) => convertPost(val))
			}
		}
	};
};

export const getPostComment = async (
	post_id: string,
	comment_id: string,
	options: { sort?: CommentSort; time?: Time },
	access_token: string | null = ''
): Promise<Result<{ post: { data: Post }; comments: { data: PostComment[]; more: string[] } }>> => {
	const search_params = createSeachParams({ sort: options.sort, t: options.time, raw_json: 1 });
	const domain = access_token ? 'https://oauth.reddit.com' : 'https://www.reddit.com';
	const init = access_token
		? {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
		  }
		: {};
	const url = `${domain}/comments/${post_id}/comment/${comment_id}.json?${search_params.toString()}`;
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
	const reddit_data = await response.json();
	const reddit_post = reddit_data[0] as Listing<RedditPost>;
	const reddit_comments = reddit_data[1] as Listing<any>;
	const more_listing = reddit_comments.data.children.filter(
		(val) => val.kind === 'more'
	) as MoreComments[];
	const more = more_listing.length ? more_listing[0].data.children : [];
	return {
		error: null,
		data: {
			post: {
				data: convertPost(reddit_post.data.children[0])
			},
			comments: {
				data: reddit_comments.data.children
					.filter((val) => val.kind !== 'more')
					.map((val) => convertPostComment(val)),
				more
			}
		}
	};
};
