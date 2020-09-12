import React from 'react';
import './styles.scss';

interface IAlert {
	type: string;
	message: string;
}
const Alert: React.FC<IAlert> = ({ type, message }) => {
	return (
		<div className={`alert__body ${type}`}>
			<p className="alert__body__text">{message}</p>
		</div>
	);
};
export default Alert;
