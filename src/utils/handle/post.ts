import type Post from '../../types/corsica/post';
import type { RedditPost } from '../../types/reddit/post';

const convertPost = (reddit_post: RedditPost): Post => {
	let data = {
		author: reddit_post.data.author,
		title: reddit_post.data.title,
		score: reddit_post.data.score,
		vote: reddit_post.data.likes === null ? 0 : reddit_post.data.likes ? 1 : -1,
		saved: reddit_post.data.saved,
		nsfw: reddit_post.data.over_18,
		spoiler: reddit_post.data.spoiler,
		subreddit: reddit_post.data.subreddit,
		created: reddit_post.data.created_utc,
		id: reddit_post.data.id,
		submission_flair: {
			has: !!reddit_post.data.link_flair_text
		}
	};
	if (data.submission_flair.has) {
		const flair_data = {
			has: true,
			text_color: reddit_post.data.link_flair_text_color,
			background_color: reddit_post.data.link_flair_background_color,
			text: reddit_post.data.link_flair_text
		};
		data.submission_flair = flair_data;
	}
	if (reddit_post.data.post_hint === 'image') {
		const content_data = {
			type: 'image',
			content: {
				media: [
					{
						width: reddit_post.data.preview.images[0].source.width,
						height: reddit_post.data.preview.images[0].source.height,
						url: reddit_post.data.url
					}
				]
			}
		};
		return {
			type: 'post',
			data: {
				...data,
				...content_data
			}
		};
	}
	if (reddit_post.data.post_hint === 'rich:video') {
		const content_data = {
			type: 'embed',
			content: {
				embed: {
					width: reddit_post.data.media_embed.width,
					height: reddit_post.data.media_embed.height,
					url:
						reddit_post.data.media_embed.content.split('"').find((val) => val.includes('https')) ||
						reddit_post.data.media_embed.content
				}
			}
		};
		return {
			type: 'post',
			data: {
				...data,
				...content_data
			}
		};
	}
	if (reddit_post.data.domain === 'v.redd.it' && reddit_post.data.media) {
		const content_data = {
			type: 'video',
			content: {
				embed: {
					width: reddit_post.data.media.reddit_video.width,
					height: reddit_post.data.media.reddit_video.width,
					url: `${reddit_post.data.url}/HLSPlaylist.m3u8`,
					fallback: reddit_post.data.media.reddit_video.fallback_url
				}
			}
		};
		return {
			type: 'post',
			data: {
				...data,
				...content_data
			}
		};
	}
	if (reddit_post.data.is_self) {
		const content_data = {
			type: 'text',
			content: {
				text: reddit_post.data.selftext_html
			}
		};
		return {
			type: 'post',
			data: {
				...data,
				...content_data
			}
		};
	}
	if (reddit_post.data.url.includes('https://www.reddit.com/gallery/')) {
		const media_array = Object.values(reddit_post.data.media_metadata);
		const content_data = {
			type: 'image',
			content: {
				media: media_array.map((val) => {
					return {
						url: val.s.u,
						width: val.s.x,
						height: val.s.y
					};
				})
			}
		};
		return {
			type: 'post',
			data: {
				...data,
				...content_data
			}
		};
	}
	const content_data = {
		type: 'link',
		content: {
			url: reddit_post.data.url,
			thumbnail:
				reddit_post.data.thumbnail !== 'default' && reddit_post.data.thumbnail ? reddit_post.data.thumbnail : ''
		}
	};
	return {
		type: 'post',
		data: {
			...data,
			...content_data
		}
	};
};

export default convertPost;
