import type { Submission } from './submission';

export interface Post extends Submission {
	data: {
		author: string;
		id: string;
		submission_flair: {
			has: boolean;
			text_color?: string;
			text?: string;
			background_color?: string;
		};
		title: string;
		score: number;
		vote: number;
		saved: boolean;
		nsfw: boolean;
		spoiler: boolean;
		subreddit: string;
		created: number;
		upvote_ratio: number;
		content: {
			type: string;
			url?: string;
			text?: string;
			embed?: {
				url: string;
				height: number;
				width: number;
			};
			media?: {
				url: string;
				fallback?: string;
				height: number;
				width: number;
			}[];
			thumbnail?: string;
		};
	};
}
