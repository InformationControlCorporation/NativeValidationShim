/*
 *    Copyright 2012 Information Control Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function(root, undefined) {
	//Set-up settings and other variables.
	var lib = {};
	
	lib.version = '0.9';
	
	lib.settings = {
		messages: {
			color: "The value must be a valid hexadecimal color code",
			date: "Invalid date format",
			datetime: "Invalid date time format",
			email: "The value must be a valid email address",
			emailMulti: "The value must be a list of one or more valid email addresses",
			maximum: "The value is too high",
			month: "Must be a valid month",
			minimum: "The value is too low",
			numeric: "The input must be a number",
			pattern: "Invalid input",
			required:  "This is a required field",
			step: "The value is not a valid step",
			time: "Invalid time format",
			url: "Must be a valid url",
			week: "Must be a valid week",
            maxlength: "Value has too many characters"
		},
		regex: { //Date formats specified in http://tools.ietf.org/html/rfc3339#section-5.6
			color: /^#([a-f0-9]{3}|[a-f0-9]{6})$/i, //A # followed by 3 or 6 hexadecimal characters
			date: /^[0-9]{4}-(0[1-9]|1[0-2])-(([0-2][0-9])|(3[0-1]))$/, //e.g. 2009-12-31
			datetime: /^[0-9]{4}-(0[1-9]|1[0-2])-(([0-2][0-9])|(3[0-1]))T[0-2][0-9]:[0-5][0-9]:[0-5][0-9](\.[0-9])?(Z|([+-][0-2][0-9]:[0-5][0-9]))$/, //e.g. a valid date, as defined above, plus a "T" plus a valid time, as defined below, and a timezone ("Z" or an offset)
			datetimelocal: /^[0-9]{4}-(0[1-9]|1[0-2])-(([0-2][0-9])|(3[0-1]))T[0-2][0-9]:[0-5][0-9]:[0-5][0-9](\.[0-9])?$/, //datetime, but without the timezone specifier ("Z" or an offset)
			email: /^[a-zA-Z0-9.!#$%&'*+/=?\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			emailMulti: /^(([a-zA-Z0-9.!#$%&'*+/=?\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*),[\s]*)*[a-zA-Z0-9.!#$%&'*+/=?\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			month: /^[0-9]{4}-(0[1-9]|1[0-2])$/, //A four-digit year and then the month number. e.g. 2010-04 for April 2010
			numeric: /^([-]?[0-9]+(\.?[0-9]*)?([eE]?[\+-]?[0-9]*)?)$/,
			time: /^[0-2][0-9]:[0-5][0-9]:[0-5][0-9](\.[0-9])?$/,  //HH:MM:SS followed by an optional second fraction
			url: /^\s*[a-z](?:[-a-z0-9\+\.])*:(?:\/\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:])*@)?(?:\[(?:(?:(?:[0-9a-f]{1,4}:){6}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|::(?:[0-9a-f]{1,4}:){5}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:[0-9a-f]{1,4}:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|v[0-9a-f]+[-a-z0-9\._~!\$&\'\(\)\*\+,;=:]+)\]|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}|(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=@])*)(?::[0-9]*)?(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))*)*|\/(?:(?:(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))+)(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))*)*)?|(?:(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))+)(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))*)*|(?!(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@])))(?:\?(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@])|[\uE000-\uF8FF\uF0000-\uFFFFD|\u100000-\u10FFFD\/\?])*)?(?:\#(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@])|[\/\?])*)?\s*$/i,
			week: /^[0-9]{4}-W0*([1-9]|[1-4][0-9]|5[0-3])$/ //A four-digit year and then the week number. e.g. 2010-W37 for the 37th week of 2010. Values are 1-52 (or 53 for some years)
		},
		error_class: 'validation_error'
	};
	
	lib.supported = {
		types : {
			text : {
				regex : null,
				message: '',
				validationAttributes : ['required', 'pattern'],
                defer : null
			},
			search : {
				regex : null,
				message: '',
				validationAttributes : ['required', 'pattern'],
                defer : null
			},
			url : {
				regex : lib.settings.regex.url,
				message: lib.settings.messages.url,
				validationAttributes : ['required', 'pattern'],
                defer : null
			},
			tel : {
				regex : null,
				message: '',
				validationAttributes : ['required', 'pattern'],
                defer : null
			},
			email : {
				regex : lib.settings.regex.email,
				message: lib.settings.messages.email,
				validationAttributes : ['required', 'multiple', 'pattern'],
                defer : 'multiple'
			},
			password : {
				regex : null,
				message: '',
				validationAttributes : ['required', 'pattern'],
                defer : null
			},
			date : {
				regex : lib.settings.regex.date,
				message: lib.settings.messages.date,
				validationAttributes : ['required', 'max', 'min', 'step'],
                defer : null
			},
			datetime : {
				regex : lib.settings.regex.datetime,
				message: lib.settings.messages.datetime,
				validationAttributes : ['required', 'max', 'min', 'step'],
                defer : null
			},
			datetimelocal : {
				regex : lib.settings.regex.datetimelocal,
				message: lib.settings.messages.datetime,
				validationAttributes : ['required', 'max', 'min', 'step'],
                defer : null
			},
			month : {
				regex : lib.settings.regex.month,
				message: lib.settings.messages.month,
				validationAttributes : ['required', 'max', 'min', 'step'],
                defer : null
			},
			week : {
				regex : lib.settings.regex.week,
				message: lib.settings.messages.week,
				validationAttributes : ['required', 'max', 'min', 'step'],
                defer : null
			},
			time : {
				regex : lib.settings.regex.time,
				message: lib.settings.messages.time,
				validationAttributes : ['required', 'max', 'min', 'step'],
                defer : null
			},
			number : {
				regex: lib.settings.regex.numeric,
				message: lib.settings.messages.numeric,
				validationAttributes : ['required', 'max', 'min', 'step'],
                defer : null
			},
			range : {
				regex: lib.settings.regex.numeric,
				message: lib.settings.messages.numeric,
				validationAttributes : ['max', 'min', 'step'],
                defer : null
			},
			checkbox : {
				regex: null,
				message: '',
				validationAttributes : ['required'],
                defer : null
			},
			radio : {
				regex: null,
				message: '',
				validationAttributes : ['required'],
                defer : null
			},
			color : {
				regex: lib.settings.regex.color,
				message: lib.settings.messages.color,
				validationAttributes : [],
                defer : null
			},
			file : {
				regex: null,
				message: '',
				validationAttributes : ['required'],
                defer : null
			},
			hidden : {
				regex: null,
				message: '',
				validationAttributes : [],
                defer : null
			},
			submit : {
				regex: null,
				message: '',
				validationAttributes : [],
                defer : null
			},
			image : {
				regex: null,
				message: '',
				validationAttributes : [],
                defer : null
			},
			button : {
				regex: null,
				message: '',
				validationAttributes : [],
                defer : null
			},
			reset : {
				regex: null,
				message: '',
				validationAttributes : [],
                defer : null
			},
			select : {
				regex: null,
				message: '',
				validationAttributes : [],
                defer : null
			},
			textarea : {
				regex: null,
				message: '',
				validationAttributes : ['required', 'maxlength'],
                defer : validateMaxlength
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
				validationFunction : validateMultiple
			},
			maxlength : {
				message: "",
				validationFunction : validateMaxlength
			}
		}
	}

	// Validates every element in a form
	function validateElement(element) {
		var message = "";
		var nvTag = element.tagName.toLowerCase();
		var nvType = element.getAttribute("type").replace(/-/, "").toLowerCase();
		if (nvTag != 'input') {
			if (lib.supported.types[nvTag]){
				nvType = nvTag;
			}
			else {
				return message;
			}
		}
		else if (!lib.supported.types[nvType]) {
			nvType = "text";
		}
		
		var nvPath = lib.supported.types[nvType];
		var nvRegex = nvPath.regex;
        var nvDefer = nvPath.defer;
        var nvDeferedHit = false;
		if (nvDefer == null) {
           if (nvRegex != null && element.value != "") {
                if(!nvRegex.test(element.value)) {
                    message = nvPath.message;
                }
			}
        }
		if (message == "") {
			var nvAttr = nvPath.validationAttributes;
			if (nvAttr.length > 0) {
				for(i=0; i < nvAttr.length; i++) {
					if (message == "") {
                        if (element.getAttribute(nvAttr[i]) != null && lib.supported.attributes[nvAttr[i]].validationFunction != null) {
                            if(nvAttr[i] == nvDefer) {
                                nvDeferedHit = true;
                            }
							message = lib.supported.attributes[nvAttr[i]].validationFunction(element);
						}
					}
				}
			}
		}
		if (nvDefer != null && !nvDeferedHit && message == "") {
            if (nvRegex != null && element.value != "") {
                if(!nvRegex.test(element.value)) {
                    message = nvPath.message;
                }
			}
        }
		return message;
	}

	/*
	 * Create all of the helper validations, for validation logic shared between element types
	 */
     
	function validateMaxlength(element) {
        var nvMaxLen = parseFloat(element.getAttribute('maxlength'));
        if(element.value.length > nvMaxLen && element.value != null) {
            return lib.settings.messages.maxlength;
        }
    }
    
    function validateMultiple(element) {
        var regex;
        var msg;
        if(element.getAttribute('type').toLowerCase() == 'email') {
            regex = lib.settings.regex.emailMulti;
            msg = lib.settings.messages.emailMulti;
        }
        console.info(regex);
        console.info(msg);
        if (element.getAttribute('multiple') != null && element.value != "" ) {
			if(!regex.test(element.value)) {
                console.info(msg);
                return msg;
            }
		}
		return "";
	}
      
	function validateRequired(element) {;
        if (element.getAttribute('required') != null && element.value.length == 0) {
			return lib.settings.messages.required;
		}
		
		return "";
	}

	function validatePattern(element) {
		var nvPattern = element.getAttribute('pattern');
		
		if (nvPattern != null && element.value != "") {
			var regex = RegExp(nvPattern);
			if (!regex.test(element.value)) {
				return lib.settings.messages.pattern;
			}
		}
		
		return "";
	}
	
	function validateMax(element) {
		var nvMax = getComparableValue(element.getAttribute('max'), element.getAttribute('type'));
		var nvVal = getComparableValue(element.value, element.getAttribute('type'));
		
		if (nvMax != null && element.value != "" && nvVal > nvMax) {
			return lib.settings.messages.maximum + " " + nvMax ;
		}
		
		return "";
	}

	function validateMin(element) {
		var nvMin = getComparableValue(element.getAttribute('min'), element.getAttribute('type'));
		var nvVal = getComparableValue(element.value, element.getAttribute('type'));
		
		if (nvMin != null && element.value != "" && nvVal < nvMin) {
			return lib.settings.messages.minimum + " " + nvMin;
		}
		
		return "";
	}
	
	function validateStep(element) {
		var nvStep = parseFloat(element.getAttribute('step'));
		var nvMin = 0;
		
		//Normalize step on date elements into milliseconds (base representation of a date)
		switch (element.getAttribute('type')) {
			case "date":
				nvStep = nvStep * 24 * 60 * 60 * 1000; //Unit of measure is a day
				break;
			case "datetime":
			case "datetime-local":
				nvStep = nvStep * 60 * 1000; //Unit of measure is a minute
				break;
			case "time":
				nvStep = nvStep * 1000; //Unit of measure is seconds
				break;
			case "week":
				nvStep = nvStep * 7 * 24 * 60 * 60 * 1000; //Unit of measure is a week
				break;
			case "month": 
				//Months are variable in terms of seconds, keep abstracted at the number of months
				break;
			case "number":
			case "range":
			default:
				//These are good as-is
				break;
		}
		
		if (element.getAttribute('min') != null) {
			nvMin = getComparableValue(element.getAttribute('min'));
		}
		
		if (nvStep != null && nvStep > 0 && element.value % (nvStep + nvMin) != 0 && element.value != "") {
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
	
	function getComparableValue(val, type) {
		switch (type) {
			case "month": // e.g. 2009-12 for December, 2009
				//Months are variable in terms of seconds, keep abstracted at the number of months since the Unix epoch
				var dateVal = new Date(val);
				return (dateVal.getUTCYear() - 1970) * 12 + dateVal.getUTCMonth();
				break;
			case "date": // e.g. 2009-12-31 for December 31, 2009
			case "datetime": // e.g. 2009-12-31 18:48 for December 31, 2009 2:48pm
			case "datetime-local": // e.g. 2009-12-31 18:48 for December 31, 2009 2:48pm
			case "week": // e.g. 2009-W52 for the 52nd week (1-based) of 2009
				var dateVal = new Date(val);
				return dateVal.getMilliseconds();
				break;
			case "time": // e.g. 18:48:23 for 23 seconds after 2:48pm 
				var dateVal = new Date('January 1, 2001 ' + val); //dummy up the date, since the time is all that matters
				return dateVal.getMilliseconds();
				break;
			case "number":
			case "range":
			default:
				return parseFloat(val);
				break;
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
				return allowSubmit;
			};
		}

		//Run a pre-existing load event.
		old_load();
	};

	//Expose the library to the root namespace.
	root['NativeValidationShim'] = lib;
}(this));