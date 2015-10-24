Requests = new Mongo.Collection('requests');

Meteor.methods({
	requestAdd: function(request) {
		var request = _.extend(request, {
			submitted: new Date()
		});
		var postSameRequest = Requests.findOne({
			userId: request.userId,
			shiftType: request.shiftType,
			requestDate: request.requestDate
		});
		if (postSameRequest) {
			return { requestExist: true }
		}

		Requests.insert(request);
	},
	requestEdit: function(id, request) {

		var postSameRequest = Requests.findOne({
			userId: request.userId,
			shiftType: request.shiftType,
			requestDate: request.requestDate
		});
		if (postSameRequest) {
			return { requestExist: true }
		}

		Requests.update( {_id: id}, {$set:request} );
	}
});

validateRequest = function(request) {
	var errors = {};

	if (moment() >= moment().day(6) && moment().hour() >= 12) {
  	  var minDate = moment().day(6+7);
  	} else {
  	  var minDate = moment().day(6);
  	}

	if (!request.requestDate || (request.requestDate <= minDate))
		errors.requestDate = "You did not select a valid date."
	if (!request.shiftType)
		errors.shiftType = "Please select the shift you want."
	return errors;
};

Requests.allow({
	update: function(userId, doc) {
		return Roles.userIsInRole(userId, ['admin', 'manager']);
	}
});
