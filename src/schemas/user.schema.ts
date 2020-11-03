import { Reducer } from './reducer.schema';

export interface IUserReducer extends Reducer<User[]> {}

export interface IAuthReducer extends Reducer<User | null> {
	authorized: boolean;
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

	status: UserStatus;

	activated: boolean;

	constructor({
		_id,
		firstName,
		lastName,
		email,
		password,
		status,
		activated,
	}: IUser) {
		super({ firstName, lastName, email, password });
		this._id = _id;
		this.status = status;
		this.activated = activated;
	}
}

export interface IUser extends IRegistrData {
	_id: string;
	status: UserStatus;
	activated: boolean;
}

export enum UserStatus {
	ADMIN,
	TEACHER,
	TUTOR,
	STUDENT,
}
