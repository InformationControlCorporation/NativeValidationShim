HTML5 Native Validation Shim
======================

**Purpose**

The new HTML specification includes provisions for native browser validation of
form elements, saving hours of development effort from writing JavaScript
validations for each element.  However, many users at home and especially
in the corporate environment are still using older browers that have incomplete
or nonexistent support for these new form element types and attributes,
which hampers the ability for developers to use these new labor-saving
features.  This library is meant to shim that deficiency, so the new standards
can be used on old browsers.

The goal of the library is to replicate native browser validation according to
the HTML 5 specification, no more, no less.

**Usage**

Just include the NativeValiationShim.js file in your head and start using the
new form types.  It's as easy as that.

Validation errors are created in the DOM as span elements with the
"validation_error" class applied. An example stylesheet is included to
show a likely method of styling the errors.

**Change Log**

*v0.9*

Support for all input elements defined in HTML 5 and support for all attributes
aside from novalidate and formnovalidate.

*v0.0*

Hello World