Requests = new Mongo.Collection('requests');

Meteor.methods({
	requestAdd: function(request) {
		var request = _.extend(request, {
			submitted: moment().toDate()
		});
		var postSameRequest = Requests.findOne({
			userId: request.userId,
			shiftType: request.shiftType,
			scheduleDate: request.scheduleDate
		});
		if (postSameRequest)
			return { requestExist: true }

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

	if (!request.userId)
		errors.userId = "You need to select a rider";
	if (!request.scheduleDate || request.scheduleDate < moment())
		errors.scheduleDate = "You did not select a valid date."
	if (!request.shiftTypeId)
		errors.shiftType = "Please select the shift you want."
	return errors;
};

Requests.allow({
	update: function(userId, doc) {
		return Roles.userIsInRole(userId, ['admin', 'manager']);
	}
});
