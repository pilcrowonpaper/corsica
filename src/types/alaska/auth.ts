import type { About } from './index';

export interface AuthUser extends About {
	followers: number;
}