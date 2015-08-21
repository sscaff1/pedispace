Template.scheduleListFull.helpers({
  dateValuef: function() {
    return this.dateValue.format("ddd, MMMM Do")
  },
  bikes: function () { 
  	var b = Bikes.find({locationId: Meteor.user().profile.locationId, active:true}).count();
  	Session.set('b', b);
  	return b;
  },
  scheduledRiders: function (shift) {
  	var sr = Requests.find({requestDate: new Date(this.dateValue), scheduled: true, shiftType: shift, rider: true}).count();
  	Session.set('sr', sr);
  	return sr;
  },
  notScheduled: function () {
  	var sr = Session.get('sr');
  	var b = Session.get('b')
  	if (sr < b) {
  		return "color:red";
  	} else {
  		return "color:green";
  	}
  }
})