export interface PostMessageDataRequest {
	owner: string;
}

export type PostMessageDataResponse = never;

export type PostMessageRequest = 'start' | 'stop';

export interface PostMessageSync<T extends PostMessageDataRequest | PostMessageDataResponse> {
	msg: PostMessageRequest;
	data: T;
}
