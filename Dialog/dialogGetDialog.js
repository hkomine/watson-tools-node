/**
 * 
 * @author: hkomine
 */
var fs = require('fs');
//var watson = require('watson-developer-cloud');
var my_library = require('./myLibrary.js');
var dialog_constants = require('./dialogConstants.js');
var argv = require('argv');

var debug = false;

argv.option([ {
	name : 'dialog_id',
	short : 'a',
	type : 'string',
	description : 'dialog id',
	example : "'script --dialog_id=<dialog_id>' or 'script -a <dialog_id>'"
}, {
	name : 'response_type',
	short : 'r',
	type : 'string',
	description : "response content type ('xml', 'json' or 'binary')",
	example : "'script --response_type=<response content type>' or 'script -r <response content type>'"

}, {
	name : 'output',
	short : 'o',
	type : 'string',
	description : 'output file name',
	example : "'script --output=<output file name>' or 'script -o <output file name>'"
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
if (!dialog_id) {
	console.error('Required argument missing.');
	return;
}

var response_type = args.options.response_type;
var output = args.options.output;

if (debug) {
	console.log('username is ' + dialog_constants.getUsername());
	console.log('password is ' + dialog_constants.getPassword());
}

var my_dialog_service = my_library.myDialog({
	username : dialog_constants.getUsername(),
	password : dialog_constants.getPassword(),
	version : 'v1'
});

var params = {
	dialog_id : dialog_id,
	response_type : response_type
};

my_dialog_service.getDialog(params, function(err, res) {
	if (err) {
		console.log('error:', err);
		return;
	}
	
	if (undefined !== output) {
		if (debug) {
			console.log('response:', res);
		}
		fs.writeFile(output, res);
		console.log('Dialog id ' + dialog_id + ' was been saved at ' + output);
	} else {
		console.log('response:', res);
	}
});

