import { Subject } from './subject.schema';
import { Reducer } from './reducer.schema';
import { compareDates } from '../utils';

export interface ICourseReducer extends Reducer<Course[]> {
	message: string | null;
}

export class Course implements ICourse {
	_id: string;

	title: string;

	description: string;

	dateStart: string;

	dateFinish: string;

	imageUrl: string;

	subject: Subject;

	price: string;

	type: CourseTypes;

	teachers: string[];

	homeWorks: IHomeWork[];

	scripts: IScript[];

	constructor({
		_id,
		title,
		description,
		dateStart,
		dateFinish,
		imageUrl,
		subject,
		price,
		type,
		teachers,
		homeWorks,
		scripts,
	}: ICourse) {
		this._id = _id;
		this.title = title;
		this.description = description;
		this.dateStart = dateStart;
		this.dateFinish = dateFinish;
		this.imageUrl = imageUrl;
		this.subject = subject;
		this.price = price;
		this.type = type;
		this.teachers = teachers;
		this.homeWorks = homeWorks;
		this.scripts = scripts;
	}

	static equals(course: Course, anotherCourse: Course): boolean {
		return (
			course.title === anotherCourse.title &&
			course.description === anotherCourse.description &&
			course.imageUrl === anotherCourse.imageUrl &&
			compareDates(course.dateStart, anotherCourse.dateStart) &&
			compareDates(course.dateFinish, anotherCourse.dateFinish) &&
			course.type === anotherCourse.type &&
			//	course.imageUrl === anotherCourse.imageUrl &&
			Subject.equals(course.subject, anotherCourse.subject) &&
			course.price === anotherCourse.price
		);
	}
}

export interface ICourse {
	_id: string;
	title: string;
	description: string;
	dateStart: string;
	dateFinish: string;
	imageUrl: string;
	subject: Subject;
	type: CourseTypes;
	price: string;
	teachers: string[];
	homeWorks: IHomeWork[];
	scripts: IScript[];
}

export enum CourseTypes {
	MASTER = 'MASTER',
	COURSES = 'COURSES',
}

export interface IHomeWork {
	date: string;
	title: string;
	description: string;
}

export interface IScript {
	title: string;
	link: string;
}
