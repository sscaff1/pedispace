Router.configure({
  layoutTemplate: function() {
    if (Meteor.user()) {
      return 'layout';
    } else {
      return 'layoutFrontPage';
    }
  },
  waitOn: function() {
    return [
      Meteor.subscribe('bikes'),
      Meteor.subscribe('radios'),
      Meteor.subscribe('userData'),
      Meteor.subscribe('requests'),
      Meteor.subscribe('shiftTypes')
    ];
  },
  yieldTemplates: {
    'header': { to: 'header'},
    'footer': { to: 'footer'}
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
        Router.go('requestList');
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
  except: ['requestList', 'editProfile', 'printSchedule', 'requestEdit']
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

Router.route('/listShiftTypes', {name: 'listShiftTypes'});

Router.route('/shiftTypes/:_id/edit', {
  name: 'editShiftTypes',
  data: function() {
    return ShiftTypes.findOne(this.params._id);
  }
});

Router.route('/radiosList', {name: 'radiosList'});

Router.route('/bikesList', {name: 'bikesList'});

Router.route('/usersList', {
  name: 'usersList',
  waitOn: function() {
    return Meteor.subscribe('roles');
  }
});

Router.route('/rateSchedule', {
  name: 'rateSchedule',
  waitOn: function() {
    return [Meteor.subscribe('rates')];
  }
});

Router.route('/printSchedule', {
  name: 'printSchedule'
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

Router.route('/requests/:_id/edit', {
  name: 'requestEdit',
  data: function() { return Requests.findOne(this.params._id) },
  waitOn: function() {
    return [
      Meteor.subscribe('rates')
    ]
  }
});

Router.route('/users/login', {
	name: 'login'
});

Router.route('/users/editProfile', {
  name: 'editProfile',
  data: function() { return Meteor.user() }
});

Router.route('/requestList', {
  name: 'requestList',
  waitOn: function() {
    return [
      Meteor.subscribe('rates')
    ]
  }
});
