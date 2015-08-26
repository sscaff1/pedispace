Rates = new Mongo.Collection('rates');

Meteor.methods({
	rateAdd: function(rate) {
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
