import React from 'react';
import './styles.scss';

interface IStubProps {
	message: string;
}

const Stub: React.FC<IStubProps> = ({ message }) => {
	return (
		<div className="stub">
			<div className="stub__decoration">
				<div className="stub__warning--image" />
				<h5 className="stub__warning--infoMessage">{message}</h5>
			</div>
		</div>
	);
};
export default Stub;
