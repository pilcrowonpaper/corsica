export { default as default } from './corsica';

export type { Post as CorsicaPost } from './types/corsica/post';
export type { AuthUser as CorsicaAuthUser } from './types/corsica/auth';
export type {
	Comment as CorsicaComment,
	PostComment as CorsicaPostComment,
	UserComment as CorsicaUserComment
} from './types/corsica/comment';
export type { Subreddit as CorsicaSubreddit } from './types/corsica/subreddit';
export type { User as CorsicaUser, UserCompact as CorsicaUserCompact } from './types/corsica/user';
