import React, { useEffect, useState } from 'react';
import { useRoute } from 'react-router5';

import List from '../List/List';
import { getList } from '../../utils';
import { Course } from '../../schemas/course.schema';
import { ListItem } from '../../schemas/list.schema';
import CoursePage from '../CoursePage/CoursePage';
import CourseAdd from '../CourseAdd/CourseAdd';
import { Subject } from '../../schemas/subject.schema';
import { Teacher } from '../../schemas/teacher.schema';
import Stub from '../Stub/Stub';
import './styles.scss';

interface ICoursesPage {
	courses: Course[];
	loadingCourses: boolean;
	getCourses: () => void;
	updateCourse: (id: string, course: Course) => void;
	subjects: Subject[];
	getSubjects: () => void;
	teachers: Teacher[];
	getTeachers: () => void;
	courseErrors?: any;
}

const CoursesPage: React.FC<ICoursesPage> = ({
	courses,
	loadingCourses,
	getCourses,
	updateCourse,
	subjects,
	getSubjects,
	teachers,
	getTeachers,
	courseErrors,
}) => {
	const [list, setList] = useState<ListItem[]>([]);
	const { route, router } = useRoute();
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
	const openAddNewCourse = () => {
		router.navigate('courses.add');
	};
	const navigateToCourse = () => {
		if (route.name === 'courses.course' && id) {
			return (
				<CoursePage
					updateCourse={updateCourse}
					courseData={courses.find((c) => c._id === id)}
					subjects={subjects}
					teachers={teachers}
					courseErrors={courseErrors}
				/>
			);
		}
		if (route.name === 'courses.add') {
			return <CourseAdd />;
		}
		return (
			<div className="courses__empty">
				<Stub message="Чтобы начать, выберите курс" />
			</div>
		);
	};

	return !loadingCourses ? (
		<div className="courses layout">
			<h1 className="heading__h1">Курсы</h1>
			<div className="courses__body">
				<div className="courses__body__list">
					<List list={[...list]} onAddTolist={openAddNewCourse} />
				</div>
				{navigateToCourse()}
			</div>
		</div>
	) : (
		<span>Загрузка</span>
	);
};

export default CoursesPage;
