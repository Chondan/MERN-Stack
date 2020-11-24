import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { getFullPath } from './tools/tools';
import { Navbar, ExercisesList, CreateExercise, CreateUser, EditExercise } from './components';
import { useInput } from './customHooks';

/* COMPONENTS
1. Navbar {DONE}
2. ExercisesList -> '/' {DONE}
3. EditExercise -> '/edit/:id' {DONE}
4. CreateExercise -> '/create' {DONE}
5. CreateUser -> '/user' {DONE}
*/

const App = () => {
	return (
		<Router>
			<div className="container">
				<Navbar />
				<br/>
				<Route path={getFullPath('/')} exact component={ExercisesList} />
				<Route path={getFullPath('/edit/:id')} component={EditExercise} />
				<Route path={getFullPath('/create')} component={CreateExercise} />
				<Route path={getFullPath('/user')} component={CreateUser} />
			</div>
		</Router>
	);
}

export default App;