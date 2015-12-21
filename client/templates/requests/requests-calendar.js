Template.requestsCal.onCreated(function() {
	var instance = this;
	instance.autorun(() => {
		instance.subscribe('shiftTypes');
		instance.subscribe('requests');
		instance.subscribe('rates');
	});
	instance.scheduleDates = new ReactiveVar([]);
	instance.setNewDateRange = function(initialDate, finalDate) {
		var scheduleRange = [];
		var numDays = finalDate.diff(initialDate, 'day');
			for (var i = 0; i <= numDays; i++) {
			var pushDate = initialDate.clone().add(i, 'day');
			scheduleRange.push({scheduleDate: pushDate.clone()});
		}
		instance.scheduleDates.set(scheduleRange);
	};
});

Template.requestsCal.onRendered(function() {
	var instance = this;
	$('.datepicker').datepicker({
		format: "mm/dd/yyyy",
		autoclose: true,
		orientation: 'top'
	});
	var thisSat = moment().format("MM/DD/YYYY");
	$('[name=initialDate]').val(thisSat);
	var nextWeek = moment().day(7).format("MM/DD/YYYY");
	$('[name=finalDate]').val(nextWeek);
	var initialDate = moment(instance.$('[name=initialDate]').val(), 'MM/DD/YYYY');
	var finalDate = moment(instance.$('[name=finalDate]').val(), 'MM/DD/YYYY');
	instance.setNewDateRange(initialDate,finalDate);
});

Template.requestsCal.helpers({
	ready() {
		return Template.instance().subscriptionsReady();
	},
	scheduleDates() {
		return Template.instance().scheduleDates.get();
	},
	scheduleDateNice(scheduleDate) {
		return moment(scheduleDate).format('MMMM DD, YYYY')
	},
	shiftTypes() {
		var businessId = Meteor.user().profile.businessId;
		return ShiftTypes.find({businessId: businessId});
	}
});

Template.requestsCal.events({
	'change .datepicker' (event, instance) {
		var initialDate = moment(instance.$('[name=initialDate]').val(), 'MM/DD/YYYY');
		var finalDate = moment(instance.$('[name=finalDate]').val(), 'MM/DD/YYYY');
		instance.setNewDateRange(initialDate,finalDate);
	}
});

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

Template.shiftComments.helpers({
	request() {
		var request = Requests.findOne({
			userId: Meteor.userId(),
			scheduleDate: this.scheduleDate.toDate(),
			shiftTypeId: this.shiftTypeId
		});
		if (request)
			return request;
		return false;
	},
	rate() {
		var rate = Rates.findOne({
			businessId: Meteor.user().profile.businessId,
			scheduleDate: this.scheduleDate.toDate(),
			shiftTypeId: this.shiftTypeId
		});
		if (rate)
			return rate;
		return false;
	},
})
