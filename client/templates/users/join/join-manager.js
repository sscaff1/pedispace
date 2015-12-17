Template.joinManager.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.joinManager.events({
  'submit form': function(event,template) {
    event.preventDefault();
    var user = {
      email: $(event.target).find('[name=email]').val(),
      password: $(event.target).find('[name=password]').val(),
      name: $(event.target).find('[name=userName]').val(),
      phoneNumber: $(event.target).find('[name=phoneNumber]').val(),
      businessId: $(event.target).find('[name=business]').val(),
      role: 'manager'
    }
    var errors = validateManager(user);
    if (!$.isEmptyObject(errors)) {
      return Session.set('postSubmitErrors', errors);
    }
    Meteor.call('createUserOnJoin', user, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        Meteor.setTimeout(function() {
          var businessId = Meteor.users.findOne({_id: result}).profile.businessId;
          var shopUser = {
            email: user.businessId.replace(/ /g,'').toLowerCase()+'@pedispace.com',
            businessId: businessId,
            name: user.businessId,
            role: 'shop'
          }
          Meteor.call('createShopUser', shopUser, function(error) {
            if (error)
              console.log(error);
          });
        }, 2000);
        Meteor.loginWithPassword(user.email, user.password, function(error) {
          if (error)
            console.log(error);
        });
      }
    });
  }
});
