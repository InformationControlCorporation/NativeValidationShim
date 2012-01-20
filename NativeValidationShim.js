(function(root, undefined) {
	//Set-up settings and other variables.
	var lib = {};
	
	lib.version = '0.0';
	lib.settings = {
		messages: {
			pattern: "Invalid input",
			required:  "This is a required field"
		},
		error_class: 'validation_error'
	};
	//Create all of the validation rules.
	
	function validateText(element) {
		var message = ""; 
		
		message = validatePattern(element);
		if (message != '') return message;
		
		return "";
	}
	
	function validatePattern(element) {
		return "";
	}
	
	//The required attribute works with the following <input> types: text, search, url, telephone, email, password, date pickers, number, checkbox, radio, and file.
	function validateRequired(element) {
		if (element.tagName == 'input' || element.tagName == 'textarea') { //For input element types.  Other types, e.g. select,  need to be handled separately, if at all.
			if(element.value.length <= 0){
				return lib.settings.messages.required;
			}
		}
		
		return "";
	}
	
	//Helper functions
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
					
					//Required first
					if (element.getAttribute('required') != null) {
						if (message == "") message = validateRequired(element);
					}
					
					//Then element-specific types
					switch (element.type) {
						case "hidden":
						case "submit":
							break; //Don't validate these.
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