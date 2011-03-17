YUI.add("gallery-accordion-horiz-vert",function(B){var F=(0<B.UA.ie&&B.UA.ie<8),H=!(0<B.UA.ie&&B.UA.ie<8),J=(F?1:0);function G(K){if(arguments.length===0){return;}K=K||{};if(B.Lang.isUndefined(K.tabIndex)){K.tabIndex=null;}if(B.Lang.isUndefined(K.horizontal)){K.horizontal=false;}G.superclass.constructor.call(this,K);}function D(){return !B.Lang.isUndefined(B.Anim);}function E(K){return(K&&H&&!B.Lang.isUndefined(B.Anim));}G.NAME="accordion";G.ATTRS={horizontal:{value:false,writeOnce:true},titles:{writeOnce:true},replaceTitleContainer:{value:true,validator:B.Lang.isBoolean},sections:{writeOnce:true},replaceSectionContainer:{value:true,validator:B.Lang.isBoolean},allowAllClosed:{value:false,validator:B.Lang.isBoolean,setter:function(K){this.allow_all_closed=K;return K;}},allowMultipleOpen:{value:false,validator:B.Lang.isBoolean},animateRender:{value:false,writeOnce:true,validator:B.Lang.isBoolean,setter:E},animateInsertRemove:{valueFn:D,validator:B.Lang.isBoolean,setter:E},animateOpenClose:{valueFn:D,validator:B.Lang.isBoolean,setter:E},animateDuration:{value:null,validator:function(K){return(K===null||B.Lang.isNumber(K));}},animateEasing:{value:null,validator:function(K){return(K===null||B.Lang.isFunction(K));}}};G.HTML_PARSER={titles:function(K){return K.all("li div:nth-child(1)");},sections:function(K){return K.all("li div:nth-child(2)");}};var A=B.ClassNameManager.getClassName(G.NAME,"open");var C=B.ClassNameManager.getClassName(G.NAME,"closed");function I(K){B.Event.purgeElement(K,true);while(K.hasChildNodes()){K.removeChild(K.lastChild);}}B.extend(G,B.Widget,{initializer:function(K){this.section_list=[];this.get("allowAllClosed");if(this.get("horizontal")){this.slide_style_name="width";this.slide_size_name="offsetWidth";this.fixed_style_name="height";this.fixed_size_name="offsetHeight";}else{this.slide_style_name="height";this.slide_size_name="offsetHeight";this.fixed_style_name="width";this.fixed_size_name="offsetWidth";}this.after("allowMultipleOpenChange",function(L){if(this.section_list&&this.section_list.length>0&&!L.newVal){this.closeAllSections();}});this.after("allowAllClosedChange",function(L){if(this.section_list&&this.section_list.length>0&&!L.newVal&&this.allSectionsClosed()){this.toggleSection(0);}});},renderUI:function(){this.get("boundingBox").addClass(this.getClassName(this.get("horizontal")?"horiz":"vert"));var N=this.get("titles");if(B.Lang.isString(N)){N=B.all(N);}var O=this.get("sections");if(B.Lang.isString(O)){O=B.all(O);}if(N instanceof B.NodeList&&O instanceof B.NodeList&&N.size()==O.size()){var L=this.get("animateInsertRemove");this.set("animateInsertRemove",this.get("animateRender"));var M=N.size();for(var K=0;K<M;K++){this.appendSection(N.item(K),O.item(K));}this.set("animateInsertRemove",L);}else{if(N instanceof Array&&O instanceof Array&&N.length==O.length){var L=this.get("animateInsertRemove");this.set("animateInsertRemove",this.get("animateRender"));var M=N.length;for(var K=0;K<M;K++){this.appendSection(N[K],O[K]);}this.set("animateInsertRemove",L);}else{}}},getSectionCount:function(){return this.section_list.length;},getTitle:function(K){return this.section_list[K].title;},setTitle:function(K,O){var L=this.section_list[K].title;I(L);var M;if(B.Lang.isString(O)){var M=B.one(O);if(!M){L.set("innerHTML",O);}}else{M=O;}if(M&&this.get("replaceTitleContainer")){var N=L.get("parentNode");N.removeChild(L);N.appendChild(M);this.section_list[K].title=M;M.addClass(this.getClassName("title"));M.addClass(this.section_list[K].open?A:C);}else{if(M){L.appendChild(M);}}if(F){L.setStyle("display",L.get("innerHTML")?"":"none");}},getSection:function(K){return this.section_list[K].content;},setSection:function(K,M){var P=this.section_list[K].content;I(P);var L;if(B.Lang.isString(M)){var L=B.one(M);if(!L){P.set("innerHTML",M);}}else{L=M;}if(L&&this.get("replaceSectionContainer")){var O=P.getStyle("display");var N=P.get("parentNode");N.removeChild(P);N.appendChild(L);this.section_list[K].content=L;L.addClass(this.getClassName("section"));L.addClass(this.section_list[K].open?A:C);L.setStyle("display",O);}else{if(L){P.appendChild(L);}}},_getClip:function(K){return this.section_list[K].clip;},prependSection:function(L,K){return this.insertSection(0,L,K);},appendSection:function(L,K){return this.insertSection(this.section_list.length,L,K);},insertSection:function(M,Q,N){this.fire("beforeInsert",M);var R=B.Node.create("<div/>");R.addClass(this.getClassName("title"));R.addClass(C);var P=B.Node.create("<div/>");P.addClass(this.getClassName("section-clip"));P.setStyle(this.slide_style_name,J+"px");if(this.get("animateOpenClose")){P.setStyle("opacity",0);}var O=B.Node.create("<div/>");O.addClass(this.getClassName("section"));O.addClass(C);O.setStyle("display","none");P.appendChild(O);this.section_list.splice(M,0,{title:R,clip:P,content:O,open:false,anim:null});if(M<this.section_list.length-1){this.get("contentBox").insertBefore(R,this.section_list[M+1].title);}else{this.get("contentBox").appendChild(R);}this.setTitle(M,Q);R=this.section_list[M].title;var S=R.get(this.slide_size_name);if(this.get("animateInsertRemove")){R.setStyle(this.slide_style_name,J+"px");var L={node:R,from:{opacity:0},to:{opacity:1}};L.to[this.slide_style_name]=S;var K=this._createAnimator(L);K.on("end",function(U,T){this.section_list[T].title.setStyle(this.slide_style_name,"auto");},this,M);K.run();}if(N){this.setSection(M,N);O=this.section_list[M].content;}if(M<this.section_list.length-1){this.get("contentBox").insertBefore(P,this.section_list[M+1].title);}else{this.get("contentBox").appendChild(P);}this.fire("insert",M,S);if(!this.allow_all_closed&&this.allSectionsClosed()){this.toggleSection(0);}return{title:R,content:O};},removeSection:function(M){this.fire("beforeRemove",M);function K(Q,P){P[0].removeChild(P[1]);P[0].removeChild(P[2]);}var L=[this.get("contentBox"),this.section_list[M].title,this.section_list[M].clip];if(this.get("animateInsertRemove")){var O={node:this.section_list[M].clip,from:{opacity:1},to:{opacity:0}};
O.to[this.slide_style_name]=J;if(this.section_list[M].open){this._startAnimator(M,O);}O.node=this.section_list[M].title;var N=this._createAnimator(O);N.on("end",K,null,L);N.run();}else{K(null,L);}this.section_list.splice(M,1);if(!this.allow_all_closed&&this.allSectionsClosed()){this.toggleSection(0);}this.fire("remove",M);},findSection:function(L){L=B.Node.getDOMNode(B.one(L));var N=this.section_list.length;for(var K=0;K<N;K++){var O=B.Node.getDOMNode(this.section_list[K].title);var M=B.Node.getDOMNode(this.section_list[K].content);if(L==O||B.DOM.contains(O,L)||L==M||B.DOM.contains(M,L)){return K;}}return false;},isSectionOpen:function(K){return this.section_list[K].open;},openSection:function(K){if(!this.section_list[K].open){this.toggleSection(K);}},closeSection:function(K){if(this.section_list[K].open){this.toggleSection(K);}},allSectionsOpen:function(){var L=this.section_list.length;for(var K=0;K<L;K++){if(!this.section_list[K].open){return false;}}return true;},allSectionsClosed:function(){var L=this.section_list.length;for(var K=0;K<L;K++){if(this.section_list[K].open){return false;}}return true;},toggleSection:function(K){if(!this.section_list[K].open&&!this.get("allowMultipleOpen")){var N=this.allow_all_closed;this.allow_all_closed=true;this.closeAllSections();this.allow_all_closed=N;}else{if(this.section_list[K].open&&!this.allow_all_closed){this.section_list[K].open=false;if(this.allSectionsClosed()){this.section_list[K].open=true;return;}this.section_list[K].open=true;}}function P(T,S){this.section_list[S].clip.setStyle(this.slide_style_name,"auto");this.fire("open",S);}function R(T,S){this.section_list[S].content.setStyle("display","none");this.fire("close",S);}if(!this.section_list[K].open){this.section_list[K].content.setStyle("display","block");this.fire("beforeOpen",K);this.section_list[K].open=true;this.section_list[K].title.replaceClass(C,A);this.section_list[K].content.replaceClass(C,A);var L=this.section_list[K].content.get(this.slide_size_name);if(this.get("animateOpenClose")){var Q={node:this.section_list[K].clip,from:{opacity:0},to:{opacity:1}};Q.to[this.slide_style_name]=L;var O=this._startAnimator(K,Q);O.on("end",P,this,K);}else{var M=this.section_list[K].clip;if(M.getStyle("opacity")=="0"){M.setStyle("opacity",1);}P.call(this,null,K);}}else{this.fire("beforeClose",K);this.section_list[K].open=false;this.section_list[K].title.replaceClass(A,C);this.section_list[K].content.replaceClass(A,C);if(this.get("animateOpenClose")){var Q={node:this.section_list[K].clip,from:{opacity:1},to:{opacity:0}};Q.to[this.slide_style_name]=J;var O=this._startAnimator(K,Q);O.on("end",R,this,K);}else{this.section_list[K].clip.setStyle(this.slide_style_name,J+"px");R.call(this,null,K);}}},openAllSections:function(){if(this.get("allowMultipleOpen")){var L=this.section_list.length;for(var K=0;K<L;K++){if(!this.section_list[K].open){this.toggleSection(K);}}}},closeAllSections:function(){var L=this.section_list.length;var M=true;for(var K=0;K<L;K++){if(this.section_list[K].open){if(!this.allow_all_closed&&M){M=false;}else{this.toggleSection(K);}}}if(!this.allow_all_closed&&M){this.toggleSection(0);}},_createAnimator:function(L){var K=this.get("animateDuration");if(K!==null){L.duration=K;}var M=this.get("animateEasing");if(M!==null){L.easing=M;}return new B.Anim(L);},_startAnimator:function(K,M){var L=this.section_list[K].anim;if(L){L.stop(true);}this.section_list[K].anim=L=this._createAnimator(M);L.on("end",function(O,N,P){if(N<this.section_list.length&&this.section_list[N].anim==P){this.section_list[N].anim=null;}},this,K,L);L.run();return L;}});B.Accordion=G;},"@VERSION@",{requires:["widget","selector-css3"],optional:["anim-base"],skinnable:true});