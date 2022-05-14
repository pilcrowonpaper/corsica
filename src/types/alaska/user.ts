import type { About } from '../../types/alaska/index';

interface User extends About {
	following: boolean;
	post_karma: number;
	comment_karma: number;
}

export default User;

export interface UserCompact {
	name: string;
	icon: string;
	nsfw: boolean;
	created: number;
	id: string;
	post_karma: number;
	comment_karma: number;
}
