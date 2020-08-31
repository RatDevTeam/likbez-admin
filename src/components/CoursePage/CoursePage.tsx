import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { Edit } from 'grommet-icons';
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
				<div className="course__title">
					<h2 className="heading__h2">{course.title}</h2> <Edit color='#0B3954' style={{marginTop: '20px'}}/>
				</div>
			<fieldset>
				<legend>Описание курса</legend>
				<div className='course__section'>
				<div className="course__img">
					<button
						type="button"
						onClick={() => previewRef.current && previewRef.current.click()}
						onKeyDown={() => previewRef.current && previewRef.current.click()}>
						<img
							alt="Изображение курса"
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
				<div className="course__description">
					<textarea
						value={course.description}
						onChange={(e) => defaultChange('description', e.target.value)}
					/>
				</div>
				</div>
			</fieldset>
			<fieldset>
				<legend>Даты</legend>
				<div className="course__date">
					<span>Начало курса</span>
					<input
						type="datetime-local"
						value={course.dateStart}
						onChange={(e) => defaultChange('dateStart', e.target.value)}
					/>
					<span>Окончание курса</span>
					<input
						type="datetime-local"
						value={course.dateFinish.slice(0, 16)}
						onChange={(e) => {course.dateFinish = e.target.value}}
					/>
				</div>
			</fieldset>
			<fieldset>
				<legend>Тип и стоимость</legend>
				<div className='course__section'>
				<div className="course__type">
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
				<div className="course__price">
					<input
						type="number"
						min="0"
						value={course.price}
						onChange={(e) => defaultChange('price', e.target.value)}
					/>
				</div>
					<span>Руб.</span>
				</div>
			</fieldset>
<fieldset>
	<legend>Преподаватель</legend>
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
</fieldset>
			<fieldset>
				<legend>Скрипты</legend>
				<span>Вставьте ссылку для доступа к Google Drive:</span>
				<input type='text' />
			</fieldset>
			<fieldset>
				<legend>Загрузка домашних работ:</legend>
				<div>Добавить ДЗ</div>
			</fieldset>



				<div className="course__home-work">
					<input type="file" />
				</div>
			<div>

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
