/**
 * 
 * @author: hkomine
 */
var watson = require('watson-developer-cloud');
var discovery_constants = require('./discoveryConstants.js');
var argv = require('argv');

var debug = false;

argv.option([ {
	name : 'environment_id',
	short : 'e',
	type : 'string',
	description : 'environment id',
	example : "'script --environment_id=<environment id>' or 'script -e <environment id>'"
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

var environment_id = args.options.environment_id;
if (!environment_id){
	console.error('Required argument missing.');
	console.error("'script --help' or 'script -h' to show help.");
	return;
}

if (debug) {
	console.log('username is ' + discovery_constants.getUsername());
	console.log('password is ' + discovery_constants.getPassword());
}

var discovery = watson.discovery({
	url : discovery_constants.getUrl(),
	username : discovery_constants.getUsername(),
	password : discovery_constants.getPassword(),
	version : 'v1',
	version_date : watson.DiscoveryV1.VERSION_DATE_2016_12_15
});

discovery.getConfigurations ({environment_id: environment_id}, function(err, res) {
	if (err) {
		console.log('error', err);
		return;
	}

	console.log('response:', JSON.stringify(res, null, 2));
});
