Template.shiftsComments.helpers({
	'bikeName': function() {
		var bike = Bikes.findOne({_id: this.bikeId});
		return bike.name;
	},
	'userName': function() {
		var u = Meteor.users.findOne(this.userId);
		u = u.profile.name;
		return u;
	},
	'shift': function() {
		return Shifts.find({comments: {$ne:''}}, {sort: {submitted: -1}});
	}
});