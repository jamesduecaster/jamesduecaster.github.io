/**
 * EY Digital Tax Guide - 2016 edition JavaScript
 * last update: 19 October 2016 4:38 PM - JD


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


/* Digital Tax */

 Analytics.EnableHashTracking();
 Analytics.AddProperty('UA-49161163-9');
 Analytics.TrackAll();

 IOM.init("https://acm.us.na.ey.net/iom/generic.js", null, null, null, function() {
  if (IOM.isEY) Analytics.TrackEvent(Analytics.EYUSER.Category, Analytics.EYUSER.Category, location.pathname)
 });

$(document).ready(function() {

    $('[data-iso]').on('click', function() {

        var CCTaxGuideCountryISO = $(this).attr('data-iso');
        var CCTaxGuideCountryName = $(this).html();

        $('.country-name').html(CCTaxGuideCountryName);

        var baseHREF = '/gl/en/services/tax/ey-digital-tax-guide---cloud-service-operating-model';
        var baseHREFTaxBasics = '/gl/en/services/tax/ey-digital-tax-guide---tax-basics';

        $('.corp-vat-basics-link').attr('href', baseHREFTaxBasics + '#' + CCTaxGuideCountryISO);
        $('.commissioned-agent-link').attr('href', baseHREF + '#' + CCTaxGuideCountryISO + '-Commissioned%20agent');
        $('.commissionaire-link').attr('href', baseHREF + '#' + CCTaxGuideCountryISO + '-Commissionaire');
        $('.buy-sell-link').attr('href', baseHREF + '#' + CCTaxGuideCountryISO + '-Buy-sell');

    });

    $('[data-sector]').on('click', function() {

        var thisSector = $(this).attr('data-sector');
        var thisSectorName = $(this).find('h3').html();
        var scenarioBaseHREF = '/gl/en/services/tax/ey-digital-tax-guide---scenario---';

        $('.generic-modal-2-content .sector-name').html(thisSectorName);

        $('.generic-modal-2-content .scenario-1-link').hide();
        $('.generic-modal-2-content .scenario-2-link').hide();
        $('.generic-modal-2-content .scenario-3-link').hide();
        $('.generic-modal-2-content .scenario-4-link').hide();

        switch (thisSector) {
            case 'automotive':
                $('.generic-modal-2-content .scenario-1-link').attr('href', scenarioBaseHREF + 'digital-auto-design').show();
                $('.generic-modal-2-content .scenario-1-link h3').html('Digital auto design');

                $('.generic-modal-2-content .scenario-2-link').attr('href', scenarioBaseHREF + 'ridesharing').show();
                $('.generic-modal-2-content .scenario-2-link h3').html('Ridesharing');

                $('.generic-modal-2-content .scenario-3-link').attr('href', scenarioBaseHREF + 'remote-auto-maintenance').show();
                $('.generic-modal-2-content .scenario-3-link h3').html('Remote auto maintenance');

                $('.generic-modal-2-content .scenario-4-link').attr('href', '#');
                $('.generic-modal-2-content .scenario-4-link h3').html('');
                break;
            case 'banking-and-finance':
                $('.generic-modal-2-content .scenario-1-link').attr('href', scenarioBaseHREF + 'crowdfunding').show();
                $('.generic-modal-2-content .scenario-1-link h3').html('Crowdfunding');

                $('.generic-modal-2-content .scenario-2-link').attr('href', scenarioBaseHREF + 'mobile-banking').show();
                $('.generic-modal-2-content .scenario-2-link h3').html('Mobile banking');

                $('.generic-modal-2-content .scenario-3-link').attr('href', '#');
                $('.generic-modal-2-content .scenario-3-link h3').html('');

                $('.generic-modal-2-content .scenario-4-link').attr('href', '#');
                $('.generic-modal-2-content .scenario-4-link h3').html('');
                break;
            case 'consumer-products':
                $('.generic-modal-2-content .scenario-1-link').attr('href', scenarioBaseHREF + 'online-retailer').show();
                $('.generic-modal-2-content .scenario-1-link h3').html('Online retailer');

                $('.generic-modal-2-content .scenario-2-link').attr('href', scenarioBaseHREF + 'supply-chain-reinvention').show();
                $('.generic-modal-2-content .scenario-2-link h3').html('Supply chain reinvention');

                $('.generic-modal-2-content .scenario-3-link').attr('href', scenarioBaseHREF + 'wearable-tech').show();
                $('.generic-modal-2-content .scenario-3-link h3').html('Wearable tech');

                $('.generic-modal-2-content .scenario-4-link').attr('href', '#');
                $('.generic-modal-2-content .scenario-4-link h3').html('');
                break;
            case 'insurance':
                $('.generic-modal-2-content .scenario-1-link').attr('href', scenarioBaseHREF + 'personal-accident-insurance').show();
                $('.generic-modal-2-content .scenario-1-link h3').html('Personal accident insurance');

                $('.generic-modal-2-content .scenario-2-link').attr('href', scenarioBaseHREF + 'travel-insurance').show();
                $('.generic-modal-2-content .scenario-2-link h3').html('Travel insurance');

                $('.generic-modal-2-content .scenario-3-link').attr('href', '#');
                $('.generic-modal-2-content .scenario-3-link h3').html('');

                $('.generic-modal-2-content .scenario-4-link').attr('href', '#');
                $('.generic-modal-2-content .scenario-4-link h3').html('');
                break;
            case 'life-sciences':
                $('.generic-modal-2-content .scenario-1-link').attr('href', scenarioBaseHREF + 'digital-value-based-care-initiatives').show();
                $('.generic-modal-2-content .scenario-1-link h3').html('Digital value-based care initiatives');

                $('.generic-modal-2-content .scenario-2-link').attr('href', scenarioBaseHREF + 'health-care-data-platform').show();
                $('.generic-modal-2-content .scenario-2-link h3').html('Health care data platform');

                $('.generic-modal-2-content .scenario-3-link').attr('href', scenarioBaseHREF + 'medical-software').show();
                $('.generic-modal-2-content .scenario-3-link h3').html('Medical software');

                $('.generic-modal-2-content .scenario-4-link').attr('href', '#');
                $('.generic-modal-2-content .scenario-4-link h3').html('');
                break;
            case 'media-and-entertainment':
                $('.generic-modal-2-content .scenario-1-link').attr('href', scenarioBaseHREF + 'media-content').show();
                $('.generic-modal-2-content .scenario-1-link h3').html('Media content');

                $('.generic-modal-2-content .scenario-2-link').attr('href', '#');
                $('.generic-modal-2-content .scenario-2-link h3').html('');

                $('.generic-modal-2-content .scenario-3-link').attr('href', '#');
                $('.generic-modal-2-content .scenario-3-link h3').html('');

                $('.generic-modal-2-content .scenario-4-link').attr('href', '#');
                $('.generic-modal-2-content .scenario-4-link h3').html('');
                break;
            case 'technology':
                $('.generic-modal-2-content .scenario-1-link').attr('href', scenarioBaseHREF + 'digital-advertising').show();
                $('.generic-modal-2-content .scenario-1-link h3').html('Digital advertising');

                $('.generic-modal-2-content .scenario-2-link').attr('href', scenarioBaseHREF + 'payment-processing').show();
                $('.generic-modal-2-content .scenario-2-link h3').html('Payment processing');

                $('.generic-modal-2-content .scenario-3-link').attr('href', scenarioBaseHREF + 'streaming-media').show();
                $('.generic-modal-2-content .scenario-3-link h3').html('Streaming media');
                break;
            case 'telecommunications':
                $('.generic-modal-2-content .scenario-1-link').attr('href', scenarioBaseHREF + 'drones-in-business').show();
                $('.generic-modal-2-content .scenario-1-link h3').html('Drones in business');

                $('.generic-modal-2-content .scenario-2-link').attr('href', '#');
                $('.generic-modal-2-content .scenario-2-link h3').html('');

                $('.generic-modal-2-content .scenario-3-link').attr('href', '#');
                $('.generic-modal-2-content .scenario-3-link h3').html('');

                $('.generic-modal-2-content .scenario-4-link').attr('href', '#');
                $('.generic-modal-2-content .scenario-4-link h3').html('');
        }

    });

});
