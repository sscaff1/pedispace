Template.rateItem.helpers({
  scheduleDatePretty: function() {
    return moment(this.scheduleDate).format('MMM Do, YYYY');
  },
  shiftType: function() {
    return ShiftTypes.findOne(this.shiftTypeId);
  }
})
