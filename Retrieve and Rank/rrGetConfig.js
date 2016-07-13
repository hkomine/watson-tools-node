/**
 * 
 * @author: hkomine
 */
var watson = require('watson-developer-cloud');
var nlc_constants = require('./rrConstants.js');
var argv = require('argv');
var fs = require('fs');

var debug = false;

argv.option([ {
	name : 'cluster_id',
	short : 'i',
	type : 'string',
	description : 'Cluster id',
	example : "'script --cluster_id=<cluster id>' or 'script -i <cluster id>'"
}, {
	name : 'config_name',
	short : 'n',
	type : 'string',
	description : 'Config name',
	example : "'script --config_name=<config name>' or 'script -n <config name>'"
}, {
	name : 'config_file',
	short : 'f',
	type : 'string',
	description : 'Config filename',
	example : "'script --config_file=<config file name>' or 'script -f <config file name>'"
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

var cluster_id = args.options.cluster_id;
var config_name = args.options.config_name;
var config_file = args.options.config_file;
if (!cluster_id || !config_name || !config_file) {
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
	cluster_id: cluster_id,
	config_name: config_name
};

retrieve_and_rank.getConfig(params).pipe(fs.createWriteStream(config_file));
console.log('config ' + config_name + ' has been exported to ' + config_file);