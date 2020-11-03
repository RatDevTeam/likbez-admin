import { Reducer } from './reducer.schema';

export interface TeacherReducer extends Reducer<Teacher[]> {}

export class Teacher implements ITeacher {
	_id: string;

	name: string;

	description: string;

	imgUrl: string;

	vkUrl: string;

	constructor(
		_id: string,
		name: string,
		description: string,
		imgUrl: string,
		vkUrl: string
	) {
		this._id = _id;
		this.name = name;
		this.description = description;
		this.imgUrl = imgUrl;
		this.vkUrl = vkUrl;
	}
}

export interface ITeacher {
	name: string;
	description: string;
	imgUrl: string;
	vkUrl: string;
}
