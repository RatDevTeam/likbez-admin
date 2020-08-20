export default [
	{ name: 'home', path: '/home' },
	{ name: 'login', path: '/login' },
	{
		name: 'courses',
		path: '/courses',
		children: [
			{ name: 'course', path: '/:id' },
			{ name: 'add', path: '/add' },
		],
	},
];
