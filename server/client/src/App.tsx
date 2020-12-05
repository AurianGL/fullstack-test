import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Feedback } from './pages/Feedback';
import { Home } from './pages/Home';

const App = () => {
  return (
    <Router>
      <div className='bg-gray-800 text-gray-200 min-h-screen'>
        <nav >
          <ul className='flex align-left bg-gray-900 text-pink-800 p-2'>
            <li className='bg-pink-300 py-1 px-2 mr-1 rounded border-b-4 border-pink-600'>
              <Link to="/">Home</Link>
            </li>
            <li className='bg-pink-300 py-1 px-2 rounded border-b-4 border-pink-600'>
              <Link to="/feedbacks/new">feedbacks</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/feedbacks/new" exact>
            <Feedback />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
