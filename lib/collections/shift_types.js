ShiftTypes = new Mongo.Collection('shiftTypes');

ShiftTypes.allow({
  update: function(userId, doc) {
		return Roles.userIsInRole(userId, ['manager']);
	}
});

Meteor.methods({
  shiftTypeAdd: function(shiftType) {
    var shiftType = _.extend(shiftType, {
      businessId: Meteor.user().profile.businessId,
      active: true
    });
    ShiftTypes.insert(shiftType);
  }
});
