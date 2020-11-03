import { IAuthReducer } from '../../schemas/user.schema';
import { AppActionType } from '../actions/action.types';
import { AuthActions } from '../actions/auth.actions';

const initialState: IAuthReducer = {
	authorized: false,
	token: null,
	loading: false,
	value: null,
	err: null,
};

export default (state = initialState, action: AppActionType): IAuthReducer => {
	switch (action.type) {
		case AuthActions.AUTH_LOADING:
			return {
				...state,
				loading: true,
			};
		case AuthActions.AUTH_SUCCESS:
			return {
				...state,
				loading: false,
				authorized: true,
				token: action.payload.token,
				value: action.payload.user,
			};
		case AuthActions.AUTH_ERR:
			return { ...state, err: action.payload };
		case AuthActions.AUTH_REFRESH_TOKEN:
			return { ...state, token: action.payload };
		case AuthActions.AUTH_LOGOUT:
			return initialState;
		default:
			return state;
	}
};
