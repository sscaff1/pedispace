Template.requestList.helpers({
	'requests': function () {
		return Requests.find({}, {sort: {requestDate: 1}});
	}
});

Template.requestItem.helpers({
	'requestDateNice': function () {
		return moment(this.requestDate).format("dddd, MMMM Do YYYY");
	},
	'bikerName': function() {
		var u = Meteor.users.findOne(this.userId);
		return u.profile.name;
	}
});

Template.requestItem.events({
	'click #unconfirm': function() {
		Requests.update(this._id, {$set: {scheduled: false}});
	},
	'click #confirm': function() {
		Requests.update(this._id, {$set: {scheduled: true}});
	}
})