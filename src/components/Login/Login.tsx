import React, { useState } from 'react';
import axios from 'axios';

const Auth: React.FC = () => {
	const [login, setLogin] = useState();
	const [password, setPassword] = useState();
	const handleLogin = () => {
		axios
			.post(
				'/auth/login',
				{ email: login, password },
				{ withCredentials: true }
			)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<div>
				<h3>Войти</h3>
				<input
					type="text"
					value={login}
					onChange={(event) => setLogin(event.target.value)}
				/>
				<input
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<button onClick={() => handleLogin()}>LOGIn</button>
			</div>
		</div>
	);
};

export default Auth;
