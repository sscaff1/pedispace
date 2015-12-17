Template.shiftItem.helpers({
	radioName: function() {
		var r = Radios.findOne({_id: this.radioId});
		r = r.name;
		return r;
	},
	bikeName: function() {
		var b = Bikes.findOne({_id: this.bikeId});
		b = b.name;
		return b;
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
