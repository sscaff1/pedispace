Accounts.ui.config({
  requestPermissions: {},
  extraSignupFields: [{
    fieldName: 'name',
    fieldLabel: 'Full name',
    inputType: 'text',
    visible: true,
    validate: function(value, errorFunction) {
      if (!value) {
        errorFunction("Please write your full name");
        return false;
      } else {
        return true;
      }
    }
  },{
    fieldName: 'phoneNumber',
    fieldLabel: 'Phone Number',
    inputType: 'tel',
    visible: true,
    validate: function(value, errorFunction) {
      if (!value) {
        errorFunction("Please write your phone number");
        return false;
      } else {
        return true;
      }
    }
  },{
    fieldName: 'businessId',
    fieldLabel: 'Business Name',
    inputType: 'text',
    visible: true,
    validate: function(value, errorFunction) {
      if (!value) {
        errorFunction("Please indicated the name of your business");
        return false;
      } else {
        return true;
      }
    }
  }]
});
