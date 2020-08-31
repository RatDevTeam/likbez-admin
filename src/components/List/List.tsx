import React, { useState } from 'react';
import './styles.scss';
import { useRoute } from 'react-router5';
import { AddCircle } from 'grommet-icons';
import { ListItem } from '../../schemas/list.schema';

interface IList {
	list: ListItem[];
	onAddTolist: () => void;
}

const List: React.FC<IList> = ({ list, onAddTolist }) => {
	const { router } = useRoute();
	const [activeId, setActiveId] = useState<string>();

	const handlerClickItem = (item: ListItem) => {
		if (item.id === activeId) {
			router.navigate('courses');
			setActiveId('');
			return;
		}
		router.navigate(item.routerName, { id: item.id });
		setActiveId(item.id);
	};

	return (
		<div className="list">
			{onAddTolist && (
				<div
					className="list__addButton list__item"
					role="button"
					tabIndex={0}
					onKeyDown={() => onAddTolist()}
					onClick={() => onAddTolist()}
				>
					<AddCircle color="white" />
					<span className="list__addButton--text">Добавить</span>
				</div>
			)}
			{list.map((item: ListItem) => (
				<div
					className={`list__item ${
						activeId === item.id ? ' list__item--active' : ''
					}`}
					role="button"
					tabIndex={0}
					onClick={() => {
						handlerClickItem(item);
					}}
					onKeyDown={() => handlerClickItem(item)}
				>
					<div
						className="list__item__decoration"
						style={{ backgroundColor: item.color }}
					/>

					<span className="text">{item.title}</span>
				</div>
			))}
		</div>
	);
};

export default List;
