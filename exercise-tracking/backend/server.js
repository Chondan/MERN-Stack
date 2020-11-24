const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// ENVIRONMENT VARIABLES
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res) {
	res.end("Hello World");
});

// ROUTERS
const UserRouter = require('./routes/user');
app.use('/users', UserRouter);
const ExerciseRouter = require('./routes/exercise')
app.use('/exercises', ExerciseRouter);

// CONNECT TO MongoDB
const connectionURI = process.env.ATLAS_URI;
mongoose.connect(connectionURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB database connection established successfully");
	// LISTENING AT PORT 5000
	app.listen(port, () => {
		console.log(`Server is running on port: ${port}`);
	});
});

