var request = require('request');

var base_url = "https://gateway.watsonplatform.net/dialog/api/";

exports.myDialog = function(initial_options) {
	var self = {};

	self.username = initial_options.username;
	self.password = initial_options.password;
	self.version = initial_options.version;

	self.getDialog = function(params, callback) {

		var dialog_id = params.dialog_id;
		var response_type = params.response_type;
		var accept_content_type = 'application/wds+xml';
		if ('binary' === response_type) {
			accept_content_type = 'application/octet-stream';
		} else if ('json' === response_type) {
			accept_content_type = 'application/wds+json';
		}

		var options = {
			url : base_url + self.version + "/dialogs/" + dialog_id,
			method : 'GET',
			headers : {
				'Accept' : accept_content_type
			},
			auth : {
				user : self.username,
				password : self.password
			},
		};

		request(options, function(error, response, body) {
			callback(error, body);
		});
	};
	return self;
};
