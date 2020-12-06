import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Feedback } from './pages/Feedback';
import { Home } from './pages/Home';
import { Button } from './components/index';

const App = () => {
	return (
		<Router>
			<div className='bg-gray-800 text-gray-200 min-h-screen'>
				<nav className='space-x-3 flex align-left bg-gray-900 p-2'>
					<Link to='/'>
						<Button>Home</Button>
					</Link>
					<Link to='/feedbacks/new'>
						<Button>Feedbacks</Button>
					</Link>
				</nav>
				<Switch>
					<Route path='/feedbacks/new' exact>
						<Feedback />
					</Route>
					<Route path='/' exact>
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
