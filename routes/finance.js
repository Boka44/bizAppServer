const express = require('express');
const app = express();
const https = require('https');
const ALPHA_API_KEY = process.env.ALPHA_API_KEY;
const username = process.env.API_USERNAME;
const password = process.env.API_PASSWORD;
const auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

app.get('/', (req, res, next) => {

	const request = https.request({
	    method: "GET",
	    host: "api.intrinio.com",
	    path: "/data_point?identifier=AAPL,GOOGL,MSFT&item=last_price",
	    headers: {
	        "Authorization": auth
	    }
	}, (response) => {
	    let json = "";
	    response.on('data', function (chunk) {
	        json += chunk;
	    });
	    response.on('end', function() {
	        const companies = JSON.parse(json);

	        const request1 = https.request({
			    method: "GET",
			    host: "api.intrinio.com",
			    path: "/data_point?identifier=AAPL,GOOGL,MSFT&item=security_name",
			    headers: {
			        "Authorization": auth
			    }
			}, (response1) => {
			    let json1 = "";
			    response1.on('data', function (chunk) {
			        json1 += chunk;
			    });
			    response1.on('end', function() {
			        const names = JSON.parse(json1);
        			let count = 0;
			        companies.data.forEach((c) => {
			        	names.data.forEach((n) => {
							c.name = n.value;
							c.isFav = false;				        	
			        	})
			        	count++;
			        })
			        if(count === companies.data.length) {
			        	res.send(companies)
			        }
			    });
			});
			request1.end();
	    });
	});
	request.end();
})

module.exports = app;