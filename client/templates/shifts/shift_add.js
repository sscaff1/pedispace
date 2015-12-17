Template.shiftAdd.onCreated(function() {
  var instance = this;
  Session.set('postSubmitErrors', {});
  instance.rateComments = new ReactiveVar(null);
});

Template.shiftAdd.onRendered(function() {
	var now = moment().local().subtract(8, 'hours').toDate();
	$('[name=startTime]').val(now);
});

Template.shiftAdd.helpers({
	bike: function() {
		return Bikes.find();
	},
	radio: function() {
		if (Radios.find().count() === 0) {
			return false;
		}
		return Radios.find();
	},
	rider: function() {
		return Meteor.users.find({roles: 'biker', "profile.active": true});
	},
	rateComments: function() {
		return Template.instance().rateComments.get()
	}
});

Template.shiftAdd.events({
	'submit form': function(event,template) {
		event.preventDefault();
		var shift = {
			businessId: Meteor.user().profile.businessId,
			bikeId: $(event.target).find('[name=bikeName]').val(),
			radioId: $(event.target).find('[name=radioName]').val(),
			shiftTypeId: $(event.target).find('[name=shiftType]').val(),
			totalMade: parseFloat($(event.target).find('[name=totalMade]').val()),
			ratePaid: parseFloat($(event.target).find('[name=ratePaid]').val()),
			shiftRate: parseFloat($(event.target).find('[name=shiftRate]').val()),
			startTime: moment($(event.target).find('[name=startTime]').val()).toDate(),
			comments: $(event.target).find('[name=comments]').val(),
			userId: $(event.target).find('[name=userName]').val()
		}

		var errors = validatePost(shift);
  	if (!$.isEmptyObject(errors))
    		return Session.set('postSubmitErrors', errors);
		Meteor.call('shiftAdd', shift, function(error, result) {
			if (error)
				console.log(error);
			Session.set('postSubmitErrors', {});
      template.rateComments.set(null);
      document.insertForm.reset();
		});

	},
	'change [name=shiftType], change [name=startTime]': function(event) {
		event.preventDefault();

		var s = $('[name=insertForm]').find('[name=startTime]').val();
		s = moment(s).startOf('day').toDate();
		var st = $('[name=insertForm]').find('[name=shiftType]').val();
		var r = Rates.findOne({
			businessId: Meteor.user().profile.businessId,
			scheduleDate: s,
			shiftType: st
		});
		if (r) {
			$('[name=insertForm]').find('[name=shiftRate]').val(r.rateAmount);
			$('[name=insertForm]').find('[name=shiftRate]').prop('disabled', true);
			template.rateComments.set(r.comments);
		} else {
			template.rateComments.set(null);;
		}
	}
});

Shifts.after.insert(function(userId, doc) {
	return throwSuccess("You've successfully created logged your shift.");
});
