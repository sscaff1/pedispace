Template.joinRider.onCreated(function() {
  var instance = this;
  Session.set('postSubmitErrors', {});
  instance.autorun(function() {
    instance.subscribe('managers');
  });
});

Template.joinRider.helpers({
  business: function() {
    return Businesses.find({}, {sort: {name: 1}});
  },
  ownerName: function() {
    return Meteor.users.findOne({"profile.businessId":this._id}).profile.name;
  }
});

Template.joinRider.events({
  'submit form': function(event,template) {
    event.preventDefault();
    var user = {
      email: $(event.target).find('[name=email]').val(),
      password: $(event.target).find('[name=password]').val(),
      name: $(event.target).find('[name=userName]').val(),
      phoneNumber: $(event.target).find('[name=phoneNumber]').val(),
      businessId: $(event.target).find('[name=business]').val(),
      role: 'rider'
    }
    var errors = validateRider(user);
    if (!$.isEmptyObject(errors)) {
      return Session.set('postSubmitErrors', errors);
    }
    Meteor.call('createUserOnJoin', user, function(error) {
      if (error) {
        Messages.throw(error.reason, 'danger');
        console.log(error);
      } else {
        Meteor.loginWithPassword(user.email, user.password, function(error) {
          if (error)
            console.log(error);
        });
      }
    });
  }
});
