Template.rateItem.helpers({
  scheduleDatePretty: function() {
    return moment(this.scheduleDate).format('MMM Do YY');
  },
  shiftType: function() {
    return ShiftTypes.findOne(this.shiftTypeId);
  }
})
