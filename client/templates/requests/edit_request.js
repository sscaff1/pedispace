Template.requestEdit.onCreated(function() {
  Session.set('postSubmitErrors', {});
  Session.set('rateSelect', null);
});

Template.requestEdit.onRendered(function() {
	$('[name=requestDate]').datepicker({
	  format: "MM dd yyyy",
	  autoclose: true
	});
  $('[name=shiftType]').val(Template.parentData(0).shiftType);
});

Template.requestEdit.events({
	'submit form': function(e) {
		e.preventDefault();

    var rId = this._id;
		if ($(e.target).find('[name=requestDate]').val()) {
			var rdate =
				new Date(moment($(e.target).find('[name=requestDate]').val(), 'MMMM DD YYYY'));
		} else {
			var rdate = null;
		}
		var request = {
			requestDate: rdate,
			shiftType: $(e.target).find('[name=shiftType]').val(),
      guaranteeRate: $(e.target).find('[name=guaranteeRate]').prop('checked'),
      comments: $(e.target).find('[name=comments]').val()
		}
		var errors = validateRequest(request);

		if (!$.isEmptyObject(errors))
      		return Session.set('postSubmitErrors', errors);

    Meteor.call('requestEdit', rId, request, function(error, result) {
			if (error)
				return throwError(error.reason);
			if (result.requestExist)
				return throwError('This request has already been made.');

			Session.set('postSubmitErrors', {});
		});
    Router.go('scheduleRequest');
	},
	'change #shiftType, change #requestDate': function(e) {
		e.preventDefault();

		var rdate =
			moment($('form').find('[name=requestDate]').val(), 'MMMM DD YYYY');
		rdate = new Date(rdate);

		var st = $('form').find('[name=shiftType]').val();

		var r = Rates.findOne({
			locationId: Meteor.user().profile.locationId,
			scheduleDate: rdate,
			shiftType: st
		});

		if (r) {
			Session.set('rateSelect', r);
		} else {
			Session.set('rateSelect', null);
		}
	}
});

Template.requestEdit.helpers({
	rateSelect: function() {
		return Session.get('rateSelect');
	},
  requestDateF: function() {
    return moment(this.requestDate).format('MMMM DD YYYY');
  },
  guaranteeRateCheck: function() {
    if (this.guaranteeRate)
      return 'checked'
  },
  shiftTypesDropDown: function() {
    return ['AM', 'PM', 'FLEX'];
  }
});

Requests.after.update(function(userId, doc) {
	Session.set('postSubmitErrors', {});
	return throwSuccess("You've successfully updated your shift request.");
});
