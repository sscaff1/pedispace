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
    }, {
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
    }, {
        fieldName: 'locationId',
        fieldLabel: 'Location',
        inputType: 'select',
        empty: 'Select a Location',
        showFieldLabel: false,
        data: function() {
            l1 = Locations.find();
            l2 = l1.map(function(l1) {
              return {id: l1._id, label: l1.name, value: l1._id}
            });
            return l2;
        },
        visible: true,
        validate: function(value, errorFunction){
          if (!value) {
            errorFunction("You must select a location");
            return false;
          } else {
            return true;
          }
        }
    }]
});