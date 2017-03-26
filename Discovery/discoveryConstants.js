/**
 * 
 * @author: hkomine
 */

// CREDENTIALS - Copy JSON from the "Service Credentials"
var SERVICE_CREDENTIALS = {
  "credentials": {
    "url": "https://gateway.watsonplatform.net/discovery/api",
    "username": "78ac4f0c-04dd-412d-93e0-a767d513a2f6",
    "password": "0AqcXeIO8Y34"
/*    "password": "<password>",
    "username": "<username>"
*/
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
