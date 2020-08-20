import React, { useState } from 'react';
import './styles.scss';
import { useRoute } from 'react-router5';
import { ListItem } from '../../schemas/list.schema';

interface IList {
	list: ListItem[];
}

const List: React.FC<IList> = ({ list }) => {
	const { router } = useRoute();
	const [activeId, setActiveId] = useState<string>();

	const handlerClickItem = (item: ListItem) => {
		router.navigate(item.routerName, { id: item.id });
		setActiveId(item.id);
	};

	return (
		<div className="list">
			{list.map((item: ListItem) => (
				<div
					className={`list__item ${
						activeId === item.id ? ' list__item__active' : ''
					}`}
					role="button"
					tabIndex={0}
					onClick={() => {
						handlerClickItem(item);
					}}
					onKeyDown={() => handlerClickItem(item)}
				>
					<span>{item.title}</span>
				</div>
			))}
		</div>
	);
};

export default List;
