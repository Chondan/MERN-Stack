import React from 'react';
import { Link } from 'react-router-dom';
import { getFullPath } from '../../tools/tools';

const Navbar = () => {
	return (
		<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
			<Link className="navbar-brand" to={getFullPath('/')}>ExerTracker</Link>
			<div className="collpase navbar-collapse">
			<ul className="navbar-nav mr-auto">
				<li className="navbar-item">
					<Link className="nav-link" to={getFullPath('/')}>Exercises</Link>
				</li>
				<li className="navbar-item">
					<Link className="nav-link" to={getFullPath('/create')}>Create Exercise Log</Link>
				</li>
				<li className="navbar-item">
					<Link className="nav-link" to={getFullPath('/user')}>Create User</Link>
				</li>
			</ul>
			</div>
		</nav>
	);
}

export default Navbar;