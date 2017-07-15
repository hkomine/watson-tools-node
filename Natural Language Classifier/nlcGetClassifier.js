/**
 * 
 * @author: hkomine
 */
var watson = require('watson-developer-cloud');
var nlc_constants = require('./nlcConstants.js');
var argv = require('argv');

var debug = false;

argv.option([ {
	name : 'classifier_id',
	short : 'c',
	type : 'string',
	description : 'classifier id',
	example : "'script --classifier_id=<classifier_id>' or 'script -c <classifier_id>'"
}, {
	name : 'debug',
	short : 'd',
	type : 'boolean',
	description : 'enable debug output for script',
	example : "'script --debug=true' or 'script -d true' or 'script -d'"
} ]);

// get arguments
var args = argv.run();
debug = args.options.debug;

var classifier_id = args.options.classifier_id;
if (!classifier_id) {
	console.error('Required argument missing.');
	console.error("'script --help' or 'script -h' to show help.");
	process.exit;
}

if (debug) {
	console.log('url: ' +  nlc_constants.getUrl());
	console.log('username: ' + nlc_constants.getUsername());
	console.log('password: ' + nlc_constants.getPassword());
}

var natural_language_classifier = watson.natural_language_classifier({
	url : nlc_constants.getUrl(),
	username : nlc_constants.getUsername(),
	password : nlc_constants.getPassword(),
	version : 'v1'
});

var params = {
		classifier_id : classifier_id
};
if (debug) {
	console.log("params: ", JSON.stringify(params, null, 2));
}

getClassifier(natural_language_classifier, params).then(function (res) {
	console.log('response:', JSON.stringify(res, null, 2));
}).catch(function (err) {
    console.error(err);
});

function getClassifier(natural_language_classifier, params) {
	return new Promise(function(resolve, reject){
		natural_language_classifier.status(params, function(err, res) {
			if (err) {
				reject(err);
				return;
			}
			resolve(res);
		});
	});
}