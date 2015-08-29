Shifts = new Mongo.Collection('shifts');

Meteor.methods({
  shiftAdd: function(shift) {
  	var shift = _.extend(shift, {
  		endTime: new Date(moment()),
  		submitted: new Date(moment())
  	})
    Shifts.insert(shift);
  }
});

validatePost = function (shift) {
  var errors = {};
  if (!shift.userId)
    errors.userId = "Please select yourself from the dropdown menu";
  if (!shift.bikeId)
    errors.bikeId =  "Please select your bike";
  if (!shift.shiftType)
    errors.shiftType =  "Please select your shift type";
  if (!shift.startTime || !moment(shift.startTime).isValid()) 
    errors.startTime =  "Please enter a valid date";
  if (shift.startTime > moment())
    errors.startTime = "Your date is after the current time"
  if (isNaN(shift.totalMade) || (shift.totalMade < shift.ratePaid) || !shift.totalMade)
    errors.totalMade = "You did not enter a valid dollar amount"
  if (isNaN(shift.ratePaid) || !shift.ratePaid)
    errors.ratePaid = "You did not enter a valid dollar amount"
  if (isNaN(shift.shiftRate) || !shift.shiftRate)
    errors.shiftRate = "You did not enter a valid dollar amount"
  return errors;
}