const express = require('express');
const router = express.Router();

const Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
	Exercise.find({})
	.then(exercises => res.json(exercises))
	.catch(err => res.status(400).json("Error: " + err));
});

router.route('/add').post((req, res) => {
	const { username, description, duration, date } = req.body;
	const newExercise = new Exercise({
		username, description, duration, date
	});
	newExercise.save()
	.then(() => res.json("Exercise added!"))
	.catch(err => res.status(400).json("Error: " + err));
});

router.route('/:id')
	.get((req, res) => {
		Exercise.findById(req.params.id)
		.then(exercise => res.json(exercise))
		.catch(err => res.status(400).json("Error: " + err));
	})
	.delete((req, res) => {
		Exercise.findByIdAndDelete(req.params.id)
		.then(() => res.json("Exercise deleted"))
		.catch(err => res.status(400).json("Error: " + err));
	});

router.route('/update/:id').put((req, res) => {
	Exercise.findById(req.params.id)
	.then(exercise => {
		const { username, description, duration, date } = req.body;
		exercise.username = username;
		exercise.description = description;
		exercise.duration = Number(duration);
		exercise.date = Date.parse(date);

		exercise.save()
		.then(() => res.json("Exercise updated!"))
		.catch(err => res.status(400).json("Error: " + err));
	})
	.catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;