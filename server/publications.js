Meteor.publish('bikes', function() {
  if (Roles.userIsInRole(this.userId, ['manager'])) {
    return Bikes.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId
    });
  } else if (this.userId) {
    return Bikes.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId,
      active: true
    },{
      sort: {name: 1}
    });
  } else {
    return this.ready();
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
    },{
      sort: {name: 1}
    });
  } else {
    return this.ready();
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
    },{
      sort: {name: 1}
    });
  } else {
    return this.ready();
  }
});

Meteor.publish('shifts', function(limit, searchDate) {
	if (Roles.userIsInRole(this.userId, ['manager'])) {
    if (!searchDate) {
  		return Shifts.find({
        businessId: Meteor.users.findOne(this.userId).profile.businessId
      },{
        limit: limit,
        sort: {submitted: -1}
      });
    } else {
      searchDate = moment(searchDate).clone().startOf('day').toDate();
      var dateFilter2 = moment(searchDate).clone().add(1, 'days').toDate();
      return Shifts.find({
        businessId: Meteor.users.findOne(this.userId).profile.businessId,
        startTime: {$gte: searchDate, $lt: dateFilter2}
      },{
        limit: limit,
        sort: {submitted: -1}
      });
    }
	} else {
		return this.ready();
	};
});

Meteor.publish('riders', function() {
  if (this.userId) {
    return Meteor.users.find({
      "profile.businessId": Meteor.users.findOne(this.userId).profile.businessId,
      "profile.active": true,
      roles: 'rider'
    },{
      fields: {'profile.name': 1},
      sort: {"profile.name": 1}
    });
  } else {
    return this.ready();
  }
})

Meteor.publish('userData', function () {
  if (Roles.userIsInRole(this.userId, ['manager'])) {
    return Meteor.users.find({
      "profile.businessId": Meteor.users.findOne(this.userId).profile.businessId
    },
    { fields: {'emails': 1, 'profile': 1, 'roles': 1} });
  } else {
    return this.ready();
  }
});

Meteor.publish('managers', function() {
  if (!this.userId) {
    return Meteor.users.find({
      roles: 'manager'
    });
  } else {
    return this.ready();
  }
});

Meteor.publish('roles', function() {
  if (Roles.userIsInRole(this.userId, ['manager'])) {
    return Meteor.roles.find({name: {$nin: ['admin', 'mechanic', 'shop']}});
  } else {
    return this.ready();
  }
});

Meteor.publish('requests', function() {
  if (Roles.userIsInRole(this.userId, ['manager'])) {
    return Requests.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId,
      scheduleDate: {$gte: moment().startOf('day').toDate()}
    },{
      sort: {scheduleDate: 1, submitted: 1}
    });
  } else if (this.userId) {
    return Requests.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId,
      userId: this.userId,
      scheduleDate: {$gte: moment().startOf('day').toDate()}
    }, {
      sort: {scheduleDate: 1, submitted: 1}
    });
  } else {
    return this.ready();
  }
});

Meteor.publish('rates', function() {
 if (Roles.userIsInRole(this.userId, ['manager'])) {
    return Rates.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId
    });
  } else if (this.userId) {
    var currentDate = moment().startOf('day').toDate();
    return Rates.find({
      businessId: Meteor.users.findOne(this.userId).profile.businessId,
      scheduleDate: {$gte: currentDate}
    });
  } else {
    return this.ready();
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
});
