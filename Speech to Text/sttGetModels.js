/**
 * 
 * @author: hkomine
 */
var fs = require('fs');
var watson = require('watson-developer-cloud');
var stt_constants = require('./sttConstants.js');
var argv = require('argv');

var debug = false;

argv.option([ {
	name : 'debug',
	short : 'd',
	type : 'boolean',
	description : 'enable debug output for script',
	example : "'script --debug=true' or 'script -d true' or 'script -d'"
} ]);

// get arguments
var args = argv.run();
debug = args.options.debug;

if (debug) {
	console.log('url is ' + stt_constants.getUrl());
	console.log('username is ' + stt_constants.getUsername());
	console.log('password is ' + stt_constants.getPassword());
}

var speech_to_text = watson.speech_to_text({
	url : stt_constants.getUrl(),
	username : stt_constants.getUsername(),
	password : stt_constants.getPassword(),
	version : 'v1'
});

speech_to_text.getModels(null, function(error, models) {
	if (error)
		console.log('error:', error);
	else
		console.log(JSON.stringify(models, null, 2));
});
