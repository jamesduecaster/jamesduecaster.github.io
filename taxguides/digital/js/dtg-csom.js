/**
 * EY Digital Tax Guide - 2016 edition JavaScript
 * last update: 19 Sep 2016 5:45 PM - JD
 */

var isLocal = location.href.indexOf("localhost") >= 0 || location.href.indexOf("C:/") >= 0;
var isDropbox = location.href.indexOf("dl.dropbox") >= 0;
var isPreview = location.href.indexOf("eycompreview") >= 0;
var isProduction = isLocal === false && isDropbox === false && isPreview === false;

var taxGuidePath = '/GL/en/Services/Tax/2015-Worldwide-Cloud-Computing-Tax-Guide';
var taxGuideOperatingModel;
var taxGuideURL = '';

function getCountryList() {

  $.ajax({
      url: '/Media/vwLUExtFile/Global_tax_guides/$FILE/taxguides_relatedcontent_versions.xml',
      type: 'GET',
      dataType: 'xml',
      async: false
  }).done(function(data) {

            var gdpgTitle = "Worldwide Cloud Computing Tax Guide";
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

function loadHTMLFragment(url, fragment, fragmentSection) {

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'html'
    }).done(function(data) {

        //var fragmentContents = $("<div>").append($.parseHTML(data)).find('h3:contains("' + fragment + '")').parent().next();

        var fragmentContents = $("<div>").append($.parseHTML(data)).find('.' + fragment);
        var contactsContents = fragmentContents.find('.contactsbody').html();

        var fragmentSectionContents = fragmentContents.find('h3:contains("' + fragmentSection + '")').parent().next();

        var introContents = fragmentSectionContents.find('p:eq(0)').html();
        var imgContents = fragmentSectionContents.find('p:eq(1)').html();
        var accordionContents = fragmentSectionContents.find('.subaccordion:eq(0)').html();

        //console.log('fragmentContents');
        //console.log(fragmentContents);

        //$(target).html(fragmentContents);

        $('.intro').html(introContents);
        $('figure.scenario').html(imgContents);
        $('.country-data .accordion').html(accordionContents);

        $('.accordion').accordion('destroy');
        $('.accordion').accordion({
          collapsible: true,
          active: false,
          autoHeight: false,
          fillSpace: false
        });

        $('.dtg-contacts').html(contactsContents);

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

    taxGuideOperatingModel = $('h2[data-operating-model-title]').attr('data-operating-model-title');

    getCountryList();

    $('#country-dataselector').on('change', function() {

        thisCountryISO = $('#country-dataselector').val();

        location.hash = '#' + thisCountryISO;

        // thisCountryName = $('#country-dataselector option[value="' + thisCountryISO + '"]').html();
        // thisCountryName = thisCountryName.replace(/ /g, '-');
        //
        // taxGuideURL = taxGuidePath + '---' + thisCountryName;
        //
        // $('.retrieving-contents').show();
        //
        // loadHTMLFragment(taxGuideURL, 'maincontent', taxGuideOperatingModel);

    });

    onScrollInit($('.os-animation'));
    onScrollInit($('.staggered-animation'), $('.staggered-animation-container'));

    $(window).hashchange(function() {

      var currentHash = location.hash.substring(1, location.hash.length);

      if (currentHash === '') {

        thisCountryISO = $('#country-dataselector option:selected').val();
        thisCountryName = $('#country-dataselector option[value="' + thisCountryISO + '"]').html();
        thisCountryName = thisCountryName.replace(/ /g, '-');
        taxGuideURL = taxGuidePath + '---' + thisCountryName;

        $('.retrieving-contents').show();

        loadHTMLFragment(taxGuideURL, 'maincontent', taxGuideOperatingModel);

        loadTaxAlerts('SO3', thisCountryISO, 4);

      } else {

        $('#country-dataselector option').each(function(){

          var thisOption = $(this).val();

          if(thisOption === currentHash.toUpperCase()) {

            thisCountryName = $(this).html();
            thisCountryName = thisCountryName.replace(/ /g, '-');

            taxGuideURL = taxGuidePath + '---' + thisCountryName;

            $('#country-dataselector').val(thisOption);

            $('.retrieving-contents').show();
            loadHTMLFragment(taxGuideURL, 'maincontent', taxGuideOperatingModel);

            loadTaxAlerts('S03', thisOption, 4);

          }

        });

      }

    });

    $(window).hashchange();

});
