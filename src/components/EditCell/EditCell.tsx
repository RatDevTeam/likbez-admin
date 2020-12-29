import React, { useState } from 'react';

interface IEditCell {
	label: string;
	handlerSave: (value: string) => void;
}

const EditCell: React.FC<IEditCell> = ({ label, handlerSave }) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [text, setText] = useState<string>(label);

	return !edit ? (
		<span onDoubleClick={() => setEdit(!edit)}>{label}</span>
	) : (
		<div>
			<input
				value={text}
				onChange={(event) => {
					setText(event.target.value);
				}}
			/>
			<button type="button" onClick={() => handlerSave(text)}>
				yes
			</button>
			<button type="button" onClick={() => setEdit(false)}>
				no
			</button>
		</div>
	);
};

export default EditCell;
