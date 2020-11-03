import React, { useState } from 'react';

const Auth: React.FC = () => {
	const [login, setLogin] = useState();
	const [password, setPassword] = useState();
	const handleLogin = () => {};
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
				<button type="button" onClick={() => handleLogin()}>
					LOGIn
				</button>
			</div>
		</div>
	);
};

export default Auth;
