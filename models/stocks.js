const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
	date: Date,
	data: Object
});
const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;