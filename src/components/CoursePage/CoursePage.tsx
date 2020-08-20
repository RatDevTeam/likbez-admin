import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { Course, CourseTypes } from '../../schemas/course.schema';
import { Subject } from '../../schemas/subject.schema';
import { Teacher } from '../../schemas/teacher.schema';

// eslint-disable-next-line prettier/prettier
type CourseKeys = keyof Course;

interface ICoursePage {
	courseData: Course | undefined;
	subjects: Subject[] | undefined;
	teachers: Teacher[] | undefined;
}

const CoursePage: React.FC<ICoursePage> = ({
	courseData,
	subjects,
	teachers,
}) => {
	const [course, setCourse] = useState<Course | null>(null);
	const [, setUpdated] = useState();
	const previewRef = useRef<HTMLInputElement>(null);
	const [previewPhoto, setPreviewPhoto] = useState<FileList | null>(null);

	useEffect(() => {
		if (courseData) {
			const newCourseData = new Course(courseData);
			newCourseData.dateFinish = courseData.dateFinish.slice(0, 16);
			newCourseData.dateStart = courseData.dateStart.slice(0, 16);
			setCourse(newCourseData);
		}
	}, [courseData]);

	const changeSubject = (type: string) => {
		const sub = subjects && subjects.find((subj) => subj.type === type);
		if (sub) {
			defaultChange('subject', sub);
		}
	};

	const defaultChange = (key: CourseKeys, value: any) => {
		if (course) {
			const newCourse = new Course(course);
			newCourse[key] = value;
			setCourse(newCourse);
			setUpdated({});
		}
	};

	return course ? (
		<div className="course">
			<div className="course__column">
				<div className="course__title">
					<h2>{course.title}</h2>
				</div>
				<div className="course__price">
					<input
						type="number"
						min="0"
						value={course.price}
						onChange={(e) => defaultChange('price', e.target.value)}
					/>
				</div>
				<div className="course__date">
					<input
						type="datetime-local"
						value={course.dateStart}
						onChange={(e) => defaultChange('dateStart', e.target.value)}
					/>
					<span>&ensp;----&ensp;</span>
					<input
						type="datetime-local"
						value={course.dateFinish.slice(0, 16)}
						onChange={(e) => {course.dateFinish = e.target.value}}
					/>
				</div>
				<div className="course__data">
					<select
						value={course.type}
						onChange={(e) => defaultChange('type', e.target.value)}
					>
						<option value={CourseTypes.MASTER}>Мастер курс</option>
						<option value={CourseTypes.COURSES}>Спецкурс</option>
					</select>
					<select
						value={course.subject.type}
						onChange={(e) => {changeSubject(e.target.value)}}
					>
						{subjects &&
							subjects.map((subj) => (
								<option value={subj.type}>{subj.title}</option>
							))}
					</select>
				</div>
				<div className="course__teachers">
					<select
						multiple
					>
						{teachers &&
							teachers.map((teach) => (
								<option value={teach._id}>{teach.name}</option>
							))}
					</select>
				</div>
				<div className="course__home-work">
					<input type="file" />
				</div>
			</div>
			<div>
				<div className="course__img-block">
					<button
						type="button"
						onClick={() => previewRef.current && previewRef.current.click()}
						onKeyDown={() => previewRef.current && previewRef.current.click()}>
					<img
						alt="картинк"
						src={previewPhoto ? URL.createObjectURL(previewPhoto) : course.imageUrl }
					/>
					</button >
					<input
						style={{ visibility: 'hidden' }}
						type="file"
						accept="image/*"
						ref={previewRef}
						onChange={(event: any) => setPreviewPhoto(event.target.files[0])}
					/>
				</div>
				<div className="course__description-block">
					<textarea
						value={course.description}
						onChange={(e) => defaultChange('description', e.target.value)}
					/>
				</div>
				<div className="course__scripts">
					<input type="file" />
				</div>
			</div>
		</div>
	) : (
		<h1>hello</h1>
	);
};

export default CoursePage;
