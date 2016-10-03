/**
 * EY Digital Tax Guide - scenario - 2016 edition JavaScript
 * last update: 3 Oct 2016 4:02 PM - JD
 */

var isLocal = location.href.indexOf("localhost") >= 0 || location.href.indexOf("C:/") >= 0;
var isDropbox = location.href.indexOf("dl.dropbox") >= 0;
var isPreview = location.href.indexOf("eycompreview") >= 0;
var isProduction = isLocal === false && isDropbox === false && isPreview === false;

var thisCountryISO;
var thisCountryName;
var thisScenario;

var myData;

var dtg = dtg || {};

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

        myData = data;
        var thisScenarioData = eval('myData.scenarios.' + scenario);

        $('#scenario-a1').html(thisScenarioData.a1);
        $('#scenario-a2').html(thisScenarioData.a2);
        $('#scenario-a3').html(thisScenarioData.a3);
        $('#scenario-a4').html(thisScenarioData.a4);
        $('#scenario-a5').html(thisScenarioData.a5);

        var thisContactData;
        if (thisScenarioData.contacts !== undefined) {
            thisContactData = thisScenarioData.contacts;
        } else {
            thisContactData = myData.contacts;
        }

        $('.dtg-contact').remove();

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
                '<div class="contact-title">' + title + '</div>' +
                '<div class="contact-title">' + firmName +'</div>' +
                '<div class="contact-phone">' + phone + '</div>' +
                /* '<div class="contact-email"><a href="mailto:' + email + '">' + email + '</a></div>' + */
                '</div>').appendTo('.dtg-contacts');

            var scenarioKeys = '';

            var allScenariosData = myData.scenarios;
            for (var key in allScenariosData) {
                //var value = allScenariosData[key];
                if (scenarioKeys === '') {
                    scenarioKeys = key;
                } else {
                    scenarioKeys += ',' + key;
                }
            }

            dtg.setScenarioList(scenarioKeys);

            $('.retrieving-contents').hide();

        }

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("GET error: jq:" + jqXHR + ' - ts:' + textStatus + ' - et: ' + errorThrown);
    });


}


dtg.setCountryList = function() {

    $.ajax({
        url: '/Media/vwLUExtFile/Global_tax_guides/$FILE/taxguides_relatedcontent_versions_test.xml',
        type: 'GET',
        dataType: 'xml',
        async: false
    }).done(function(data) {

        var taxGuideTitleDTG = "Digital Tax Guide";
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

                    var thisScenarioCountryList = eval('dtg.control.scenarios[0].' + thisScenario + '.countries');

                    $(this).find('country').each(function() {

                        countryName = $(this).text();
                        countryISO = $(this).attr('iso');

                        if (countryISO === 'XX' || countryISO === 'XY') {
                            tempStyle = ' class="active"';
                        } else {
                            tempStyle = '';
                        }

                        if (thisScenarioCountryList.indexOf(countryISO) !== -1) {

                            if (output === undefined) {
                                output = '<option' + tempStyle + ' value="' + countryISO + '" selected>' + countryName + '</option>';
                            } else {
                                output += '<option' + tempStyle + ' value="' + countryISO + '">' + countryName + '</option>';
                            }

                        }

                    });

                    $('#country-dataselector').html(output);

                });

            }

        });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        //console.log("GET error: jq:" + jqXHR +' - ts:' + textStatus + ' - et: ' + errorThrown);
    });

}


dtg.setScenarioList = function(scenarioKeys) {

    var scenarioKeysArray = scenarioKeys.split(',');
    var allScenariosData = dtg.control.scenarios[0];

    $('#scenario-dataselector').html('')

    for (var i = 0; i < scenarioKeysArray.length; i++) {

        var scenarioKey = scenarioKeysArray[i];

        var thisTitle = eval('allScenariosData.' + scenarioKey + '.title');
        var thisLink = eval('allScenariosData.' + scenarioKey + '.link');

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
            "countries": "AU, DK, FR, IT, JP, MX, NO, PH, PT, US"
        },
        "scenario2": {
            "title": "Payment processing",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---payment-processing",
            "countries": "AU, DK, FR, IT, JP, MX, NO, PH, PT, US"
        },
        "scenario3": {
            "title": "Streaming media",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---streaming-media",
            "countries": "AU, DK, FR, IT, JP, MX, NO, PH, PT, US"
        },
        "scenario4": {
            "title": "Ridesharing",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---ridesharing",
            "countries": "AU, DK, FR, IT, MX, NO, PT, US"
        },
        "scenario5": {
            "title": "Digital auto design",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---digital-auto-design",
            "countries": "AU, DK, FR, IT, MX, NO, PT, US"
        },
        "scenario6": {
            "title": "Remote auto maintenance",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---remote-auto-maintenance",
            "countries": "AU, DK, FR, IT, MX, NO, PT, US"
        },
        "scenario7": {
            "title": "Mobile banking",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---mobile-banking",
            "countries": "AU, DK, FR, IT, MX, NO, PH, PT, US"
        },
        "scenario8": {
            "title": "Crowdfunding",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---crowdfunding",
            "countries": "AU, DK, FR, IT, MX, NO, PH, PT, US"
        },
        "scenario9": {
            "title": "Wearable tech",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---wearable-tech",
            "countries": "AU, DK, FR, IT, JP, MX, NO, PH, PT, US"
        },
        "scenario10": {
            "title": "Online retailer",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---online-retailer",
            "countries": "AU, DK, FR, IT, JP, MX, NO, PH, PT, US"
        },
        "scenario11": {
            "title": "Supply chain reinvention",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---supply-chain-reinvention",
            "countries": "AU, DK, FR, IT, JP, MX, NO, PH, PT, US"
        },
        "scenario12": {
            "title": "Drones in business",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---drones-in-business",
            "countries": "AU, DK, FR, IT, JP, NO, PH, PT, US"
        },
        "scenario13": {
            "title": "Media content",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---media-content",
            "countries": "AU, DK, FR, IT, JP, MX, NO, PH, PT, US"
        },
        "scenario14": {
            "title": "Travel insurance",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---travel-insurance",
            "countries": "AU, DK, FR, IT, JP, NO, PH, PT, US"
        },
        "scenario15": {
            "title": "Personal accident insurance",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---personal-accident-insurance",
            "countries": "AU, DK, FR, IT, JP, NO, PH, PT, US"
        },
        "scenario16": {
            "title": "Digital value-based care initiatives",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---digital-value-based-care-initiatives",
            "countries": "DK, FR, IT, NO, PT, US"
        },
        "scenario17": {
            "title": "Health care data platform",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---health-care-data-platform",
            "countries": "DK, FR, IT, NO, PT, US"
        },
        "scenario18": {
            "title": "Medical software",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---scenario---medical-software",
            "countries": "DK, FR, IT, NO, PT, US"
        }
    }]
}

$(document).ready(function() {

    $('.eyhero').addClass('reduce-height');

    var pageHeadings = $('.maincolumn > h4, .maincolumn > h3');

    pageHeadings.appendTo('.article-hero-container');

    $('.article-hero-container h4').wrapInner('<a href="http://www.ey.com/gl/en/services/tax/ey-digital-tax-guide-dev"></a>');

    $('.cookienotification').remove();

    var countryApreviousText = $('#countryA').text();

    thisCountryISO = $('#country-dataselector option:selected').val();
    thisCountryName = $('#country-dataselector option[value="' + thisCountryISO + '"]').html();
    thisScenario = $('#scenarioid').html();

    dtg.setCountryList();

    $('.accordion div:nth-child(-n+4)').hover(function() {

        $('#countryA').text(thisCountryName);
        $('#countryB').text('Country B');

    }, function() {

        $('#countryA').text(countryApreviousText);
        $('#countryB').text(thisCountryName);

    });

    $('#country-dataselector').on('change', function() {

        $('.retrieving-contents').show();

        thisCountryISO = $('#country-dataselector').val();
        thisCountryName = $('#country-dataselector option[value="' + thisCountryISO + '"]').html();

        $('#countryB').text(thisCountryName);

        location.hash = '#' + thisCountryISO + '-' + thisScenario;

    });

    dtg.onScrollInit($('.os-animation'));
    dtg.onScrollInit($('.staggered-animation'), $('.staggered-animation-container'));

    $(window).hashchange(function() {

        var currentHash = location.hash.substring(1, location.hash.length);

        if (currentHash === '') {

            thisCountryISO = $('#country-dataselector option:selected').val();
            $('#countryISO').html(thisCountryISO);

            thisCountryName = $('#country-dataselector option[value="' + thisCountryISO + '-' + thisScenario + '"]').html();

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

        dtg.getCountryData(thisCountryISO);

    });

    $(window).hashchange();

});
