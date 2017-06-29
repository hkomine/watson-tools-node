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
	name : 'configuration_id',
	short : 'c',
	type : 'string',
	description : 'configuration id',
	example : "'script --configuration_id=<configuration id>' or 'script -c <configuration id>'"
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
var configuration_id = args.options.configuration_id;
if (!environment_id || !configuration_id){
	console.error('Required argument missing.');
	console.error("'script --help' or 'script -h' to show help.");
	console.log(environment_id);
	console.log(configuration_id);
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
	version_date : watson.DiscoveryV1.VERSION_DATE_2017_04_27
});

discovery.getConfiguration ({environment_id: environment_id, configuration_id: configuration_id }, function(err, res) {
	if (err) {
		console.log('error', err);
		return;
	}

	console.log('response:', JSON.stringify(res, null, 2));
});
