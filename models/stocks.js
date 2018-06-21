const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
	date: String,
	data: Object
});
const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;