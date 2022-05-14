export interface Listing<T> {
	kind: 'Listing';
	data: {
		after: string;
		before: string;
		dist: number;
		modhash: string;
		geo_filter: any;
		children: T[];
	};
}
