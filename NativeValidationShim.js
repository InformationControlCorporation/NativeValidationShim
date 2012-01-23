(function(root, undefined) {
	//Set-up settings and other variables.
	var lib = {};
	
	lib.version = '0.0';
	lib.settings = {
		messages: {
			maximum: "The number is too high",
			minimum: "The number is too low",
			numeric: "The input must be a number",
			pattern: "Invalid input",
			required:  "This is a required field",
			step: "Must be divisible by the step size"
		},
		error_class: 'validation_error'
	};
	
	/*
	 * Create all of the validation rules.
	 */
	 
	function validateNumber(element) {
		var message = "";
	
		if (message == "") {
			message = validateRequired(element);
		}
	
		if (message == "") {
			message = validateNumeric(element);
		}
	
		if (message == "") {
			message = validateMin(element);
		}
	
		if (message == "") {
			message = validateMax(element);
		}
	
		if (message == "") {
			message = validateStep(element);
		}
	
		return message;
	}
	
	function validateText(element) {
		var message = "";
	
		if (message == "") {
			message = validateRequired(element);
		}
		
		if (message == "") {
			message = validatePattern(element);
		}
		
		return message;
	}
	
	/*
	 * Create all of the helper validations, for validation logic shared between element types
	 */
	 
	function validateMax(element) {
		if (element.getAttribute('max') != null && element.value > element.getAttribute('max')) {
			return lib.settings.messages.max;
		}
		
		return "";
	}
	
	function validateMin(element) {
		if (element.getAttribute('min') != null && element.value < element.getAttribute('min')) {
			return lib.settings.messages.min;
		}
		
		return "";
	}
	
	function validateNumeric(element) {
		if (element.value != parseFloat(element.value)) {
			return lib.settings.messages.numeric;
		}
	
		return "";
	}
	
	//The pattern attribute works with the following input types: text, search, url, tel, email, and password.
	function validatePattern(element) {
		if (element.getAttribute('pattern') != null) {
			var regex = new Regexp(element.pattern);
		
			if (!regex.test(element.value)) {
				return lib.settings.messages.pattern;
			}
		}
	
		return "";
	}
	
	//The required attribute works with the following <input> types: text, search, url, telephone, email, password, date pickers, number, checkbox, radio, and file.
	function validateRequired(element) {
		if (element.getAttribute('required') != null && element.value.length <= 0) {
			return lib.settings.messages.required;
		}
		
		return "";
	}
	
	function validateStep(element) {
		if (element.getAttribute('step') != null && element.getAttribute('step') > 0 && element.value % element.getAttribute('step') > 0) {
			return lib.settings.messages.step;
		}
	
		return "";
	}
	
	/*
	 * General Helper functions
	 */
	function createMessage(element, message) {
		var span_element = document.createElement('span');
		span_element.appendChild(document.createTextNode(message));
		addClass(span_element, lib.settings.error_class);
		
		if (element.nextSibling == null || !hasClass(element.nextSibling, lib.settings.error_class)) {
			if (element.nextSibling != null) {
				element.parentNode.insertBefore(span_element, element.nextSibling);
			}
			else {
				element.parentNode.appendChild(span_element);
			}
		}
	}
	
	function removeMessage(element) {
		//Abort if there isn't a next sibling
		if (element.nextSibling == null) {
			return;
		}
		
		//Only remove the element if it has our validation error class
		if (hasClass(element.nextSibling, lib.settings.error_class)) {
			element.parentNode.removeChild(element.nextSibling);
		}
	}
	
	function addClass(element, class_name) {
		element.className += ' '+class_name+' ';
	}
	
	function hasClass(element, class_name) {
		if ((" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" "+lib.settings.error_class+" ") > -1) {
			return true;
		}
		else {
			return false;
		}
	}
	
	function removeClass(element, class_name) {
		element.className = element.className.replace(new RegExp('(?:^|\s)'+class_name+'(?!\S)', ''));
	}
	
	/*
	 * Loop through and set up the validations on the form.
	 */
	
	//Cache any pre-existing load event.
	var old_load = window.onload || function() {};
	
	//Wait until the page has finished loading to attach to all page forms.
	window.onload = function() {
		//Attach to every form on the page.
		for (var i = 0; i < document.forms.length; i++) {
			var form = document.forms[i];
			//Cache old callback.
			var old_submit = form.onsubmit || function() {};
			
			//Set our new one.
			form.onsubmit = function() {
				var allowSubmit = true;
				
				//Test all elements on the form.
				for (var j = 0; j < form.elements.length; j++) {
					var element = form.elements[j];
					var message = "";
					
					//Then element-specific types
					switch (element.type) {
						case "hidden":
						case "submit":
							break; //Don't validate these.
						case "number":
							if (message == "") message = validateNumber(element);
							break;
						case "search":
						case "text":
						default: //Treat unrecognized types as text fields
							if (message == "") message = validateText(element);
					}
					
					if (message == "")  removeMessage(element);
					else {
						allowSubmit = false;
						createMessage(element, message);
					}
				}
				
				if (allowSubmit) old_submit();
				
				//return preventSubmit;
				return allowSubmit;
			};
		}
		
		//Run a pre-existing load event.
		old_load();
	};

	//Expose the library to the root namespace.
	root['NativeValidationShim'] = lib;
}(this));