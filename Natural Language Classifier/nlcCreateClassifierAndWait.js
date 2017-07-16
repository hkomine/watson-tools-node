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

createClassifierAndWait(natural_language_classifier, language, classifier_name, trainingdata_filepath, debug);

async function createClassifierAndWait(natural_language_classifier, language, name, trainingdata_filepath, debug) {
	var params_create = {
		language : language,
		name : classifier_name,
		training_data : fs.createReadStream(trainingdata_filepath)
	};
	if (debug) {
		console.log("params: ", JSON.stringify(params_create, null, 2));
	}
	var res_create = await createClassifier(natural_language_classifier, params_create);
	console.log('response:', JSON.stringify(res_create, null, 2));
	
	var params_get = {
		classifier_id : res_create.classifier_id
	};
	if (debug) {
		console.log("params: ", JSON.stringify(params_get, null, 2));
	}
	// loop until new classifier gets available
	var isAvailable = false;
	while (!isAvailable) {
		await sleep(3000);
		var res_get = getClassifier(natural_language_classifier, params_get);
		console.log('response:', JSON.stringify(res_get, null, 2));
		if (res_get.status) {
			isAvailable = (res_get.status == 'Available');
		}
	}
}

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

function getClassifier(natural_language_classifier, params) {
	return new Promise(function(resolve, reject){
		natural_language_classifier.status(params, function(err, res) {
			if (err) {
				reject(err);
				return;
			}
			resolve(res);
		});
	});
}

function sleep(msec) {
	return new Promise(function(resolve, reject){
		setTimeout(resolve, msec);
	});
}
