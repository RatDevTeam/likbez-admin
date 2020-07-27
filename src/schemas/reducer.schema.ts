export interface Reducer<T> {
	loading: boolean;
	value: T;
	err: any;
}
