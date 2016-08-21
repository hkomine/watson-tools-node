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
	name : 'file',
	short : 'f',
	type : 'string',
	description : 'audio file to be dectated',
	example : "'script --file=speech.wav' or 'script -f speech.wav'"
}, {
	name : 'content_type',
	short : 'c',
	type : 'string',
	description : 'content_type header value',
	example : "'script --content_type=audio/wav' or 'script -c audio/wav'"
}, {
	name : 'model',
	short : 'm',
	type : 'string',
	description : 'the model to be used for the recognition request',
	example : "'script --model=ja-JP_BroadbandModel' or 'script -m ja-JP_BroadbandModel'"
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

var file = args.options.file;
var content_type = args.options.content_type;
var model = args.options.model;
if (!file || !content_type || !model) {
	console.error('Required argument missing.');
	console.error("'script --help' or 'script -h' to show help.");
	return;
}

if (debug) {
	console.log('username is ' + stt_constants.getUsername());
	console.log('password is ' + stt_constants.getPassword());
}

var speech_to_text = watson.speech_to_text({
	url : stt_constants.getUrl(),
	username : stt_constants.getUsername(),
	password : stt_constants.getPassword(),
	version : 'v1'
});

var params = {
	audio : fs.createReadStream(file),
	content_type : content_type,
	timestamps : true,
	word_alternatives_threshold : 0.9,
	continuous : true,
	model : model
};

speech_to_text.recognize(params, function(error, transcript) {
	if (error)
		console.log('error:', error);
	else
		console.log(JSON.stringify(transcript, null, 2));
});
