const express = require('express');
const app = express();
const https = require('https');
const ALPHA_API_KEY = process.env.ALPHA_API_KEY;
const username = process.env.API_USERNAME;
const password = process.env.API_PASSWORD;
const auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

const stocks = "AAPL,GOOGL,MSFT,AMZN,FB,BRK-A,BABA,JNJ,JPM,XOM,BAC,WMT,WFC,RDS-A,V,PG,BUD,T,CVX,UNH,PFE,CHL,HD,INTC,TSM,VZ,ORCL,C,NVS,SNAP,DIS,TSLA,NFLX,TWTR,RCII,RAD,SIRI,AIG,AXP,INT,INS,S,SBUX,X,XRX,PRU,PEP,PM,SNE,NTDOY"

app.get('/', (req, res, next) => {

	const request = https.request({
	    method: "GET",
	    host: "api.intrinio.com",
	    path: `/data_point?identifier=${stocks}&item=last_price`,
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
			    path: `/data_point?identifier=${stocks}&item=security_name`,
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
			        for (let i = 0; i < companies.data.length; i++) {
			        	companies.data[i].name = names.data[i].value
			        	count++;
			        }
			        console.log(count)
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