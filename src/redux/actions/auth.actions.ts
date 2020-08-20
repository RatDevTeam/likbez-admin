import axios from 'axios';
import { Dispatch } from 'react';
import { AppActionType } from './action.types';
import { User, UserLoginData } from '../../schemas/user.schema';

export enum AuthActions {
	AUTH_LOADING = 'authLoading',
	AUTH_SUCCESS = 'authSuccess',
	AUTH_ERR = 'authErr',
}

export const authLoading = (): AppActionType => ({
	type: AuthActions.AUTH_LOADING,
});

export const authSuccess = (payload: User): AppActionType => ({
	type: AuthActions.AUTH_SUCCESS,
	payload,
});

export const authErr = (payload: any): AppActionType => ({
	type: AuthActions.AUTH_ERR,
	payload,
});

export const login = (loginInfo: UserLoginData) => (
	dispatch: Dispatch<AppActionType>
) => {
	dispatch(authLoading());
	axios
		.post('/auths/login', loginInfo)
		.then((res) => dispatch(authSuccess(res.data)))
		.catch((err) => dispatch(authErr(err)));
};
