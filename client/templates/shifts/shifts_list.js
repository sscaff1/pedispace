Template.shiftsList.onCreated(function() {
	var instance = this;
	instance.loaded = new ReactiveVar(0);
	instance.limit = new ReactiveVar(5);
	instance.dateFilter = new ReactiveVar(0);
	instance.autorun(function () {
		var limit = instance.limit.get();
		var searchDate = instance.dateFilter.get();
		var subscription = instance.subscribe('shifts', limit, searchDate);
		if (subscription.ready()) {
			instance.loaded.set(limit);
		}
	});
	instance.shifts = function() {
		return Shifts.find({},
			{
				limit: instance.loaded.get(),
				sort: {submitted: -1}
			});
	};

});

Template.shiftsList.events({
	'click .load-more': function(event, template) {
		event.preventDefault();

		var limit = template.limit.get();
		limit += 5;
		template.limit.set(limit);
	},
	'submit form': function(event, template) {
		event.preventDefault();
		var dateFilter =
			moment($(event.target).find('[name=dateFilter]').val(), 'MMMM DD YYYY').toDate();
		instance.dateFilter.set(dateFilter);
	}
});

Template.shiftsList.helpers({
	shifts: function() {
		return Template.instance().shifts();
	},
	hasMoreShifts: function () {
		return Template.instance().shifts().count() >= Template.instance().limit.get();
	},
	shiftsF: function() {
		if (Template.instance().dateFilter.get())
			return true;
		return false;
	},
	emptyShifts: function() {
		if (Template.instance().shifts().count() === 0) {
			var shopAccount = Meteor.users.findOne({roles: 'shop'}).emails[0].address;
			return {
				flag: false,
				message: "Opps looks like there are no shifts yet. You can create shifts by logging into your shop account: " + shopAccount
			}
		} else {
			return {
				flag: true
			}
		}
	}
});
