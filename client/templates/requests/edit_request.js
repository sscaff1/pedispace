Template.requestEdit.onCreated(function() {
  Session.set('postSubmitErrors', {});
  Session.set('rateSelected', {});
});

Template.requestEdit.onRendered(function() {
  var rateFound = Rates.findOne({
    scheduleDate: Template.parentData(0).scheduleDate,
    shiftTypeId: Template.parentData(0).shiftTypeId
  });
  if (rateFound)
    Session.set('rateSelected', rateFound);
	$('[name=scheduleDate]').datepicker({
	  format: "MM dd yyyy",
	  autoclose: true
	}).val(moment(Template.parentData(0).scheduleDate).format('MMMM DD YYYY'));
  $('[name=shiftType]').val(Template.parentData(0).shiftTypeId);
  if (Template.parentData(0).guaranteeRate)
    $('[name=guaranteeRate]').prop('checked', true);
});

Template.requestEdit.events({
	'submit form': function(e) {
		e.preventDefault();

    var rId = this._id;
    var scheduleDate =
			moment($(e.target).find('[name=scheduleDate]').val(), 'MMMM DD YYYY').toDate();

    var schedule = {
      userId: this.userId,
			scheduleDate: scheduleDate,
			shiftTypeId: $(e.target).find('[name=shiftType]').val(),
			rider: $(e.target).find('[name=riderType]').prop('checked'),
      comments: $(e.target).find('[name=comments]').val(),
      guaranteeRate: $(e.target).find('[name=guaranteeRate]').prop('checked')
  	}

		var errors = validateRequest(schedule);

		if (!$.isEmptyObject(errors))
      		return Session.set('postSubmitErrors', errors);

    Meteor.call('requestEdit', rId, schedule, function(error, result) {
			if (error)
				return throwError(error.reason);
			if (result.requestExist)
				return Messages.throw('This request has already been made.', 'danger');
			Session.set('postSubmitErrors', {});
      Router.go('requestList');
		});
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

Template.requestEdit.helpers({
	rateSelect: function() {
		return Session.get('rateSelected');
	},
  shiftTypes: function() {
    return ShiftTypes.find();
  }
});
