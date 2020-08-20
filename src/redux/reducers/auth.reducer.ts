import { IAuthReducer } from '../../schemas/user.schema';
import { AppActionType } from '../actions/action.types';
import { AuthActions } from '../actions/auth.actions';

const initialState: IAuthReducer = {
	authorized: false,
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
				value: action.payload,
			};
		case AuthActions.AUTH_ERR:
			return { ...state, err: action.payload };
		default:
			return state;
	}
};
