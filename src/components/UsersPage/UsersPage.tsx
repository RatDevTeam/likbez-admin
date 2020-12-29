import React, { useEffect, useState } from 'react';
import {
	EditingState,
	DataTypeProvider,
	ChangeSet,
	Column,
	IntegratedSorting,
	SortingState,
} from '@devexpress/dx-react-grid';
import {
	Grid,
	Table,
	TableHeaderRow,
	TableInlineCellEditing,
} from '@devexpress/dx-react-grid-bootstrap4';
import {
	Plugin,
	Template,
	TemplatePlaceholder,
} from '@devexpress/dx-react-core';

import './styles.scss';
import { User, UserRole, UserStatus } from '../../schemas/user.schema';
import { convertUserRoleAndStatus } from '../../utils';

const isCellEditable = (column: Column) =>
	column.name === 'role' || column.name === 'status';

const FocusableCell: React.PureComponent<Table.DataCellProps> = (props) => {
	if (isCellEditable(props.column)) {
		return <Table.Cell {...props} tabIndex={0} onFocus={props.onClick} />;
	}
	return <Table.Cell {...props} onFocus={() => false} onClick={() => false} />;
};

interface IUsersPage {
	users: User[];
	getUsers: () => void;
	loading: boolean;
	editUser: (id: string, role: UserRole, status: UserStatus) => void;
}

interface IRow {
	idx: string;
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: UserRole;
	status: UserStatus;
}

const UsersPage: React.FC<IUsersPage> = ({
	users,
	getUsers,
	loading,
	editUser,
}) => {
	const columns: Column[] = [
		{ name: 'idx', title: 'ID' },
		{ name: 'firstName', title: 'Имя' },
		{ name: 'lastName', title: 'Фамилия' },
		{ name: 'email', title: 'Email' },
		{ name: 'role', title: 'Роль' },
		{ name: 'status', title: 'Статус' },
	];

	const keysColumns = columns.map((col) => col.name);

	const [userList, setUserList] = useState<IRow[]>([]);
	const [searchText, setSearchText] = useState();

	useEffect(() => {
		if (!users || users.length === 0) {
			getUsers();
		}
	}, []);

	useEffect(() => {
		const rows = users.map((user, idx) => ({
			idx: idx + 1,
			id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			role: user.role,
			status: user.status,
		}));
		setUserList(rows);
	}, [users]);

	const filterRows = (rows: IRow[]) => {
		if (searchText) {
			return rows.filter((row) =>
				keysColumns.some((key) => {
					if (key === 'role' || key === 'status') {
						return String(convertUserRoleAndStatus(row[key]))
							.toUpperCase()
							.includes(searchText.toUpperCase());
					}
					return String(row[key])
						.toUpperCase()
						.includes(searchText.toUpperCase());
				})
			);
		}
		return rows;
	};

	const commitChanges = (changedData: ChangeSet) => {
		const { changed } = changedData;
		let changedRows: IRow[];
		if (changed) {
			changedRows = userList.map((row) =>
				changed[row.idx] ? { ...row, ...changed[row.idx] } : row
			);
			setUserList(changedRows);
			const user = changedRows.find((u) => !!changed[u.idx]);
			if (user) {
				editUser(user.id, user.role, user.status);
			}
		}
	};

	const ElemFormatter = ({ value }: { value: string }): React.ReactElement => (
		<span>{convertUserRoleAndStatus(value)}</span>
	);

	const SelectUserRoleEditor = ({
		value,
		onValueChange,
		onBlur,
	}: {
		value: any,
		onValueChange: (value: any) => void,
		onBlur: () => void,
	}): React.ReactElement => (
		<select
			className="custom-select"
			value={value}
			onChange={(event) => onValueChange(event.target.value)}
			onBlur={onBlur}
		>
			<option value={UserRole.ADMIN}>Админ</option>
			<option value={UserRole.STUDENT}>Студент</option>
			<option value={UserRole.TEACHER}>Учитель</option>
			<option value={UserRole.TUTOR}>Тьютор</option>
		</select>
	);

	const SelectUserStatusEditor = ({
		value,
		onValueChange,
		onBlur,
	}: {
		value: any,
		onValueChange: (value: any) => void,
		onBlur: () => void,
	}): React.ReactElement => (
		<select
			className="custom-select"
			value={value}
			onChange={(event) => onValueChange(event.target.value)}
			onBlur={onBlur}
		>
			<option value={UserStatus.ACTIVE}>Активирован</option>
			<option value={UserStatus.BLOCKED}>Заблокирвоан</option>
			<option value={UserStatus.CREATED}>Создан</option>
		</select>
	);

	return (
		<div className="d-flex flex-column w-100 p-lg-2">
			<input
				className="mb-2 w-25 form-control"
				type="text"
				placeholder="Найти..."
				onChange={(e) => setSearchText(e.target.value)}
			/>
			<Grid
				rows={filterRows(userList)}
				columns={columns}
				getRowId={(row) => row.idx}
			>
				<EditingState
					onCommitChanges={commitChanges}
					columnExtensions={[{ columnName: 'idx', editingEnabled: false }]}
				/>
				<DataTypeProvider
					formatterComponent={ElemFormatter}
					editorComponent={SelectUserRoleEditor}
					for={['role']}
				/>
				<DataTypeProvider
					formatterComponent={ElemFormatter}
					editorComponent={SelectUserStatusEditor}
					for={['status']}
				/>
				<SortingState />
				<IntegratedSorting />
				<Table cellComponent={FocusableCell} />
				<TableHeaderRow showSortingControls />
				<TableInlineCellEditing startEditAction="click" selectTextOnEditStart />
			</Grid>
		</div>
	);
};

export default UsersPage;
