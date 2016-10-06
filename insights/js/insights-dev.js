/*
 * Insights JavaScript
 * Last update: 6 October 2016 4:59 PM - JD
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

var eyInsights = eyInsights || {};

delete console;

jQuery.fn.outerWidth = function() {

};

//Retrieved from: http://en.literateprograms.org/Quicksort_(JavaScript)?oldid=8410
//Modified to compare date values

Array.prototype.swap = function(a, b) {
    var tmp = this[a];
    this[a] = this[b];
    this[b] = tmp;
};

function isInteger(value) {
    if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
        return true;
    } else {
        return false;
    }
}

function getDateNumber(str) {
    if (typeof(str) == "string" && str.charAt(0) == "0") str = str.substring(1);
    return (parseInt(str));
}

function quickSortDocs(doc, ascending, begin, end) {
    if (end - 1 > begin) {
        var pivot = begin + Math.floor(Math.random() * (end - begin));
        pivot = sortPartition(doc, begin, end, pivot, ascending);
        quickSortDocs(doc, ascending, begin, pivot);
        quickSortDocs(doc, ascending, pivot + 1, end);
    }
}

function sortPartition(doc, begin, end, pivot, ascending) {
    var piv = doc[pivot];
    doc.swap(pivot, end - 1);
    var store = begin;
    var ix;
    for (ix = begin; ix < end - 1; ++ix) {
        var compareDate = eyInsights.getReleaseDate(doc[ix]);
        var pivotDate = eyInsights.getReleaseDate(piv);
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

function truncate(text, limit, append) {
    if (typeof text !== 'string')
        return '';
    if (typeof append == 'undefined')
        append = '...';
    var parts = text.split(' ');
    if (parts.length > limit) {
        // loop backward through the string
        for (var i = parts.length - 1; i > -1; --i) {
            // if i is over limit, drop this word from the array
            if (i + 1 > limit) {
                parts.length = i;
            }
        }
        // add the truncate append text
        parts.push(append);
    }
    // join the array back into a string
    return parts.join(' ');
}

eyInsights.init = function() {
    $('#featuremenu').html(this.navigation());
    //this.analytics('UA-48955156-3');
};

eyInsights.analytics = function(propertyID) {
    Analytics.AddProperty(propertyID);
    Analytics.TrackAll();
};

eyInsights.daysAgo = function(numberOfDays) {
    return this.getDate(numberOfDays);
};

eyInsights.debugIt = function(debuggery) {
    //console.log(debuggery);
    $('#debugit').append(debuggery + '<br />');
};

eyInsights.displayInsight = function(insight) {

    this.hideAllContent();

    $('.serviceslist a').removeClass('active');

    var insightID = insight;
    var insightIDTemp = insightID.substring(insightID.indexOf('insights-') + 9, insightID.length);

    $('.serviceslist a#' + insightID).addClass('active');

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

    $grid.isotope('updateSortData').isotope({
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

    $grid.isotope({
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
                releaseDate = 'Jan 1 2013';
            }
        } else {
            releaseDate = 'Jan 1 2013';
        }

        releaseDate = releaseDate.trim();

        /* test releasedate format for YYYYMMDD */

        if (parseFloat(releasedate) === parseInt(releasedate) && !isNaN(releasedate) && releasedate.length === 8) {

            var m = releasedate.substring(4, 6);
            var d = releasedate.substring(6, 8);
            var y = releasedate.substring(0, 4);

            return new Date(m + ' ' + d + ' ' + y);

        } else if (releasedate.indexOf('-') !== -1) {

            /* releasedate format is YYYY-MM-DD */

            var parts = releasedate.split("-");
            return new Date(parts[0], parts[1] - 1, parts[2]);

        } else {

            /* releasedate format is other string */

            var d = new Date(releasedate);

            if (Object.prototype.toString.call(d) === "[object Date]") {

                /* is a date */
                if (isNaN(d.getTime())) {

                    /* date is not valid */
                    return 'Invalid Date';

                } else {

                    /* date is valid */
                    return d;

                }

            } else {

                /* date is not valid */
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


        submitFeedBackupReport('EY Insights', backupID, 'Ajax error - ' + errorThrown, feedSourceURL, baseCountry);

        var backupQuery = '/content/contentitem';
        backupQuery += insightsXPathQuery;

        feedData = backupOutBoundFeed(backupID, backupQuery, 'json');
        feedData = $.parseJSON(feedData);
        feedData = feedData.results;

        if (feedData[0].error) {
            submitFeedBackupReport('EY Insights', backupID, 'Backup feed failure', feedSourceURL, baseCountry);
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

eyInsights.getOutput = function() {

    for (var j = 0; j < feedData.length; j++) {
      if (getReleaseDate(feedData[j]) !== 'Invalid Date') {
        feedDataVRD.push(feedData[j]);
      } else {

        if($('#docswerrors').length === 0) {
          $('<div id="docswerrors" style="display:none"></div>').appendTo('body');
        }
        $('#docswerrors').append('<p>' + feedData[j].title + '</p>');
      }
    }

    quickSortDocs(feedDataVRD, false, 0, feedDataVRD.length);

    for (var i = 0; feedDataVRD !== null && typeof(feedDataVRD) === "object" && i < feedDataVRD.length; i++) {

        var releaseDate = this.getReleaseDateHTML(feedDataVRD[i]);

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

            this.renderToPage(backgroundImgStyle, colorClass, customStyles, heading, imgMaskDsp, insightClass, link, newWindowHTML, noImageClass, priorityStyles, releaseDate, releaseDateHiddenStyle, releaseDateNumber, subhead, wrapHeadSubHeadBegin, wrapHeadSubHeadEnd);

        } else if (link.toLowerCase().indexOf(docCountryLang) !== -1) { //matching country/lang

            this.renderToPage(backgroundImgStyle, colorClass, customStyles, heading, imgMaskDsp, insightClass, link, newWindowHTML, noImageClass, priorityStyles, releaseDate, releaseDateHiddenStyle, releaseDateNumber, subhead, wrapHeadSubHeadBegin, wrapHeadSubHeadEnd);

        } else if (share.indexOf(docCountryLang) !== -1) {

            this.renderToPage(backgroundImgStyle, colorClass, customStyles, heading, imgMaskDsp, insightClass, link, newWindowHTML, noImageClass, priorityStyles, releaseDate, releaseDateHiddenStyle, releaseDateNumber, subhead, wrapHeadSubHeadBegin, wrapHeadSubHeadEnd);

        }

    } /* end for */


    $grid = $('#tile-container').isotope({
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

// var monthsAbbr;
// var monthsFull;
// var monthsnum;
// var releaseDateMonthNum;
// var releaseDate;

var feedSourceUrlSuffix = '&mode=json&query=/content/contentitem';

var feedSourceUrls = {
    'GL' /* Global - ey-insights-datafeed */: {
        id: 'OBF-USDD-8WXQCJ' + feedSourceUrlSuffix,
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

function submitFeedBackupReport(source, feedID, scriptLocation, feedSourceUrl, baseCountry) {

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

$(document).ready(function() {

    eyInsights.init();

    $('.cookienotification').remove();

    $(window).hashchange(function() {

        var currentHash = location.hash;

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
