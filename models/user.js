const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	user: String,
	id: String,
	token: String,
	favorites: Array
});
const User = mongoose.model('User', userSchema);

module.exports = User;
