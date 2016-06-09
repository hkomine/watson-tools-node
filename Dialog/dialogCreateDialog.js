/**
 * 
 * @author: hkomine
 */
var fs = require('fs');
var watson = require('watson-developer-cloud');
var dialog_constants = require('./dialogConstants.js');
var argv = require('argv');

var debug = false;

argv.option([ {
	name : 'dialogfile',
	short : 'f',
	type : 'string',
	description : 'dialog filepath',
	example : "'script --dialogfile=dialog.xml' or 'script -f dialog.xml'"
}, {
	name : 'name',
	short : 'n',
	type : 'string',
	description : 'dialog name',
	example : "'script --name=\"my dialog\"' or 'script -f \"my dialog\"'"
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

var dialog_filepath = args.options.dialogfile;
var dialog_name = args.options.name;
if (!dialog_filepath || !dialog_name) {
	console.error('Required argument missing.');
	return;
}

if (debug) {
	console.log('username is ' + dialog_constants.getUsername());
	console.log('password is ' + dialog_constants.getPassword());
}

var dialog_service = watson.dialog({
	username : dialog_constants.getUsername(),
	password : dialog_constants.getPassword(),
	version : 'v1'
});

var params = {
	name : dialog_name,
	file : fs.createReadStream(dialog_filepath)
};

dialog_service.createDialog(params, function(err, res) {
	if (err) {
		console.log('error:', err);
		return;
	}
	if (debug) {
		console.log('response:', JSON.stringify(res, null, 2));
	}

	console.log('created Dialog id is ' + res.dialog_id);
});
