(function(root, undefined) {
	//Set-up settings and other variables.
	var lib = {};

	lib.version = '0.0';
	lib.settings = {
		messages: {
			maximum: "The number is cannot be above",
			minimum: "The number is cannot be below",
			numeric: "The input must be a number",
			pattern: "Invalid input",
			required:  "This is a required field",
			url: "This is not a valid URL",
			step: "Must be divisible by the step size",
			email: "This input must be an email"
		},regex: {
			numeric: /^([-]?[0-9]+(\.?[0-9]*)?([eE]?[\+-]?[0-9]*)?)$/,
			date: null,
			datetime: null,
			datetimelocal:null,
			time: null,
			color: /^#([a-f0-9]{3}|[a-f0-9]{6})$/i, //A # followed by 3 or 6 hexadecimal characters
			email: /^[a-zA-Z0-9.!#$%&'*+/=?\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			emailMulti: /^(([a-zA-Z0-9.!#$%&'*+/=?\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*), )*[a-zA-Z0-9.!#$%&'*+/=?\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			month: /^\b0*([1-9]|1[0-2])\b$/,
			url: /^\s*[a-z](?:[-a-z0-9\+\.])*:(?:\/\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:])*@)?(?:\[(?:(?:(?:[0-9a-f]{1,4}:){6}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|::(?:[0-9a-f]{1,4}:){5}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:[0-9a-f]{1,4}:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|v[0-9a-f]+[-a-z0-9\._~!\$&\'\(\)\*\+,;=:]+)\]|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}|(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=@])*)(?::[0-9]*)?(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))*)*|\/(?:(?:(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))+)(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))*)*)?|(?:(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))+)(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))*)*|(?!(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@])))(?:\?(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@])|[\uE000-\uF8FF\uF0000-\uFFFFD|\u100000-\u10FFFD\/\?])*)?(?:\#(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@])|[\/\?])*)?\s*$/i,
			week: /^[0-9]{4}-W0*([1-9]|[1-4][0-9]|5[0-3])$/
		},
		error_class: 'validation_error'
	};
	lib.supported = {
		types : {
			text : {
				regex : null,
				message: '',
				validationAttributes : ['required', 'pattern']
			},
			search : {
				regex : null,
				message: '',
				validationAttributes : ['required', 'pattern']
			},
			url : {
				regex : lib.settings.regex.url,
				message: lib.settings.messages.url,
				validationAttributes : ['required', 'pattern']
			},
			tel : {
				regex : null,
				message: '',
				validationAttributes : ['required', 'pattern']
			},
			email : {
				regex : lib.settings.regex.email,
				message: lib.settings.messages.email,
				validationAttributes : ['required', 'pattern', 'multiple']
			},
			password : {
				regex : null,
				message: '',
				validationAttributes : ['required', 'pattern']
			},
			date : {
				regex : null,
				message: '',
				validationAttributes : ['required', 'max', 'min', 'step']
			},
			datetime : {
				regex : null,
				message: '',
				validationAttributes : ['required', 'max', 'min', 'step']
			},
			datetimelocal : {
				regex : null,
				message: '',
				validationAttributes : ['required', 'max', 'min', 'step']
			},
			month : {
				regex : null,
				message: '',
				validationAttributes : ['required', 'max', 'min', 'step']
			},
			week : {
				regex : null,
				message: '',
				validationAttributes : ['required', 'max', 'min', 'step']
			},
			time : {
				regex : null,
				message: '',
				validationAttributes : ['required', 'max', 'min', 'step']
			},
			number : {
				regex: lib.settings.regex.numeric,
				message: lib.settings.messages.numeric,
				validationAttributes : ['required', 'max', 'min', 'step']
			},
			range : {
				regex: lib.settings.regex.numeric,
				message: lib.settings.messages.numeric,
				validationAttributes : ['max', 'min', 'step']
			},
			checkbox : {
				regex: null,
				message: '',
				validationAttributes : ['required']
			},
			radio : {
				regex: null,
				message: '',
				validationAttributes : ['required']
			},
			color : {
				regex: null,
				message: '',
				validationAttributes : []
			},
			file : {
				regex: null,
				message: '',
				validationAttributes : ['required']
			},
			hidden : {
				regex: null,
				message: '',
				validationAttributes : []
			},
			submit : {
				regex: null,
				message: '',
				validationAttributes : []
			},
			image : {
				regex: null,
				message: '',
				validationAttributes : []
			},
			button : {
				regex: null,
				message: '',
				validationAttributes : []
			},
			reset : {
				regex: null,
				message: '',
				validationAttributes : []
			},
			select : {
				regex: null,
				message: '',
				validationAttributes : []
			},
			textarea : {
				regex: null,
				message: '',
				validationAttributes : ['required', 'maxlength']
			}
		},
		attributes : {
			required : {
				message: lib.settings.messages.required,
				validationFunction : validateRequired
			},
			pattern : {
				message: lib.settings.messages.pattern,
				validationFunction : validatePattern
			},
			max : {
				message: lib.settings.messages.maximum,
				validationFunction : validateMax
			},
			min : {
				message: lib.settings.messages.minimum,
				validationFunction : validateMin
			},
			step : {
				message: lib.settings.messages.step,
				validationFunction : validateStep
			},
			multiple : {
				message: "",
				validationFunction : null
			},
			maxlength : {
				message: "",
				validationFunction : null
			}
		}
	}

	/*
	 * Validates every element in a form
	 */
	 
	 function validateElement(element) {
		var message = "";
		var nvTag = element.tagName.toLowerCase();
		var nvType = element.getAttribute("type").replace(/-/, "");
		if(nvTag != 'input') {
			if(lib.supported.types[nvTag]){
				nvType = nvTag;
			} else {
				return message;
			}
		} else if(!lib.supported.types[nvType]) {
			nvType = "text";
		}
		var nvPath = lib.supported.types[nvType];
		var nvRegex = nvPath.regex;
		if(nvRegex != null && element.value.length > 0) {
			if(!nvRegex.test(element.value)){
				message = nvPath.message;
			}
		}
		if(message == "") {
			var nvAttr = nvPath.validationAttributes;
			if(nvAttr.length > 0) {
				for(i=0; i < nvAttr.length; i++) {
					if(message == "") {
						if(element.getAttribute(nvAttr[i]) != null && lib.supported.attributes[nvAttr[i]].validationFunction != null) {
							message = lib.supported.attributes[nvAttr[i]].validationFunction(element);
						}
					}
				}
			}
		}
		return message;
	 }
	
	/*
	 * Create all of the helper validations, for validation logic shared between element types
	 */
	 
	function validateRequired(element) {
		console.info('in val required');
		if (element.getAttribute('required') != null && element.value.length == 0) {
			return lib.settings.messages.required;
		}
		return "";
	}

	function validatePattern(element) {
		if (element.getAttribute('pattern') != null && element.value != "") {
			var regex = RegExp(element.pattern);
			if (!regex.test(element.value)) {
				return lib.settings.messages.pattern;
			}
		}
		return "";
	}
	
	function validateMax(element) {
		var nvMax = element.getAttribute('max');
		if (nvMax != null && element.value > parseFloat(nvMax) && element.value != "") {
			return lib.settings.messages.maximum + " " + nvMax ;
		}
		return "";
	}

	function validateMin(element) {
		if (element.getAttribute('min') != null && element.value < parseFloat(element.getAttribute('min'))) {
			return lib.settings.messages.minimum;
		}
		return "";
	}
	
	function validateStep(element) {
		var min = 0;
		if (element.getAttribute('min') != null) {
			min = parseFloat(element.getAttribute('min'));
		}
		if (element.getAttribute('step') != null && element.getAttribute('step') > 0 && element.value % (parseFloat(element.getAttribute('step')) + min) != 0 && element.value != "") {
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
					message = validateElement(element);
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