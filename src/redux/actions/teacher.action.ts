import { Dispatch } from 'react';
import axios from 'axios';
import { AppActionType } from './action.types';
import { Teacher } from '../../schemas/teacher.schema';

export enum TeacherActions {
	TEACHER_LOADING = 'teacherLoading',
	TEACHER_SUCCESS = 'teacherSuccess',
	TEACHER_ERR = 'teacherErr',
}

export const teacherLoading = (): AppActionType => ({
	type: TeacherActions.TEACHER_LOADING,
});

export const teacherSuccess = (payload: Teacher[]): AppActionType => ({
	type: TeacherActions.TEACHER_SUCCESS,
	payload,
});

export const teacherErr = (payload: any): AppActionType => ({
	type: TeacherActions.TEACHER_ERR,
	payload,
});

export const getTeachers = () => (dispatch: Dispatch<AppActionType>) => {
	dispatch(teacherLoading());
	axios
		.get('/teachers/')
		.then((res) => dispatch(teacherSuccess(res.data)))
		.catch((err) => dispatch(teacherErr(err)));
};

export const getTeachersByIds = (ids: string[]) => (
	dispatch: Dispatch<AppActionType>
) => {
	dispatch(teacherLoading());
	axios
		.get('/teachers/ids', { headers: { ids: ids.join() } })
		.then((res) => dispatch(teacherSuccess(res.data)))
		.catch((err) => dispatch(teacherErr(err)));
};
