YUI.add("gallery-matrix-background",function(e,t){"use strict";function n(e){this.timer={},this.cell_on=[],n.superclass.constructor.call(this,e)}function u(e,t){return e+Math.floor(Math.random()*(t-e))}function a(){var e=this.get("charRange");return[e[0].charCodeAt(0),e[1].charCodeAt(0)]}function f(t,n){return e.Node.getDOMNode(this.table).firstChild.childNodes[n].childNodes[t]}function l(t){c.call(this,t),this.timer[t]=e.later(r[t],this,function(){this.fire(t)},null,!0)}function c(e){this.timer[e]&&(this.timer[e].cancel(),delete this.timer[e])}function h(){this.table&&this.table.destroy();var t=a.call(this),n=String.fromCharCode(t[0]);this.container.set("innerHTML","<table><tr><td>"+n+"</td></tr></table>");var r=this.container.one("table");if(this.get("computeWidestChar")){var i=t[0],s=r.totalWidth(),o=t[1],u=e.Node.getDOMNode(this.container).getElementsByTagName("td")[0];for(n=i+1;n<=o;n++){u.innerHTML=String.fromCharCode(n);var f=r.totalWidth();f>s&&(s=f,i=n)}u.innerHTML=n=String.fromCharCode(i)}var f=Math.ceil(this.container.totalWidth()/r.totalWidth()),c=Math.ceil(this.container.totalHeight()/r.totalHeight()),h="<tr>";for(var d=0;d<f;d++)h+="<td>&nbsp;</td>";h+="</tr>";var v="";for(var m=0;m<c;m++)v+=h;v+="<tr>";for(var d=0;d<f;d++)v+="<td>"+n+"</td>";v+="</tr>",r.setContent("<tbody>"+v+"</tbody>"),this.table=r,this.row_count=c,this.col_count=f,this.drop_active=0,this.drop_col=[];for(var g=0;g<f;g++)this.drop_col.push({active:!1});l.call(this,"drop"),p.call(this),l.call(this,"spin")}function p(){this.spin_count=Math.floor(this.col_count*this.get("spinFraction")),this.spin_active=0,this.spin=[];for(var e=0;e<this.spin_count;e++)this.spin.push({active:!1})}function d(e){var t=this.drop_col[e];t.active=!0,t.y=Math.random()<.5?u(0,this.row_count-i):0,Math.random()<.5?t.y_max=t.y+u(i,this.row_count-t.y-1):t.y_max=this.row_count-1;if(Math.random()<.2)t.c="&nbsp;";else{var n=a.call(this);t.c=String.fromCharCode(u(n[0],n[1]+1))}}function v(){var e=this.col_count,t=a.call(this);for(var n=0;n<e;n++){var r=this.drop_col[n];r.active&&r.y>=r.y_max?(r.active=!1,this.drop_active--):(r.c!="&nbsp;"&&(r.c=String.fromCharCode(u(t[0],t[1]+1))),r.y++)}if(this.drop_active<this.col_count){var i=0;do{var n=u(0,this.col_count);i++}while(this.drop_col[n].active&&i<this.col_count);this.drop_col[n].active||(d.call(this,n),this.drop_active++)}g.call(this)}function m(){if(this.spin_active<this.spin_count&&u(0,100)===0){var e=0;do{var t=u(0,this.spin_count);e++}while(this.spin[t].active&&e<this.spin_count);if(!this.spin[t].active){var n=u(0,this.col_count),r=u(0,this.row_count);this.spin[t]={active:!0,counter:u(s,o),cell:f.call(this,n,r)},this.spin_active++}}var i=this.spin_count,l=a.call(this);for(var t=0;t<i;t++){var c=this.spin[t];c.active&&c.counter<=0?(c.active=!1,c.cell=null,this.spin_active--):c.active&&(c.c=String.fromCharCode(u(l[0],l[1]+1)),c.counter--)}g.call(this)}function g(){var t=this.cell_on.length;for(var n=0;n<t;n++)e.DOM.removeClass(this.cell_on[n],"on");this.cell_on=[];var t=this.col_count;for(var n=0;n<t;n++){var r=this.drop_col[n];if(r.active){var i=f.call(this,n,r.y);e.DOM.addClass(i,"on"),this.cell_on.push(i),i.innerHTML=r.c}}var t=this.spin_count;for(var n=0;n<t;n++){var s=this.spin[n];s.active&&(e.DOM.addClass(s.cell,"on"),this.cell_on.push(s.cell),s.cell.innerHTML=s.c)}}function y(){this.get("monospace")?this.container.addClass("monospace"):this.container.removeClass("monospace")}function b(){if(this.is_body)this.container.setStyles({width:e.DOM.winWidth()+"px",height:e.DOM.winHeight()+"px"});else{var t=this.get("host");this.container.setStyles({width:t.getStyle("width"),height:t.getStyle("height")})}h.call(this)}n.NAME="MatrixBackgroundPlugin",n.NS="matrix",n.ATTRS={charRange:{value:["\u30a1","\u30fa"],validator:function(t){return e.Lang.isArray(t)&&t.length==2&&t[0].length==1&&t[1].length==1&&t[0]<t[1]}},monospace:{value:!1,validator:e.Lang.isBoolean},computeWidestChar:{value:!1,validator:e.Lang.isBoolean},spinFraction:{value:.2,validator:function(e){return 0<=e&&e<=1}}};var r={spin:10,drop:80},i=3,s=300,o=800;e.extend(n,e.Plugin.Base,{initializer:function(t){var n=this.get("host");n.removeClass("yui3-matrixbkgd-loading"),this.container=e.Node.create('<div class="yui3-matrixbkgd"></div>'),n.append(this.container),y.call(this),this.after("charRangeChange",h),this.after("monospaceChange",y),this.after("spinFractionChange",p),this.on("drop",v),this.on("spin",m),n==e.one("body")&&(this.is_body=!0,e.on("windowresize",b,n,this)),this.afterHostMethod("setStyle",function(e,t){(e=="width"||e=="height")&&b.call(this)}),this.afterHostMethod("setStyles",function(e){(e.width||e.height)&&b.call(this)}),this.afterHostMethod("addClass",b),this.afterHostMethod("removeClass",b),this.afterHostMethod("replaceClass",b),b.call(this)},destructor:function(){c.call(this,"drop"),c.call(this,"spin"),this.table&&this.table.destroy()}}),e.namespace("Plugin"),e.Plugin.MatrixBackground=n,e.mix(e.Plugin.MatrixBackground,{rnd:u,startTimer:l,stopTimer:c,getCharacterRange:a})},"@VERSION@",{skinnable:"true",requires:["node-pluginhost","plugin","gallery-dimensions","node-screen","event-resize"]});