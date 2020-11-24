import React, { useState, useEffect } from 'react';
import { useInput } from '../../customHooks';
import { getFullPath } from '../../tools/tools';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const EditExercise = ({
	match
}) => {
	const exerciseId = match.params.id;

	// STATES
	const [username, onUserNameChange, setUsername] = useInput('');
	const [description, onDescriptionChange, setDescription] = useInput('');
	const [duration, onDurationChange, setDuration] = useInput(0);

	const [date, setDate] = useState(new Date());
	const onDateChange = (date) => setDate(date);

	function onSubmit(e) {
		e.preventDefault();
		const isToday = (date.getDate() === new Date().getDate()) && (date.getMonth() === new Date().getMonth()) && (date.getFullYear() === new Date().getFullYear());

		const exercise = { username, description, duration, date: isToday ? new Date() : new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0) };

		axios({
			method: "put",
			url: `http://localhost:5000/exercises/update/${exerciseId}`,
			data: exercise
		})
		.then(res => {
			console.log(res.data);
			window.location.href = getFullPath('/');
		});
	}

	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios({
			method: "get",
			url: `http://localhost:5000/users`
		})
		.then(res => {
			const users = res.data;
			setUsers(users);
		});
		axios({
			method: "get",
			url: `http://localhost:5000/exercises/${exerciseId}`
		})
		.then(res => {
			const { username, description, duration, date } = res.data;
			setUsername(username);
			setDescription(description);
			setDuration(duration);
			setDate(new Date(date));
		});
	}, [exerciseId, setUsername, setDescription, setDuration]);

	return (
		<div>
			<h3>Create New Exercise</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Username: </label>
					<select
						htmlFor="userInput"
						className="form-control"
						value={username}
						onChange={onUserNameChange}
						required={true}						
					>
						{users.map(user => (
							<option key={user["_id"]} value={user.username}>{user.username}</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<label>Description: </label>
					<input 
						type="text" 
						className="form-control"
						value={description}
						onChange={onDescriptionChange}
						placeholder="Description..."
						required={true}
					/>
				</div>
				<div className="form-group">
					<label>Duration (in minutes): </label>
					<input 
						type="number" 
						className="form-control"
						value={duration}
						onChange={onDurationChange}
						required={true}
					/>
				</div>
				<div className="form-group">
					<label>Date: </label>
					<div>
						<DatePicker 
							selected={date}
							onChange={onDateChange}
							className="form-control"
						/>
					</div>
				</div>
				<div className="form-group">
					<input type="submit" value="Add Exercise Log" className="btn btn-primary"/>
				</div>
			</form>
		</div>
	);
}

export default EditExercise;