import type { UserCompact } from '../../types/alaska/user';
import type User from '../../types/alaska/user';
import type { RedditUser, RedditUserCompact } from '../../types/reddit/user';

export const convertUser = (reddit_user: RedditUser): User => {
	return {
		name: reddit_user.data.name,
		icon: reddit_user.data.icon_img,
		description: reddit_user.data.subreddit.public_description,
		nsfw: reddit_user.data.subreddit.over_18,
		created: reddit_user.data.created_utc,
		following: reddit_user.data.subreddit.user_is_subscriber || false,
		id: reddit_user.data.id,
		post_karma: reddit_user.data.link_karma,
		comment_karma: reddit_user.data.comment_karma
	};
};

export const convertUserCompact = (id: string, reddit_user: RedditUserCompact): UserCompact => {
	return {
		name: reddit_user.name,
		icon: reddit_user.profile_img,
		nsfw: reddit_user.profile_over_18,
		created: reddit_user.created_utc,
		id: id,
		post_karma: reddit_user.link_karma,
		comment_karma: reddit_user.comment_karma
	};
};
