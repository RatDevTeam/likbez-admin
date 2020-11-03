import { Dispatch } from 'react';
import axios from 'axios';
import { AppActionType } from './action.types';
import {
	User,
	UserLoginData,
	UserRegistrData,
} from '../../schemas/user.schema';

export enum UserActions {
	USER_LOADING = 'userLoading',
	USER_SUCCESS = 'userSuccess',
	USER_ERR = 'userErr',
}

export const userLoading = (): AppActionType => ({
	type: UserActions.USER_LOADING,
});

export const userSuccess = (payload: User[]): AppActionType => ({
	type: UserActions.USER_SUCCESS,
	payload,
});

export const userErr = (payload: any): AppActionType => ({
	type: UserActions.USER_ERR,
	payload,
});

export const getUsers = () => (dispatch: Dispatch<AppActionType>) => {
	dispatch(userLoading());
	axios
		.get('/users')
		.then((res) => dispatch(userSuccess(res.data)))
		.catch((err) => dispatch(userErr(err)));
};

export const register = (userInfo: UserRegistrData) => (
	dispatch: Dispatch<AppActionType>
) => {
	dispatch(userLoading());
	axios
		.post('/users/register', userInfo)
		.then((res) => userSuccess(res.data))
		.catch((err) => dispatch(userErr(err)));
};

export const login = (loginInfo: UserLoginData) => (
	dispatch: Dispatch<AppActionType>
) => {
	dispatch(userLoading());
	axios
		.post('/users/login', loginInfo)
		.then((res) => dispatch(userSuccess(res.data)))
		.catch((err) => dispatch(userErr(err)));
};
