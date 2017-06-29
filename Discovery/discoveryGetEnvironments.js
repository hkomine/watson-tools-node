/**
 *
 * @author: hkomine
 */
var watson = require('watson-developer-cloud');
var discovery_constants = require('./discoveryConstants.js');
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
	console.log('username is ' + discovery_constants.getUsername());
	console.log('password is ' + discovery_constants.getPassword());
}

var discovery = watson.discovery({
	url : discovery_constants.getUrl(),
	username : discovery_constants.getUsername(),
	password : discovery_constants.getPassword(),
	version : 'v1',
	version_date : watson.DiscoveryV1.VERSION_DATE_2017_04_27
});

discovery.getEnvironments  ({}, function(err, res) {
	if (err) {
		console.log('error', err);
		return;
	}

	console.log('response:', JSON.stringify(res, null, 2));
});
