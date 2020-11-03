import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import UsersPage from '../components/UsersPage/UsersPage';
import { AppState } from '../redux/store';
import { AppActionType } from '../redux/actions/action.types';
import { getUsers } from '../redux/actions/user.actions';

const mapStateToProps = (state: AppState) => ({
	users: state.userReducer.value,
	loading: state.userReducer.loading,
	errors: state.userReducer.err,
});
const mapDispatchToProps = (
	dispatch: ThunkDispatch<any, any, AppActionType>
) => ({
	getUsers: bindActionCreators(getUsers, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
