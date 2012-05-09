YUI.add("gallery-formmgr-css-validation",function(f){f.namespace("FormManager");var c="yiv-required";var a=/(?:^|\s+)yiv-length:\[([0-9]+)?,([1-9][0-9]*)?\](?:\s+|$)/;var b=/(?:^|\s+)yiv-integer(?::\[([-+]?[0-9]+)?,([-+]?[0-9]+)?\])?(?:\s+|$)/;var e=/(?:^|\s+)yiv-decimal(?::\[([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?,([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?\])?(?:\s+|$)/;f.FormManager.integer_value_re=/^[-+]?[0-9]+$/;f.FormManager.decimal_value_re=/^[-+]?(?:[0-9]+\.?|[0-9]*\.[0-9]+)$/;f.FormManager.Strings={validation_error:"Correct errors in the highlighted fields before continuing.",required_string:"This field requires a value.",required_menu:"This field is required. Choose a value from the pull-down list.",length_too_short:"Enter text that is at least {min} characters or longer.",length_too_long:"Enter text that is up to {max} characters long.",length_out_of_range:"Enter text that is {min} to {max} characters long.",integer:"Enter a whole number (no decimal point).",integer_too_small:"Enter a number that is {min} or higher (no decimal point).",integer_too_large:"Enter a number that is {max} or lower (no decimal point).",integer_out_of_range:"Enter a number between or including {min} and {max} (no decimal point).",decimal:"Enter a number.",decimal_too_small:"Enter a number that is {min} or higher.",decimal_too_large:"Enter a number that is {max} or lower.",decimal_out_of_range:"Enter a number between or including {min} and {max}."};function d(g){return(!f.Lang.isUndefined(g)&&g.length>0);}f.FormManager.validateFromCSSData=function(l,h){var k=f.FormManager.Strings;if(l._node){l=l._node;}var o=f.DOM.hasClass(l,c);if(o&&l.value===""){var n=null;if(h&&h.required){n=h.required;}else{if(l.tagName.toLowerCase()=="select"){n=k.required_menu;}else{n=k.required_string;}}return{keepGoing:false,error:n};}else{if(!o&&l.value===""){return{keepGoing:false};}}if(l.className){var g=l.className.match(a);if(g&&g.length){if(d(g[1])&&d(g[2])&&parseInt(g[1],10)>parseInt(g[2],10)){f.error(l.name+" has min_length > max_length",null,"FormManager");}var n=null;var i=(d(g[1])&&g[1]!=="0");if(i&&d(g[2])){n=k.length_out_of_range;}else{if(i){n=k.length_too_short;}else{if(d(g[2])){n=k.length_too_long;}}}if(l.value&&d(g[1])&&l.value.length<parseInt(g[1],10)){if(h&&h.min_length){n=h.min_length;}n=f.substitute(n,{min:parseInt(g[1],10),max:parseInt(g[2],10)});return{keepGoing:false,error:n};}if(l.value&&d(g[2])&&l.value.length>parseInt(g[2],10)){if(h&&h.max_length){n=h.max_length;}n=f.substitute(n,{min:parseInt(g[1],10),max:parseInt(g[2],10)});return{keepGoing:false,error:n};}}var g=l.className.match(b);if(g&&g.length){if(d(g[1])&&d(g[2])&&parseInt(g[1],10)>parseInt(g[2],10)){f.error(l.name+" has min_value > max_value",null,"FormManager");}var j=parseInt(l.value,10);if(l.value&&(!f.FormManager.integer_value_re.test(l.value)||(d(g[1])&&j<parseInt(g[1],10))||(d(g[2])&&j>parseInt(g[2],10)))){var n=null;if(h&&h.integer){n=h.integer;}else{if(d(g[1])&&d(g[2])){n=k.integer_out_of_range;}else{if(d(g[1])){n=k.integer_too_small;}else{if(d(g[2])){n=k.integer_too_large;}else{n=k.integer;}}}}n=f.substitute(n,{min:parseInt(g[1],10),max:parseInt(g[2],10)});return{keepGoing:false,error:n};}}var g=l.className.match(e);if(g&&g.length){if(d(g[1])&&d(g[2])&&parseFloat(g[1])>parseFloat(g[2])){f.error(l.name+" has min_value > max_value",null,"FormManager");}var j=parseFloat(l.value);if(l.value&&(!f.FormManager.decimal_value_re.test(l.value)||(d(g[1])&&j<parseFloat(g[1]))||(d(g[2])&&j>parseFloat(g[2])))){var n=null;if(h&&h.decimal){n=h.decimal;}else{if(d(g[1])&&d(g[2])){n=k.decimal_out_of_range;}else{if(d(g[1])){n=k.decimal_too_small;}else{if(d(g[2])){n=k.decimal_too_large;}else{n=k.decimal;}}}}n=f.substitute(n,{min:parseFloat(g[1],10),max:parseFloat(g[2],10)});return{keepGoing:false,error:n};}}}return{keepGoing:true};};f.FormManager.cleanValues=function(l){var k=false;for(var h=0;h<l.length;h++){var g=l[h];var j=g.type&&g.type.toLowerCase();if(j=="file"){k=true;}else{if(j=="select-multiple"){}else{if(g.value&&!f.DOM.hasClass(g,"yiv-no-trim")){g.value=f.Lang.trim(g.value);}}}}return k;};f.FormManager.status_order=["error","warn","success","info"];f.FormManager.getStatusPrecedence=function(g){for(var h=0;h<f.FormManager.status_order.length;h++){if(g==f.FormManager.status_order[h]){return h;}}return f.FormManager.status_order.length;};f.FormManager.statusTakesPrecedence=function(h,g){return(!h||f.FormManager.getStatusPrecedence(g)<f.FormManager.getStatusPrecedence(h));};},"gallery-2012.05.09-20-27",{requires:["substitute"]});