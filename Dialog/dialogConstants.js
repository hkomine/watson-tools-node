/**
 * 
 * @author: hkomine
 */

// CREDENTIALS - fill with the "username" and "password" from the "Service
// Credentials"
var USERNAME = "<USERNAE for Dialog service instance>";
var PASSWORD = "<PASSWORD for Dialog service instance>";
var DIALOG_ID = "<Dialog ID, which generally can be override by '-a' argument>";

exports.getUsername = function() {
	return USERNAME;
};

exports.getPassword = function() {
	return PASSWORD;
};

exports.getDialogId = function() {
	return DIALOG_ID;
};
