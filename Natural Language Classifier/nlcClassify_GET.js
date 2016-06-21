/**
 * 
 * @author: hkomine
 */
//var watson = require('watson-developer-cloud');
var my_library = require('./myLibrary.js');
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
	name : 'release_version',
	short : 'r',
	type : 'string',
	description : 'API release version',
	example : "'script --version=<API release version>' or 'script -v <API release version>'"
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
var release_version = args.options.release_version;

if (debug) {
	console.log('username is ' + nlc_constants.getUsername());
	console.log('password is ' + nlc_constants.getPassword());
}

var natural_language_classifier = my_library.myNaturalLanguageClassifier({
	url : nlc_constants.getUrl(),
	username : nlc_constants.getUsername(),
	password : nlc_constants.getPassword(),
	version : 'v1',
	debug : debug
});

natural_language_classifier.classify({
	text: text,
	classifier_id: classifier_id,
	release_version: release_version}, function(err, res) {
	if (err) {
		console.log('error', err);
		return;
	}

	console.log('response:', JSON.stringify(res, null, 2));
//	console.log('response:', res);
});
