Template.shiftsList.onCreated(function() {
	var instance = this;
	instance.loaded = new ReactiveVar(0);
	instance.limit = new ReactiveVar(5);
	instance.dateFilter = new ReactiveVar(0);
	Session.set('noPassword', {});
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
	'submit [name=filterForm]': function(event, template) {
		event.preventDefault();
		var dateFilter =
			moment($(event.target).find('[name=dateFilter]').val(), 'MMMM DD YYYY').toDate();
		template.dateFilter.set(dateFilter);
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
			var shopAccount = Meteor.users.findOne({roles: 'shop'});
			if (shopAccount) {
				Meteor.call('checkUserPassword', shopAccount._id, function(error, result) {
					Session.set('noPassword',{
						flag: false,
						message: "Oops looks like there are no shifts yet. You can create shifts by logging into your shop account: " + shopAccount.emails[0].address,
						noPassword: result
					});
				});
			}
		} else {
			return {
				flag: true
			}
		}
		return Session.get('noPassword');
	}
});

Template.setPasswordForShop.onCreated(function() {
	Session.set('postSubmitErrors', {});
});

Template.setPasswordForShop.events({
	'submit [name=shopNewPasswordForm]': function(event,template) {
		event.preventDefault();
		var password = $(event.target).find('[name=password]').val();
		var confirmPassword = $(event.target).find('[name=confirmPassword]').val();
		if (!password || !confirmPassword) {
			return Messages.throw('You need to fill out both password fields.', 'danger');
		} else if (password !== confirmPassword) {
			return Messages.throw('Your passwords do not match.', 'danger')
		}
		var userId = Meteor.users.findOne({roles: 'shop'})._id;
		Meteor.call('setNewShopPassword', userId, password, function(error) {
			if (error)
				console.log(error)
			Session.set('noPassword', {});
		});
	}
})
