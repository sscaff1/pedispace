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
      Meteor.subscribe('comments')
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
  except: ['scheduleRequest', 'editProfile']
});

Router.onBeforeAction(OnBeforeActions.routeAdminManager, {
  only: ['shiftAdd']
});

Router.route('/', {
  name: 'shiftAdd',
  data: function() { return Meteor.user() }
});

Router.route('/shiftsList', {
  name: 'shiftsList',
  waitOn: function() {
    return [Meteor.subscribe('shifts')];
  }
});

Router.route('/scheduleRequest', {
  name: 'scheduleRequest',
  waitOn: function() {
    return Meteor.subscribe('requests');
  }
});

Router.route('/locationsList', {name: 'locationsList'});

Router.route('/radiosList', {name: 'radiosList'});

Router.route('/bikesList', {name: 'bikesList'});

Router.route('/usersList', {name: 'usersList'});

Router.route('/alternatesSchedule', {
  name: 'alternatesSchedule'
});

Router.route('/printSchedule', {
  name: 'printSchedule',
  layoutTemplate: 'layoutRegular',
  waitOn: function () {
    return Meteor.subscribe('requestSchedule');
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