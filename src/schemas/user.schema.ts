import { Reducer } from './reducer.schema';

export interface IUserReducer extends Reducer<User[]> {}

export interface IAuthReducer extends Reducer<User | null> {
	authorized: boolean;
	token: string | null;
}

export class UserLoginData implements IUserLoginData {
	email: string;

	password: string;

	constructor({ email, password }: IUserLoginData) {
		this.email = email;
		this.password = password;
	}
}

export interface IUserLoginData {
	email: string;
	password: string;
}

export class UserRegistrData extends UserLoginData implements IRegistrData {
	firstName: string;

	lastName: string;

	constructor({ email, password, firstName, lastName }: IRegistrData) {
		super({ email, password });
		this.firstName = firstName;
		this.lastName = lastName;
	}
}

export interface IRegistrData extends IUserLoginData {
	firstName: string;
	lastName: string;
}

export class User extends UserRegistrData implements IUser {
	_id: string;

	role: UserRole;

	status: UserStatus;

	constructor({
		_id,
		firstName,
		lastName,
		email,
		password,
		role,
		status,
	}: IUser) {
		super({ firstName, lastName, email, password });
		this._id = _id;
		this.role = role;
		this.status = status;
	}
}

export interface IUser extends IRegistrData {
	_id: string;
	role: UserRole;
	status: UserStatus;
}

export enum UserRole {
	ADMIN = 'admin',
	TEACHER = 'teacher',
	TUTOR = 'tutor',
	STUDENT = 'student',
}

export enum UserStatus {
	CREATED = 'created',
	ACTIVE = 'active',
	BLOCKED = 'blocked',
}
