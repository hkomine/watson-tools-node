/**
 * 
 * @author: hkomine
 */

// CREDENTIALS - Copy JSON from the "Service Credentials"
var SERVICE_CREDENTIALS = {
  "credentials": {
    "url": "https://gateway.watsonplatform.net/dialog/api",
    "password": "<password>",
    "username": "<username>"
  }
};
var DIALOG_ID = "a08f9b51-7152-4d48-801d-94df077a4194";

exports.getUsername = function() {
	return SERVICE_CREDENTIALS.credentials.username;
};

exports.getPassword = function() {
    return SERVICE_CREDENTIALS.credentials.password;
};

exports.getUrl = function() {
    return SERVICE_CREDENTIALS.credentials.url;
};

exports.getDialogId = function() {
	return DIALOG_ID;
};
