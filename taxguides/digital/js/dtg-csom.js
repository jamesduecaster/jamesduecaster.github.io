/**
 * EY Digital Tax Guide - 2016 edition JavaScript
 * last update: 22 Sep 2016 9:21 AM - JD
 */

var isLocal = location.href.indexOf("localhost") >= 0 || location.href.indexOf("C:/") >= 0;
var isDropbox = location.href.indexOf("dl.dropbox") >= 0;
var isPreview = location.href.indexOf("eycompreview") >= 0;
var isProduction = isLocal === false && isDropbox === false && isPreview === false;

var taxGuidePathWCC = '/GL/en/Services/Tax/2015-Worldwide-Cloud-Computing-Tax-Guide';
var taxGuideOperatingModel;
var taxGuideURLWCC = '';

var taxGuideYearWCTG = '2016';
var taxGuideYearVAT = '2016';

function getCountryList() {

    $.ajax({
        url: '/Media/vwLUExtFile/Global_tax_guides/$FILE/taxguides_relatedcontent_versions.xml',
        type: 'GET',
        dataType: 'xml',
        async: false
    }).done(function(data) {

        var taxGuideTitleWCC = "Worldwide Cloud Computing Tax Guide";
        var taxGuideTitle;
        $(data).find('destination').each(function() {

            taxGuideTitle = $(this).find('title').text();

            if (taxGuideTitleWCC === taxGuideTitle) {

                var versionCount = 0;

                $(this).find('version').each(function() {

                    if (versionCount === 1) {
                        return;
                    }

                    versionCount++;
                    var output, countryName, countryISO, tempStyle;

                    $(this).find('country').each(function() {

                        countryName = $(this).text();
                        countryISO = $(this).attr('iso');

                        if (countryISO === 'XX' || countryISO === 'XY') {
                            tempStyle = ' class="active"';
                        } else {
                            tempStyle = '';
                        }

                        if (output === undefined) {
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
var thisCountryName;
var thisOperatingModelVal;
var thisOperatingModelHTML;


function loadTaxBasics() {

  $.ajax({
      url: '/ecimages/taxguides/WCTG-' + taxGuideYearWCTG + '/WCTG-' + $('#countryISO').html() + '.xml',
      type: 'GET',
      error: function() {
          //file does not exist
      },
      success: function() {
          var taxGuideCountryISOCC = $('#countryISO').html();
          var taxGuidePathWCTG = '/GL/en/Services/Tax/Worldwide-Corporate-Tax-Guide---XMLQS?preview&XmlUrl=/ec1mages/taxguides/WCTG-' + taxGuideYearWCTG + '/WCTG-' + taxGuideCountryISOCC + '.xml';


          processXML('/ecimages/taxguides/WCTG-' + taxGuideYearWCTG + '/WCTG-' + taxGuideCountryISOCC + '.xml');
          // for test // processXML('/Media/vwLUExtFile/Worldwide_Corporate_Tax_Guide/$FILE/wctg-ie.xml');

          var transformedHtmlWCTG = getSingleOrArrayHtml(XmlJson.worldFinancialData, 'worldFinancialData', getWorldFinancialDataHtml);

          $('.fig-caption .wctg-at-a-glance-note, .fig-caption .wctg-at-a-glance-footnote').remove();

          $('#wctg-at-a-glance').html(transformedHtmlWCTG)
              .before('<h4 class="wctg-at-a-glance-note">Worldwide Corporate Tax Guide*</h4>')
              .after('<p class="footnote wctg-at-a-glance-footnote">*Footnotes shown above refer to this country\'s/region\'s <a href="' + taxGuidePathWCTG + '">Worldwide Corporate Tax Guide</a> page.</p>');

          $('#wctg-at-a-glance a[href^="#section-"]').each(function() {
              $(this).attr('href', taxGuidePathWCTG + $(this).attr('href'));
              $(this).append(' of the Worldwide Corporate Tax Guide');
          });
      }
  });

  $.ajax({
      url: '/ecimages/taxguides/VAT-' + taxGuideYearVAT + '/VAT-' + $('#countryISO').html() + '.xml',
      type: 'GET',
      error: function() {
          //file does not exist
      },
      success: function() {
          var taxGuideCountryISOCC = $('#countryISO').html();
          var taxGuidePathVAT = '/GL/en/Services/Tax/Worldwide-VAT--GST-and-Sales-Tax-Guide---XMLQS?preview&XmlUrl=/ec1mages/taxguides/VAT-' + taxGuideYearVAT + '/VAT-' + taxGuideCountryISOCC + '.xml';

          processXML('/ecimages/taxguides/VAT-' + taxGuideYearVAT + '/VAT-' + taxGuideCountryISOCC + '.xml');

          var transformedHtmlVAT = getSingleOrArrayHtml(XmlJson.worldFinancialData, 'worldFinancialData', getWorldFinancialDataHtml);

          $('.fig-caption .vat-at-a-glance-note, .fig-caption .vat-at-a-glance-footnote').remove();

          $('#vat-at-a-glance').html(transformedHtmlVAT)
              .before('<h4 class="vat-at-a-glance-note">VAT, GST and Sales Tax Guide*</h4>')
              .after('<p class="footnote vat-at-a-glance-footnote">*<a href="' + taxGuidePathVAT + '">See the Worldwide VAT, GST and Sales Tax Guide (' + taxGuideYearVAT + ')</a> for additional information on indirect taxation.</p>');

          $('#vat-at-a-glance a[href^="#section-"]').each(function() {
              $(this).attr('href', taxGuidePathVAT + $(this).attr('href'));
              $(this).append(' of the Worldwide VAT, GST and Sales Tax Guide');
          });
      }
  });

}

function displayModal(modalName) {

    $('#generic-modal-trigger').click();

    $('.generic-modal-content').html('');
    var thisHTML = $('#' + modalName).clone();

    var thisTitle = $('#' + modalName).parent().parent().children('h3').html();

    $('<h3>' + thisTitle + '</h3>').appendTo('.generic-modal-content');
    $(thisHTML).appendTo('.generic-modal-content');
    $('.generic-modal-content span').show();

}

function renderGenericModal() {

    $('<div class="modal generic-modal">' +
        '<label for="generic-modal">' +
        '<div id="generic-modal-trigger" class="modal-trigger" style="display: none">Click for Modal</div>' +
        '</label>' +
        '<input class="modal-state" id="generic-modal" type="checkbox" />' +
        '<div class="modal-fade-screen">' +
        '<div class="modal-inner">' +
        '<div class="modal-close" for="generic-modal"></div>' +
        '<div class="modal-content generic-modal-content generic-modal-content"></div>' +
        '</div>' +
        '</div>' +
        '</div>').appendTo('body');

    $('#generic-modal').on("change", function() {
        if ($(this).is(":checked")) {
            $("body").addClass("modal-open");
        } else {
            $("body").removeClass("modal-open");
        }
    });

    $(".generic-modal .modal-fade-screen, .generic-modal .modal-close").on("click", function() {
        $(".modal-state:checked").prop("checked", false).change();
    });

    $(".modal-inner").on("click", function(e) {
        e.stopPropagation();
    });

}


$(document).ready(function() {

    $('.cookienotification').remove();

    $('<div class="retrieving-contents"><img src="/Media/vwLUExtFile/jquery/$FILE/ajax-loader.gif"> Getting content...</div>').appendTo('body');

    renderGenericModal();

    getCountryList();

    $('#model-dataselector').on('change', function() {

        thisCountryISO = $('#country-dataselector').val();
        thisOperatingModelVal = $('#model-dataselector').val();
        thisOperatingModelHTML = $('#model-dataselector option[value="' + thisOperatingModelVal + '"]').html();
        location.hash = '#' + thisCountryISO + '-' + thisOperatingModelHTML;

    });

    $('#country-dataselector').on('change', function() {

        thisCountryISO = $('#country-dataselector').val();
        thisOperatingModelVal = $('#model-dataselector').val();
        thisOperatingModelHTML = $('#model-dataselector option[value="' + thisOperatingModelVal + '"]').html();
        location.hash = '#' + thisCountryISO + '-' + thisOperatingModelHTML;

    });

    onScrollInit($('.os-animation'));
    onScrollInit($('.staggered-animation'), $('.staggered-animation-container'));

    $(window).hashchange(function() {

        var currentHash = location.hash.substring(1, location.hash.length);

        if (currentHash === '') {

            thisCountryISO = $('#country-dataselector option:selected').val();
            $('#countryISO').html(thisCountryISO);

            thisCountryName = $('#country-dataselector option[value="' + thisCountryISO + '"]').html();
            $('#countryName, .country-name').html(thisCountryName);

            var thisCountryNameDash = thisCountryName.replace(/ /g, '-');
            taxGuideURLWCC = taxGuidePathWCC + '---' + thisCountryNameDash;

            thisOperatingModelVal = $('#model-dataselector option:selected').val();

            $('.retrieving-contents').show();

            loadHTMLFragment(taxGuideURLWCC, 'maincontent', thisOperatingModelVal);

            loadTaxAlerts('SO3', thisCountryISO, 4);
            loadRelatedContent(thisCountryISO);

        } else {

            $('#country-dataselector option').each(function() {

                var thisOption = $(this).val();

                var countryHash = currentHash.substring(0, currentHash.indexOf('-'));

                if (thisOption === countryHash.toUpperCase()) {

                    thisCountryISO = $(this).val();
                    $('#countryISO').html(thisCountryISO);

                    thisCountryName = $(this).html();
                    $('#countryName, .country-name').html(thisCountryName);

                    var thisCountryNameDash = thisCountryName.replace(/ /g, '-');

                    taxGuideURLWCC = taxGuidePathWCC + '---' + thisCountryNameDash;

                    $('#country-dataselector').val(thisOption);

                }

            });

            $('#model-dataselector option').each(function() {

                var thisOption = $(this).html();
                var modelHash = unescape(currentHash.substring(currentHash.indexOf('-') + 1, currentHash.length));

                if (thisOption === modelHash) {

                    thisOperatingModelVal = $(this).val();

                    $('#model-dataselector').val(thisOperatingModelVal);

                }

            });

            $('.retrieving-contents').show();

            loadHTMLFragment(taxGuideURLWCC, 'maincontent', thisOperatingModelVal);
            loadTaxAlerts('S03', thisCountryISO, 4);
            loadRelatedContent(thisCountryISO);
            loadTaxBasics();

        }

        $('#taxalerts_container ul, #rccontainer ul').addClass('default-ul');

    });

    $(window).hashchange();

});
