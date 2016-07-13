/**
 * 
 * @author: hkomine
 */

// CREDENTIALS - Copy JSON from the "Service Credentials"
var SERVICE_CREDENTIALS ={
  "credentials": {
    "url": "https://gateway.watsonplatform.net/conversation/api",
    "password": "<password>",
    "username": "<username>"
  }
};

exports.getUsername = function() {
	return SERVICE_CREDENTIALS.credentials.username;
};

exports.getPassword = function() {
    return SERVICE_CREDENTIALS.credentials.password;
};

exports.getUrl = function() {
    return SERVICE_CREDENTIALS.credentials.url;
};

