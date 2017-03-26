var request = require('request');

var base_url = "https://gateway.watsonplatform.net/discovery/api";

exports.myDiscovery = function(initial_options) {
	var self = {};

	self.username = initial_options.username;
	self.password = initial_options.password;
	self.version = initial_options.version;
	self.version_date = initial_options.version_date;

	self.deleteConfiguration = function(params, callback) {

		var environment_id = params.environment_id;
		var configuration_id = params.configuration_id;
		var response_type = params.response_type;
/*		var accept_content_type = 'application/wds+xml';
		if ('binary' === response_type) {
			accept_content_type = 'application/octet-stream';
		} else if ('json' === response_type) {
			accept_content_type = 'application/wds+json';
		}*/

		var options = {
			url : base_url +'/v1/environments/' + environment_id + "/configurations/" + configuration_id + '?version=' + initial_options.version_date,
			method : 'DELETE',
			headers : {
				'Accept' : 'application/wds+json'
			},
			auth : {
				user : self.username,
				password : self.password
			},
		};
		
		console.log (options.url);

		request(options, function(error, response, body) {
			callback(error, body);
		});
	};
	return self;
};
