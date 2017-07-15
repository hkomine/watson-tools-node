/**
 * 
 * @author: hkomine
 */
var fs = require('fs');
var watson = require('watson-developer-cloud');
var nlc_constants = require('./nlcConstants.js');
var argv = require('argv');

argv.option([ {
	name : 'trainingdata',
	short : 't',
	type : 'string',
	description : 'training data file path',
	example : "'script --trainingdata=training.csv' or 'script -f training.csv'"
}, {
	name : 'name',
	short : 'n',
	type : 'string',
	description : 'classifier name',
	example : "'script --name=\"my classifier\"' or 'script -f \"my classifier\"'"
}, {
	name : 'language',
	short : 'l',
	type : 'string',
	description : 'ISO language code',
	example : "'script --language=\"en\"' or 'script -l \"en\"'"
}, {
	name : 'debug',
	short : 'd',
	type : 'boolean',
	description : 'enable debug output for script',
	example : "'script --debug=true' or 'script -d true' or 'script -d'"
} ]);

// get arguments
var args = argv.run();
const debug = args.options.debug;

var trainingdata_filepath = args.options.trainingdata;
var classifier_name = args.options.name;
var language = args.options.language;
if (!trainingdata_filepath || !classifier_name || !language) {
	console.error('Required argument missing.');
	console.error("'script --help' or 'script -h' to show help.");
	process.exit();;
}

if (debug) {
	console.log('url: ' +  nlc_constants.getUrl());
	console.log('username: ' + nlc_constants.getUsername());
	console.log('password: ' + nlc_constants.getPassword());
}

var natural_language_classifier = watson.natural_language_classifier({
	url : nlc_constants.getUrl(),
	username : nlc_constants.getUsername(),
	password : nlc_constants.getPassword(),
	version : 'v1'
});

var params = {
	language : language,
	name : classifier_name,
	training_data : fs.createReadStream(trainingdata_filepath)
};
if (debug) {
	console.log("params: ", JSON.stringify(params, null, 2));
}

createClassifier(natural_language_classifier, params).then(function (res) {
	console.log('response:', JSON.stringify(res, null, 2));
}).catch(function (err) {
    console.error(err);
});

function createClassifier(natural_language_classifier, params) {
	return new Promise(function(resolve, reject){
		natural_language_classifier.create(params, function(err, res) {
			if (err) {
				reject(err);
				return;
			}
			resolve(res);
		});
	});
}