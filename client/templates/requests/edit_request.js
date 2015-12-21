Template.requestEdit.onCreated(function() {
  var instance = this;
  Session.set('postSubmitErrors', {});
  instance.rateSelected = new ReactiveVar({});
  instance.autorun(function() {
    instance.subscribe('requests');
    instance.subscribe('shiftTypes');
    instance.subscribe('rates');
    if (instance.subscriptionsReady()) {
      const currentData = Template.currentData();
      var rateFound = Rates.findOne({
        scheduleDate: currentData.scheduleDate,
        shiftTypeId: currentData.shiftTypeId
      });
      if (rateFound) {
        instance.rateSelected.set(rateFound);
      }
    }
  });
});

Template.requestEdit.events({
	'submit form': function(event) {
		event.preventDefault();
    var request = this;
    var rId = request._id;
    var schedule = {
      userId: request.userId,
			shiftTypeId: $(event.target).find('[name=shiftType]').val(),
      comments: $(event.target).find('[name=comments]').val(),
      guaranteeRate: $(event.target).find('[name=guaranteeRate]').prop('checked'),
  	}
    var scheduleDate = $(event.target).find('[name=scheduleDate]').val();
		if (scheduleDate) {
			schedule.scheduleDate = moment(scheduleDate, 'MMMM DD YYYY').toDate();
		}
		var errors = validateRequest(schedule);
		if (!$.isEmptyObject(errors))
      return Session.set('postSubmitErrors', errors);

    Meteor.call('requestEdit', rId, schedule, function(error, result) {
			if (error)
				console.log(error.reason);
			if (result) {
				return Messages.throw('This request has already been made.', 'danger');
      } else {
        Messages.throw('You\'ve successfully updated your request.', 'success');
        Session.set('postSubmitErrors', {});
        Router.go('requestsCal');
      }
		});
	},
  'focus [name=scheduleDate]': function(event) {
    $(event.target).datepicker({
      format: "MM dd yyyy",
      autoclose: true
    });
  },
  'change [name=shiftType], change [name=scheduleDate]': function(event, template) {
    event.preventDefault();
    var scheduleDate =
      moment($('#requestForm').find('[name=scheduleDate]').val(), 'MMMM DD YYYY').toDate();
    var shiftType = $('#requestForm').find('[name=shiftType]').val();
    var rateFound = Rates.findOne({
      scheduleDate: scheduleDate,
      shiftTypeId: shiftType
    });
    if (rateFound)
      template.rateSelected.set(rateFound);
  }
});

Template.requestEdit.helpers({
	rateSelect: function() {
		return Template.instance().rateSelected.get();
	},
  shiftTypes: function() {
    return ShiftTypes.find();
  },
  ready() {
    return Template.instance().subscriptionsReady();
  },
  request() {
    const request = Template.currentData();
    var requestData = {};
    requestData.scheduleDate = moment(request.scheduleDate).format('MMMM DD YYYY');
    requestData.comments = request.comments;
    if (request.guaranteeRate) {
      requestData.guaranteeRate = 'checked';
    } else {
      requestData.guaranteeRate = '';
    }
    return requestData;
  },
  selectedShiftType(shiftType) {
    if (Template.currentData().shiftTypeId === shiftType)
      return 'selected';
  }
});
