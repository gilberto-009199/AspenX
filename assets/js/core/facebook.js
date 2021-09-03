var MedeirosFB = function() {};

MedeirosFB.prototype = {
	ui: function(options, callback)
	{
		FB.ui(options, callback);
	}
}
var Facebook = new MedeirosFB();