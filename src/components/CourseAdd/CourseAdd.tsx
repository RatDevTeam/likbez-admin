import React from 'react';
import './styles.scss';
import CoursePage from '../CoursePage/CoursePage';
import { Course } from '../../schemas/course.schema';
import { Teacher } from '../../schemas/teacher.schema';

interface ICourseAdd {
	addCourses: () => void;
	subjects: Subject[];
	teachers: Teacher[];
	courseError: any;
	isCourseLoading: boolean;
}

const CourseAdd: React.FC<ICourseAdd> = ({
	addCourses,
	subjects,
	teachers,
	courseError,
	isCourseLoading,
}) => {
	return (
		<CoursePage
			subjects={subjects}
			teachers={teachers}
			addCourses={addCourses}
			courseErrors={courseError}
			isCourseLoading={isCourseLoading}
		/>
	);
};

export default CourseAdd;
