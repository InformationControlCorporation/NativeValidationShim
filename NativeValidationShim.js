(function(root, undefined) {
	//Set-up settings and other variables.
	var lib = {};
	
	lib.version = '0.0';
	lib.settings = {
		messages: {
			color: "The value must be a valid hexadecimal color code",
			email: "The value must be a valid email address",
			emailMulti: "The value must be a list of one or more valid email addresses",
			maximum: "The number is too high",
			month: "Must be a valid month",
			minimum: "The number is too low",
			numeric: "The input must be a number",
			pattern: "Invalid input",
			required:  "This is a required field",
			step: "Must be divisible by the step size",
			url: "Must be a valid url"
		},
		regex: {
			color: /^#([a-f0-9]{3}|[a-f0-9]{6})$/i, //A # followed by 3 or 6 hexadecimal characters
			email: /^[a-zA-Z0-9.!#$%&'*+/=?\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			emailMulti: /^(([a-zA-Z0-9.!#$%&'*+/=?\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*), )*[a-zA-Z0-9.!#$%&'*+/=?\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			month: /^\b0*([1-9]|1[0-2])\b$/,
			url: /^\s*[a-z](?:[-a-z0-9\+\.])*:(?:\/\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:])*@)?(?:\[(?:(?:(?:[0-9a-f]{1,4}:){6}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|::(?:[0-9a-f]{1,4}:){5}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:[0-9a-f]{1,4}:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|v[0-9a-f]+[-a-z0-9\._~!\$&\'\(\)\*\+,;=:]+)\]|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}|(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=@])*)(?::[0-9]*)?(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))*)*|\/(?:(?:(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))+)(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))*)*)?|(?:(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))+)(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))*)*|(?!(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@])))(?:\?(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@])|[\uE000-\uF8FF\uF0000-\uFFFFD|\u100000-\u10FFFD\/\?])*)?(?:\#(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@])|[\/\?])*)?\s*$/i
		},
		error_class: 'validation_error'
	};
	
	/*
	 * Create all of the validation rules.
	 */
	
	function validateColor(element) {
		var message = "";
	
		if (message == "") {
			message = validateRequired(element);
		}
	
		if (message == "") {
			if (element.value.length > 0 && !element.value.match(lib.settings.regex.color)) {
				message = lib.settings.messages.color;
			}
		}
		
		return message;
	}
	
	function validateEmail(element) {
		var message = "";
	
		if (message == "") {
			message = validateRequired(element);
		}
		
		if (message == "") {
			message = validatePattern(element);
		}
	
		if (message == "") {
			if (element.getAttribute('multiple') != null) {
				if (element.value.length > 0 && !element.value.match(lib.settings.regex.emailMulti)) {
					message = lib.settings.messages.emailMulti;
				}
			}
			else {
				if (element.value.length > 0 && !element.value.match(lib.settings.regex.email)) {
					message = lib.settings.messages.email;
				}
			}
		}
		
		return message;
	}
	
	function validateMonth(element) {
		var message = "";
	
		if (message == "") {
			message = validateRequired(element);
		}
	
		if (message == "") {
			if (element.value.length > 0 && !element.value.match(lib.settings.regex.month)) {
				message = lib.settings.messages.month;
			}
		}
		
		return message;
	}
	 
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
	
	function validateUrl(element) {
		var message = "";
	
		if (message == "") {
			message = validateRequired(element);
		}
		
		if (message == "") {
			message = validatePattern(element);
		}
	
		if (message == "") {
			if (element.value.length > 0 && !element.value.match(lib.settings.regex.url)) {
				message = lib.settings.messages.url;
			}
		}
		
		return message;
	}
	
	/*
	 * Create all of the helper validations, for validation logic shared between element types
	 */
	 
	function validateMax(element) {
		if (element.value == "") {
			//Don't validate empty strings.  This is for "required" to determine.
			return "";
		}
		
		if (element.getAttribute('max') != null && element.value > parseFloat(element.getAttribute('max'))) {
			return lib.settings.messages.maximum;
		}
		
		return "";
	}
	
	function validateMin(element) {
		if (element.value == "") {
			//Don't validate empty strings.  This is for "required" to determine.
			return "";
		}
		
		if (element.getAttribute('min') != null && element.value < parseFloat(element.getAttribute('min'))) {
			return lib.settings.messages.minimum;
		}
		
		return "";
	}
	
	function validateNumeric(element) {
		if (element.value == "") {
			//Don't validate empty strings.  This is for "required" to determine.
			return "";
		}
	
		if (element.value != parseFloat(element.value)) {
			return lib.settings.messages.numeric;
		}
	
		return "";
	}
	
	//The pattern attribute works with the following input types: text, search, url, tel, email, and password.
	function validatePattern(element) {
		if (element.value == "") {
			//Don't validate empty strings.  This is for "required" to determine.
			return "";
		}
		
		if (element.getAttribute('pattern') != null) {
			var regex = new RegExp(element.pattern);
		
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
		if (element.value == "") {
			//Don't validate empty strings.  This is for "required" to determine.
			return "";
		}
		
		if (element.getAttribute('step') != null && element.getAttribute('step') > 0 && element.value % parseFloat(element.getAttribute('step')) != 0) {
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
					switch (element.getAttribute('type')) {
						case "hidden":
						case "submit":
							break; //Don't validate these.
						case "color":
							message = validateColor(element);
							break;
						case "email":
							message = validateEmail(element);
							break;
						case "month":
							message = validateMonth(element);
							break;
						case "number":
						case "range":
							message = validateNumber(element);
							break;
						case "url":
							message = validateUrl(element);
							break;
						case "search":
						case "tel": //No specified pattern, just semantic
						case "text":
						default: //Treat unrecognized types as text fields
							message = validateText(element);
					}
					
					removeMessage(element);
					
					if (message != "") {
						allowSubmit = false;
						createMessage(element, message);
					}
				}
				
				if (allowSubmit) {
					old_submit();
				}
				
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