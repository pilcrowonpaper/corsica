export interface Options {
	sort: string;
	time: string;
	after?: string;
	access_token?: string;
}

export interface Result<T> {
	error: {
		message: string;
		status: number;
	} | null;
	data: T | null;
}

export interface About {
	name: string;
	icon: string;
	description: string;
	nsfw: boolean;
	created: number;
	id: string
}

export type CommentSort = 'confidence' | 'top' | 'new' | 'controversial' | 'old' | 'random';
export type FrontpageSort = 'best' | 'hot' | 'new' | 'top' | 'controversial' | 'rising'
export type SubredditSort = 'hot' | 'new' | 'top' | 'controversial' | 'rising'
export type SearchSort = 'relevance' | 'hot' | 'top' | 'new' | 'comments'
export type UserCommentSort = 'top' | 'new' | 'controversial'

export type Time = 'now' | 'today' | 'week' | 'month' | 'year' | 'all'