import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../redux/store';
import { AppActionType } from '../redux/actions/action.types';
import { getCourses, updateCourse } from '../redux/actions/course.action';
import CoursesPage from '../components/CoursesPage/CoursesPage';
import { getSubjects } from '../redux/actions/subject.action';
import { getTeachers } from '../redux/actions/teacher.action';

const mapStateToProps = (state: AppState) => ({
	courses: state.courseReducers.value,
	loadingCourses: state.courseReducers.loading,
	subjects: state.subjectReducers.value,
	teachers: state.teacherReducers.value,
	courseErrors: state.courseReducers.err,
});

const mapDispatchToProps = (
	dispatch: ThunkDispatch<any, any, AppActionType>
) => ({
	getCourses: bindActionCreators(getCourses, dispatch),
	updateCourse: bindActionCreators(updateCourse, dispatch),
	getSubjects: bindActionCreators(getSubjects, dispatch),
	getTeachers: bindActionCreators(getTeachers, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
