import axios from 'axios';
import { Dispatch } from 'redux';
import { AppActionType } from './action.types';
import { Course } from '../../schemas/course.schema';

export enum CourseActions {
	COURSE_LOADING = 'COURSE_LOADING',
	COURSE_SUCCESS = 'COURSE_SUCCESS',
	COURSE_ERR = 'COURSE_ERR',
	COURSE_ADD = 'COURSE_ADD',
	COURSE_DELETE = 'COURSE_DELETE',
	COURSE_UPDATE = 'COURSE_UPDATE',
	COURSE_MESSAGE = 'COURSE_MESSAGE',
}

export const courseLoading = (): AppActionType => ({
	type: CourseActions.COURSE_LOADING,
});

export const courseSuccess = (payload: Course[]): AppActionType => ({
	type: CourseActions.COURSE_SUCCESS,
	payload,
});

export const courseErr = (payload: any): AppActionType => ({
	type: CourseActions.COURSE_ERR,
	payload,
});

export const courseAdd = (payload: Course): AppActionType => ({
	type: CourseActions.COURSE_ADD,
	payload,
});

export const courseUpdate = (payload: Course): AppActionType => ({
	type: CourseActions.COURSE_UPDATE,
	payload,
});

export const courseDelete = (id: string): AppActionType => ({
	type: CourseActions.COURSE_DELETE,
	id,
});

export const courseMessage = (message: string): AppActionType => ({
	type: CourseActions.COURSE_MESSAGE,
	message,
});

export const getCourses = () => (dispatch: Dispatch<AppActionType>) => {
	dispatch(courseLoading());
	axios
		.get('/courses/')
		.then((res) => {
			dispatch(courseSuccess(res.data));
		})
		.catch((err) => {
			dispatch(courseErr(err.message));
		});
};

export const addCourses = () => (dispatch: Dispatch<AppActionType>) => {
	dispatch(courseLoading());
	axios
		.post('/courses/add')
		.then((res) => {
			dispatch(courseAdd(res.data));
		})
		.catch((err) => {
			dispatch(courseErr(err.message));
		});
};

export const updateCourse = (id: string, course: Course) => (
	dispatch: Dispatch<AppActionType>
) => {
	dispatch(courseLoading());
	axios
		.put(`/courses/update/${id}`, course)
		.then((res) => {
			dispatch(courseUpdate(res.data));
		})
		.catch((err) => {
			dispatch(courseErr(err.message));
		});
};

export const deleteCourse = (id: string) => (
	dispatch: Dispatch<AppActionType>
) => {
	dispatch(courseLoading());
	axios
		.delete(`/courses/${id}`)
		.then((res) => {
			dispatch(courseDelete(id));
			dispatch(courseMessage(res.data));
		})
		.catch((err) => {
			dispatch(courseErr(err.message));
		});
};
