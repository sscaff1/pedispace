Template.scheduleRider.onCreated(function() {
  Session.set('postSubmitErrors', {});
  Session.set('rateSelected', {});
});

Template.scheduleRider.onRendered(function() {
	$('[name=scheduleDate]').datepicker({
	  format: "MM dd yyyy",
	  autoclose: true
	});
});

Template.scheduleRider.helpers({
	rider: function() {
		return Meteor.users.find({roles: 'biker', "profile.active": true});
	},
	shiftTypes: function() {
		return ShiftTypes.find();
	},
  rateSelect: function() {
    return Session.get('rateSelected');
  }
});

Template.scheduleRider.events({
	'submit form': function(e) {
		e.preventDefault();

		var scheduleDate =
			moment($(e.target).find('[name=scheduleDate]').val(), 'MMMM DD YYYY').toDate();

		var schedule = {
			businessId: Meteor.user().profile.businessId,
			scheduleDate: scheduleDate,
			shiftTypeId: $(e.target).find('[name=shiftType]').val(),
			rider: $(e.target).find('[name=riderType]').prop('checked'),
      comments: $(e.target).find('[name=comments]').val()
		}

    if (Roles.userIsInRole(Meteor.user(), ['manager'])) {
      schedule.guaranteeRate = false;
      schedule.scheduled = true;
      schedule.userId = $(e.target).find('[name=userId]').val();
    } else {
      schedule.guaranteeRate = $(e.target).find('[name=guaranteeRate]').prop('checked');
      schedule.scheduled = false;
      schedule.userId = Meteor.userId();
    }

		var errors = validateRequest(schedule);

		if (!$.isEmptyObject(errors))
			return Session.set('postSubmitErrors', errors);

		Meteor.call('requestAdd', schedule, function(error, result) {
			if (error)
				return throwError(error.reason);
			if (result.requestExist)
				Messages.throw('This request has already been made.', 'danger');

			Session.set('postSubmitErrors', {});
      Session.set('rateSelected', {});
		});
		document.insertForm.reset();
	},
  'change #shiftType, change #scheduleDate': function(e) {
    e.preventDefault();
    Session.set('rateSelected', {});
    var scheduleDate =
      moment($('#requestForm').find('[name=scheduleDate]').val(), 'MMMM DD YYYY').toDate();

    var shiftType = $('#requestForm').find('[name=shiftType]').val();

    var rateFound = Rates.findOne({
      scheduleDate: scheduleDate,
      shiftTypeId: shiftType
    });
    if (rateFound)
      return Session.set('rateSelected', rateFound);
  }
});
