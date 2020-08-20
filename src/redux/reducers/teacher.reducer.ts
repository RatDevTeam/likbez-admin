import { AppActionType } from '../actions/action.types';
import { TeacherReducer } from '../../schemas/teacher.schema';
import { TeacherActions } from '../actions/teacher.action';

const initialState: TeacherReducer = {
	loading: false,
	value: [],
	err: null,
};

export default (
	state = initialState,
	action: AppActionType
): TeacherReducer => {
	switch (action.type) {
		case TeacherActions.TEACHER_LOADING:
			return {
				...state,
				loading: true,
			};
		case TeacherActions.TEACHER_SUCCESS:
			return { ...state, loading: false, value: action.payload };
		case TeacherActions.TEACHER_ERR:
			return { ...state, err: action.payload };
		default:
			return state;
	}
};
