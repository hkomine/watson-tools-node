/**
 * 
 * @author: hkomine
 */
var watson = require('watson-developer-cloud');
var dialog_constants = require('./dialogConstants.js');
var argv = require('argv');

var debug = false;

argv.option({
	name : 'debug',
	short : 'd',
	type : 'boolean',
	description : 'enable debug output for script',
	example : "'script --debug=true' or 'script -d true' or 'script -d'"
});

// get arguments
var args = argv.run();
debug = args.options.debug;

if (debug) {
	console.log('username is ' + dialog_constants.getUsername());
	console.log('password is ' + dialog_constants.getPassword());
}

var dialog_service = watson.dialog({
	username : dialog_constants.getUsername(),
	password : dialog_constants.getPassword(),
	version : 'v1'
});

dialog_service.getDialogs({}, function(err, res) {
	if (err) {
		console.log('error:', err);
		return;
	}

	if (debug) {
		console.log('response:', JSON.stringify(res, null, 2));
	}

	console.log('Dialog accounts:');
	console.log('\tdialog_id,\tname');
	var dialogs = res.dialogs;
	for (var i = 0; i < dialogs.length; i++) {
		var dialog = dialogs[i];
		console.log('\t' + (dialog.dialog_id + ' : ' + dialog.name));
	}

	console.log('');
	console.log('Language packs accounts:');
	console.log('\tdialog_id,\tname');
	var language_packs = res.language_packs;
	for (i = 0; i < language_packs.length; i++) {
		var language_pack = language_packs[i];
		console.log('\t' + (language_pack.dialog_id + ' : ' + language_pack.name));
	}
});