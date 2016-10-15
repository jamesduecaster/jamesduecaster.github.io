/*
 * EY Insights JavaScript
 * Last update: 14 October 2016 9:25 PM - JD

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


/*
 * Date formatting JavaScript
 * From https://github.com/mikebaldry/formatDate-js
 */

(function () {
    var __bind = function (fn, me) { return function () { return fn.apply(me, arguments); }; };

    var re = new RegExp(/%(a|A|b|B|c|C|d|D|e|F|h|H|I|j|k|l|L|m|M|n|p|P|r|R|s|S|t|T|u|U|v|V|W|w|x|X|y|Y|z)/g);
    var abbreviatedWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    var fullWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var abbreviatedMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function padNumber(num, count, padCharacter) {
        if (typeof padCharacter == "undefined") {
            padCharacter = "0";
        }
        var lenDiff = count - String(num).length;
        var padding = "";

        if (lenDiff > 0)
            while (lenDiff--)
                padding += padCharacter;

    return padding + num;
}

function dayOfYear(d) {
    var oneJan = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((d - oneJan) / 86400000);
}

function weekOfYear(d) {
    var oneJan = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);
}

function isoWeekOfYear(d) {
    var target = new Date(d.valueOf());
    var dayNr = (d.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var jan4 = new Date(target.getFullYear(), 0, 4);
    var dayDiff = (target - jan4) / 86400000;

    return 1 + Math.ceil(dayDiff / 7);
}

function tweleveHour(d) {
    return d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
}

function timeZoneOffset(d) {
    var hoursDiff = (-d.getTimezoneOffset() / 60);
    var result = padNumber(Math.abs(hoursDiff), 1);
    return "GMT " + (hoursDiff > 0 ? "+" : "-") + result;
}

    Date.prototype.format = function (formatString) {
        return formatString.replace(re, __bind(function (m, p) {
            switch (p) {
                case "a": return abbreviatedWeekdays[this.getDay()];
                case "A": return fullWeekdays[this.getDay()];
                case "b": return abbreviatedMonths[this.getMonth()];
                case "B": return fullMonths[this.getMonth()];
                case "c": return this.toLocaleString();
                case "C": return Math.round(this.getFullYear() / 100);
                case "d": return this.getDate();
                case "D": return this.format("%m/%d/%y");
                case "e": return padNumber(this.getDate(), 2, " ");
                case "F": return this.format("%Y-%m-%d");
                case "h": return this.format("%b");
                case "H": return padNumber(this.getHours(), 2);
                case "I": return tweleveHour(this);
                case "j": return padNumber(dayOfYear(this), 3);
                case "k": return padNumber(this.getHours(), 2, " ");
                case "l": return padNumber(tweleveHour(this), 2, " ");
                case "L": return padNumber(this.getMilliseconds(), 3);
                case "m": return padNumber(this.getMonth() + 1, 2);
                case "M": return padNumber(this.getMinutes(), 2);
                case "n": return "\n";
                case "p": return this.getHours() > 11 ? "p.m." : "a.m.";
                case "P": return this.format("%p").toLowerCase();
                case "r": return this.format("%I:%M:%S %p");
                case "R": return this.format("%H:%M");
                case "s": return this.getTime() / 1000;
                case "S": return padNumber(this.getSeconds(), 2);
                case "t": return "\t";
                case "T": return this.format("%H:%M:%S");
                case "u": return this.getDay() == 0 ? 7 : this.getDay();
                case "U": return padNumber(weekOfYear(this), 2); //either this or W is wrong (or both)
                case "v": return this.format("%e-%b-%Y");
                case "V": return padNumber(isoWeekOfYear(this), 2);
                case "W": return padNumber(weekOfYear(this), 2); //either this or U is wrong (or both)
                case "w": return padNumber(this.getDay(), 2);
                case "x": return this.toLocaleDateString();
                case "X": return this.toLocaleTimeString();
                case "y": return String(this.getFulYear()).substring(2);
                case "Y": return this.getFullYear();
                case "z": return timeZoneOffset(this);
                default: return match;
            }
        }, this));
    };
}).call(this);


 /*
  * Retrieved from: http://en.literateprograms.org/Quicksort_(JavaScript)?oldid=8410
  * Modified to compare date values
  */

 Array.prototype.swap = function(a, b) {
     var tmp = this[a];
     this[a] = this[b];
     this[b] = tmp;
 };


/*
 * EY Insights
 */

var isLocal = location.href.indexOf("localhost") >= 0 || location.href.indexOf("C:/") >= 0;
var isDropbox = location.href.indexOf("dl.dropbox") >= 0;
var isPreview = location.href.indexOf("eycompreview") >= 0;
var isProduction = isLocal === false && isDropbox === false && isPreview === false;

var feedPrefixLocal = "file:///C:/Documents and Settings/xxxxxxx/My Documents/My Dropbox/Public/ey/BBWW/data/";
var feedPrefixDropbox = "https://dl.dropboxusercontent.com/u/767429/ey/insights-fy2015/data/";
var feedPrefixPreview = "http://eycompreview.ey.com/?queryid=";
var feedPrefixProduction = "http://www.ey.com/?queryid=";

var feedData = [];
var feedDataVRD = [];
var feedSourceUrl = [];
var baseCountry = $.cookie('BaseCountry');

var eyInsightsGrid;

var eyInsights = eyInsights || {};

eyInsights.analytics = function(propertyID) {

    Analytics.EnableHashTracking();
    Analytics.AddProperty(propertyID);
    Analytics.TrackAll();

    IOM.init("https://acm.us.na.ey.net/iom/generic.js", null, null, null, function() {
     if (IOM.isEY) Analytics.TrackEvent(Analytics.EYUSER.Category, Analytics.EYUSER.Category, location.pathname)
    });

};

eyInsights.analytics('UA-58321711-3');

eyInsights.init = function() {

  $(document).ready(function() {

      $('.cookienotification').remove();

      $('#featuremenu').html(eyInsights.navigation());

      $(window).hashchange(function() {

          var currentHash = location.hash;

          $('.sub.threecolumn').hide();

          $('.sharelistadditional a, .mobilesocialshare span a').each(function() {
              var _href = $(this).attr('href');
              if (_href.indexOf('#') > 0) {
                  _href = _href.substring(0, _href.indexOf('#'));
              }
              if ($(this).html() !== 'www.ey.com') {
                  $(this).attr('href', _href + currentHash);
              }
          });

          if (currentHash !== '' && currentHash !== '#recent-insights') {

              $('.main-title').show();
              $('.customheadline').hide();
              currentHash = currentHash.substring(1, currentHash.length).toLowerCase();

              eyInsights.loadDocs(currentHash);
              eyInsights.displayInsight(eyInsights.insightHashToID(currentHash));

              $('.subnavToggle').each(function() {
                  if ($(this).attr('id').substring(9, $(this).attr('id').length) === currentHash) {
                      $(this).next('ol').show();
                  }
              });

          } else {
              eyInsights.loadDocs();
              eyInsights.displayInsight('insights-recent-insights');
          }
      });

      $(window).hashchange();

      $('#nav-open-btn').on('click', function() {});

      $('#nav ul li a, .cbmissues a').on('click', function() {

          insightID = $(this).attr('id');
          if (insightID !== undefined) {
              var insightHash = this.insightIDToHash(insightID);
              /* CBM-- Analytics.TrackEvent("nav link", "click", insightHash, null); */
              this.displayInsight(insightID);
          }

      });

  });


  $(window).load(function() {

      $('.subnavToggle').on('click', function() {

        $('.local-sub').hide();

          if ($(this).next('ol').css('display') === 'none') {
              $(this).next('ol').show();
          } else {
              $(this).next('ol').hide();
          }

      });

      $('#mobiledrop_menu a').on('click', function() {
          $('.mobiledrop').hide();
      });

      $('.socialshare.bar').hide();

  });

};

eyInsights.childCategories = function(currentID) {

    currentID = 'insights-' + currentID;
    var navObj = eyInsights.control.navigation;

    for (var i = 0; i < navObj.length; i++) {

        var navID = navObj[i].id;

        if (currentID === navID) {

            for (var key in navObj[i]) {

                if (key === 'subnav') {
                    var subNavLinkList = '';

                    for (var j = 0; j < navObj[i].subnav.length; j++) {

                        var subNavLink = navObj[i].subnav[j].link;

                        if (subNavLink.indexOf('#') !== -1) {

                            subNavLink = subNavLink.substring(subNavLink.indexOf('#') + 1, subNavLink.length);

                            if (subNavLinkList === '') {
                                subNavLinkList = subNavLink;
                            } else {
                                subNavLinkList += ',' + subNavLink;
                            }

                        }

                    }

                }

            }

            return subNavLinkList;

        }

    }
}

eyInsights.daysAgo = function(numberOfDays) {
    return this.getDate(numberOfDays);
};

eyInsights.debugIt = function(debuggery) {
    /* console.log(debuggery); */
    $('#debugit').append(debuggery + '<br />');
};

eyInsights.displayInsight = function(insight) {

    this.hideAllContent();

    $('.serviceslist a, .mlinks a').removeClass('active');

    var insightID = insight;
    var insightIDTemp = insightID.substring(insightID.indexOf('insights-') + 9, insightID.length);

    $('.serviceslist a#' + insightID + ', .mlinks a#' + insightID).addClass('active');

    if (insightID === undefined) {
        insightID = '';
    }

    var insightAcr = insightID.substring(6, insightID.length);

    if (insightID === 'insights-recent-insights') {

        this.displayRecentContent();

    } else {

        $('.releasedate').hide();

    }

    $('.insight-intro-' + insightIDTemp).show();

    eyInsightsGrid.isotope('updateSortData').isotope({
        sortBy: ['priority', 'releasedatenumber'],
        filter: '[class*="' + insightID + '"]'
    });

};

eyInsights.displayRecentContent = function() {

    $('.releasedate').show();
    this.hideAllContent();
    $('ol').hide();
    $('.main-title').hide();
    $('.customheadline').show();

    $('.insights-content').each(function() {
        var contentReleaseDate = $(this).attr('data-releasedate-number');

        if (contentReleaseDate !== undefined) {
            if (contentReleaseDate >= eyInsights.daysAgo(180)) {
                $(this).addClass('insights-recent-insights');

            }
        }
    });

    eyInsightsGrid.isotope({
        sortBy: 'releasedatenumber',
        filter: '[class*="' + 'insights-recent-insights' + '"]'
    });

    $('.releasedate').show();

}

eyInsights.getDate = function(dateRange) {

    var dateRange = dateRange !== undefined ? dateRange : 0;

    var today = new Date();
    var adjustedDateNumber = new Date(today).setDate(today.getDate() - dateRange);

    var adjustedDate = new Date(adjustedDateNumber);

    var year = adjustedDate.getUTCFullYear().toString();
    var month = (adjustedDate.getUTCMonth() + 1).toString();
    var date = adjustedDate.getUTCDate().toString();

    if (month.length === 1) {
        month = '0' + month;
    }

    if (date.toString().length === 1) {
        date = '0' + date;
    }

    return Number(year + month + date);

}

eyInsights.getHeading = function(doc) {

    try {

        var heading;
        var headingOtherLang;
        var headingOtherCountryLang;

        if (doc !== null) {

            if (contentCountry === 'GL') {
                heading = doc['title'];
            } else {
                headingOtherCountryLang = doc['title-lang-' + contentCountry.toLowerCase() + '-' + contentLang.toLowerCase()];

                if (headingOtherCountryLang === '' || headingOtherCountryLang === undefined) {

                    headingOtherLang = doc['title-lang-' + contentLang.toLowerCase()];
                    if (headingOtherLang === '' || headingOtherLang === undefined) {
                        heading = doc['title'];
                    } else {
                        heading = headingOtherLang;
                    }

                } else {
                    heading = headingOtherCountryLang;
                }

            }

        } else {
            heading = '';
        }

        return heading;

    } catch (e) {
        return (null);
    }

}

eyInsights.getInsight = function(doc) {

    try {

        var insight = doc !== null ? doc['insights-category'] : '';

        if (insight === undefined) {
            insight = '';
        }
        return insight;

    } catch (e) {
        return (null);
    }

}

eyInsights.getOutput = function() {

    feedDataVRD = [];

    for (var j = 0; j < feedData.length; j++) {
      if (this.getReleaseDate(feedData[j]) !== 'Invalid Date') {
        feedDataVRD.push(feedData[j]);
      } else {

        if($('#docswerrors').length === 0) {
          $('<div id="docswerrors" style="display:none"></div>').appendTo('body');
        }
        $('#docswerrors').append('<p>' + feedData[j].title + '</p>');
      }
    }

    this.quickSortDocs(feedDataVRD, false, 0, feedDataVRD.length);

    for (var i = 0; feedDataVRD !== null && typeof(feedDataVRD) === "object" && i < feedDataVRD.length; i++) {

        var releaseDate = this.getReleaseDate(feedDataVRD[i]);
        var releaseDateHTML = this.getReleaseDateHTML(feedDataVRD[i]);
        var releaseDateNumber = this.getReleaseDateNumber(releaseDate);
        var releaseDateHidden = this.isReleaseDateHidden(feedDataVRD[i]);

        var insight = this.getInsight(feedDataVRD[i]);
        var heading = this.getHeading(feedDataVRD[i]);
        var subhead = this.getSubhead(feedDataVRD[i]);
        var photoPath = this.getPhotoPath(feedDataVRD[i]);
        var priority = this.getPriority(feedDataVRD[i]);
        var style = this.getStyle(feedDataVRD[i]);
        var share = this.getShare(feedDataVRD[i]);

        var newWindow = feedDataVRD[i]['insights-newwindow'];
        newWindow = newWindow ? newWindow.toLowerCase().trim() : '';

        var link = feedDataVRD[i].link;
        var colorClass = photoPath === '' ? ' color' : '';

        var imgDsp;
        if (photoPath === '' | photoPath === undefined) {
            imgDsp = '';
        } else {
            imgDsp = '<img src="' + photoPath + '" />';
        }

        var imgMaskDsp;
        if (imgDsp !== '') {
            imgMaskDsp = '<div class="cbmimagemask">' + imgDsp + '</div>';
        } else {
            imgMaskDsp = '';
        }

        var noImageClass = imgDsp === '' ? ' no-image' : '';

        var insightArray = (insight.replace(/ /g, '')).split(',');

        for (var j = 0; j < insightArray.length; j++) {
            var parentID = this.parentID(insightArray[j]);
            if (parentID !== undefined) {
                insightArray.push(parentID);
            }
        }

        var uniqueArrayItems = [];

        $.each(insightArray, function(i, el) {
            if ($.inArray(el, uniqueArrayItems) === -1) uniqueArrayItems.push(el);
        });

        insightArray = uniqueArrayItems;

        var insightClass = '';

        for (j = 0; j < insightArray.length; j++) {

            var thisInsightClass = (this.insightHashToID(insightArray[j])).replace(' & ', '-');

            if (insightClass === '') {
                insightClass = thisInsightClass;
            } else {
                insightClass += ' ' + thisInsightClass;
            }

        }

        insightClass = insightClass.toLowerCase();

        var customStyles = '';
        var backgroundImgStyle = '';

        if (style !== '') {

            var styleItem = '';
            var styleArray = (style.replace(/ /g, '')).toLowerCase().split(',');

            for (j = 0; j < styleArray.length; j++) {

                customStyles = customStyles === '' ? ' ' : customStyles;
                styleItem = styleArray[j];

                if (styleItem === 'wide') {
                    styleItem = 'two-column-tile';
                }

                if (styleItem.indexOf('photo-') !== -1) {
                    styleItem = 'photo ' + styleItem;
                }

                customStyles += ' ' + styleItem;

            }

            if (style.indexOf('photo-') !== -1) {
                backgroundImgStyle = ' style="background-image: url(' + photoPath + ')"';
            }

        }

        var priorityStyles = '';

        if (priority !== '') {

            var priorityItem = '';
            var priorityArray = (priority.replace(/ /g, '')).toLowerCase().split(',');

            for (var j = 0; j < priorityArray.length; j++) {

                priorityItem = 'priority-' + priorityArray[j];
                priorityStyles += ' ' + priorityItem;

            }

            priorityStyles = ' ' + 'priority' + priorityStyles;

        }

        var dataPriorityStyles = priority !== '' ? ' data-priority="' + priorityStyles.trim() + '" ' : '';

        var docCountryLang = (contentCountry + '/' + contentLang).toLowerCase();

        var releaseDateHiddenStyle = releaseDateHidden === 'yes' ? 'style="display:none"' : '';

        var newWindowHTML = '';

        if (newWindow === 'yes') {
            newWindowHTML = ' target="_blank"';
        }

        var wrapHeadSubHeadBegin = '';
        var wrapHeadSubHeadEnd = '';
        if (customStyles.indexOf('-yellow') !== -1) {
            wrapHeadSubHeadBegin = '<div class="wrap-head-subhead">';
            wrapHeadSubHeadEnd = '</div>';
        }


        if (link.toLowerCase().indexOf('gl/en') !== -1) { // is a global doc

            this.renderToPage(backgroundImgStyle, colorClass, customStyles, heading, imgMaskDsp, insightClass, link, newWindowHTML, noImageClass, priorityStyles, releaseDateHTML, releaseDateHiddenStyle, releaseDateNumber, subhead, wrapHeadSubHeadBegin, wrapHeadSubHeadEnd);

        } else if (link.toLowerCase().indexOf(docCountryLang) !== -1) { //matching country/lang

            this.renderToPage(backgroundImgStyle, colorClass, customStyles, heading, imgMaskDsp, insightClass, link, newWindowHTML, noImageClass, priorityStyles, releaseDateHTML, releaseDateHiddenStyle, releaseDateNumber, subhead, wrapHeadSubHeadBegin, wrapHeadSubHeadEnd);

        } else if (share.indexOf(docCountryLang) !== -1) {

            this.renderToPage(backgroundImgStyle, colorClass, customStyles, heading, imgMaskDsp, insightClass, link, newWindowHTML, noImageClass, priorityStyles, releaseDateHTML, releaseDateHiddenStyle, releaseDateNumber, subhead, wrapHeadSubHeadBegin, wrapHeadSubHeadEnd);

        }

    } /* end for */

    if( eyInsightsGrid !== undefined ) {

      eyInsightsGrid.isotope('destroy')

    }

    eyInsightsGrid = $('#tile-container').isotope({
        itemSelector: '.tile',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-sizer',
            gutter: '.gutter-sizer'
        },
        getSortData: {
            releasedatenumber: function(itemElem) {
                var releasedatenumber = $(itemElem).attr('data-releasedate-number');
                if (releasedatenumber !== undefined) {
                    return releasedatenumber;
                } else {
                    return '20130101';
                }
            },
            priority: function(itemElem) {
                var thisClass = $(itemElem).attr('class');
                if (thisClass !== undefined) {

                    var insightIDTemp = insightID.substring(insightID.indexOf('insights-') + 9, insightID.length);

                    if (thisClass.indexOf('priority-' + insightIDTemp) !== -1) {

                        var hasLeadingZero = false;

                        if (thisClass.substring(thisClass.indexOf('priority-' + insightIDTemp) + ('priority-' + insightIDTemp).length + 1, thisClass.indexOf('priority-' + insightIDTemp) + ('priority-' + insightIDTemp).length + 2) === '0') {
                            hasLeadingZero = true;
                        }

                        if (hasLeadingZero === false) {
                            priority = thisClass.substring(thisClass.indexOf('priority-' + insightIDTemp) + ('priority-' + insightIDTemp).length + 1, thisClass.indexOf('priority-' + insightIDTemp) + ('priority-' + insightIDTemp).length + 2);
                        } else {
                            priority = thisClass.substring(thisClass.indexOf('priority-' + insightIDTemp) + ('priority-' + insightIDTemp).length + 1, thisClass.indexOf('priority-' + insightIDTemp) + ('priority-' + insightIDTemp).length + 3);
                        }

                        if (priority.length === 1) {
                            priority = '00' + priority;
                        } else if (priority.length === 2) {
                            priority = '0' + priority;
                        }
                        if (isNaN(priority)) {
                            priority = '100';
                        }
                    } else {
                        priority = '100';
                    }
                    return priority;
                } else {
                    return '100';
                }
            }
        },
        sortBy: 'releasedatenumber',
        sortAscending: {
            priority: true,
            releasedatenumber: false
        }
    });

    $('.loader').hide();

}


eyInsights.getPhotoPath = function(doc) {

    try {

        var photoPath = doc !== null ? doc['hero-image'] : '';

        return photoPath;

    } catch (e) {
        return (null);
    }

}

eyInsights.getPriority = function(doc) {

    try {

        var priority = doc !== null ? doc['insights-priority'] : '';

        if (priority === undefined) {
            priority = '';
        }
        return priority;

    } catch (e) {
        return (null);
    }

}

eyInsights.getReleaseDate = function(doc) {

    try {

        if (doc !== null) {
            if (doc.releasedate !== undefined) {
                releaseDate = doc.releasedate;
            } else {
                releaseDate = '2013-01-01';
            }
        } else {
            releaseDate = '2013-01-01';
        }

        releaseDate = releaseDate.trim();

        if (releaseDate.indexOf('-') !== -1 || releaseDate.indexOf('/') !== -1) {

            /* releaseDate format is YYYY-MM-DD or YYYY/MM/DD */

            /* regexp uses - or / for date delimiters so 2016-12-31 or 2016/12/31 matches. Handles leap year from 1901 to 2099. */

            var dateRegex = new RegExp(/^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))?$/g);

            if(dateRegex.test(releaseDate) === true) {

              var hasDash = false;
              var hasSlash = false;
              var parts;

              if(releaseDate.indexOf('-')!== -1) {
                hasDash = true;
              }

              if(releaseDate.indexOf('/') !== -1) {
                hasSlash = true;
              }

              if(hasDash === true && hasSlash === true) {

                return 'Invalid Date';

              } else if(hasDash === true) {
                  parts = releaseDate.split('-');
              } else if(hasSlash === true) {
                  parts = releaseDate.split('/');
              }

            } else {

              return 'Invalid Date';

            }

            var m = parts[1] - 1;
            var d = parts[2];
            var y = parts[0];

            return new Date(y, m, d);

        } else if (parseFloat(releaseDate) === parseInt(releaseDate) && !isNaN(releaseDate) && releaseDate.length === 8) {

            /* releaseDate format is YYYYMMDD */

            var m = releaseDate.substring(4, 6) - 1;
            var d = releaseDate.substring(6, 8);
            var y = releaseDate.substring(0, 4);

            return new Date(y, m, d);

        } else {

            /* releasedate format is other string */

            var d = new Date(releaseDate);

            if (Object.prototype.toString.call(d) === "[object Date]") {

                if (isNaN(d.getTime())) {

                    return 'Invalid Date';

                } else {

                    /* date is valid */
                    return d;

                }

            } else {

                return 'Invalid Date';

            }
        }

    } catch (e) {
        return (null);
    }

}

eyInsights.getReleaseDateHTML = function(doc) {
    var d = this.getReleaseDate(doc);
    if (d === null) return ("");
    else return (d.format("%B %Y")) //(d.format("%d %B %Y")); //(d.format("%A, %d %B %Y"));
}

eyInsights.getReleaseDateNumber = function(releaseDate) {

    try {

        var month = (releaseDate.getUTCMonth() + 1).toString();
        var day = (releaseDate.getUTCDate()).toString();
        var year = (releaseDate.getUTCFullYear()).toString();

        if (month.length === 1) {
            month = '0' + month;
        }

        if (day.length === 1) {
            day = '0' + day;
        }

        var dateNumber = year + month + day;

        return dateNumber

    } catch (e) {
        return (null);
    }

}

eyInsights.getReleaseDateRaw = function(doc) {

    try {

        var releaseDate = doc !== null ? doc.releasedate : '';
        if (releaseDate.length !== 8) {
            return (null);
        } else {
            return releaseDate;
        }

    } catch (e) {
        return (null);
    }

}

eyInsights.getShare = function(doc) {

    try {

        var share = doc !== null ? doc['insights-share'] : '';

        if (share === undefined) {
            share = '';
        }

        if (share !== '') {
            share = (share.replace(/-/g, '/')).toLowerCase();
        }

        return share;

    } catch (e) {
        return (null);
    }

}

eyInsights.getStyle = function(doc) {

    try {

        var style = doc !== null ? doc['insights-style'] : '';
        style = style !== undefined ? style : '';

        return style;

    } catch (e) {
        return (null);
    }

}

eyInsights.getSubhead = function(doc) {

    try {

        var subhead;
        var subheadOtherLang;
        var subheadOtherCountryLang;

        if (doc !== null) {

            if (contentCountry === 'GL') {

                subhead = doc['description'];

            } else {

                subheadOtherCountryLang = doc['description-lang-' + contentCountry.toLowerCase() + '-' + contentLang.toLowerCase()];

                if (subheadOtherCountryLang === '' || subheadOtherCountryLang === undefined) {

                    subheadOtherLang = doc['description-lang-' + contentLang.toLowerCase()];

                    if (subheadOtherLang === '' || subheadOtherLang === undefined) {
                        subhead = doc['description'];
                    } else {
                        subhead = subheadOtherLang;
                    }

                } else {

                    subhead = subheadOtherCountryLang;

                }

            }

        } else {
            subhead = '';
        }

        return subhead;

    } catch (e) {
        return (null);
    }

}

eyInsights.hideAllContent = function() {
    $('.insight-intro').hide();
}

eyInsights.insightHashToID = function(insightHash) {

    insightID = 'insights-' + insightHash;
    return insightID;

}

eyInsights.insightIDToHash = function(insightID) {

    insightHash = insightID.substring(9, insightID.length);
    return insightHash;

}

eyInsights.isReleaseDateHidden = function(doc) {

    try {

        var hideIt = doc !== null ? doc['insights-hide-releasedate'] : '';
        hideIt = hideIt !== undefined ? hideIt.toLowerCase() : '';

        return hideIt;

    } catch (e) {
        return (null);
    }

}

eyInsights.loadDocs = function(filterBy) {

    var insightsXPathQuery = '';

    if (filterBy !== undefined && filterBy !== 'recent-insights') {

        var insightsXPathQuery = '';

        if (filterBy.indexOf('browse-by') !== -1) {

            var subCategoryArray = this.childCategories(filterBy).split(',');

            for (var i = 0; i < subCategoryArray.length; i++) {

                if (insightsXPathQuery === '') {
                    insightsXPathQuery = 'contains(insights-category, "' + subCategoryArray[i] + '")';
                } else {
                    insightsXPathQuery += ' or contains(insights-category, "' + subCategoryArray[i] + '")';
                }

            }

        } else {

            insightsXPathQuery = 'contains(insights-category, "' + filterBy + '")';

        }

    } else {

        var todaysDate = eyInsights.getDate();
        var beginDate = eyInsights.daysAgo(90);

        insightsXPathQuery = '(translate(releasedate,"-","")>=' + beginDate + ' and translate(releasedate,"-","")<=' + todaysDate + ')';

    }

    insightsXPathQuery = '[' + insightsXPathQuery + ']';

    feedSourceUrl = feedSourceUrls.getUrl('GL');

    if (insightsXPathQuery !== '') {
        feedSourceUrl = feedSourceUrl + insightsXPathQuery;
    }

    var backupID = feedSourceUrls.getBackupURL('GL');
    backupID = backupID.substring(0, backupID.indexOf('&'));

    $.ajax({
        url: feedSourceUrl,
        dataType: 'json',
        type: 'GET',
        async: false
    }).done(function(data) {

        feedData = data.results;

    }).fail(function(jqXHR, textStatus, errorThrown) {


        this.submitFeedBackupReport('EY Insights', backupID, 'Ajax error - ' + errorThrown, feedSourceURL, baseCountry);

        var backupQuery = '/content/contentitem';
        backupQuery += insightsXPathQuery;

        feedData = backupOutBoundFeed(backupID, backupQuery, 'json');
        feedData = $.parseJSON(feedData);
        feedData = feedData.results;

        if (feedData[0].error) {
            this.submitFeedBackupReport('EY Insights', backupID, 'Backup feed failure', feedSourceURL, baseCountry);
        }

    });

    $('#tile-container a').remove();
    this.getOutput();

}


eyInsights.navigation = function() {

    var genObj = eyInsights.control.generic;

    var genIntroCopy = genObj["intro-copy"];

    var navObj = eyInsights.control.navigation;
    var navSource = '';

    for (var i = 0; i < navObj.length; i++) {

        var navTitle = navObj[i].title;
        var navLink = navObj[i].link;
        var navID = navObj[i].id;

        var introCopy = navObj[i]["intro-copy"];

        var navSubNav = navObj[i].subnav;
        var subNavClass = '';
        var endParentLI = "</li>";

        var navLinkTemp = navLink.substring(navLink.indexOf('#') + 1, navLink.length);

        if (introCopy !== undefined) {
            $('<div class="insight-intro insight-intro-' + navLinkTemp + '" >' + introCopy + '</div>').insertBefore("#tile-container");
        } else {
            $('<div class="insight-intro insight-intro-' + navLinkTemp + '" >' + genIntroCopy + '</div>').insertBefore("#tile-container");
        }

        if (navSubNav !== undefined) {
            subNavClass = ' class="subnavToggle"';
            endParentLI = '';
        }

        navSource += '<li>	<a' + subNavClass + ' href="' + navLink + '" id="' + navID + '">' + navTitle + '</a>' + endParentLI;

        for (var key in navObj[i]) {

            if (key === 'subnav') {

                navSource += '<ol class="local-sub">';

                for (var j = 0; j < navObj[i].subnav.length; j++) {

                    var subNavTitle = navObj[i].subnav[j].title;
                    var subNavLink = navObj[i].subnav[j].link;
                    var subNavID = navObj[i].subnav[j].id;

                    introCopy = navObj[i].subnav[j]["intro-copy"];

                    var subNavLinkTemp = subNavLink.substring(subNavLink.indexOf('#') + 1, subNavLink.length);

                    if (introCopy !== undefined) {
                        $('<div class="insight-intro insight-intro-' + subNavLinkTemp + '" >' + introCopy + '</div>').insertBefore("#tile-container");
                    } else {
                        $('<div class="insight-intro insight-intro-' + subNavLinkTemp + '" >' + genIntroCopy + '</div>').insertBefore("#tile-container");
                    }

                    navSource += '<li>	<a href="' + subNavLink + '" id="' + subNavID + '">' + subNavTitle + '</a></li>';

                }

                navSource += '</ol></li>';
            }

        }
    }

    return navSource;

}

eyInsights.parentID = function(currentID) {

    currentID = 'insights-' + currentID;
    var navObj = eyInsights.control.navigation;

    for (var i = 0; i < navObj.length; i++) {

        var navID = navObj[i].id;

        if (currentID === navID) {
            return;
        }

        for (var key in navObj[i]) {

            if (key === 'subnav') {

                for (var j = 0; j < navObj[i].subnav.length; j++) {

                    var subNavID = navObj[i].subnav[j].id;

                    if (currentID === subNavID) {
                        return navID.substring(9, navID.length);
                    }
                }
            }
        }
    }
}

eyInsights.quickSortDocs = function(doc, ascending, begin, end) {
    if (end - 1 > begin) {
        var pivot = begin + Math.floor(Math.random() * (end - begin));
        pivot = this.sortPartition(doc, begin, end, pivot, ascending);
        this.quickSortDocs(doc, ascending, begin, pivot);
        this.quickSortDocs(doc, ascending, pivot + 1, end);
    }
}

eyInsights.renderToPage = function(backgroundImgStyle, colorClass, customStyles, heading, imgMaskDsp, insightClass, link, newWindowHTML, noImageClass, priorityStyles, releaseDate, releaseDateHiddenStyle, releaseDateNumber, subhead, wrapHeadSubHeadBegin, wrapHeadSubHeadEnd) {

    var outputHTML =
        '<a' + newWindowHTML + ' href="' + link + '?utm_source=ey-insights&utm_medium=web&utm_campaign=eycom">' +
        '<div' + backgroundImgStyle + ' data-releasedate-number="' + releaseDateNumber + '" data-releasedate="' + releaseDate + '" class="tile' + colorClass + noImageClass + customStyles + priorityStyles + ' insights-content ' + insightClass + '">' +
        '<div class="cbmheadings">' +
        '<div class="h4">' +
        '</div>' +
        '</div>' +
        imgMaskDsp +
        wrapHeadSubHeadBegin +
        '<h3>' + heading + '</h3>' +
        '<h5>' + subhead + '</h5>' +
        '<p class="releasedate" ' + releaseDateHiddenStyle + '>' + releaseDate + '</p>' +
        wrapHeadSubHeadEnd +
        '</div>' +
        '</a>';

    $(outputHTML).appendTo('#tile-container');

}

eyInsights.sortPartition = function(doc, begin, end, pivot, ascending) {
    var piv = doc[pivot];
    doc.swap(pivot, end - 1);
    var store = begin;
    var ix;
    for (ix = begin; ix < end - 1; ++ix) {
        var compareDate = this.getReleaseDate(doc[ix]);
        var pivotDate = this.getReleaseDate(piv);
        var doSwap = false;
        if (ascending) doSwap = (compareDate.getTime() <= pivotDate.getTime());
        else doSwap = (compareDate.getTime() >= pivotDate.getTime());
        if (doSwap) {
            doc.swap(store, ix);
            ++store;
        }
    }
    doc.swap(end - 1, store);
    return (store);
}

eyInsights.submitFeedBackupReport = function(source, feedID, scriptLocation, feedSourceUrl, baseCountry) {

    $('#feed-backup-report').remove();

    $('<form accept-charset="UTF-8" class="eyForm" id="feed-backup-report">' +
        '<input type="hidden" name="Field0" value="">' +
        '<input type="hidden" name="Field1" value="">' +
        '<input type="hidden" name="Field2" value="">' +
        '<input type="hidden" name="Field3" value="">' +
        '<input type="hidden" name="Field4" value="">' +
        '<input type="hidden" name="LField0" value="Source">' +
        '<input type="hidden" name="LField1" value="Feed ID">' +
        '<input type="hidden" name="LField2" value="Error type">' +
        '<input type="hidden" name="LField3" value="Request URL">' +
        '<input type="hidden" name="LField4" value="Base Country">' +
        '<input type="hidden" name="pCountry" value="Global">' +
        '<input type="hidden" name="pCountryCode" value="GL">' +
        '<input type="hidden" name="Site" value="Global">' +
        '<input type="hidden" name="emailformflag" value="0">' +
        /* '<input type="hidden" name="email" value="xx@ey.com">' + */
        '<input type="hidden" name="pLang" value="English">' +
        '<input type="hidden" name="type" value="feed-backup-report">' +
        '<input type="hidden" name="DbPath" value="echannel/content.nsf">' +
        '<input type="hidden" name="pLiveHost" value="http://www.ey.com">' +
        '<input type="hidden" name="pLiveHost" value="http://www.ey.com/GL/en/Email_Alerts_-_Thank_You">' +
        '</form>').appendTo('body');


    $('#feed-backup-report input[name="Field0"]').val(source);
    $('#feed-backup-report input[name="Field1"]').val(feedID);
    $('#feed-backup-report input[name="Field2"]').val(scriptLocation);
    $('#feed-backup-report input[name="Field3"]').val(feedSourceURL);
    $('#feed-backup-report input[name="Field4"]').val(baseCountry);

    $.ajax({
        type: "POST",
        crossDomain: false,
        url: '/echannel/content.nsf/agtWFReturnURL?OpenAgent',
        data: $('#feed-backup-report').serialize(),
        success: function(data) {},
        error: function(xhr, ajaxOptions, thrownError) { /* alert(xhr.status); */ /* alert(thrownError); */ }
    });

}

// var monthsAbbr;
// var monthsFull;
// var monthsnum;
// var releaseDateMonthNum;
// var releaseDate;

var feedSourceUrlSuffix = '&mode=json&query=/content/contentitem';

var feedSourceUrls = {
    'GL' /* Global - ey-insights-datafeed: 8WXQCJ | insights-gl: 9RERAR  */: {
        id: 'OBF-USDD-9RERAR' + feedSourceUrlSuffix,
        local: 'ey-insights-feed.js'
    }
}

feedSourceUrls.getUrl = function(feedName) {
    if (feedName === null) return (null);
    else {
        var feed = this[feedName];
        if (feed === null) return (null);
        else if (isLocal) return (feedPrefixLocal + feed.local);
        else if (isDropbox) return (feedPrefixDropbox + feed.local);
        else if (isPreview) return (feedPrefixPreview + feed.id);
        else if (isProduction) return (feedPrefixProduction + feed.id);
        else return (null);
    }
}

feedSourceUrls.getBackupURL = function(feedName) {

    if (feedName === null) return (null);
    else {
        var feed = this[feedName];
        if (feed === null) return (null);
        else return (feed.id);
    }

}

eyInsights.init();
