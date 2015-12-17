if (Meteor.roles.find().count() === 0) {
  var roles = ['admin', 'manager', 'mechanic', 'rider', 'shop'];
  roles.map(function(role) {
    Roles.createRole(role);
  });
}
