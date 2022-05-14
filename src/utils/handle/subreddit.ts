import type Subreddit from '../../types/corsica/subreddit';
import type { RedditSubreddit } from '../../types/reddit/subreddit';

export const convertSubreddit = (reddit_subreddit: RedditSubreddit): Subreddit => {
	return {
		name: reddit_subreddit.data.display_name,
		subscribers: reddit_subreddit.data.subscribers,
		online: reddit_subreddit.data.active_user_count,
		icon: reddit_subreddit.data.icon_img || reddit_subreddit.data.community_icon,
		description: reddit_subreddit.data.public_description_html,
		nsfw: reddit_subreddit.data.over18,
		created: reddit_subreddit.data.created_utc,
		subscribed: reddit_subreddit.data.user_is_subscriber,
		favourite: reddit_subreddit.data.user_has_favorited || false,
		id: reddit_subreddit.data.id
	};
};