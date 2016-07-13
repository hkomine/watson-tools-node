/**
 * 
 * @author: hkomine
 */
var watson = require('watson-developer-cloud');
var conversation_constants = require('./cvsConstants.js');
var argv = require('argv');
var rl = require('readline');

var debug = false;

argv.option([ {
	name : 'workspace_id',
	short : 'w',
	type : 'string',
	description : 'Workspace id',
	example : "'script --workspace_id=<workspace id>' or 'script -w <workspace id>'"
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

var workspace_id = args.options.workspace_id;
if (!workspace_id) {
	console.error('Required argument missing.');
	console.error("'script --help' or 'script -h' to show help.");
	return;
}

// start interactive
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
var prefix = 'You> ';
console.log('Watson Conversation app. (Ctrl-c or Ctrl-d for terminating.)');

if (debug) {
	console.log('username is ' + conversation_constants.getUsername());
	console.log('password is ' + conversation_constants.getPassword());
}

var conversation_service = watson.conversation({
	username : conversation_constants.getUsername(),
	password : conversation_constants.getPassword(),
	version : 'v1',
	version_date: '2016-07-11'
});

var context = "";

function processResponse(err, res) {
	if (err) {
		console.log('error:', err);
	} else {
		if (debug) {
			console.log('response:\n', JSON.stringify(res, null, 2));
		}
		
		var texts = res.output.text;
		for (var i=0; i<texts.length; i++) {
			console.log("Watson> " + texts[i]);
		}
		
		context = res.context;
	}

	rl.setPrompt(prefix, prefix.length);
	rl.prompt();
}

function conversation(message) {
	var params = {
			input: {"text": message},
			workspace_id: workspace_id
	};
	if (context && "" != context) {
		params.context = context;
	}
	if (debug) {
		console.log('Request params:\n', JSON.stringify(params, null, 2));
	}
	
	conversation_service.message(params, processResponse);
}

rl.on('line', function(line) {
	conversation(line);
}).on('close', function() {
	console.log('terminated.');
	process.exit(0);
});

conversation('');

