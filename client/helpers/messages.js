Errors = new Mongo.Collection(null);

Successes = new Mongo.Collection(null);

throwError = function(message) {
	Errors.insert({message: message});
};

throwSuccess = function(message) {
	Successes.insert({message:message});
};