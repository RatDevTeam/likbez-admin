import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { DocumentUpload, Edit } from 'grommet-icons';
import { Course, CourseTypes } from '../../schemas/course.schema';
import { Subject } from '../../schemas/subject.schema';
import { Teacher } from '../../schemas/teacher.schema';

// eslint-disable-next-line prettier/prettier
type CourseKeys = keyof Course;

interface ICoursePage {
	courseData: Course | undefined;
	subjects: Subject[] | undefined;
	teachers: Teacher[] | undefined;
	updateCourse: (id: string, course: Course, data: FormData | null) => void;
	courseErrors: any,
}

const CoursePage: React.FC<ICoursePage> = ({ courseData, subjects, teachers, updateCourse, courseErrors}) => {
	const [course, setCourse] = useState<Course | null>(null);
	const [, setUpdated] = useState();
	const [isChanged, setIsChanged] = useState<boolean>(false);
	const previewRef = useRef<HTMLInputElement>(null);
	const [previewPhoto, setPreviewPhoto] = useState<File | null>(null);
	const [status, setStatus] = useState<string| null>(null);

	useEffect(() => {
		if (courseData) {
			const newCourseData = new Course(courseData);
			newCourseData.dateFinish = courseData.dateFinish.slice(0, 16);
			newCourseData.dateStart = courseData.dateStart.slice(0, 16);
			setCourse(newCourseData);
		}
	}, [courseData]);

	useEffect(() => {
		if (courseData && course) {
			setIsChanged(!Course.equals(course, courseData));
		}
	}, [course]);

	const changeSubject = (type: string) => {
		const sub = subjects && subjects.find((subj) => subj.type === type);
		if (sub) {
			defaultChange('subject', sub);
		}
	};
	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (course) {
			const formData = new FormData();
			if (previewPhoto) formData.append('image', previewPhoto);
			updateCourse(course._id, course, formData);
			if(!courseErrors) {
				setIsChanged(false);
				setStatus('Курс обновлен');
			}
			else {
				setStatus('Ошибка!')
			}
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
			{status && <div>{status}</div>}
			<div className="course__title">
				<input type='text' className="heading__h2" value={course.title} onChange={(e) => defaultChange('title', e.target.value)}
				/>
				{isChanged && (<div className='course__title__info'>
					<Edit color='#C1CFDA' />
					<span className='course__title__info__message'>есть несохраненные изменения</span>
				</div>)}
			</div>
			<fieldset>
				<legend>Описание курса</legend>
				<div className='course__section'>
					<div className="course__img">

						<button
							type="button"
							onClick={() => previewRef.current && previewRef.current.click()}
							onKeyDown={() => previewRef.current && previewRef.current.click()}>
							<div className='course__img__icon'>
								<DocumentUpload color={!previewPhoto ? '#C1CFDA' : '#FFF'} size='large' />
							</div>
							<img
								className='course__img__preview'
								alt=""
								src={previewPhoto ? URL.createObjectURL(previewPhoto) : course.imageUrl}
							/>
						</button>
						<input
							style={{ display: 'none' }}
							type="file"
							accept="image"
							ref={previewRef}
							onChange={(event: any) => setPreviewPhoto(event.target.files[0])}
						/>
					</div>
					<div className="course__description">
					<textarea
						value={course.description}
						placeholder='Введите описание курса'
						onChange={(e) => defaultChange('description', e.target.value)}
					/>
					</div>
				</div>
			</fieldset>
			<fieldset>
				<legend>Даты</legend>
				<div className="course__section">
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
						onChange={(e) => {
							course.dateFinish = e.target.value;
						}}
					/>
				</div>
			</fieldset>
			<fieldset>
				<legend>Тип и стоимость</legend>
				<div className='course__section'>
					<select className='ui-select'
									value={course.type}
									onChange={(e) => defaultChange('type', e.target.value)}
					>
						<option value={CourseTypes.MASTER}>Мастер курс</option>
						<option value={CourseTypes.COURSES}>Спецкурс</option>
					</select>
					<select
						className='ui-select'
						value={course.subject.type}
						onChange={(e) => {
							changeSubject(e.target.value);
						}}
					>
						{subjects &&
						subjects.map((subj) => (
							<option value={subj.type}>{subj.title}</option>
						))}
					</select>
					<div className="course__section__price">
						<input
							type="number"
							min="0"
							value={course.price}
							onChange={(e) => defaultChange('price', e.target.value)}
						/>
						<span>(pуб.)</span>
					</div>
				</div>
			</fieldset>
			<fieldset>
				<legend>Преподаватель</legend>
				<div className="course__teachers">
					<select className='ui-select'
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
				<legend>Домашние задания</legend>
				<button type='button'>Добавить ДЗ</button>
				<input type="file" />
			</fieldset>
			<button className='course__button ui-button' type='button' onClick={(e) => handleSubmit(e)}
							disabled={!isChanged}>Сохранить изменения
			</button>
		</div>
	) : (
		<h1>hello</h1>
	);
};

export default CoursePage;
