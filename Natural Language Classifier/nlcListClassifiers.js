/**
 * 
 * @author: hkomine
 */
var watson = require('watson-developer-cloud');
var nlc_constants = require('./nlcConstants.js');
var argv = require('argv');

argv.option({
	name : 'debug',
	short : 'd',
	type : 'boolean',
	description : 'enable debug output for script',
	example : "'script --debug=true' or 'script -d true' or 'script -d'"
});

// get arguments
var args = argv.run();
const debug = args.options.debug;

if (debug) {
	console.log('url: ' +  nlc_constants.getUrl());
	console.log('username: ' + nlc_constants.getUsername());
	console.log('password: ' + nlc_constants.getPassword());
}

const natural_language_classifier = watson.natural_language_classifier({
	url : nlc_constants.getUrl(),
	username : nlc_constants.getUsername(),
	password : nlc_constants.getPassword(),
	version : 'v1'
});

listClassifiers(natural_language_classifier).then(function (res) {
	console.log('response:', JSON.stringify(res, null, 2));
}).catch(function (err) {
    console.error(err);
});

function listClassifiers(natural_language_classifier) {
	return new Promise(function(resolve, reject){
		natural_language_classifier.list({}, function(err, res) {
			if (err) {
				reject(err);
				return;
			}
			resolve(res);
		});
	});
}