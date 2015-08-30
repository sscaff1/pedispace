Template.shiftsList.onCreated(function() {
	var instance = this;

	instance.loaded = new ReactiveVar(0);
	instance.limit = new ReactiveVar(5);
	instance.dateFilter = new ReactiveVar(0);

	instance.autorun(function () {
		var limit = instance.limit.get();
		var subscription = instance.subscribe('shifts', limit);

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
	'click .load-more': function(e, instance) {
		e.preventDefault();
		
		var limit = instance.limit.get();
		limit += 5;
		instance.limit.set(limit);
	},
	'submit form': function(e, instance) {
		e.preventDefault();

		var dateFilter = $(e.target).find('[name=dateFilter]').val();
		dateFilter = new Date(moment(dateFilter));

		instance.dateFilter.set(dateFilter);
	},
	// 'click .reset': function(e) {
	// 	e.preventDefault();
	// 	//I need to reset shifts F with this event
	// }
		
});

Template.shiftsList.helpers({
	shifts: function() {
		return Template.instance().shifts();
	},
	hasMoreShifts: function () {
		return Template.instance().shifts().count() >= Template.instance().limit.get();
	},
	shiftsF: function() {
		var dateFilter1 = Template.instance().dateFilter.get();
		var dateFilter2 = new Date(moment(dateFilter1).add(1, 'days'));
		if (dateFilter1)
			return Shifts.find({startTime: {$gte: dateFilter1, $lt: dateFilter2}});
		return false;
	}
});

