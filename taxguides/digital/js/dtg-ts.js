/**
 * EY Digital Tax Guide - Technology scenario - 2016 edition JavaScript
 * last update: 26 Sep 2016 4:45 PM - JD
 */

var isLocal = location.href.indexOf("localhost") >= 0 || location.href.indexOf("C:/") >= 0;
var isDropbox = location.href.indexOf("dl.dropbox") >= 0;
var isPreview = location.href.indexOf("eycompreview") >= 0;
var isProduction = isLocal === false && isDropbox === false && isPreview === false;

var myData;

var dtg = dtg || {};

dtg.getCountryData = function(countryISO) {

    var thisCountryISO = countryISO.toLowerCase();
    var scenario = $('h2[data-scenario-title]').attr('data-scenario-title');

    //var jsonLocation = 'http://cdn.ey.com/echannel/gl/en/services/tax/ey-digital-tax-guide/data/' + thisCountryISO + '.js?jsoncallback=?'
    var dataLocation;
    if (isDropbox) {
        dataLocation = 'https://dl.dropboxusercontent.com/u/767429/ey/taxguides/digital/data/';
    } else {
        dataLocation = '/Media/vwLUExtFile/ey-digital-tax-guide-data/$FILE/';
    }

    // http://cdn.ey.com/echannel/gl/en/services/tax/ey-digital-tax-guide/data/
    // https://dl.dropboxusercontent.com/u/767429/ey/taxguides/digital/data/
    // /Media/vwLUExtFile/ey-digital-tax-guide-data/$FILE/

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

        var thisContactData;
        if(thisScenarioData.contacts !== undefined) {
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
          var photo = thisContactData[i]['photo'];
          var photoHTML = '<img src="' + photo + '"/>';
          var title = thisContactData[i]['title'];


          $('<div class="dtg-contact">' +
            '<div class="contact-photo">' + photoHTML + '</div>' +
            '<div class="contact-name"><strong>' + firstName + ' ' + lastName + '</strong></div>' +
            '<div class="contact-title">' + title + '</div>' +
            '<div class="contact-phone">' + phone + '</div>' +
            '<div class="contact-email"><a href="mailto:' + email + '">' + email + '</a></div>' +
          '</div>').appendTo('.dtg-contacts');

          var scenarioKeys = '';

          var allScenariosData = myData.scenarios;
          for(var key in allScenariosData) {
            //var value = allScenariosData[key];
            if(scenarioKeys === '') {
              scenarioKeys = key;
            } else {
              scenarioKeys += ',' + key;
            }
          }

          dtg.setScenarioList(scenarioKeys);

        }

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("GET error: jq:" + jqXHR + ' - ts:' + textStatus + ' - et: ' + errorThrown);
    });


}


dtg.setCountryList= function() {

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

              if( taxGuideTitleDTG === taxGuideTitle ) {

                var versionCount = 0;

      					$(this).find('version').each(function() {

      						if(versionCount === 1) {
      							return;
      						}

                  versionCount++;
                  var output, countryName, countryISO, tempStyle;

                  $(this).find('country').each(function() {

                    countryName = $(this).text();
                    countryISO = $(this).attr('iso');

                    if(countryISO === 'XX' || countryISO === 'XY'){
                      tempStyle = ' class="active"';
                    } else {
                      tempStyle = '';
                    }

                    if(output === undefined) {
                      output = '<option' + tempStyle + ' value="' + countryISO + '" selected>' + countryName + '</option>';
                    } else {
                      output += '<option' + tempStyle + ' value="' + countryISO + '">' + countryName + '</option>';
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

  for(var i=0; i < scenarioKeysArray.length; i++) {

    var scenarioKey = scenarioKeysArray[i];

    var thisTitle = eval('allScenariosData.' + scenarioKey + '.title');
    var thisLink = eval('allScenariosData.' + scenarioKey + '.link');

    $('<option data-scenario="' + scenarioKey + '" value="' + thisLink + '" >' + thisTitle + '</option>').appendTo('#scenario-dataselector');

  }

  $('#scenario-dataselector').change(function() {
    if($(this).val() !== '') {
      location.href= $(this).val();
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
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---digital-advertising"
        },
        "scenario2": {
            "title": "Payment processing",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---payment-processing"
        },
        "scenario3": {
            "title": "Streaming media",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---streaming-media"
        },
        "scenario4": {
            "title": "Ride sharing",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---ride-sharing"
        },
        "scenario5": {
            "title": "Digital auto design",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---digital-auto-design"
        },
        "scenario6": {
            "title": "Remote auto maintenance",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---remote-auto-maintenance"
        },
        "scenario7": {
            "title": "Mobile banking",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---mobile-banking"
        },
        "scenario8": {
            "title": "Crowdfunding",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---crowdfunding"
        },
        "scenario9": {
            "title": "Wearable tech",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---wearable-tech"
        },
        "scenario10": {
            "title": "Online retailer",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---online-retailer"
        },
        "scenario11": {
            "title": "Supply chain reinvention",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---supply-chain-reinvention"
        },
        "scenario12": {
            "title": "Drones in business",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---drones-in-business"
        },
        "scenario13": {
            "title": "Media content",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---media-content"
        },
        "scenario14": {
            "title": "Travel insurance",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---travel-insurance"
        },
        "scenario15": {
            "title": "Personal accident insurance",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---personal-accident-insurance"
        },
        "scenario16": {
            "title": "Digital value-based care initiatives",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---digital-value-based-care-initiatives"
        },
        "scenario17": {
            "title": "Health care data platform",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---health-care-data-platform"
        },
        "scenario18": {
            "title": "Medical software",
            "link": "/gl/en/services/tax/ey-digital-tax-guide---technology-scenario---medical-software"
        }
    }]
}

var thisCountryISO;

$(document).ready(function() {

  $('.eyhero').addClass('reduce-height');

  var pageHeadings = $('.maincolumn > h4, .maincolumn > h3');

  pageHeadings.appendTo('.article-hero-container');

  $('.article-hero-container h4').wrapInner('<a href="http://www.ey.com/gl/en/services/tax/ey-digital-tax-guide-dev"></a>');

    $('.cookienotification').remove();

    dtg.setCountryList();

    thisCountryISO = $('#country-dataselector option:selected').val();

    dtg.getCountryData(thisCountryISO);

    thisCountryName = $('#country-dataselector option[value="' + thisCountryISO + '"]').html();

    var countryApreviousText = $('#countryA').text();

    $('.accordion div:nth-child(-n+4)').hover(function() {

        $('#countryA').text(thisCountryName);
        $('#countryB').text('Country B');

    }, function() {

        $('#countryA').text(countryApreviousText);
        $('#countryB').text(thisCountryName);

    });

    $('#country-dataselector').on('change', function() {

        thisCountryISO = $('#country-dataselector').val();

        dtg.getCountryData(thisCountryISO);

        thisCountryName = $('#country-dataselector option[value="' + thisCountryISO + '"]').html();

        $('#countryB').text(thisCountryName);

    });

    dtg.onScrollInit($('.os-animation'));
    dtg.onScrollInit($('.staggered-animation'), $('.staggered-animation-container'));

});
