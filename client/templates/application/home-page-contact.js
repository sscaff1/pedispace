Template.homepageContactForm.events({
  'submit form': function(event,template) {
    event.preventDefault();
    var formDetails = {
      name: template.$('[name=fullName]').val(),
      email: template.$('[name=email]').val(),
      website: template.$('[name=website]').val(),
      phone: template.$('[name=phone]').val(),
      comments: template.$('[name=comments]').val()
    }
    Meteor.call('sendContactEmail', formDetails, function(error) {
      if (error) {
        console.log(error);
      } else {
        Messages.throw('Thank you for your comments. We will get back to you shortly.', 'success');
        document.getElementById("contactform").reset();
      }
    });
  }
})
