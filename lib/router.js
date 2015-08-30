Router.configure({
  layoutTemplate: function() {
    if (Roles.userIsInRole(Meteor.userId(),['admin','manager'])) {
      return 'layout';
    } else {
      return 'layoutRegular'
    }
  },
  waitOn: function() {
    return [
      Meteor.subscribe('bikes'), 
      Meteor.subscribe('locations'),
      Meteor.subscribe('radios'),
      Meteor.subscribe('userData'),
      Meteor.subscribe('comments'),
      Meteor.subscribe('requests')
    ];
  }
});

var OnBeforeActions;

OnBeforeActions = {
    loginRequired: function(pause) {
      if (!Meteor.userId()) {
        this.render('login');
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
    routeBiker: function(pause) {
      if (Roles.userIsInRole(Meteor.userId(), ['biker'])) {
        Router.go('scheduleRequest');
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

Router.onBeforeAction(OnBeforeActions.loginRequired);

Router.onBeforeAction(OnBeforeActions.routeShop, {
  except: ['shiftAdd']
});

Router.onBeforeAction(OnBeforeActions.routeBiker, {
  except: ['scheduleRequest', 'editProfile', 'printSchedule']
});

Router.onBeforeAction(OnBeforeActions.routeAdminManager, {
  only: ['shiftAdd']
});

Router.route('/', {
  name: 'shiftAdd',
  data: function() { return Meteor.user() },
  waitOn: function() {
    return [Meteor.subscribe('rates')];
  }
});

Router.route('/shiftsList', {
  name: 'shiftsList'
});

Router.route('/scheduleRequest', {
  name: 'scheduleRequest',
});

Router.route('/locationsList', {name: 'locationsList'});

Router.route('/radiosList', {name: 'radiosList'});

Router.route('/bikesList', {name: 'bikesList'});

Router.route('/usersList', {name: 'usersList'});

Router.route('/rateSchedule', {
  name: 'rateSchedule',
  waitOn: function() {
    return [Meteor.subscribe('rates')];
  }
});

Router.route('/printSchedule', {
  name: 'printSchedule',
  layoutTemplate: 'layoutRegular',
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
  },
  data: function() { return Meteor.users.findOne(this.params._id) }
});

Router.route('/users/login', {
	name: 'login'
});

Router.route('/users/editProfile', {
  name: 'editProfile',
  data: function() { return Meteor.user() }
});

Router.route('/scheduleRider', {
  name: 'scheduleRider'
});