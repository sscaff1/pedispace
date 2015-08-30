Template.shiftItem.helpers({
	radioName: function() {
		var instance = this;
		var r = Radios.findOne({_id: instance.radioId});
		r = r.name;
		return r;
	},
	bikeName: function() {
		var instance = this;
		var b = Bikes.findOne({_id: instance.bikeId});
		b = b.name;
		return b;
	},
	locationName: function() {
		var l = Locations.findOne({_id: this.locationId});
		return l;
	},
	startTimeF: function() {
		var d = moment(this.startTime).format("ddd, MMM Do YY, h:mm A");
		return d;
	},
	endTimeF: function() {
		var d = moment(this.endTime).format("ddd, MMM Do YY, h:mm A");
		return d;
	},
	userName: function() {
		var u = Meteor.users.findOne({_id: this.userId});
		u = u.profile.name;
		return u;
	}
});