export class ListItem {
	id: string;

	title: string;

	routerName: string;

	constructor({ id, title, routerName }: IListItem) {
		this.id = id;
		this.title = title;
		this.routerName = routerName;
	}
}

export interface IListItem {
	id: string;
	title: string;
	routerName: string;
}
