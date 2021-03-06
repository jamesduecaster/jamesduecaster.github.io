/**
 * EY Digital Tax Guide - scenario - 2016 edition JavaScript
 * last update: 20 Oct 2016 12:34 PM - JD


 * Analytics 2016-08-29
 */

 var Analytics={PDF:{Category:"PDFs",Action:"Download"},SHARE:{Category:"Social share",Action:"Share"},VIDEO:{Category:"Video",Action:"Play"},INFOGRAPHIC:{Category:"Infographic",Action:"View"},READMORE:{Category:"ReadMore",Action:"Read"},CONNECT:{Category:"Connect with us",Action:"Connect"},WEBCAST:{Category:"Webcast",DefaultAction:"Register or watch",RegisterAction:"Register",WatchLiveAction:"Watch live",WatchOndemandAction:"Watch on-demand"},LANGUAGE:{Category:"Language",Action:"Switch"},SECTION:{Category:"Section",
 Action:"Open"},TOPIC:{Category:"Topic",Action:"Select"},SCROLL:{Category:"View",Action:"Scroll"},CONTACTUS:{Category:"ContactUs",Action:"Name"},TWITTERHASH:{Category:"Twitter HashTag",Action:"Hash search"},OUTBOUND:{Category:"Outbound",Action:"click"},RELATEDLINK:{Category:"Related",Action:"RelatedClick"},IOM:{Category:"IOM",Action:"Navigate"},EYUSER:{Category:"EY user",Action:"EY user"},TEST_PROPERTY:"UA-39529843-6",CLASSIC:"classic",UNIVERSAL:"universal",SOCIAL:{FACEBOOK:"facebook",TWITTER:"twitter",
 LINKEDIN:"linkedin",GOOGLE:"google",STUMBLEUPON:"stumbleupon",DIGG:"digg"},isProduction:-1==location.href.indexOf("localhost")&&-1==location.href.indexOf("file:///C:")&&-1==location.href.indexOf("echannelprpvw.iweb"),accountType:null,trackHash:!1,AddProperty:function(a,b,c){b=null==b?null==Analytics.accountType?Analytics.CLASSIC:Analytics.accountType:b;c=null==c?"ey.com":c;if(b==Analytics.CLASSIC)Analytics.isProduction&&null==Analytics.accountType&&(Analytics.accountType=b,_gaq.push(["_setAccount",
 a]),Analytics.TrackPageView(),ga=document.createElement("script"),ga.type="text/javascript",ga.async=!0,ga.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js",b=document.getElementsByTagName("script")[0],b.parentNode.insertBefore(ga,b));else if(b==Analytics.UNIVERSAL&&Analytics.isProduction)if(null==Analytics.accountType){Analytics.accountType=b;window.GoogleAnalyticsObject="ga";ga=function(){(ga.q=ga.q||[]).push(arguments)};ga.l=1*new Date;b=document.createElement("script");
 var d=document.getElementsByTagName("script")[0];b.async=1;b.src="//www.google-analytics.com/analytics.js";d.parentNode.insertBefore(b,d);ga("create",a,c);Analytics.TrackPageView()}else"function"==typeof ga&&(ga("create",a,c),ga("send","pageview"))},AddAccount:function(a,b,c){Analytics.AddProperty(a,b,c)},AddToken:function(a,b,c){Analytics.AddProperty(a,b,c)},AddUniversalProperty:function(a,b){Analytics.AddProperty(a,Analytics.UNIVERSAL,b)},TrackPageView:function(){Analytics.accountType==Analytics.CLASSIC?
 Analytics.trackHash?_gaq.push(["_trackPageview",location.pathname+location.search+location.hash]):_gaq.push(["_trackPageview"]):Analytics.accountType==Analytics.UNIVERSAL&&ga&&(Analytics.trackHash?ga("send","pageview",location.pathname+location.search+location.hash):ga("send","pageview"))},TrackEvent:function(a,b,c,d){if(Analytics.isProduction){null==b&&(b="clicked");try{Analytics.accountType==Analytics.CLASSIC?_gaq.push(["_trackEvent",a,b,c,d]):Analytics.accountType==Analytics.UNIVERSAL&&ga("send",
 "event",a,b,c,d)}catch(e){}}},SetCustomVar:function(a,b,c,d){Analytics.accountType==Analytics.CLASSIC&&_gaq.push(["_setCustomVar",a,b,c,d])},TrackSocialInteraction:function(a,b,c){ga("send","social",a,b,c)},EnableHashTracking:function(){Analytics.trackHash=!0;window.onhashchange=function(a){Analytics.TrackPageView()}},TestMode:function(){Analytics.isProduction=!0},TrackAll:function(){0==jQuery.isReady?$(document).ready(function(){Analytics.TrackAll()}):(Analytics.TrackPDFs(),Analytics.TrackSocialShare(),
 Analytics.TrackConnectWithUs())},TrackPDFs:function(){0==jQuery.isReady?$(document).ready(function(){Analytics.TrackPDFs()}):$('a[href*=".pdf"]').click(function(){try{var a=$(this).attr("href"),a=a.substring(Math.max(0,a.lastIndexOf("/")+1));Analytics.TrackEvent(Analytics.PDF.Category,Analytics.PDF.Action,a)}catch(b){}})},TrackSocialShare:function(){0==jQuery.isReady?$(document).ready(function(){Analytics.TrackSocialShare()}):Analytics.accountType==Analytics.CLASSIC?$(".socialshare a").click(function(){Analytics.TrackEvent(Analytics.SHARE.Category,
 Analytics.SHARE.Action,$(this).attr("title"))}):Analytics.accountType==Analytics.UNIVERSAL&&$(".socialshare a").click(function(){"Facebook"==$(this).attr("title")?Analytics.TrackSocialInteraction(Analytics.SOCIAL.FACEBOOK,Analytics.SHARE.Action,null):"Twitter"==$(this).attr("title")?Analytics.TrackSocialInteraction(Analytics.SOCIAL.TWITTER,Analytics.SHARE.Action,null):"Linkedin"==$(this).attr("title")?Analytics.TrackSocialInteraction(Analytics.SOCIAL.LINKEDIN,Analytics.SHARE.Action,null):"Google+"==
 $(this).attr("title")?Analytics.TrackSocialInteraction(Analytics.SOCIAL.GOOGLE,Analytics.SHARE.Action,null):"Digg"==$(this).attr("title")?Analytics.TrackSocialInteraction(Analytics.SOCIAL.DIGG,Analytics.SHARE.Action,null):"Stumbleupon"==$(this).attr("title")&&Analytics.TrackSocialInteraction(Analytics.SOCIAL.STUMBLEUPON,Analytics.SHARE.Action,null)})},TrackConnectWithUs:function(){0==jQuery.isReady?$(document).ready(function(){Analytics.TrackConnectWithUs()}):$(".connectwithus a").click(function(){Analytics.TrackEvent(Analytics.CONNECT.Category,
 Analytics.CONNECT.Action,$(this).attr("title"))})},TrackAnchorLink:function(a){Analytics.TrackEvent(window.location.hash)},TrackVideoPlay:function(a){Analytics.TrackEvent(Analytics.VIDEO.Category,Analytics.VIDEO.Action,String(a))},TrackInfographic:function(a){Analytics.TrackEvent(Analytics.INFOGRAPHIC.Category,Analytics.INFOGRAPHIC.Action,a)},TrackReadMore:function(a){Analytics.TrackEvent(Analytics.READMORE.Category,Analytics.READMORE.Action,a)},TrackSection:function(a){Analytics.TrackEvent(Analytics.SECTION.Category,
 Analytics.SECTION.Action,a)},TrackTopic:function(a){Analytics.TrackEvent(Analytics.TOPIC.Category,Analytics.TOPIC.Action,a)},TrackWebcast:function(a,b){null==b&&(b=Analytics.WEBCAST.Action);Analytics.TrackEvent(Analytics.WEBCAST.Category,b,a)},TrackLanguage:function(a){Analytics.TrackEvent(Analytics.LANGUAGE.Category,Analytics.LANGUAGE.Action,a)},TrackContactUs:function(a){Analytics.TrackEvent(Analytics.CONTACTUS.Category,Analytics.CONTACTUS.Action,a)},TrackTwitterHash:function(a){Analytics.TrackEvent(Analytics.TWITTERHASH.Category,
 Analytics.TWITTERHASH.Action,a)},TrackOutboundLink:function(a,b){var c=$(a).attr("href");null!=c&&0==c.indexOf("http")&&(c=$(a).text(),null!=c&&0<c.length&&Analytics.TrackEvent(Analytics.OUTBOUND.Category,"click",(null!=b?b+": ":"")+c))},TrackRelatedLink:function(a){Analytics.TrackEvent(Analytics.RELATEDLINK.Category,Analytics.RELATEDLINK.Action,a)},TrackLink:function(a,b,c){},TrackIOMNavigate:function(a,b){var c;if(null!=b)c=b;else{c=null!=a&&null!=a.childNodes&&0<a.childNodes.length?a.childNodes[0].nodeValue:
 $(a).text();if(null==c||""==c)c=$(a).data("label");if(null==c||""==c)c=$(a).text()}Analytics.TrackEvent(Analytics.IOM.Category,Analytics.IOM.Action,c)}},_gaq=_gaq||[],ga=null;


/*
 * jQuery hashchange event, v1.4, 2013-11-29
 * https://github.com/georgekosmidis/jquery-hashchange
 */

 (function(e,t,n){"$:nomunge";function f(e){e=e||location.href;return"#"+e.replace(/^[^#]*#?(.*)$/,"$1")}var r="hashchange",i=document,s,o=e.event.special,u=i.documentMode,a="on"+r in t&&(u===n||u>7);e.fn[r]=function(e){return e?this.bind(r,e):this.trigger(r)};e.fn[r].delay=50;o[r]=e.extend(o[r],{setup:function(){if(a){return false}e(s.start)},teardown:function(){if(a){return false}e(s.stop)}});s=function(){function p(){var n=f(),i=h(u);if(n!==u){c(u=n,i);e(t).trigger(r)}else if(i!==u){location.href=location.href.replace(/#.*/,"")+i}o=setTimeout(p,e.fn[r].delay)}var s={},o,u=f(),l=function(e){return e},c=l,h=l;s.start=function(){o||p()};s.stop=function(){o&&clearTimeout(o);o=n};var d=function(){var e,t=3,n=document.createElement("div"),r=n.getElementsByTagName("i");while(n.innerHTML="<!--[if gt IE "+ ++t+"]><i></i><![endif]-->",r[0]);return t>4?t:e}();d&&!a&&function(){var t,n;s.start=function(){if(!t){n=e.fn[r].src;n=n&&n+f();t=e('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){n||c(f());p()}).attr("src",n||"javascript:0").insertAfter("body")[0].contentWindow;i.onpropertychange=function(){try{if(event.propertyName==="title"){t.document.title=i.title}}catch(e){}}}};s.stop=l;h=function(){return f(t.location.href)};c=function(n,s){var o=t.document,u=e.fn[r].domain;if(n!==s){o.title=i.title;o.open();u&&o.write('<script>document.domain="'+u+'"</script>');o.close();t.location.hash=n}}}();return s}()})(jQuery,this)


 /*
  * Integrated Online Messaging 2016-09-21
  * Requires: jQuery, analytics
  */

var internalContent=internalContent||{},IOM=function(){return{active:!0,internalTestCompleted:!1,isEY:null,page:null,area:null,countryCode:null,internalContentSymbol:"internalContent",navRendered:!1,postRenderCallback:null,navNotice:" <span><br/>(This tab viewable to EY professionals only)</span>",shareNotice:"<h3>EY users, share this content:</h3>",buildBrandNotice:"<p>Build your personal brand by sharing these market insights with your professional networks.</p>",emailNotice:'<img alt="email button" src="http://cdn.ey.com/assets/images/email-button.png"> Email this report to your contacts</a></p>',
GLOBAL_TITLE:" - EY - Global",init:function(b,a,d,e,f){$("html > head").append("<style>section.iom { display: none; } .iom div { border: 3px solid #00a3ae !important; padding: 3px; } .iom h3 { color: white !important; background-color: #00a3ae !important; padding: 3px; } .iom p.email { margin-left: 20px; } .iom p.twitter { margin-left: 20px; } .iom p.linkedin { margin-left: 20px; } a.iom { color: white !important; background-color: #00a3ae !important; padding: 3px; } #featuremenu li.iom a { color: white !important; background-color: #00a3ae !important; } #featuremenu li.iom a:hover { color: black !important; background-color: #00a3ae !important; } #featuremenu li.iom span { color: white !important; font-size: 70% !important; } @media print { .iom { display: none !important; } } </style>");
IOM.pageName=null!=a?a:null!=location&&null!=location.pathname?location.pathname.substring(location.pathname.lastIndexOf("/")+1):null;IOM.area=d;IOM.countryCode=e;IOM.postRenderCallback=f;IOM.active?$.getScript(b).done(IOM.render).fail(IOM.fail):IOM.fail()},render:function(){if(IOM.active){IOM.isEY=!0;IOM.internalTestCompleted=!0;try{internalContent.navLinks&&0==IOM.navRendered&&$.each(internalContent.navLinks,function(b,a){null==a||a.area!=IOM.area&&null!=a.area&&""!=a.area||$("#featuremenu li:last").after('<li class="iom"><a onclick="Analytics.TrackIOMNavigate(this); return(true)" href="'+
a.url+'" target="internal">'+a.name+IOM.navNotice+"</a></li>");IOM.navRendered=!0});var b=IOM.getItemByPropName(internalContent.content,IOM.pageName);if(null!=b){var a="",d=!1;null!=b.email&&null!=b.email.url&&(a+='<p class="email"><a href="#" onclick="IOM.shareEmail(this, \''+b.email.url+"'); return(false)\">"+IOM.emailNotice);null!=b.twitter&&(a+='<p class="twitter"><a href="#" onclick="IOM.shareTwitter(this, \''+b.twitter.url+"', '"+b.twitter.handle+'\'); return(false)" title="Twitter"><img alt="Twitter button" src="http://cdn.ey.com/assets/images/twitter-button.png"> '+
b.twitter.tweet+"</a></li></ul>",d=!0);null!=b.linkedin&&(a+='<p class="linkedin"><a href="#" onclick="IOM.shareLinkedIn(this, \''+b.linkedin.url+'\'); return(false)" title="LinkedIn"><img alt="LinkedIn button" src="http://cdn.ey.com/assets/images/linkedin-button.png"> '+b.linkedin.post+"</a></li></ul>",d=!0);if(0<a.length){var e='<section class="iom" id="EYShareOptions"><div>'+IOM.shareNotice+IOM.buildBrandNotice,e=e+(a+"</div><section>");$(".socialshare").after(e);$("#EYShareOptions").show();d&&
$(".socialshare").hide()}$(".iom").each(function(){var a=$(this).data("content-id");if(null!=a){var d=b[a];IOM.renderItem($(this),d,a)}})}$(".iom").each(function(){var a=$(this).data("content-id");if(null!=a&&3<=a.length&&0<a.indexOf("/"))try{var d=a.split("/")[0],a=a.split("/")[1];b=IOM.getItemByPropName(internalContent.content,d);c=b[a];IOM.renderItem($(this),c,a)}catch(e){}});"function"==typeof IOM.postRenderCallback&&IOM.postRenderCallback.call(this)}catch(f){"function"==typeof IOM.postRenderCallback&&
IOM.postRenderCallback.call(this)}}else"function"==typeof IOM.postRenderCallback&&IOM.postRenderCallback.call(this)},fail:function(){IOM.isEY=!1;IOM.internalTestCompleted=!0;"function"==typeof IOM.postRenderCallback&&IOM.postRenderCallback.call(this)},cancel:function(){IOM.active=!1;IOM.pageName=null;$(".iom").hide();IOM.isEY=!1;IOM.internalTestCompleted=!1;"function"==typeof IOM.postRenderCallback&&IOM.postRenderCallback.call(this)},shareEmail:function(b,a){window.open(a,"internal");Analytics.TrackIOMNavigate(b,
"Email this report to your contacts")},shareTwitter:function(b,a,d){null==a&&(a=window.location.href);var e=$(b).text();null!=e&&(e=$.trim(e),window.open("https://twitter.com/share?url="+encodeURIComponent(a)+"&text="+encodeURIComponent(e)+(null!=d?"&via="+d:""),"social"),Analytics.TrackIOMNavigate(b,"Tweet this report to your contacts"))},shareLinkedIn:function(b,a){null==a&&(a=window.location.href);var d=document.title.replace(IOM.GLOBAL_TITLE,""),e=$(b).text();null!=e&&(e=$.trim(e),window.open("https://www.linkedin.com/shareArticle?mini=true&title="+
encodeURIComponent(d)+"&url="+encodeURIComponent(a)+"&summary="+encodeURIComponent(e)+"&source=ey.com","social"),Analytics.TrackIOMNavigate(b,"Post this report on LinkedIn to your contacts"))},renderItem:function(b,a,d){a&&(null!=a.url&&null!=a.label?(b.html('<a class="iom" href="'+a.url+'" target="internal" onclick="Analytics.TrackIOMNavigate(this, \''+d+"')\">"+a.label+"</a>"),b.show()):null!=a.html?(b.html(a.html),b.find("a").attr("target","internal"),b.find("a").click(function(){Analytics.TrackIOMNavigate(this)}),
b.show()):null!=a.text&&(b.text(a.text),b.show()))},getItemByPropName:function(b,a){var d=null;if("object"==typeof b)for(itemKey in b)if(itemKey.toLowerCase()==a.toLowerCase()){d=b[itemKey];break}return d}}}();


/*!
Waypoints - 4.0.0
Copyright Â© 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=y+l-f,h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();


/* Digital Tax */

var isLocal = location.href.indexOf("localhost") >= 0 || location.href.indexOf("C:/") >= 0;
var isDropbox = location.href.indexOf("dl.dropbox") >= 0;
var isPreview = location.href.indexOf("eycompreview") >= 0;
var isProduction = isLocal === false && isDropbox === false && isPreview === false;

var thisCountryISO;
var thisCountryName;
var thisScenario;

var isScenarioListPage = false;

var thisCountryData;

var dtg = dtg || {};

dtg.analytics = function(propertyID) {

    Analytics.EnableHashTracking();
    Analytics.AddProperty(propertyID);
    Analytics.TrackAll();

    IOM.init("https://acm.us.na.ey.net/iom/generic.js", null, null, null, function() {
     if (IOM.isEY) Analytics.TrackEvent(Analytics.EYUSER.Category, Analytics.EYUSER.Category, location.pathname)
    });

};

dtg.analytics('UA-49161163-17');

dtg.getAllScenariosData = function() {

  return dtg.control.scenarios;

}

dtg.getCountryData = function(countryISO) {

    var thisCountryISO = countryISO.toLowerCase();
    var scenario = $('#scenarioid').html();
    var dataLocation;

    if (isDropbox) {
        dataLocation = 'https://dl.dropboxusercontent.com/u/767429/ey/taxguides/digital/data/';
    } else {
        dataLocation = '/Media/vwLUExtFile/ey-digital-tax-guide-data/$FILE/';
    }

    $.ajax({
        url: dataLocation + thisCountryISO + '.js',
        type: 'GET',
        dataType: 'json',
        async: false
    }).done(function(data) {

        thisCountryData = data;
        var thisScenarioData = eval('thisCountryData.scenarios.' + scenario);

        $('#scenario-a1').html(thisScenarioData.a1);
        $('#scenario-a2').html(thisScenarioData.a2);
        $('#scenario-a3').html(thisScenarioData.a3);
        $('#scenario-a4').html(thisScenarioData.a4);
        $('#scenario-a5').html(thisScenarioData.a5);

        var thisContactData;
        if (thisScenarioData.contacts !== undefined) {
            thisContactData = thisScenarioData.contacts;
        } else {
            thisContactData = thisCountryData.contacts;
        }

        $('.dtg-contact').remove();

        if (thisContactData) {

            for (var i = 0; i < thisContactData.length; i++) {

                var email = thisContactData[i]['email'];
                var firstName = thisContactData[i]['firstname'];
                var lastName = thisContactData[i]['lastname'];
                var phone = thisContactData[i]['phone'];
                /*
                var photo = thisContactData[i]['photo'];
                var photoHTML = '<img src="' + photo + '"/>';
                */

                var firmName = thisContactData[i]['firmname'];
                if (firmName === undefined) {
                    firmName = '';
                }

                var title = thisContactData[i]['title'];


                $('<div class="dtg-contact">' +
                    /* '<div class="contact-photo">' + photoHTML + '</div>' + */
                    '<div class="contact-name"><strong><a href="mailto:' + email + '">' + firstName + ' ' + lastName + '</a></strong></div>' +
                    /* '<div class="contact-title">' + title + '</div>' + */
                    '<div class="contact-title">' + firmName + '</div>' +
                    '<div class="contact-phone">' + phone + '</div>' +
                    /* '<div class="contact-email"><a href="mailto:' + email + '">' + email + '</a></div>' + */
                    '</div>').appendTo('.dtg-contacts');

            }

            /* show the contacts section */
            $('#section1').show();

        } else {

          /* hide the contacts section */
          $('#section1').hide();

        }

        var scenarioKeys = '';

        var thisCountryScenarioData = thisCountryData.scenarios;
        for (var key in thisCountryScenarioData) {
            //var value = thisCountryScenarioData[key];
            if (scenarioKeys === '') {
                scenarioKeys = key;
            } else {
                scenarioKeys += ',' + key;
            }
        }

        dtg.setScenarioList(scenarioKeys);

        $('.retrieving-contents').hide();

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("getCountryData error: jq:" + jqXHR + ' - ts:' + textStatus + ' - et: ' + errorThrown);
    });


}

dtg.getDocLocation = function() {

  var docLocation = location.href.toLowerCase();

  return docLocation;

}

dtg.getObjectSize = function(obj) {
  var size = 0, key; // get the size data

  for (key in obj) { // check the okeys in the object
    if (obj.hasOwnProperty(key)) size++; // increase the size
  }

  return size; // return the size of the object
}

dtg.setCountryList = function() {

    $.ajax({
        url: '/Media/vwLUExtFile/ey-digital-tax-guide/$FILE/dtg-scenario-country-list.xml',
        type: 'GET',
        dataType: 'xml',
        async: false
    }).done(function(data) {

        var taxGuideTitleDTG = "Worldwide Digital Tax Guide";
        var taxGuideTitle;

        $(data).find('destination').each(function() {

            taxGuideTitle = $(this).find('title').text();

            if (taxGuideTitleDTG === taxGuideTitle) {

                var versionCount = 0;

                $(this).find('version').each(function() {

                    if (versionCount === 1) {
                        return;
                    }

                    versionCount++;
                    var output, countryName, countryISO, tempStyle;

                    if( isScenarioListPage === false ) {
                      //thisScenario = 'scenario1';
                      var thisScenarioCountryList = eval('dtg.control.scenarios[0].' + thisScenario + '.countries');

                    }

                    $(this).find('country').each(function() {

                        countryName = $(this).text();
                        countryISO = $(this).attr('iso');

                        if (countryISO === 'XX' || countryISO === 'XY') {
                            tempStyle = ' class="active"';
                        } else {
                            tempStyle = '';
                        }

                        if( isScenarioListPage === false ) {

                          if (thisScenarioCountryList.indexOf(countryISO) !== -1) {

                              if (output === undefined) {
                                  output = '<option' + tempStyle + ' value="' + countryISO + '" selected>' + countryName + '</option>';
                              } else {
                                  output += '<option' + tempStyle + ' value="' + countryISO + '">' + countryName + '</option>';
                              }

                          }

                        } else {

                              output = '<div class="changelabel"><h3>' + countryName + '</h3></div><div data-country-iso="' + countryISO +'"><ul class="default-ul"></ul></div>';

                              $(output).appendTo('#scenario-list-container');

                              dtg.setScenarioListPage(countryISO);

                        }

                    });

                    if( isScenarioListPage === false ) {

                      $('#country-dataselector').html(output);

                    } else {

                      $('.scenario-list-accordion').accordion({
                        collapsible: true,
                        active: 'none',
                        heightStyle: 'content'
                      });

                    }

                });

            }

        });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("setCountryList error: jq:" + jqXHR +' - ts:' + textStatus + ' - et: ' + errorThrown);
    });

}


dtg.setScenarioList = function(scenarioKeys) {

    var scenarioKeysArray = scenarioKeys.split(',');
    var allScenariosData = dtg.getAllScenariosData();

    $('#scenario-dataselector').html('');

    for (var i = 0; i < scenarioKeysArray.length; i++) {

        var scenarioKey = scenarioKeysArray[i];
        var thisTitle = eval('allScenariosData[0].' + scenarioKey + '.title');
        var thisLink = eval('allScenariosData[0].' + scenarioKey + '.link');

        if ($('option[data-scenario="' + scenarioKey + '"]').length === 0) {

            $('<option data-scenario="' + scenarioKey + '" value="' + thisLink + '#' + thisCountryISO + '-' + scenarioKey + '" >' + thisTitle + '</option>').appendTo('#scenario-dataselector');

        }

    }

    $('#scenario-dataselector option[data-scenario=' + thisScenario + ']').attr('selected', true);

    var isSelectedOption = $('#scenario-dataselector option[selected="selected"]').text();

    $("#scenario-dataselector").html($('#scenario-dataselector option').sort(function(x, y) {
        return $(x).text() < $(y).text() ? -1 : 1;
    }));

    var j = 0;
    $("#scenario-dataselector option").each(function() {
        if ($(this).text() === isSelectedOption) {
            return false;
        }
        j++;
    });

    $('#scenario-dataselector').get(0).selectedIndex = j;

    $('#scenario-dataselector').change(function() {
        if ($(this).val() !== '') {
            location.href = $(this).val();
        }
    });


}

dtg.setScenarioListPage = function(countryISO) {

  var allScenariosData = dtg.getAllScenariosData();

  var allScenariosDataLength = dtg.getObjectSize(allScenariosData[0]);

  for (var i = 1; i <= allScenariosDataLength; i++) {

    var thisScenarioCountryList = eval('allScenariosData[0].scenario' + i + '.countries');

    if(thisScenarioCountryList.indexOf(countryISO) !== -1) {

      var thisScenarioTitle = eval('allScenariosData[0].scenario' + i + '.title');
      var thisScenarioLink = eval('allScenariosData[0].scenario' + i + '.link');

      $('<li><a data-scenario="' + thisScenarioTitle + '" href="' + thisScenarioLink +'#' + countryISO  + '-' + 'scenario' + i + '">' + thisScenarioTitle + '</a></li>').appendTo($('[data-country-iso="' + countryISO + '"] ul'));

    }

  }

  $('[data-country-iso="' + countryISO + '"] ul').html($('[data-country-iso="' + countryISO + '"] ul li').sort(function(x, y) {
       return $(x).text() < $(y).text() ? -1 : 1;
  }));

}

dtg.onScrollInit = function(items, trigger) {
    items.each(function() {
        var osElement = $(this),
            osAnimationClass = osElement.attr('data-os-animation'),
            osAnimationDelay = osElement.attr('data-os-animation-delay');
        osElement.css({
            '-webkit-animation-delay': osAnimationDelay,
            '-moz-animation-delay': osAnimationDelay,
            'animation-delay': osAnimationDelay
        });
        var osTrigger = (trigger) ? trigger : osElement;
        osTrigger.waypoint(function() {
            osElement.addClass('animated').toggleClass(osAnimationClass);
            // this.destroy();
        }, {
            triggerOnce: false,
            offset: '90%'
        });
    });
}

dtg.control = {
    "scenarios": [{
        "scenario1": {
            "title": "Digital advertising",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---digital-advertising",
            "countries": "AU, CA, CH, DE, DK, ES, FI, FR, IE, IL, IT, JP, LU, MX, NL, NO, NZ, PH, PT, RU, SE, SG, US"
        },
        "scenario2": {
            "title": "Payment processing",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---payment-processing",
            "countries": "AU, CA, CH, DE, DK, ES, FI, FR, IE, IL, IT, JP, LU, MX, NL, NO, NZ, PH, PT, RU, SE, SG, US"
        },
        "scenario3": {
            "title": "Streaming media",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---streaming-media",
            "countries": "AU, CA, CH, DE, DK, ES, FI, FR, IE, IL, IT, JP, LU, MX, NL, NO, NZ, PH, PT, RU, SE, SG, US"
        },
        "scenario4": {
            "title": "Ridesharing",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---ridesharing",
            "countries": "AU, CA, DE, DK, FR, IT, LU, MX, NO, SE, SG, US"
        },
        "scenario5": {
            "title": "Digital auto design",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---digital-auto-design",
            "countries": "AU, CA, DE, DK, FR, IT, LU, MX, NO, SE, SG, US"
        },
        "scenario6": {
            "title": "Remote auto maintenance",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---remote-auto-maintenance",
            "countries": "AU, CA, DE, DK, FR, IT, LU, MX, NO, SE, SG, US"
        },
        "scenario7": {
            "title": "Mobile banking",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---mobile-banking",
            "countries": "AU, CA, CH, DE, ES, FR, IL, IT, LU, MX, NL, NZ, PH, PT, RU, SG, US"
        },
        "scenario8": {
            "title": "Crowdfunding",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---crowdfunding",
            "countries": "AU, CA, CH, DE, ES, FR, IL, IT, LU, MX, NL, NZ, PH, PT, RU, SG, US"
        },
        "scenario9": {
            "title": "Wearable tech",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---wearable-tech",
            "countries": "AU, CA, CH, DE, ES, FR, IE, IL, IT, JP, LU, MX, NL, PH, SE, RU, SG, US"
        },
        "scenario10": {
            "title": "Online retailer",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---online-retailer",
            "countries": "AU, CA, CH, DE, ES, FR, IE, IL, IT, JP, LU, MX, NL, PH, SE, RU, SG, US"
        },
        "scenario11": {
            "title": "Supply chain reinvention",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---supply-chain-reinvention",
            "countries": "AU, CA, CH, DE, ES, FR, IE, IL, IT, JP, LU, MX, NL, PH, SE, RU, SG, US"
        },
        "scenario12": {
            "title": "Drones in business",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---drones-in-business",
            "countries": "AU, CA, DE, FR, IT, JP, LU, NL, NO, PH, RU, US"
        },
        "scenario13": {
            "title": "Media content",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---media-content",
            "countries": "AU, DE, ES, FR, IT, JP, MX, PH, RU, US"
        },
        "scenario14": {
            "title": "Travel insurance",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---travel-insurance",
            "countries": "AU, CA, CH, DE, FR, IT, JP, NZ, PH, US"
        },
        "scenario15": {
            "title": "Personal accident insurance",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---personal-accident-insurance",
            "countries": "AU, CA, CH, DE, FR, IT, JP, NZ, PH, US"
        },
        "scenario16": {
            "title": "Digital value-based care initiatives",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---digital-value-based-care-initiatives",
            "countries": "CH, DE, FR, IE, LU, NL, US"
        },
        "scenario17": {
            "title": "Health care data platform",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---health-care-data-platform",
            "countries": "CH, DE, FR, IE, LU, NL, US"
        },
        "scenario18": {
            "title": "Medical software",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---medical-software",
            "countries": "CH, DE, FR, IE, LU, NL, US"
        }
    }]
}


$(document).ready(function() {

    if(dtg.getDocLocation().indexOf('---scenario-list') !== -1) {
      isScenarioListPage = true;
    }

    $('.eyhero').addClass('reduce-height');

    var pageHeadings = $('.maincolumn > h4, .maincolumn > h3');

    pageHeadings.appendTo('.article-hero-container');

    $('.article-hero-container h4').wrapInner('<a href="http://www.ey.com/gl/en/services/tax/ey-digital-tax-guide"></a>');

    $('<p class="dtg-disclaimer os-animation" data-os-animation="fadeInRight" data-os-animation-delay="0">This material has been prepared for general informational purposes only and is not intended to be relied upon as accounting, tax, or other professional advice. Please refer to your advisors for specific advice.</p>').insertAfter('#scenario-qa');

    thisCountryISO = $('#country-dataselector option:selected').val();
    thisCountryName = $('#country-dataselector option[value="' + thisCountryISO + '"]').html();
    thisScenario = $('#scenarioid').html();

    dtg.setCountryList();

    var countryAPreviousText = $('#countryA').text();
    var countryBPreviousText = $('#countryB').text();

    $('.accordion h3').on('click', function() {

        var isClosed = $(this).parent().hasClass('ui-state-active');

        var hasCountryAClass = $(this).parent().hasClass('countryA');
        var hasCountryBClass = $(this).parent().hasClass('countryB');

        if (isClosed === false && hasCountryAClass === true) {

            $('#countryA').text(thisCountryName);
            $('#countryB').text(countryBPreviousText);

        } else if (isClosed === false && hasCountryBClass === true) {

            $('#countryA').text(countryAPreviousText);
            $('#countryB').text(thisCountryName);

        } else {

            $('#countryA').text(countryAPreviousText);
            $('#countryB').text(countryBPreviousText);

        }

    });


    $('#country-dataselector').on('change', function() {

        $('.retrieving-contents').show();

        thisCountryISO = $('#country-dataselector').val();
        thisCountryName = $('#country-dataselector option[value="' + thisCountryISO + '"]').html();

        location.hash = '#' + thisCountryISO + '-' + thisScenario;

    });

    dtg.onScrollInit($('.os-animation'));
    dtg.onScrollInit($('.staggered-animation'), $('.staggered-animation-container'));

    $(window).hashchange(function() {

        var currentHash = location.hash.substring(1, location.hash.length);

        if (currentHash === '') {

            thisCountryISO = $('#country-dataselector option:selected').val();
            $('#countryISO').html(thisCountryISO);

            thisCountryName = $('#country-dataselector option[value="' + thisCountryISO + '"]').html();

            $('#countryName').html(thisCountryName);

        } else {

            $('#country-dataselector option').each(function() {

                var thisOption = $(this).val();

                var countryHash = currentHash.substring(0, currentHash.indexOf('-'));

                if (thisOption === countryHash.toUpperCase()) {

                    thisCountryISO = $(this).val();

                    $('#countryISO').html(thisCountryISO);

                    $('#scenario-dataselector option').each(function() {

                        var thisVal = $(this).val();

                        if (thisVal.indexOf('#') !== -1) {
                            thisVal = thisVal.substring(0, thisVal.indexOf('#'));
                        }

                        $(this).val(thisVal + '#' + thisCountryISO + '-' + thisScenario);

                    });

                    thisCountryName = $(this).html();

                    $('#countryName').html(thisCountryName);
                    $('#country-dataselector').val(thisOption);

                }

            });

        }

        if( isScenarioListPage === false ) {
          dtg.getCountryData(thisCountryISO);
        }

    });

    $(window).hashchange();

});

$(window).load(function(){

  $('.accordion h3, .scenario-list-accordion h3').on('click', function() {

    var selectedCountry = $('#country-dataselector option:selected').text();
    var selectedScenario = $('#scenario-dataselector option:selected').text();

    if($(this).parent().hasClass('ui-state-active')) {

      if(isScenarioListPage === false) {

        Analytics.TrackEvent('Section', 'Close', 'Country: ' + selectedCountry + ' - Scenario: ' + selectedScenario + ' - QA ' + ($(this).text()).substring(0, 2));

      } else {

        Analytics.TrackEvent('Section', 'Close', 'Country: ' + $(this).text() + ' - Scenario list');

      }

    } else {

      if(isScenarioListPage === false) {

        Analytics.TrackEvent('Section', 'Open', 'Country: ' + selectedCountry + ' - Scenario: ' + selectedScenario + ' - QA ' + ($(this).text()).substring(0, 2));

      } else {

        Analytics.TrackEvent('Section', 'Open', 'Country: ' + $(this).text() + ' - Scenario list');

      }

    }

  });


  var waypointSection0 = new Waypoint({
      element: $('#section0'),
      handler: function(direction) {

        var selectedCountry = $('#country-dataselector option:selected').text();
        var selectedScenario = $('#scenario-dataselector option:selected').text();

        Analytics.TrackEvent('View', 'Scroll', 'Scenario - ' + selectedCountry + ' - ' + selectedScenario + ' - Scroll ' + direction + ' to Scenario info');

      },
      offset: '65%'
  });

  var waypointSection1 = new Waypoint({
      element: $('#section1'),
      handler: function(direction) {

        var selectedCountry = $('#country-dataselector option:selected').text();
        var selectedScenario = $('#scenario-dataselector option:selected').text();

        Analytics.TrackEvent('View', 'Scroll', 'Scenario - ' + selectedCountry + ' - ' + selectedScenario + ' - Scroll ' + direction + ' to Contacts');

      },
      offset: '65%'
  });

  var waypointSection2 = new Waypoint({
      element: $('#section2'),
      handler: function(direction) {

        var selectedCountry = $('#country-dataselector option:selected').text();
        var selectedScenario = $('#scenario-dataselector option:selected').text();

        Analytics.TrackEvent('View', 'Scroll', 'Scenario - ' + selectedCountry + ' - ' + selectedScenario + ' - Scroll ' + direction + ' to Other digital tax resources');

      },
      offset: '65%'
  });

});
