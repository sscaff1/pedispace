Template.requestList.onCreated(function() {
  Session.set('postSubmitErrors', {});
  $('#deleteModal').modal({show: false});
});

Template.requestList.onRendered(function() {
  $('[name=scheduleDate]').datepicker({
	  format: "MM dd yyyy",
	  autoclose: true
	});
});

Template.requestList.helpers({
	requests: function () {
		return Requests.find();
	}
});

Template.requestItem.helpers({
	requestDateNice: function () {
		return moment(this.scheduleDate).format("ddd, MMM Do, YYYY");
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
	},
	requestConfirmed: function() {
    if (this.scheduled === true) {
      return false;
    } else {
      return true;
    }
	},
	shiftType: function() {
		return ShiftTypes.findOne(this.shiftTypeId).name;
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
	},
  'click #delete-button': function() {
    Meteor.call('deleteRequest', this._id, function(error, result) {
      if (error) {
        console.log(error);
      } else if (result) {
        Messages.throw(result.message, 'danager')
      } else {
        Messages.throw('You\'ve deleted your request.', 'danger');
      }
    });
  }
})
