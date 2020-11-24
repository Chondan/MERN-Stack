import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getFullPath } from '../../tools/tools';

const Exercise = ({
	exercise, deleteExercise
}) => {
	const { _id, username, description, duration, date } = exercise;
	return (
		<tr>
			<td>{username}</td>
			<td>{description}</td>
			<td>{duration}</td>
			<td>{new Date(date).toLocaleString()}</td>
			<td>

				<Link to={getFullPath(`/edit/${_id}`)}>Edit</Link> | <a href="#" onClick={() => deleteExercise(_id)}>Delete</a>
			</td>
		</tr>
	);
}

const ExercisesList = () => {

	const [exercises, setExercises] = useState([]);

	useEffect(() => {
		axios({
			method: "get",
			url: `http://localhost:5000/exercises`,
		})
		.then(res => {
			setExercises(res.data);
		})
		.catch(err => console.log(err));
	}, []);

	function deleteExercise(id) {
		axios({
			method: "delete",
			url: `http://localhost:5000/exercises/${id}`
		})
		.then(res => console.log(res.data));
		setExercises(exercises.filter(exercise => exercise["_id"] !== id));
	}

	const exercisesList = exercises.map(exercise => (
		<Exercise exercise={exercise} deleteExercise={deleteExercise} key={exercise["_id"]} />
	));

	return (
		<div>
			<h3>Logged Exercises</h3>
			<table className="table">
				<thead className="thead-light">
					<tr>
						<th>Username</th>
						<th>Description</th>
						<th>Duration</th>
						<th>Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{exercisesList}
				</tbody>
			</table>
		</div>
	);
}

export default ExercisesList;