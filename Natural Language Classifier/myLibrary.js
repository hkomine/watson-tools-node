var request = require('request');

exports.myNaturalLanguageClassifier = function(initial_options) {
	var self = {};

	var base_url = initial_options.url;
	if (!String(base_url).endsWith('/')) {
		base_url += '/';
	}
	self.base_url = base_url;
	self.username = initial_options.username;
	self.password = initial_options.password;
	self.version = initial_options.version;
	self.debug = initial_options.debug;
	


	self.classify = function(params, callback) {
		
		var text = params.text;
		var classifier_id = params.classifier_id;
		var release_version = params.release_version;

		
		var url = self.base_url + '/' + self.version + '/classifiers/' + classifier_id + '/classify?text=' + text;
		if (undefined !== release_version) {
			url = url + '&version=' + release_version;
		}
		
		var options = {
			url : url,
			method : 'GET',
			auth : {
				user : self.username,
				password : self.password
			},
		};

		if (self.debug) {
			console.log('options: \n' + JSON.stringify(options));
		}
		
		request(options, function(error, response, body) {
			callback(error, JSON.parse(body));
		});
	};
	return self;
};
