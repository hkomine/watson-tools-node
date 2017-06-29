var request = require('request');

exports.myDiscovery = function(initial_options) {
	var self = {};

	self.base_url = initial_options.url;
	self.username = initial_options.username;
	self.password = initial_options.password;
	self.version = initial_options.version;
	self.version_date = initial_options.version_date;

	self.deleteConfiguration = function(params, callback) {

		var environment_id = params.environment_id;
		var configuration_id = params.configuration_id;
		var response_type = params.response_type;

		var options = {
			url : self.base_url +'/v1/environments/' + environment_id + '/configurations/' + configuration_id + '?version=' + initial_options.version_date,
			method : 'DELETE',
			auth : {
				user : self.username,
				password : self.password
			},
		};

		request(options, function(error, response, body) {
			callback(error, JSON.parse(body));
		});
	};

	self.addConfiguration = function(params, callback) {

		var environment_id = params.environment_id;
		var configuration = params.configuration;

		var options = {
			url : self.base_url +'/v1/environments/' + environment_id + '/configurations?version=' + initial_options.version_date,
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json'
			},
			auth : {
				user : self.username,
				password : self.password
			},
			body : JSON.stringify(configuration),
		};

		request(options, function(error, response, body) {
			callback(error, JSON.parse(body));
		});
	}

	self.preview = function(params, callback) {
		var environment_id = params.environment_id;
		var configuration_id = params.configuration_id;
		var html = params.html;

		var url = self.base_url +'/v1/environments/' + environment_id + '/preview?configuration_id=' + configuration_id + '&version=' + initial_options.version_date;

		var options = {
			url : url,
			method : 'POST',
			headers : {
				'Content-Type' : 'multipart/form-data',
				'Accept' : 'application/json'
			},
			auth : {
				user : self.username,
				password : self.password
			}
		};

		var req = request.post(options, function(error, response, body) {
			callback(error, JSON.parse(body));
		});

		var form = req.form();
		form.append('file', html, {
			filename: '_',
			contentType : 'text/html'
		})
	}

	return self;
};
