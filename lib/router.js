Router.configure({
  layoutTemplate: function() {
    if (Meteor.user()) {
      return 'layout';
    } else {
      return 'layoutFrontPage';
    }
  },
  loadingTemplate: 'loading',
  yieldTemplates: {
    'header': { to: 'header'},
    'footer': { to: 'footer'}
  }
});

var OnBeforeActions = {
    loginRequired: function(pause) {
      if (!Meteor.userId()) {
        this.render('home');
      } else {
        this.next();
      }
    },
    routeShop: function(pause) {
      if (Roles.userIsInRole(Meteor.userId(), ['shop'])) {
        Router.go('shiftAdd');
      } else {
        this.next();
      }
    },
    routeRider: function(pause) {
      if (Roles.userIsInRole(Meteor.userId(), ['rider'])) {
        Router.go('requestsCal');
      } else {
        this.next();
      }
    },
    routeAdminManager: function(pause) {
      if (Roles.userIsInRole(Meteor.userId(), ['admin','manager'])) {
        Router.go('shiftsList');
      } else {
        this.next();
      }
    }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
  except: ['home','joinManager','joinRider']
});

Router.onBeforeAction(OnBeforeActions.routeShop, {
  except: ['shiftAdd']
});

Router.onBeforeAction(OnBeforeActions.routeRider, {
  except: ['requestList', 'editProfile', 'requestEdit', 'requestsCal']
});

Router.onBeforeAction(OnBeforeActions.routeAdminManager, {
  only: ['shiftAdd', 'home', 'joinManager', 'joinRider']
});

Router.route('/shifts/add', {
  name: 'shiftAdd',
  waitOn: function() {
    return [
      Meteor.subscribe('rates'),
      Meteor.subscribe('bikes'),
      Meteor.subscribe('radios'),
      Meteor.subscribe('riders'),
      Meteor.subscribe('shiftTypes')
    ];
  }
});

Router.route('/shifts/list', {
  name: 'shiftsList',
  waitOn: function() {
    return [
      Meteor.subscribe('rates'),
      Meteor.subscribe('bikes'),
      Meteor.subscribe('radios'),
      Meteor.subscribe('userData'),
      Meteor.subscribe('shiftTypes')
    ];
  }
});

Router.route('/shift-types/list', {
  name: 'listShiftTypes',
  waitOn: function() {
    return Meteor.subscribe('shiftTypes');
  }
});

Router.route('/shift-types/:_id/edit', {
  name: 'editShiftTypes',
  data: function() {
    return ShiftTypes.findOne(this.params._id);
  }
});

Router.route('/radios/list', {
  name: 'radiosList',
  waitOn: function() {
    return Meteor.subscribe('radios');
  }
});

Router.route('/bikes/list', {
  name: 'bikesList',
  waitOn: function() {
    return Meteor.subscribe('bikes');
  }
});

Router.route('/users/list', {
  name: 'usersList',
  waitOn: function() {
    return [
      Meteor.subscribe('roles'),
      Meteor.subscribe('userData')
    ];
  }
});

Router.route('/rates/add', {
  name: 'rateSchedule',
  waitOn: function() {
    return [
      Meteor.subscribe('rates'),
      Meteor.subscribe('shiftTypes')
    ];
  }
});

Router.route('/bikes/:_id/edit', {
	name: 'bikeEdit',
	data: function() { return Bikes.findOne(this.params._id); }
});

Router.route('/radios/:_id/edit', {
	name: 'radioEdit',
	data: function() { return Radios.findOne(this.params._id) }
});

Router.route('/users/:_id/edit', {
  name: 'userEdit',
  waitOn: function() {
    return Meteor.subscribe('roles');
    return Meteor.subscribe('userData');
  },
  data: function() { return Meteor.users.findOne(this.params._id) }
});

Router.route('/requests/:_id/edit', {
  name: 'requestEdit',
  data: function() { return Requests.findOne(this.params._id) }
});

Router.route('/', {
	name: 'home'
});

Router.route('/users/edit-profile', {
  name: 'editProfile',
  data: function() { return Meteor.user() }
});

Router.route('/requests/list', {
  name: 'requestList'
});

Router.route('/join/manager', {
  name: 'joinManager'
});

Router.route('/join/rider', {
  name: 'joinRider',
  waitOn: function() {
    return Meteor.subscribe('businesses');
  }
});

Router.route('/requests-calendar', {
  name: 'requestsCal'
})
