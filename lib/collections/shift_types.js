ShiftTypes = new Mongo.Collection('shiftTypes');

ShiftTypes.allow({
  update: function(userId, doc) {
    var businessId = Meteor.user().profile.businessId;
		if (businessId === doc.businessId) {
			return Roles.userIsInRole(userId, ['manager']);
		} else {
			return false;
		}
	}
});

Meteor.methods({
  shiftTypeAdd: function(shiftType) {
    check(shiftType.name, String);
    var shiftType = _.extend(shiftType, {
      businessId: Meteor.user().profile.businessId,
      active: true
    });
    ShiftTypes.insert(shiftType);
  }
});
