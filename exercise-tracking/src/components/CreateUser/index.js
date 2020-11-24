import React, { useRef, useEffect } from 'react';
import { useInput } from '../../customHooks';
import { getFullPath } from '../../tools/tools';
import axios from 'axios';

const CreateUser = () => {

	// STATE
	const [username, onUsernameChange, setUsername] = useInput('');

	function onSubmit(e) {
		e.preventDefault();
		const user = { username };
		console.log(user);

		// fetching
		const url = `http://localhost:5000/users/add`;
		axios({
			method: "post",
			url: url,
			data: user
		})
		.then(res => {
			setUsername('');
			usernameInput.current.focus();
			window.location.href = getFullPath('/');
		});
	}

	let usernameInput = useRef();
	useEffect(() => {
		usernameInput.current.focus();
	}, []);

	return (
		<div>
			<h3>Create New User</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Username: </label>
					<input 
						type="text"
						className="form-control"
						value={username}
						onChange={onUsernameChange}
						required={true}
						ref={usernameInput}
					/>
				</div>
				<div className="form-group">
					<input type="submit" value="Create User" className="btn btn-primary"/>
				</div>
			</form>
		</div>
	);
}

export default CreateUser;