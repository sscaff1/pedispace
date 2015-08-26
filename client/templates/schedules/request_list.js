Template.requestList.helpers({
	requests: function () {
		return Requests.find({}, { sort: {scheduled: -1, requestDate: 1, submitted: 1}});
	}
});

Template.requestItem.helpers({
	requestDateNice: function () {
		return moment(this.requestDate).format("dddd, MMMM Do YYYY");
	},
	bikerName: function() {
		var u = Meteor.users.findOne(this.userId);
		return u.profile.name;
	},
	alternate: function () {
		if (this.rider) {
			return 'rider';
		} else {
			return 'alternate';
		}
	}
});

Template.requestItem.events({
	'click #unconfirm': function() {
		Requests.update(this._id, {$set: {scheduled: false}});
	},
	'click #rider': function() {
		Requests.update(this._id, {$set: {scheduled: true, rider: true}});
	},
	'click #alternate': function() {
		Requests.update(this._id, {$set: {scheduled: true, rider: false}});
	}
})