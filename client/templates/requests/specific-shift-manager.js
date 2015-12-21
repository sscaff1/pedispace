Template.specificShiftManager.onCreated(function() {
  const instance = this;
  instance.returnRequested = function(scheduleDate, shiftTypeId) {
    return Requests.find({
      businessId: Meteor.user().profile.businessId,
      scheduleDate: scheduleDate.toDate(),
      shiftTypeId: shiftTypeId,
      scheduled: true
    }).count();
  }
});


Template.specificShiftManager.helpers({
  ridersScheduled(scheduleDate,shiftTypeId) {
    return Template.instance().returnRequested(scheduleDate,shiftTypeId);
  },
  riders() {
    const data = Template.currentData();
    var userIds = _.pluck(Requests.find({
      scheduleDate: data.scheduleDate.toDate(),
      shiftTypeId: data.shiftTypeId
    },
    {fields: {userId: 1}}).fetch(), 'userId');
    userIds.push(Meteor.userId());
    var riders = Meteor.users.find({
      _id: {$nin: userIds}
    });
    if (riders.count() === 0) {
      return false;
    } else {
      return riders;
    }
  },
  requests() {
    const data = Template.currentData();
    return Requests.find({
      scheduleDate: data.scheduleDate.toDate(),
      shiftTypeId: data.shiftTypeId
    });
  },
  requestsCount() {
    const data = Template.currentData();
    var requestCount = Requests.find({
      scheduleDate: data.scheduleDate.toDate(),
      shiftTypeId: data.shiftTypeId
    }).count();
    if (requestCount > 0) {
      return true;
    } else {
      return false;
    }
  },
  bikesAvailable(scheduleDate,shiftTypeId) {
    var riders = Template.instance().returnRequested(scheduleDate,shiftTypeId);
    var bikes = Bikes.find({
      businessId: Meteor.user().profile.businessId
    }).count();
    return (bikes-riders);
  }
});

Template.specificShiftManager.events({
	'submit form': function(event,template) {
		event.preventDefault();
    const data = Template.currentData();
		var schedule = {
			businessId: Meteor.user().profile.businessId,
			shiftTypeId: data.shiftTypeId,
			rider: $(event.target).find('[name=riderType]').prop('checked'),
      comments: $(event.target).find('[name=comments]').val(),
      scheduleDate: data.scheduleDate.toDate(),
      guaranteeRate: false,
      scheduled: true,
      userId: $(event.target).find('[name=userId]').val()
		}

		Meteor.call('requestAdd', schedule, function(error, result) {
			if (error) {
				console.log(error);
      }
			if (result) {
				return Messages.throw('This request has already been made.', 'danger');
      } else {
        Messages.throw('You\'ve successfully scheduled this rider.', 'success');
        $(event.target).find('.form-control').val('');
      }
		});
	}
});

Template.riderRequest.helpers({
  riderName(userId) {
    return Meteor.users.findOne(userId).profile.name;
  }
})
