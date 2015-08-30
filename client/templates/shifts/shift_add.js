Template.shiftAdd.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.shiftAdd.helpers({
	bike: function() {
		return Bikes.find();
	},
	radio: function() {
		if (Radios.find().count() === 0) {
			return null
		}
		return Radios.find();
	},
	rider: function() {
		return Meteor.users.find({_id: { $ne: this._id }}, {sort: {"profile.name": 1}});
	},
	rateComments: function() {
		return Session.get('rateComments');
	}
});

Template.shiftAdd.events({
	'submit form': function(e) {
		e.preventDefault();

		var s = $(e.target).find('[name=startTime]').val();

		var shift = {
			locationId: this.profile.locationId,
			bikeId: $(e.target).find('[name=bikeName]').val(),
			radioId: $(e.target).find('[name=radioName]').val(),
			shiftType: $(e.target).find('[name=shiftType]').val(),
			totalMade: $(e.target).find('[name=totalMade]').val(),
			ratePaid: $(e.target).find('[name=ratePaid]').val(),
			shiftRate: $(e.target).find('[name=shiftRate]').val(),
			startTime: new Date(s),
			comments: $(e.target).find('[name=comments]').val(),
			userId: $(e.target).find('[name=userName]').val()
		}

		var errors = validatePost(shift);

    	if (!isEmptyO(errors))
      		return Session.set('postSubmitErrors', errors);

		Meteor.call('shiftAdd', shift, function(error, result) {
			if (error) 
				return throwError(error.reason);
			Session.set('postSubmitErrors', {});
		});
		document.insertForm.reset();
	},
	'change #shiftType, change #startTime': function(e) {
		var s = $('form').find('[name=startTime]').val();
		s = moment(s).startOf('day');
		s = new Date(s);

		var st = $('form').find('[name=shiftType]').val();

		var r = Rates.findOne({
			locationId: this.profile.locationId,
			scheduleDate: s,
			shiftType: st
		});
		if (r) {
			$('form').find('[name=shiftRate]').val(r.rateAmount);
			$('form').find('[name=shiftRate]').prop('disabled', true);
			Session.set('rateComments', r.comments);
		}
	}

});

Shifts.after.insert(function(userId, doc) {
	return throwSuccess("You've successfully created a shift.");
});

Template.shiftAdd.onRendered(function() {
	var now = moment().subtract(13, 'hours').toISOString();
	now = now.substr(0, now.length - 8);
	document.getElementById("startTime").defaultValue = now;
});
