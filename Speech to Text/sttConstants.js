/**
 * 
 * @author: hkomine
 */

// CREDENTIALS - Copy JSON from the "Service Credentials"
var SERVICE_CREDENTIALS ={
  "credentials": /*{
    "url": "https://gateway.watsonplatform.net/conversation/api",
    "password": "<password>",
    "username": "<username>"
  }*/
  {
	  "url": "https://stream.watsonplatform.net/speech-to-text/api",
	  "password": "gdylhnR4sua0",
	  "username": "0354865b-e5d5-47d5-9311-81d90e7be018"
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

