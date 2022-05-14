import type { AuthUser } from '../../types/corsica/auth';
import type { RedditAuthUser } from '../../types/reddit/auth';

export const convertUser = (reddit_user: RedditAuthUser): AuthUser => {
	return {
		name: reddit_user.name,
		icon: reddit_user.icon_img,
		description: reddit_user.subreddit.public_description,
		nsfw: reddit_user.subreddit.over_18,
		created: reddit_user.created_utc,
        followers: reddit_user.subreddit.subscribers,
		id: reddit_user.id
	};
};
