import { combineReducers } from 'redux';
import courseReducers from './course.reducer';
import subjectReducers from './subject.reducer';
import teacherReducers from './teacher.reducer';
import authReducers from './auth.reducer';
import userReducer from './user.reducer';

export default combineReducers({
	courseReducers,
	subjectReducers,
	teacherReducers,
	authReducers,
	userReducer,
});
