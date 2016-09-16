/**
 * EY Digital Tax Guide - 2016 edition JavaScript
 * last update: 16 Sep 2016 3:16 PM - JD
 */

var isLocal = location.href.indexOf("localhost") >= 0 || location.href.indexOf("C:/") >= 0;
var isDropbox = location.href.indexOf("dl.dropbox") >= 0;
var isPreview = location.href.indexOf("eycompreview") >= 0;
var isProduction = isLocal === false && isDropbox === false && isPreview === false;

var taxGuidePath = '/GL/en/Services/Tax/2015-Worldwide-Cloud-Computing-Tax-Guide';
var taxGuideOperatingModel;

function getCountryList() {

  $.ajax({
      url: '/Media/vwLUExtFile/Global_tax_guides/$FILE/taxguides_relatedcontent_versions.xml',
      type: 'GET',
      dataType: 'xml',
      async: false
  }).done(function(data) {

            var gdpgTitle = "Worldwide Estate and Inheritance Tax Guide";
            var taxGuideTitle;
      			$(data).find('destination').each(function() {

              taxGuideTitle = $(this).find('title').text();

              if( gdpgTitle === taxGuideTitle ) {

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

                    if(countryISO === 'AU' || countryISO === 'BR' || countryISO === 'CA' || countryISO === 'FR' || countryISO === 'IE' || countryISO === 'NZ' || countryISO === 'US'){
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

function loadHTMLFragment(url, fragment, target) {

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'html'
    }).done(function(data) {

        var fragmentContents = $("<div>").append($.parseHTML(data)).find('h3:contains("' + fragment + '")').parent().next().html();

        $(target).html(fragmentContents);

        $(target + ' a.generic-modal-link').replaceWith(function() {
            return $(this).contents();
        });

        $('.retrieving-contents').hide();

    }).fail(function(jqXHR, textStatus, errorThrown) {
        //console.log("GET error: jq:" + jqXHR +' - ts:' + textStatus + ' - et: ' + errorThrown);
    });

}

function onScrollInit(items, trigger) {
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

var thisCountryISO;

$(document).ready(function() {

    $('.cookienotification').remove();

    $('<div class="retrieving-contents"><img src="/Media/vwLUExtFile/jquery/$FILE/ajax-loader.gif"> Getting content...</div>').appendTo('body');

    taxGuideOperatingModel = $('h2[data-scenario-title]').attr('data-scenario-title');

    getCountryList();

    thisCountryISO = $('#country-dataselector option:selected').val();

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

        thisCountryName = $('#country-dataselector option[value="' + thisCountryISO + '"]').html();

        var thisURL = taxGuidePath + '---' + thisCountryName;

        $('.retrieving-contents').show();

        loadHTMLFragment(thisURL, taxGuideOperatingModel, '.intro');

        //$('#countryB').text(thisCountryName);

    });

    onScrollInit($('.os-animation'));
    onScrollInit($('.staggered-animation'), $('.staggered-animation-container'));

});
