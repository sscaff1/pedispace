Template.requestEdit.onCreated(function() {
  var instance = this;
  Session.set('postSubmitErrors', {});
  instance.rateSelected = new ReactiveVar(null);
});

Template.requestEdit.onRendered(function() {
  var instance = this;
  var rateFound = Rates.findOne({
    scheduleDate: Template.parentData(0).scheduleDate,
    shiftTypeId: Template.parentData(0).shiftTypeId
  });
  if (rateFound)
    instance.rateSelected.set(rateFound);
	$('[name=scheduleDate]').datepicker({
	  format: "MM dd yyyy",
	  autoclose: true
	}).val(moment(Template.parentData(0).scheduleDate).format('MMMM DD YYYY'));
  $('[name=shiftType]').val(Template.parentData(0).shiftTypeId);
  if (Template.parentData(0).guaranteeRate)
    $('[name=guaranteeRate]').prop('checked', true);
});

Template.requestEdit.events({
	'submit form': function(event) {
		event.preventDefault();
    var rId = this._id;
    var schedule = {
      userId: this.userId,
			shiftTypeId: $(event.target).find('[name=shiftType]').val(),
			rider: $(event.target).find('[name=riderType]').prop('checked'),
      comments: $(event.target).find('[name=comments]').val(),
      guaranteeRate: $(event.target).find('[name=guaranteeRate]').prop('checked')
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
			if (result)
				return Messages.throw('This request has already been made.', 'danger');
			Session.set('postSubmitErrors', {});
      Router.go('requestList');
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
  }
});
