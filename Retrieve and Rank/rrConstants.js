/**
 * 
 * @author: hkomine
 */

// CREDENTIALS - Copy JSON from the "Service Credentials"
var SERVICE_CREDENTIALS = {
	"credentials" : {
		"url" : "https://gateway.watsonplatform.net/retrieve-and-rank/api",
		"password" : "<PASSWORD for Retrieve and Rank service instance>",
		"username" : "<USERNAME for Retrieve and Rank service instance>"
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
