export class ListItem {
	id: string;

	title: string;

	color: string | undefined;

	routerName: string;

	constructor({ id, title, routerName, color }: IListItem) {
		this.id = id;
		this.title = title;
		this.routerName = routerName;
		this.color = color;
	}
}

export interface IListItem {
	id: string;
	title: string;
	color?: string;
	routerName: string;
}
