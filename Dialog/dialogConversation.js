/**
 * 
 * @author: hkomine
 */
var fs = require('fs');
var watson = require('watson-developer-cloud');
var dialog_constants = require('./dialogConstants.js');
var argv = require('argv');
var rl = require('readline');

var debug = false;

argv.option([ {
	name : 'dialog_id',
	short : 'a',
	type : 'string',
	description : 'dialog id',
	example : "'script --dialog_id=<dialog id>' or 'script -a <dialog id>'"
}, {
	name : 'client_id',
	short : 'l',
	type : 'string',
	description : 'client id',
	example : "'script --client_id=<client id>' or 'script -l <client id>'"
}, {
	name : 'conversation_id',
	short : 'o',
	type : 'string',
	description : 'conversation id',
	example : "'script --conversation_id=<conversation id>' or 'script -o <conversation id>'"
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

var dialog_id = args.options.dialog_id;
var client_id = args.options.client_id;
var conversation_id = args.options.conversation_id;

// start interactive
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
var prefix = 'You> ';
console.log('Watson Dialog conversation app. (Ctrl-c or Ctrl-d for terminating.)');

if (debug) {
	console.log('username is ' + dialog_constants.getUsername());
	console.log('password is ' + dialog_constants.getPassword());
}

var dialog_service = watson.dialog({
	username : dialog_constants.getUsername(),
	password : dialog_constants.getPassword(),
	version : 'v1'
});

// check dialog_id and get from constant
if (!dialog_id) {
	dialog_id = dialog_constants.getDialogId();
}

function processResponse(err, res) {
	if (err) {
		console.log('error:', err);
	} else {
		if (debug) {
			console.log('response:', JSON.stringify(res, null, 2));
		}

		if ((client_id !== res.client_id) || (conversation_id !== res.conversation_id)) {
			client_id = res.client_id;
			conversation_id = res.conversation_id;
			console.log('client_id =' + client_id);
			console.log('conversation_id = ' + conversation_id);
		}

		var messages = res.response;
		for (var i = 0; i < messages.length; i++) {
			console.log('Dialog> ' + messages[i]);
		}
	}

	rl.setPrompt(prefix, prefix.length);
	rl.prompt();
}

function conversation(input) {
	var params = {
		dialog_id : dialog_id,
		client_id : client_id,
		conversation_id : conversation_id,
		input : input
	};

	dialog_service.conversation(params, processResponse);
}

rl.on('line', function(line) {
	conversation(line);
}).on('close', function() {
	console.log('terminated.');
	process.exit(0);
});

// start the conversation
conversation('');
