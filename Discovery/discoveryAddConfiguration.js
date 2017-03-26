/**
 * 
 * @author: hkomine
 */
var watson = require('watson-developer-cloud');
var my_library = require('./myLibrary.js');
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
	name : 'name',
	short : 'n',
	type : 'string',
	description : 'configuration name',
	example : "'script --name=<configuration name>' or 'script -n <configuration name>'"
}, {
	name : 'model_id',
	short : 'm',
	type : 'string',
	description : 'model id',
	example : "'script --model_id=<model id>' or 'script -m <model id>'"
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
var name = args.options.name;
var model_id = args.options.model_id;
if (!environment_id || !name || !model_id){
	console.error('Required argument missing.');
	console.error("'script --help' or 'script -h' to show help.");
	return;
}

if (debug) {
	console.log('username is ' + discovery_constants.getUsername());
	console.log('password is ' + discovery_constants.getPassword());
}

var discovery = my_library.myDiscovery({
	url : discovery_constants.getUrl(),
	username : discovery_constants.getUsername(),
	password : discovery_constants.getPassword(),
	version : 'v1',
	version_date : watson.DiscoveryV1.VERSION_DATE_2016_12_15
});

var configuration_text = {};
configuration_text = {
	'name' : name,
	'conversions' : {
		'html' : {
			'exclude_tags_completely' : [ 'script', 'sup' ],
			'exclude_tags_keep_content' : [ 'font', 'em', 'span' ],
			'exclude_content' : {
				'xpaths' : []
			},
			'keep_content' : {
				'xpaths' : []
			},
			'exclude_tag_attributes' : [ 'EVENT_ACTIONS' ]
		},
		'json_normalizations' : []
	},
	"enrichments" : {
		'destination_field' : 'enriched_text',
		'source_field' : 'text',
		'enrichment' : 'alchemy_language',
		'options' : {
			'extract' : 'entity, typed-rels',
			'model' : model_id
		}
	}
};

discovery.addConfiguration ({environment_id: environment_id, configuration: configuration_text }, function(err, res) {
	if (err) {
		console.log('error', err);
		return;
	}

	console.log('response:', JSON.stringify(res, null, 2));
});
