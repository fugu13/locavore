var express = require('express'),
	bodyParser = require('body-parser');


function LambdaRESTAPI(locavore) {

	var app = this.app = express();

	app.use(bodyParser.json({limit: '50mb'}));

	app.post('/2014-11-13/functions/:fn/invoke-async/', function(req, res) { // InvokeAsync
		locavore.invoke(req.params.fn, req.body, function(err, id) {
			var status = err ? 404 : 202;
			if (!err) {
				res.header('x-amzn-requestid', id);
			}
			res.status(status).send({
				Status: status
			});
		});
	});

	app.get('/2014-11-13/functions/', function(req, res) { // ListFunctions
		locavore.functionList(function(err, list) {
			if (err) res.send(500);
			else res.send({ Functions: list });
		});
	});

	app.post('/2014-11-13/event-source-mappings/', notImplemented); // AddEventSource
	app.delete('/2014-11-13/functions/:fn', notImplemented); // DeleteFunction
	app.get('/2014-11-13/event-source-mappings/:uuid', notImplemented); // GetEventSource
	app.get('/2014-11-13/functions/:fn', notImplemented); // GetFunction
	app.get('/2014-11-13/functions/:fn/configuration', notImplemented); // GetFunctionConfiguration
	app.get('/2014-11-13/event-source-mappings/', notImplemented); // ListEventSources
	app.delete('/2014-11-13/event-source-mappings/:uuid', notImplemented); // RemoveEventSource
	app.put('/2014-11-13/functions/:fn/configuration', notImplemented); // UpdateFunctionConfiguration
	app.put('/2014-11-13/functions/:fn', notImplemented); // UploadFunction

}

LambdaRESTAPI.prototype.listen = function() {
	this.app.listen.apply(this.app, arguments);
};

exports = module.exports = LambdaRESTAPI;


function notImplemented(req, res) {
	res.status(501).send({});
}
