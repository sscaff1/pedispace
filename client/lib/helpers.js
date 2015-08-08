isEmptyO = function (obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}

UI.registerHelper('nextSat', function () {
    if (moment() >= moment().day(6) && moment().hour() >= 12) {
  	  return moment().day(6+7).format("dddd, MMMM Do YYYY");
  	} else {
  	  return moment().day(6).format("dddd, MMMM Do YYYY");
  	}
});

UI.registerHelper('errorMessage', function (field) {
  return Session.get('postSubmitErrors')[field];
});

UI.registerHelper('errorClass', function (field) {
  return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
});

UI.registerHelper('scheduleDates', function () {
  var dateArray = [];
  var nextWeek = moment().day(i+7).format("dddd, MMMM Do YYYY");
  for (var i = 0; i <= 7; i++) {
    dateArray[i] ={
      'dateValue': moment().day(i+7).format("dddd, MMMM Do YYYY"),
      'formId': "formId"+i,
      'alternate': function() {
        return Alternates.find({scheduleDate: nextWeek}, 
          {sort: {userName: 1}});
      },
      'riders': function () {
        return Requests.find({scheduled: true, scheduleDate: nextWeek});
      }
    }
  };
  return dateArray;
});