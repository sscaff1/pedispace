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

UI.registerHelper('scheduleDates', function (inc) {
  var dateArray = [];
  inc = parseInt(inc);
  for (var i = 0; i < 7; i++) {
    var day = 7 + i + inc;
    dateArray[i] ={
      'dateValue': moment().day(day).startOf('day'),
      'formId': "formId" + i,
    }
    console.log(day);
  };
  return dateArray;
});