import { AppActionType } from '../actions/action.types';
import { IUserReducer } from '../../schemas/user.schema';
import { UserActions } from '../actions/user.actions';

const initialState: IUserReducer = {
	loading: false,
	value: [],
	err: null,
};

export default (state = initialState, action: AppActionType): IUserReducer => {
	switch (action.type) {
		case UserActions.USER_LOADING:
			return {
				...state,
				loading: true,
			};
		case UserActions.USER_SUCCESS:
			return {
				...state,
				loading: false,
				value: action.payload,
			};
		case UserActions.USER_ERR:
			return { ...state, err: action.payload };
		default:
			return state;
	}
};
