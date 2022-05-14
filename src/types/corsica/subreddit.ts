import type { About } from "./index";

export interface Subreddit extends About {
	subscribers: number;
	online: number;
	subscribed: boolean;
	favourite: boolean;
}
