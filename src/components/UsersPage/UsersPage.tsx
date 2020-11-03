import React, { useEffect, useState } from 'react';
import './styles.scss';
import { StatusGood, StatusCritical } from 'grommet-icons';
import { IUser, User, UserStatus } from '../../schemas/user.schema';
import { renderColorStyle } from '../../utils';

interface IUsersPage {
	users: User[];
	getUsers: () => void;
	loading: boolean;
}

const UsersPage: React.FC<IUsersPage> = ({ users, getUsers, loading }) => {
	const [userList, setUserList] = useState<IUser[]>([]);
	const [currentFilter, setCurrentFilter] = useState<string | 'all'>('all');
	useEffect(() => {
		getUsers();
		setUserList(users);
	}, []);

	useEffect(() => {
		setUserList(
			currentFilter !== 'all'
				? users.filter((user) => UserStatus[user.status] === currentFilter)
				: users
		);
	}, [currentFilter]);

	const RenderTable = () => {
		if (loading) {
			return <div> Загрузка...</div>;
		}
		return (
			userList &&
			userList.map((user, index) => (
				<tr className="users__table__body">
					<td>{index + 1}</td>
					<td>{user.firstName}</td>
					<td>{user.lastName}</td>
					<td>
						<a className="ui-href" href={`mailto:${user.email}`}>
							{user.email}
						</a>
					</td>
					<td>
						<div className={`ui-tag ${renderColorStyle(user.status)}`}>
							{UserStatus[user.status]}
						</div>
					</td>
					<td>
						{user.activated ? (
							<StatusGood color="#00c781" />
						) : (
							<StatusCritical color="#FF4040" />
						)}
					</td>
				</tr>
			))
		);
	};
	const RenderOptions = () => {
		// @ts-ignore
		// eslint-disable-next-line array-callback-return,consistent-return
		return Object.keys(UserStatus).map((status) => {
			// eslint-disable-next-line no-restricted-globals
			if (isNaN(Number(status)))
				return <option value={status}>{status}</option>;
		});
	};
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCurrentFilter(e.target.value);
	};

	return (
		<div className="users">
			<h2 className="heading__h1">Пользователи</h2>
			<div className="users__filters">
				<p>Выберите статус: </p>
				<select className="ui-select" onChange={(e) => handleChange(e)}>
					<option value="all">Все</option>
					{RenderOptions()}
				</select>
			</div>
			<div className="users__wrapper">
				<table className="users__table">
					<th className="users__table__head">#</th>
					<th className="users__table__head">Имя</th>
					<th className="users__table__head">Фамилия</th>
					<th className="users__table__head">Email</th>
					<th className="users__table__head">Статус</th>
					<th className="users__table__head">Активирован</th>
					{RenderTable()}
				</table>
			</div>
		</div>
	);
};

export default UsersPage;
