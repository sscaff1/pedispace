UI.registerHelper('errorMessage', function (field) {
  return Session.get('postSubmitErrors')[field];
});

UI.registerHelper('errorClass', function (field) {
  return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
});

Template.header.events({
  'click .navbar-collapse.in':function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $('.navbar-collapse.in').collapse('hide');
    }
  }
});

Template._loginButtonsLoggedInDropdown.events({
  'click #login-buttons-edit-profile': function(event) {
    Router.go('editProfile');
  }
});
