import { useEffect } from 'react';

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
		<div className='App'>
			<p>Hello </p>
		</div>
	);
}

export default App;
