$.fn.timelog = function() {
        var inputs = this.find("input[type='text'],textarea");
	this.submit(function(e) {

		var inputs = $(this).find("input[type='text'],textarea");
		for (var i = 0; i < inputs.length; i++) {
			console.log(inputs[i]);
			var dat = {"timespent": $(inputs[i]).data('timespent')}; // json object
		// TODO: add more data
			$("<input>").attr({
			    type: 'hidden',
			    id: 'foo',
			    value: JSON.stringify(dat),
	    		    name: 'timelog_'+$(inputs[i]).attr('name')
			}).appendTo(this);
		}

		return true;
	});


	var startFocusTimer = undefined;
	var lastFocusOn;
	for (var i = 0; i < inputs.length; i++) {
    		$(inputs[i]).focusin(function() {
			console.log("focusin");
			if (lastFocusOn != undefined &&
			    lastFocusOn.data("timespent") != undefined &&
			    startFocusTimer != undefined) {
				lastFocusOn.data("timespent") = lastFocusOn.data("timespent") + (new Date()).getTime() - startFocusTimer.getTime();
			}
			startFocusTimer = new Date();
			lastFocusOn = this;	
		});
		$(inputs[i]).focusout(function() {
			if (startFocusTimer != undefined) {
				if ($(lastFocusOn).data("timespent") != undefined) {
					$(lastFocusOn).data("timespent", $(lastFocusOn).data("timespent") + (new Date()).getTime() - startFocusTimer.getTime());
				}
				else {
					$(lastFocusOn).data("timespent", (new Date()).getTime() - startFocusTimer.getTime());
				}
			}
			console.log($(lastFocusOn).data());
			lastFocusOn = undefined;
			startFocusTimer = undefined;
		});
	}
};

