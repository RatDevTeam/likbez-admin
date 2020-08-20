import { AppActionType } from '../actions/action.types';
import { ICourseReducer } from '../../schemas/course.schema';
import { CourseActions } from '../actions/course.action';

const initialState: ICourseReducer = {
	loading: false,
	value: [],
	message: null,
	err: null,
};

export default (
	state = initialState,
	action: AppActionType
): ICourseReducer => {
	switch (action.type) {
		case CourseActions.COURSE_LOADING:
			return { ...state, loading: true, err: null };
		case CourseActions.COURSE_ERR:
			return { ...state, err: action.payload, loading: false };
		case CourseActions.COURSE_SUCCESS:
			return { ...state, loading: false, value: action.payload };
		case CourseActions.COURSE_ADD:
		case CourseActions.COURSE_UPDATE: {
			const newCoursesId = state.value.findIndex(
				(course) => course._id === action.payload._id
			);
			return {
				...state,
				loading: false,
				value: [
					...state.value.slice(0, newCoursesId),
					action.payload,
					...state.value.slice(newCoursesId + 1),
				],
			};
		}
		case CourseActions.COURSE_DELETE: {
			const deleteCourse = state.value.findIndex(
				(course) => course._id === action.id
			);
			return {
				...state,
				loading: false,
				value: [
					...state.value.slice(0, deleteCourse),
					...state.value.slice(deleteCourse + 1),
				],
			};
		}
		default:
			return state;
	}
};
