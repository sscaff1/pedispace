// By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
Accounts.emailTemplates.from = 'pediSpace <noreply@pedispace.com>';

// The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
Accounts.emailTemplates.siteName = 'pediSpace';

// A Function that takes a user object and returns a String for the subject line of the email.
Accounts.emailTemplates.verifyEmail.subject = function(user) {
  return 'Confirm Your Email Address for pediSpace';
};

// A Function that takes a user object and a url, and returns the body text for the email.
// Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
Accounts.emailTemplates.verifyEmail.html = function(user, url) {
  SSR.compileTemplate( 'verifyEmail', Assets.getText( 'verify-email.html' ) );
  var emailData = {
    verifyLink: url
  };
  return SSR.render( 'verifyEmail', emailData )
};

Accounts.emailTemplates.enrollAccount.subject = function(user) {
  return 'Welcome to pediSpace ' + user.profile.name + '!';
};

Accounts.emailTemplates.enrollAccount.html = function(user, url) {
  SSR.compileTemplate( 'enrollEmail', Assets.getText( 'enrolled-email.html' ) );
  var emailData = {
    verifyLink: url
  };
  return SSR.render( 'enrollEmail', emailData )
};
