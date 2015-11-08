Meteor.publish('bikes', function() {
  if (Roles.userIsInRole(this.userId, ['manager'])) {
    return Bikes.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId
    });
  } else if (this.userId) {
    return Bikes.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId,
      active: true
    });
  } else {
    this.ready();
  }
});

Meteor.publish('shiftTypes', function() {
  if (Roles.userIsInRole(this.userId, ['manager'])) {
    return ShiftTypes.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId
    });
  } else if (this.userId) {
    return ShiftTypes.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId,
      active: true
    });
  } else {
    this.ready();
  }
})

Meteor.publish('radios', function() {
  if (Roles.userIsInRole(this.userId, ['manager'])) {
    return Radios.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId
    });
  } else if (this.userId) {
    return Radios.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId,
      active: true
    });
  } else {
    this.ready();
  }
});

Meteor.publish('shifts', function(limit) {
	if (Roles.userIsInRole(this.userId, ['manager'])) {
		return Shifts.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId
    },{
      limit: limit,
      sort: {submitted: -1}
    });
	} else {
		this.ready();
	};
});

Meteor.publish('userData', function () {
  if (Roles.userIsInRole(this.userId, ['manager'])) {
    return Meteor.users.find({
      "profile.businessId": Meteor.users.findOne(this.userId).profile.businessId
    },
    { fields: {'emails': 1, 'profile': 1, 'roles': 1} });
  } else if (this.userId) {
    return Meteor.users.find({
      "profile.businessId": Meteor.users.findOne(this.userId).profile.businessId,
      "profile.active": true,
      'roles': 'biker'
    },
    { fields: {'emails': 1, 'profile': 1} });
  } else {
    this.ready();
  }
});

Meteor.publish('roles', function() {
  if (Roles.userIsInRole(this.userId, ['manager'])) {
    return Meteor.roles.find({name: {$ne: 'admin'}});
  } else {
    this.ready();
  }
});

Meteor.publish('requests', function() {
  if (Roles.userIsInRole(this.userId, ['manager'])) {
    return Requests.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId,
      scheduleDate: {$gt: new Date()}
    },{
      sort: {scheduled: -1, scheduleDate: 1, submitted: 1}
    });
  } else if (this.userId) {
    return Requests.find({
      userId: this.userId,
      scheduleDate: {$gte: new Date()}
    }, {
      sort: {scheduled: -1, scheduleDate: 1, submitted: 1}
    });
  } else {
    this.ready();
  }
});

Meteor.publish('rates', function() {
 if (Roles.userIsInRole(this.userId, ['manager'])) {
    return Rates.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId
    });
  } else if (this.userId) {
    return Rates.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId,
      scheduleDate: {$gte: new Date()}
    });
  } else {
    this.ready();
  }
});

Meteor.publish('businesses', function() {
  if (this.userId) {
    return Businesses.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId
    });
  } else {
    return Businesses.find();
  }
})
