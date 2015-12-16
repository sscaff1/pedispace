Template.scheduleDay.onRendered(function() {
  $('.riderName').popover({
    trigger: 'click',
	});
});

Template.scheduleDay.helpers({
  shiftType: function() {
    return ShiftTypes.find();
  },
  rider: function(shiftType, scheduleDay) {
    var shiftTypeId = ShiftTypes.findOne({name:shiftType})._id;
    var userId = Requests.findOne({
      shiftTypeId: shiftTypeId,
      scheduleDate: new Date(scheduleDay)
    });
    if (userId)
      return Meteor.users.find({_id: userId.userId});
  },
  popoverHTML: function () {
    return Blaze.toHTMLWithData(Template.popoverTemplate, this);
  }
});
