import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Main } from './pages/Main';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="*" element={<h1>404</h1>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
