Template.specificShiftRider.onCreated(function() {
	var instance = this;
	instance.requestLookup = function(scheduleDate, shiftTypeId) {
		var request = Requests.findOne({
			userId: Meteor.userId(),
			scheduleDate: scheduleDate.toDate(),
			shiftTypeId: shiftTypeId
		});
		return request;
	}
});

Template.specificShiftRider.helpers({
	requested(scheduleDate, shiftTypeId) {
		var request = Template.instance().requestLookup(scheduleDate,shiftTypeId);
		if (request) {
			return true
		} else {
			return false
		}
	},
	requestRandomId() {
		const data = Template.currentData();
		return data.scheduleDateSpecific.valueOf()+data.shiftTypeId;
	},
	scheduled(scheduleDate, shiftTypeId) {
		var request = Template.instance().requestLookup(scheduleDate,shiftTypeId);
		return request.scheduled;
	},
	requestId(scheduleDate, shiftTypeId) {
		var request = Template.instance().requestLookup(scheduleDate,shiftTypeId);
		return request._id;
	},
	requestIdPath(scheduleDate, shiftTypeId) {
		var request = Template.instance().requestLookup(scheduleDate,shiftTypeId);
		return {
			_id: request._id
		}
	}
});

Template.specificShiftRider.events({
	'click #delete-button': function(event, template) {
    Meteor.call('deleteRequest', this.requestId, function(error, result) {
      if (error) {
        console.log(error);
      } else if (result) {
        Messages.throw(result.message, 'danager')
      } else {
        Messages.throw('You\'ve deleted your request.', 'danger');
      }
    });
  },
	'click #request-yes, click #request-no': function(event,template) {
		event.preventDefault();
		const data = this;

		var schedule = {
			businessId: Meteor.user().profile.businessId,
			shiftTypeId: data.shiftTypeId,
			rider: true,
			scheduleDate: data.scheduleDate.toDate(),
			scheduled: false,
			userId: Meteor.userId(),
			comments: template.$('[name=comments]').val()
		}

		if ($(event.target).attr('id') === 'request-yes') {
			schedule.guaranteeRate = true;
		} else {
			schedule.guaranteeRate = false;
		}

		Meteor.call('requestAdd', schedule, function(error, result) {
			if (error) {
				console.log(error);
			}
			if (result) {
				return Messages.throw('This request has already been made.', 'danger');
			} else {
				return Messages.throw('You\'ve successfully scheduled this shift.', 'success')
			}
    });
	}
});
