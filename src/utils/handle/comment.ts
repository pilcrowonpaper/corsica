import type { PostComment, UserComment, Comment } from '../../types/alaska/comment';
import type { Listing } from '../../types/reddit/index';
import type { MoreComments, RedditComment } from '../../types/reddit/comment';

export const convertComment = (reddit_comment: RedditComment): Comment => {
	return {
		type: 'comment',
		data: {
			author: reddit_comment.data.author,
			score: reddit_comment.data.score,
			vote: reddit_comment.data.likes === null ? 0 : reddit_comment.data.likes ? 1 : -1,
			saved: reddit_comment.data.saved,
			subreddit: reddit_comment.data.subreddit,
			created: reddit_comment.data.created_utc,
			id: reddit_comment.data.id,
			content: {
				text: reddit_comment.data.body_html
			},
			parent_id:
				reddit_comment.data.parent_id === reddit_comment.data.link_id
					? null
					: reddit_comment.data.parent_id.split('_')[1],
			post_id: reddit_comment.data.link_id.split('_')[1]
		}
	};
};

export const convertPostComment = (reddit_comment: RedditComment): PostComment => {
	const reddit_replies = reddit_comment.data.replies as Listing<any>;
	const replies: Comment[] = reddit_replies
		? reddit_replies.data.children
				.filter((val) => val.kind === 't1')
				.map((val) => convertComment(val))
		: [];
	const more = reddit_replies
		? reddit_replies.data.children.filter((val) => val.kind === 'more')
		: ([] as MoreComments[]);
	return {
		type: 'comment',
		data: {
			author: reddit_comment.data.author,
			score: reddit_comment.data.score,
			vote: reddit_comment.data.likes === null ? 0 : reddit_comment.data.likes ? 1 : -1,
			saved: reddit_comment.data.saved,
			subreddit: reddit_comment.data.subreddit,
			created: reddit_comment.data.created_utc,
			post_title: reddit_comment.data.link_title,
			id: reddit_comment.data.id,
			content: {
				text: reddit_comment.data.body_html
			},
			replies: {
				list: replies,
				more: more.length > 0 ? more[0].data.children : []
			},
			parent_id:
				reddit_comment.data.parent_id === reddit_comment.data.link_id
					? null
					: reddit_comment.data.parent_id.split('_')[1],
			post_id: reddit_comment.data.link_id.split('_')[1],
			depth: reddit_comment.data.depth
		}
	};
};

export const convertUserComment = (reddit_comment: RedditComment): UserComment => {
	return {
		type: 'comment',
		data: {
			author: reddit_comment.data.author,
			score: reddit_comment.data.score,
			vote: reddit_comment.data.likes === null ? 0 : reddit_comment.data.likes ? 1 : -1,
			saved: reddit_comment.data.saved,
			subreddit: reddit_comment.data.subreddit,
			created: reddit_comment.data.created_utc,
			post_title: reddit_comment.data.link_title,
			id: reddit_comment.data.id,
			content: {
				text: reddit_comment.data.body_html
			},
			parent_id:
				reddit_comment.data.parent_id === reddit_comment.data.link_id
					? null
					: reddit_comment.data.parent_id.split('_')[1],
			post_id: reddit_comment.data.link_id.split('_')[1]
		}
	};
};
