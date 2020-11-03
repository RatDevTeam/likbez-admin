export const convertDate = (date: string): any => {
	if (date) {
		return new Intl.DateTimeFormat('ru', {
			year: 'numeric',
			month: 'long',
			day: '2-digit',
		}).format(new Date(date));
	}
	return 'Дата отстутствует';
};

export const isNotNulAdnUndefined = (item: any): boolean =>
	item !== undefined && item !== null;

export const inNotEmptyArray = (item: any[]): boolean => {
	if (item) {
		return item.length > 0;
	}
	return false;
};

export const getMainMenuList = (authorized: boolean): any[] => {
	if (authorized) {
		return [
			{ id: 1, routerName: 'courses.list', label: 'Курсы' },
			{ id: 2, routerName: 'courses.list', label: 'Вебинары' },
			{ id: 3, routerName: 'courses.list', label: 'Преподаватели' },
			{
				id: 4,
				routerName: 'student',
				label: 'Моя страница',
				submenu: [
					{ id: 1, routerName: 'student.courses', label: 'Курсы' },
					{ id: 2, routerName: 'student.scripts', label: 'Скрипты' },
					{ id: 3, routerName: 'student.home', label: 'Домашнее задание' },
				],
			},
		];
	}
	return [
		{ id: 1, routerName: 'home', label: 'О нас' },
		{ id: 2, routerName: 'courses.list', label: 'Курсы' },
		{ id: 3, routerName: 'courses.list', label: 'Вебинары' },
		{ id: 4, routerName: 'courses.list', label: 'Преподаватели' },
	];
};
