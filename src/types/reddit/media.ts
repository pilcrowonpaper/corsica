export interface RedditOembed {
	type: string;
	oembed: {
		provider_url: string;
		version: string;
		title: string;
		type: string;
		thumbnail_width: number;
		height: number;
		width: number;
		html: string;
		author_name: string;
		provider_name: string;
		thumbnail_url: string;
		thumbnail_height: number;
		author_url: string;
	};
}

export interface RedditVideo {
	reddit_video: {
		bitrate_kbps: number;
		dash_url: string;
		duration: number;
		fallback_url: string;
		height: number;
		hls_url: string;
		is_gif: boolean;
		scrubber_media_url: string;
		transcoding_status: string;
		width: number;
	};
}

export interface RedditPreview {
	images: RedditImage[];
	enabled: boolean;
}

export interface RedditImage {
	source: RedditImageSource;
	resolutions: RedditImageSource[];
	variants: any;
	id: string;
}

export interface RedditImageSource {
	url: string;
	width: number;
	height: number;
}

export interface RedditMediaEmbed {
	content: string;
	width: number;
	scrolling: boolean;
	media_domain_url: string;
	height: number;
}

export interface RedditMediaMetadata {
	e: string;
	id: string;
	m: string;
	p: RedditMetadataImage[];
	s: RedditMetadataImage;
	status: string;
}

interface RedditMetadataImage {
	x: number;
	y: number;
	u: string;
}