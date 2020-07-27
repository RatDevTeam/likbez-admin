import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import axios from 'axios';
import { Store } from './redux/store';
import createRouter from './router/create-router';
import App from './App';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(
	(request) => {
		// Edit request config
		return request;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		// Edit response config
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

const router = createRouter();

router.start(() => {
	ReactDOM.render(
		<Provider store={Store}>
			<RouterProvider router={router}>
				<App />
			</RouterProvider>
		</Provider>,
		document.getElementById('root')
	);
});
