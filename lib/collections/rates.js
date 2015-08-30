Rates = new Mongo.Collection('rates');

Meteor.methods({
	rateAdd: function(rate) {
		var rateExists = Rates.findOne({
			shiftType: rate.shiftType,
			scheduleDate: rate.scheduleDate
		});
		if (rateExists)
			return Rates.update({_id: rateExists._id}, {$set: rate});

		Rates.insert(rate);
	}
})

validateRate = function (rate) {
	var errors = {};
	if (!rate.shiftType)
		errors.shiftType = "Please select a shift type"
	if (isNaN(rate.rateAmount) || !rate.rateAmount)
		errors.rateAmount = "Please enter a valid rate"
	return errors;
}
