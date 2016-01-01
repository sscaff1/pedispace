Template.shiftAdd.onCreated(function() {
  var instance = this;
  Session.set('postSubmitErrors', {});
  instance.rateComments = new ReactiveVar(null);
});

Template.shiftAdd.helpers({
  defaultStart() {
    var now = moment().local().subtract(8, 'hours').format('YYYY-MM-DDTHH:mm');
    return now;
  },
	bikes() {
		return Bikes.find();
	},
	radios() {
		if (Radios.find().count() === 0) {
			return false;
		}
		return Radios.find();
	},
	riders() {
		return Meteor.users.find({roles: 'biker', "profile.active": true});
	},
  shiftTypes() {
    return ShiftTypes.find({}, {sort: {name: 1}});
  },
	rateComments() {
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
			totalMade: parseInt($(event.target).find('[name=totalMade]').val()),
			ratePaid: parseInt($(event.target).find('[name=ratePaid]').val()),
			shiftRate: parseInt($(event.target).find('[name=shiftRate]').val()),
			startTime: moment($(event.target).find('[name=startTime]').val()).toDate(),
			comments: $(event.target).find('[name=comments]').val(),
			userId: $(event.target).find('[name=userName]').val()
		}

		var errors = validatePost(shift);
  	if (!$.isEmptyObject(errors))
    		return Session.set('postSubmitErrors', errors);
		Meteor.call('shiftAdd', shift, function(error, result) {
			if (error) {
				console.log(error);
      } else {
        Messages.throw("You've successfully created logged your shift.", 'success');
        Session.set('postSubmitErrors', {});
        template.rateComments.set(null);
        document.insertForm.reset();
      }
		});

	},
	'change [name=shiftType], change [name=startTime]': function(event, template) {
		event.preventDefault();

		var startTime = template.$('[name=startTime]').val();
		startTime = moment(startTime).startOf('day').toDate();
		var shiftType = template.$('[name=shiftType]').val();
		var rate = Rates.findOne({
			businessId: Meteor.user().profile.businessId,
			scheduleDate: startTime,
			shiftTypeId: shiftType
		});
    console.log(rate);
		if (rate) {
			template.$('[name=shiftRate]').val(rate.rateAmount);
			template.$('[name=shiftRate]').prop('disabled', true);
			template.rateComments.set(rate.comments);
		} else {
			template.rateComments.set(null);;
		}
	}
});
