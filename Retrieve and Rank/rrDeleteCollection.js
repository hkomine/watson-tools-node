/**
 * 
 * @author: hkomine
 */
var watson = require('watson-developer-cloud');
var nlc_constants = require('./rrConstants.js');
var argv = require('argv');

var debug = false;

argv.option([ {
	name : 'cluster_id',
	short : 'i',
	type : 'string',
	description : 'Cluster id',
	example : "'script --cluster_id=<cluster id>' or 'script -i <cluster id>'"
}, {
	name : 'collection_name',
	short : 'c',
	type : 'string',
	description : 'Config zip path',
	example : "'script --collection_name=<collection name>' or 'script -c <collection name>'"
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
var collection_name = args.options.collection_name;
if ((!cluster_id) || (!collection_name)) {
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
	collection_name: collection_name,
	wt: 'json'
};

retrieve_and_rank.deleteCollection(params, function(err, res) {
	if (err) {
		console.log('error', err);
		return;
	}

	console.log('response:', JSON.stringify(res, null, 2));
});