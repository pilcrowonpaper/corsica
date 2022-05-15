import type { Submission } from './submission';

export interface Comment extends Submission {
	data: CommentData;
}

export interface PostComment extends Submission {
	data: CommentData & {
		replies: {
			data: Comment[];
			more: string[];
		};
		depth: number;
		post_title: string;
	};
}

export interface UserComment extends Submission {
	data: CommentData & {
		post_title: string;
	};
}

interface CommentData {
	id: string;
	author: {
		name: string;
		id: string;
	};
	subreddit: {
		name: string;
		id: string;
	};
	created: number;
	content: {
		type: 'text';
		text: string;
	};
	score: number;
	vote: number;
	saved: boolean;
	parent_id: string | null;
	post_id: string | null;
}
