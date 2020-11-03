import React from 'react';
import { useRoute } from 'react-router5';
import './styles.scss';
import { getMainMenuList } from '../../utils';

interface ISideBar {}

const SideBar: React.FC<ISideBar> = () => {
	const { route, router } = useRoute();
	const menuList = getMainMenuList();
	return (
		<div className="side-bar">
			<div className="side-bar__logo" />
			{menuList.map((menuItem) => (
				<div
					key={menuItem.id}
					className="side-bar__item"
					data-sub={String(route.name.split('.')[0] === menuItem.routerName)}
				>
					<div
						className="side-bar__item__el"
						role="button"
						tabIndex={0}
						onClick={() => router.navigate(menuItem.routerName)}
						onKeyDown={() => router.navigate(menuItem.routerName)}
						data-no-active={String(route.name !== menuItem.routerName)}
					>
						<span>{menuItem.label}</span>
					</div>
					{menuItem.submenu &&
						menuItem.submenu.map((subItem) => (
							<div
								key={`${menuItem.id}${subItem.id}`}
								className="side-bar__item__el side-bar__item__sub"
								role="button"
								tabIndex={0}
								onClick={() => router.navigate(subItem.routerName)}
								onKeyDown={() => router.navigate(subItem.routerName)}
								data-no-active={String(route.name !== subItem.routerName)}
							>
								<span>{subItem.label}</span>
							</div>
						))}
				</div>
			))}
		</div>
	);
};

export default SideBar;
