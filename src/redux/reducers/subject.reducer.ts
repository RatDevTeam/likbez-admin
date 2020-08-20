import { SubjectReducer } from '../../schemas/subject.schema';
import { AppActionType } from '../actions/action.types';
import { SubjectActions } from '../actions/subject.action';

const initialState: SubjectReducer = {
	loading: false,
	value: [],
	err: null,
};

export default (
	state = initialState,
	action: AppActionType
): SubjectReducer => {
	switch (action.type) {
		case SubjectActions.SUBJECT_LOADING:
			return {
				...state,
				loading: true,
			};
		case SubjectActions.SUBJECT_SUCCESS:
			return { ...state, loading: false, value: action.payload };
		case SubjectActions.SUBJECT_ERR:
			return { ...state, err: action.payload };
		default:
			return state;
	}
};
