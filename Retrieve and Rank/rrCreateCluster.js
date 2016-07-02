/**
 * 
 * @author: hkomine
 */
var watson = require('watson-developer-cloud');
var nlc_constants = require('./rrConstants.js');
var argv = require('argv');

var debug = false;

argv.option([ {
	name : 'cluster_name',
	short : 'n',
	type : 'string',
	description : 'Cluster name',
	example : "'script --cluster_name=<cluster name>' or 'script -n <cluster name>'"
}, {
	name : 'cluster_size',
	short : 's',
	type : 'integer',
	description : 'Cluster size',
	example : "'script --cluster_size=<cluster size>' or 'script -s <cluster size>'"
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

var cluster_size = args.options.cluster_size;
var cluster_name = args.options.cluster_name;
if (!cluster_name) {
	console.error('Required argument missing.');
	console.error("'script --help' or 'script -h' to show help.");
	return;
}

if (debug) {
	console.log('username is ' + nlc_constants.getUsername());
	console.log('password is ' + nlc_constants.getPassword());
}

var retrieve_and_rank = watson.retrieve_and_rank({
	url : nlc_constants.getUrl(),
	username : nlc_constants.getUsername(),
	password : nlc_constants.getPassword(),
	version : 'v1'
});

var params = {
	cluster_name: cluster_name
};
if (cluster_size) {
	params.cluster_size = cluster_size;
}

retrieve_and_rank.createCluster(params, function(err, res) {
	if (err) {
		console.log('error', err);
		return;
	}

	console.log('response:', JSON.stringify(res, null, 2));
});