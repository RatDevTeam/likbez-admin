import React, { lazy, Suspense } from 'react';
import { useRouteNode } from 'react-router5';
import './styles.scss';
import Login from './components/Login/Login';
import SideBar from './components/SideBar/SideBar';

const CoursesPage = lazy(() => import('./containers/CoursesPage'));

const App: React.FC = () => {
	const { route } = useRouteNode('');
	const topRouteName = route.name.split('.')[0];

	const routing = (): React.ReactElement => {
		if (topRouteName === 'login') {
			return <Login />;
		}
		if (topRouteName === 'courses') {
			return <CoursesPage />;
		}
		return <h1>Пусто</h1>;
	};

	return (
		<>
			<SideBar />
			<div className="main-block">
				<Suspense fallback={<div>Загрузка...</div>}>{routing()}</Suspense>
			</div>
		</>
	);
};

export default App;
