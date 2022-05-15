import { getPost, getPostComment } from './utils/fetch/post';
import { followUser, unfollowUser } from './utils/post/follow';
import { hideSubmission, unhideSubmission } from './utils/post/hide';
import { saveSubmission, unsaveSubmission } from './utils/post/save';
import { subscribeToSubreddit, unsubscribeToSubreddit } from './utils/post/subscribe';
import { unvoteOnSubmission, voteOnSubmission } from './utils/post/vote';
import { getAuth } from './utils/fetch/auth';
import { getComment, getComments } from './utils/fetch/comment';
import { getFrontpagePosts } from './utils/fetch/frontpage';
import { getPosts } from './utils/fetch/post';
import { getSearchResult } from './utils/fetch/search';
import { getSubredditPosts, getSubredditAbout, getSubreddits } from './utils/fetch/subreddit';
import { getUserAbout, getUserPosts, getUserComments } from './utils/fetch/user';
import { getUsers } from './utils/fetch/user';
import type {
	CommentSort,
	FrontpageSort,
	SearchSort,
	SubredditSort,
	Time,
	UserCommentSort
} from './types/corsica/index';

class Corsica {
	public access_token: string | null = '';
	constructor(options: { access_token?: string } = {}) {
		this.access_token = options.access_token || null;
	}
	public subreddit(name: string) {
		return new CorsicaSubreddit(name, this.access_token);
	}
	public post(id: string) {
		return new CorsicaPost(id, this.access_token);
	}
	public auth() {
		return new CorsicaAuth(this.access_token);
	}
	public user(name: string) {
		return new CorsicaUser(name, this.access_token);
	}
	public comment(id: string) {
		return new CorsicaComment(id, this.access_token);
	}
	public frontpage() {
		return new CorsicaFrontpage(this.access_token);
	}
	public search(query: string) {
		return new CorsicaSearch(query, this.access_token);
	}
	public async getPosts(ids: string[]) {
		return await getPosts(ids, this.access_token);
	}
	public async getUsers(ids: string[]) {
		return await getUsers(ids);
	}
	public async getComments(ids: string[]) {
		return await getComments(ids, this.access_token);
	}
	public async getSubreddits(ids: string[]) {
		return await getSubreddits(ids, this.access_token);
	}
	public updateAccessToken(access_token: string) {
		this.access_token = access_token;
	}
}

export default Corsica;

class CorsicaSubmission {
	protected access_token: string | null;
	protected type: 'post' | 'comment';
	protected id: string;
	constructor(id: string, type: 'post' | 'comment', access_token: string | null) {
		this.id = id;
		this.access_token = access_token;
		this.type = type;
	}
	public async vote(value: -1 | 1) {
		return await voteOnSubmission(this.id, this.type, value, this.access_token);
	}
	public async unvote() {
		return await unvoteOnSubmission(this.id, this.type, this.access_token);
	}
	public async save() {
		return await saveSubmission(this.id, this.type, this.access_token);
	}
	public async unsave() {
		return await unsaveSubmission(this.id, this.type, this.access_token);
	}
	public async hide() {
		return await hideSubmission(this.id, this.type, this.access_token);
	}
	public async unhide() {
		return await unhideSubmission(this.id, this.type, this.access_token);
	}
}

class CorsicaSubreddit {
	private name: string;
	private access_token: string | null;
	constructor(name: string, access_token: string | null) {
		this.name = name;
		this.access_token = access_token;
	}
	public async getPosts(options: { sort?: SubredditSort; time?: Time; after?: string } = {}) {
		return await getSubredditPosts(this.name, options, this.access_token);
	}
	public async subscribe() {
		return await subscribeToSubreddit(this.name, this.access_token);
	}
	public async unsubscribe() {
		return await unsubscribeToSubreddit(this.name, this.access_token);
	}
	public async about() {
		return await getSubredditAbout(this.name, this.access_token);
	}
	public async search(query: string) {
		return new CorsicaSubredditSearch(query, this.name, this.access_token);
	}
}

class CorsicaPost extends CorsicaSubmission {
	constructor(post_id: string, access_token: string | null) {
		super(post_id, 'post', access_token);
	}
	public comment(comment_id: string) {
		return new CorsicaPostComment(this.id, comment_id, this.access_token);
	}
	public async get(options: { sort?: CommentSort; time?: Time } = {}) {
		return await getPost(this.id, options, this.access_token);
	}
}

class CorsicaUser {
	private name: string;
	private access_token: string | null;
	constructor(name: string, access_token: string | null) {
		this.name = name;
		this.access_token = access_token;
	}
	public async getPosts(options: {
		sort?: SubredditSort;
		time?: Time;
		after?: string;
		before?: string;
	}) {
		return await getUserPosts(this.name, options, this.access_token);
	}
	public async getComments(
		options: {
			sort?: UserCommentSort;
			time?: Time;
			after?: string;
			before?: string;
		} = {}
	) {
		return await getUserComments(this.name, options, this.access_token);
	}
	public async about() {
		return await getUserAbout(this.name, this.access_token);
	}
	public async follow() {
		return await followUser(this.name, this.access_token);
	}
	public async unfollow() {
		return await unfollowUser(this.name, this.access_token);
	}
}

class CorsicaComment extends CorsicaSubmission {
	constructor(id: string, access_token: string | null) {
		super(id, 'comment', access_token);
	}
	public async get() {
		return await getComment(this.id, this.access_token);
	}
}

class CorsicaAuth {
	private access_token: string | null;
	constructor(access_token: string | null) {
		this.access_token = access_token;
	}
	public get() {
		return getAuth(this.access_token);
	}
}

class CorsicaSearch {
	private query: string;
	private access_token: string | null;
	constructor(query: string, access_token: string | null) {
		this.query = query;
		this.access_token = access_token;
	}
	public async getPosts(
		options: {
			sort?: SearchSort;
			time?: Time;
			after?: string;
			before?: string;
			nsfw?: boolean;
		} = {}
	) {
		return await getSearchResult(this.query, null, 'posts', options, this.access_token);
	}
	public async getSubreddits(
		options: {
			after?: string;
			before?: string;
			nsfw?: boolean;
		} = {}
	) {
		return await getSearchResult(this.query, null, 'subreddits', options, this.access_token);
	}
	public async getUsers(
		options: {
			after?: string;
			before?: string;
			nsfw?: boolean;
		} = {}
	) {
		return await getSearchResult(this.query, null, 'users', options, this.access_token);
	}
}

class CorsicaFrontpage {
	private access_token: string | null;
	constructor(access_token: string | null) {
		this.access_token = access_token;
	}
	public async getPosts(
		options: {
			sort?: FrontpageSort;
			time?: Time;
			after?: string;
			before?: string;
		} = {}
	) {
		return await getFrontpagePosts(options, this.access_token);
	}
}

class CorsicaPostComment extends CorsicaSubmission {
	private post_id: string;
	constructor(post_id: string, comment_id: string, access_token: string | null) {
		super(comment_id, 'comment', access_token);
		this.post_id = post_id;
	}
	public async get(options: { sort?: CommentSort; time?: Time } = {}) {
		return await getPostComment(this.post_id, this.id, options, this.access_token);
	}
}

class CorsicaSubredditSearch {
	private query: string;
	private access_token: string | null;
	private subreddit_name: string;
	constructor(query: string, subreddit_name: string, access_token: string | null) {
		this.query = query;
		this.access_token = access_token;
		this.subreddit_name = subreddit_name;
	}
	public async getPosts(
		options: {
			sort?: SearchSort;
			time?: Time;
			after?: string;
			before?: string;
			nsfw?: boolean;
		} = {}
	) {
		return await getSearchResult(
			this.query,
			this.subreddit_name,
			'posts',
			options,
			this.access_token
		);
	}
}
