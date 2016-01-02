Meteor.methods({
  sendContactEmail: function(contactInfo) {
    check(contactInfo, {
      name: String,
      email: String,
      website: String,
      phone: String,
      comments: String
    });
    SSR.compileTemplate( 'contactEmail', Assets.getText( 'contact-info.html' ) );
    Email.send({
      to: "sscaff1@gmail.com",
      from: "noreply@pedispace.com",
      subject: "Pedispace Comment",
      html: SSR.render( 'contactEmail', contactInfo )
    });
  }
});
