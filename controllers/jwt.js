const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const authenticate = expressJwt({
    secret: 'my-secret',
    requestProperty: 'auth',
    getToken: function(req) {
    if (req.headers['x-auth-token']) {
        return req.headers['x-auth-token'];
    }
    return null;
  }
});

// function createToken(auth) {
// 	jwt.sign({
// 	    exp: Math.floor(Date.now() / 1000) + (60 * 60),
// 	    data: {
// 	    	favorites: auth.favorites,
// 	    	id: auth.id,
// 	    	name: auth.name
// 	    }
// 	}, 'secret');
// }

module.exports = {

	generateToken: function (req, res, next) {
	    req.token = jwt.sign({
		  exp: Math.floor(Date.now() / 1000) + (60 * 60),
		  data: {
		  	favorites: req.auth.favorites,
		  	id: req.auth.id,
		  	name: req.auth.name
		  }
		}, 'secret');
	    console.log("token: " + req.token)
		next();
	},

	sendToken: function (req, res) {
	    res.setHeader('x-auth-token', req.token);
	    res.status(200).send(req.auth);
	},

	authenticate: authenticate
}