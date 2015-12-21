Requests = new Mongo.Collection('requests');

Meteor.methods({
	requestAdd: function(request) {
		check(request, {
			scheduleDate: Date,
			shiftTypeId: String,
			rider: Boolean,
			userId: String,
			comments: String,
			scheduled: Boolean,
			guaranteeRate: Boolean,
			businessId: String
		});

		var postSameRequest = Requests.findOne({
			userId: request.userId,
			shiftTypeId: request.shiftTypeId,
			scheduleDate: request.scheduleDate
		});

		if (postSameRequest) {
			return { requestExist: true }
		} else {
			var request = _.extend(request, {
				submitted: moment().toDate()
			});
			Requests.insert(request);
		}
	},
	requestEdit: function(id, request) {
		check(request, {
			scheduleDate: Date,
			shiftTypeId: String,
			userId: String,
			comments: String,
			guaranteeRate: Boolean,
		});
		var postSameRequest = Requests.findOne({
			userId: request.userId,
			shiftTypeId: request.shiftTypeId,
			scheduleDate: request.scheduleDate
		});
		if (postSameRequest && (id !== postSameRequest._id)) {
			return { requestExist: true }
		} else {
			Requests.update( {_id: id}, {$set:request} );
		}
	},
	deleteRequest: function(id) {
		if (Meteor.user().profile.businessId === Requests.findOne(id).businessId) {
			Requests.remove({_id: id});
		} else {
			return {
				message: 'You cannot delete this request'
			}
		}
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
		var businessId = Meteor.user().profile.businessId;
		if (businessId === doc.businessId) {
			return Roles.userIsInRole(userId, ['manager']);
		} else {
			return false;
		}
	}
});
