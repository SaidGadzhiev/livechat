import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Authentication from './authentication/Authentication';

function App() {
	const getData = async () => {
		try {
			const result = await fetch('/bacon');
			const parsedResult = await result.json();
			console.log(parsedResult.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Router>
			<Routes>
				<Route path='' element={<Authentication />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
		</Router>
	);
}

export default App;
