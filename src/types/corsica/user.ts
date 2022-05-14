import type { About } from './index';

export interface User extends About {
	following: boolean;
	post_karma: number;
	comment_karma: number;
}

export interface UserCompact {
	name: string;
	icon: string;
	nsfw: boolean;
	created: number;
	id: string;
	post_karma: number;
	comment_karma: number;
}
