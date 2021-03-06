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
var DIALOG_ID = "<dialog_id>";

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
