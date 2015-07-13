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