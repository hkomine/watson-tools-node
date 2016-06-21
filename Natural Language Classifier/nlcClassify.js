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
	name : 'text',
	short : 't',
	type : 'string',
	description : 'A text to be classified',
	example : "'script --text=<target text>' or 'script -t <target text>'"
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
var text = args.options.text;
if (!classifier_id || !text){
	console.error('Required argument missing.');
	console.error("'script --help' or 'script -h' to show help.");
	return;
}

if (debug) {
	console.log('username is ' + nlc_constants.getUsername());
	console.log('password is ' + nlc_constants.getPassword());
}

var natural_language_classifier = watson.natural_language_classifier({
	url : nlc_constants.getUrl(),
	username : nlc_constants.getUsername(),
	password : nlc_constants.getPassword(),
	version : 'v1'
});

natural_language_classifier.classify({text: text, classifier_id: classifier_id }, function(err, res) {
	if (err) {
		console.log('error', err);
		return;
	}

	console.log('response:', JSON.stringify(res, null, 2));
});
