import React, { useEffect, useState } from 'react';
import { useRoute } from 'react-router5';

import './styles.scss';
import List from '../List/List';
import { getList } from '../../utils';
import { Course } from '../../schemas/course.schema';
import { ListItem } from '../../schemas/list.schema';
import CoursePage from '../CoursePage/CoursePage';
import CourseAdd from '../CourseAdd/CourseAdd';
import { Subject } from '../../schemas/subject.schema';
import { Teacher } from '../../schemas/teacher.schema';

interface ICoursesPage {
	courses: Course[];
	loadingCourses: boolean;
	getCourses: () => void;
	subjects: Subject[];
	getSubjects: () => void;
	teachers: Teacher[];
	getTeachers: () => void;
}

const CoursesPage: React.FC<ICoursesPage> = ({
	courses,
	loadingCourses,
	getCourses,
	subjects,
	getSubjects,
	teachers,
	getTeachers,
}) => {
	const [list, setList] = useState<ListItem[]>([]);
	const { route } = useRoute();
	const { id } = route.params;
	useEffect(() => {
		getCourses();
		getSubjects();
		getTeachers();
	}, []);

	useEffect(() => {
		if (courses) {
			setList(getList(courses, 'courses.course'));
		}
	}, [courses]);

	const routing = () => {
		if (route.name === 'courses.course' && id) {
			return (
				<CoursePage
					courseData={courses.find((c) => c._id === id)}
					subjects={subjects}
					teachers={teachers}
				/>
			);
		}
		if (route.name === 'courses.add') {
			return <CourseAdd />;
		}
		return (
			<div className="courses__course__empty">
				<span>Empty</span>
			</div>
		);
	};

	return !loadingCourses ? (
		<div className="courses">
			<div className="courses__list">
				<List list={[...list]} />
			</div>
			<div className="courses__course">{routing()}</div>
		</div>
	) : (
		<span>Загрузка</span>
	);
};

export default CoursesPage;
