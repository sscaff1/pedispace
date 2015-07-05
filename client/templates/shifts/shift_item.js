Template.shiftItem.helpers({
	'radioName': function() {
		var r = Radios.findOne({_id: this.radioId});
		r = r.name;
		return r;
	},
	'bikeName': function() {
		var b = Bikes.findOne({_id: this.bikeId});
		b = b.name;
		return b;
	},
	'locationName': function() {
		var l = Locations.findOne({_id: this.locationId});
		l = l.name;
		return l;
	},
	'startTimeF': function() {
		var d = this.startTime.toDateString() + ' ' + this.startTime.toLocaleTimeString();
		return d;
	},
	'endTimeF': function() {
		var d = this.endTime.toDateString() + ' ' + this.endTime.toLocaleTimeString();
		return d;
	},
	'userName': function() {
		var u = Meteor.users.findOne({_id: this.userId});
		u = u.profile.name;
		return u;
	}
});