Template.scheduleRider.onCreated(function() {
  var instance = this;
  instance.rateSelected = new ReactiveVar({});
});

Template.scheduleRider.helpers({
	rider: function() {
		return Meteor.users.find({_id: {$ne: Meteor.userId()}});
	},
	shiftTypes: function() {
		return ShiftTypes.find();
	},
  rateSelect: function() {
    return Template.instance().rateSelected.get();
  }
});

Template.scheduleRider.events({
	'submit form': function(event,template) {
		event.preventDefault();

		var schedule = {
			businessId: Meteor.user().profile.businessId,
			shiftTypeId: $(event.target).find('[name=shiftType]').val(),
			rider: $(event.target).find('[name=riderType]').prop('checked'),
      comments: $(event.target).find('[name=comments]').val()
		}
    var scheduleDate = $(event.target).find('[name=scheduleDate]').val();
		if (scheduleDate) {
			schedule.scheduleDate = moment(scheduleDate, 'MMMM DD YYYY').toDate();
		}
    if (Roles.userIsInRole(Meteor.user(), ['manager'])) {
      schedule.guaranteeRate = false;
      schedule.scheduled = true;
      schedule.userId = $(event.target).find('[name=userId]').val();
    } else {
      schedule.guaranteeRate = $(event.target).find('[name=guaranteeRate]').prop('checked');
      schedule.scheduled = false;
      schedule.userId = Meteor.userId();
      schedule.rider = true;
    }

		var errors = validateRequest(schedule);

		if (!$.isEmptyObject(errors))
			return Session.set('postSubmitErrors', errors);

		Meteor.call('requestAdd', schedule, function(error, result) {
			if (error) {
				console.log(error);
      }
			if (result) {
				return Messages.throw('This request has already been made.', 'danger');
      } else {
        return Messages.throw('You\'ve successfully requested this shift.', 'success');
  			Session.set('postSubmitErrors', {});
        template.rateSelected.set({});
        document.insertForm.reset();
      }
		});

	},
  'change [name=shiftType], change [name=scheduleDate]': function(event, template) {
    event.preventDefault();

    var scheduleDate =
      moment($('[name=insertForm]').find('[name=scheduleDate]').val(), 'MMMM DD YYYY').toDate();
    var shiftType = $('[name=insertForm]').find('[name=shiftType]').val();
    var rateFound = Rates.findOne({
      scheduleDate: scheduleDate,
      shiftTypeId: shiftType
    });
    if (rateFound) {
      template.rateSelected.set(rateFound);
    } else {
      template.rateSelected.set({});
    }
  }
});
