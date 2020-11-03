import { ListItem } from '../schemas/list.schema';

export const convertDate = (date: string): any => {
	if (date) {
		return new Intl.DateTimeFormat('ru', {
			year: 'numeric',
			month: 'long',
			day: '2-digit',
		}).format(new Date(date));
	}
	return 'Дата отсутствует';
};
export const compareDates = (date1: string, date2: string): boolean => {
	return convertDate(date1) === convertDate(date2);
};

export const isNotNullAndUndefined = (item: any): boolean =>
	item !== undefined && item !== null;

export const inNotEmptyArray = (item: any[]): boolean => {
	if (item) {
		return item.length > 0;
	}
	return false;
};

export const getMainMenuList = (): any[] => {
	return [
		{
			id: 1,
			routerName: 'courses',
			label: 'Курсы',
			submenu: [{ id: 1, routerName: 'courses.add', label: 'Добавить курс' }],
		},
		{
			id: 2,
			routerName: 'home',
			label: 'Дом',
			submenu: [{ id: 1, routerName: 'home.add', label: 'Добавить курс' }],
		},
		{
			id: 3,
			routerName: 'users',
			label: 'Пользователи',
		},
	];
};
export const renderColorStyle = (number: number) => {
	switch (number) {
		case 0:
			return 'red';
		case 1:
			return 'green';
		case 2:
			return 'cyan';
		default:
			return 'yellow';
	}
};

export const getList = (collection: any[], routerName: string): ListItem[] =>
	collection.map(
		(el) =>
			new ListItem({
				id: el._id,
				title: el.title ? el.title : el.name,
				color: el.subject.color,
				routerName,
			})
	);
