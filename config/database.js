const mongoose = require('mongoose');
require('dotenv').config()
const DATABASE_URL = process.env.DATABASE_URL;
const db = mongoose.connection;

mongoose.connect(DATABASE_URL, function(error) {
	if(mongoose.connection.readyState === 0) {
		console.log('Database not connected.')
	}	else if (mongoose.connection.readyState === 1) {
		console.log('Database connected.')
	}	else {
		console.log('Issue with database connection.')
	}	
})

mongoose.Promise = global.Promise;


db.on('error', console.error.bind(console, 'MongoDB connection error'));

