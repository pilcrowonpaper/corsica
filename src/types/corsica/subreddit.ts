import type { About } from "./index";

interface Subreddit extends About {
	subscribers: number;
	online: number;
	subscribed: boolean;
	favourite: boolean;
}

export default Subreddit;
