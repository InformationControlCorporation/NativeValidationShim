(function(root, undefined) {
	//Set-up settings and other variables.
	var lib = {};
	
	lib.version = '0.0';
	lib.settings = {
		messages: {
			required:  "This is a required field"
		}
	};
	
	//Create all of the validation rules.
	
	//The required attribute works with the following <input> types: text, search, url, telephone, email, password, date pickers, number, checkbox, radio, and file.
	function validateRequired(element) {
		if (!Modernizr.input.required && element.required && (typeof(element.value) == "undefined" || element.value.length == 0)) {
			return lib.settings.messages.required;
		}
		else return "";
	}
	
	//Helper functions
	function createMessage(element, message) {
	
	}
	
	function removeMessage(element) {
	
	}
	
	//Cache any pre-existing load event.
	var old_load = document.onload || function() {};
	
	//Wait until the page has finished loading to attach to all page forms.
	document.onload = function() {
		//Attach to every form on the page.
		for (var i = 0; i < document.forms.length; i++) {
			var form = document.forms[i];
			
			//Cache old callback.
			var old_submit = form.onsubmit || function() {};
			
			//Set our new one.
			form.onsubmit = function() {
				var preventSubmit = false;
			
				//Test all elements on the form.
				for (var j = 0; j < form.elements.length; j++) {
					var element = form.elements[j];
					var message = "";
					
					switch (element.type) {
						case "hidden":
						case "submit":
							break; //Don't validate these.
						case "text":
						default: //Treat unrecognized types as text fields
							
					}
					
					if (message == "") message = validateRequired(element);
				}
			
				if (message != "") {
					preventSubmit = true;
				}
				else {
					//Run the old callback after all is clear.
					old_submit();
				}
				
				return preventSubmit;
			};
		}
		
		//Run a pre-existing load event.
		old_load();
	};

	//Expose the library to the root namespace.
	root['NativeValidationShim'] = lib;
}(this));