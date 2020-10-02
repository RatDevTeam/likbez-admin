import axios from 'axios';
import { Dispatch } from 'react';
import { AppActionType } from './action.types';
import { User, UserLoginData } from '../../schemas/user.schema';

export enum AuthActions {
	AUTH_LOADING = 'authLoading',
	AUTH_SUCCESS = 'authSuccess',
	AUTH_ERR = 'authErr',
	AUTH_REFRESH_TOKEN = 'authRefreshToken',
	AUTH_LOGOUT = 'authLogout',
}

export const authLoading = (): AppActionType => ({
	type: AuthActions.AUTH_LOADING,
});

export const authSuccess = (payload: {
	token: string,
	user: User,
}): AppActionType => ({
	type: AuthActions.AUTH_SUCCESS,
	payload,
});

export const authErr = (payload: any): AppActionType => ({
	type: AuthActions.AUTH_ERR,
	payload,
});

export const authRefreshToken = (payload: string): AppActionType => ({
	type: AuthActions.AUTH_ERR,
	payload,
});

export const authLogout = (): AppActionType => ({
	type: AuthActions.AUTH_LOGOUT,
});

export const login = (loginInfo: UserLoginData) => (
	dispatch: Dispatch<AppActionType>
) => {
	dispatch(authLoading());
	axios
		.post('/auths/login', loginInfo, { withCredentials: true })
		.then((res) => dispatch(authSuccess(res.data)))
		.catch((err) => dispatch(authErr(err)));
};

export const refreshToken = () => (dispatch: Dispatch<AppActionType>) => {
	axios
		.get('auth/refresh_token', { withCredentials: true })
		.then((res) => dispatch(authRefreshToken(res.data)))
		.catch(() => dispatch(authLogout()));
};

export const logout = (userId: string) => (
	dispatch: Dispatch<AppActionType>
) => {
	dispatch(authLoading());
	axios
		.get(`auth/logout/${userId}`)
		.then(() => dispatch(authLogout()))
		.catch((err) => dispatch(authErr(err)));
};
