import { Dispatch } from 'react';
import axios from 'axios';
import { AppActionType } from './action.types';
import { Subject } from '../../schemas/subject.schema';

export enum SubjectActions {
	SUBJECT_LOADING = 'SUBJECT_LOADING',
	SUBJECT_SUCCESS = 'SUBJECT_SUCCESS',
	SUBJECT_ERR = 'SUBJECT_ERR',
}

export const subjectLoading = (): AppActionType => ({
	type: SubjectActions.SUBJECT_LOADING,
});

export const subjectSuccess = (payload: Subject[]): AppActionType => ({
	type: SubjectActions.SUBJECT_SUCCESS,
	payload,
});

export const subjectErr = (payload: any): AppActionType => ({
	type: SubjectActions.SUBJECT_ERR,
	payload,
});

export const getSubjects = () => (dispatch: Dispatch<AppActionType>) => {
	dispatch(subjectLoading());
	axios
		.get('/subjects/')
		.then((res) => dispatch(subjectSuccess(res.data)))
		.catch((err) => dispatch(subjectErr(err)));
};
