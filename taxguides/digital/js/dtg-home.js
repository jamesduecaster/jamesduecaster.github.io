/**
 * EY Digital Tax Guide - 2016 edition JavaScript
 * last update: 27 Sep 2016 6:06 PM - JD
 */

$(document).ready(function(){

  $('[data-iso]').on('click', function(){

      var CCTaxGuideCountryISO = $(this).attr('data-iso');
      var CCTaxGuideCountryName = $(this).html();

      $('.country-name').html(CCTaxGuideCountryName);

      var baseHREF = '/gl/en/services/tax/ey-digital-tax-guide---cloud-service-operating-model';

      $('.corp-vat-basics-link').attr('href', baseHREF + '#' + CCTaxGuideCountryISO + '-Commissioned%20agent');
      $('.commissioned-agent-link').attr('href', baseHREF + '#' + CCTaxGuideCountryISO + '-Commissioned%20agent');
      $('.commissionaire-link').attr('href', baseHREF + '#' + CCTaxGuideCountryISO + '-Commissionaire');
      $('.buy-sell-link').attr('href', baseHREF + '#' + CCTaxGuideCountryISO + '-Buy-sell');

  });

  $('[data-sector]').on('click', function(){

    var thisSector = $(this).attr('data-sector');
    var thisSectorName = $(this).find('h3').html();
    var scenarioBaseHREF = '/gl/en/services/ey-digital-tax-guide---scenario---';

    $('.generic-modal-2-content .sector-name').html(thisSectorName);

    $('.generic-modal-2-content .scenario-1-link').hide();
    $('.generic-modal-2-content .scenario-2-link').hide();
    $('.generic-modal-2-content .scenario-3-link').hide();
    $('.generic-modal-2-content .scenario-4-link').hide();

    switch(thisSector) {
    case 'automotive':
        $('.generic-modal-2-content .scenario-1-link').attr('href', scenarioBaseHREF + 'digital-auto-design').show();
        $('.generic-modal-2-content .scenario-1-link h3').html('Digital auto design');

        $('.generic-modal-2-content .scenario-2-link').attr('href', scenarioBaseHREF + 'ridesharing').show();
        $('.generic-modal-2-content .scenario-2-link h3').html('Ridesharing');

        $('.generic-modal-2-content .scenario-3-link').attr('href', scenarioBaseHREF + 'remote-auto-maintenance').show();
        $('.generic-modal-2-content .scenario-3-link h3').html('Remote auto maintenance');
        break;
    case 'banking-and-finance':
        $('.generic-modal-2-content .scenario-1-link').attr('href', scenarioBaseHREF + 'crowdfunding').show();
        $('.generic-modal-2-content .scenario-1-link h3').html('Crowdfunding');

        $('.generic-modal-2-content .scenario-2-link').attr('href', scenarioBaseHREF + 'mobile-banking').show();
        $('.generic-modal-2-content .scenario-2-link h3').html('Mobile banking');
        break;
    case 'consumer-products':
        $('.generic-modal-2-content .scenario-1-link').attr('href', scenarioBaseHREF + 'online-retailer').show();
        $('.generic-modal-2-content .scenario-1-link h3').html('Online retailer');

        $('.generic-modal-2-content .scenario-2-link').attr('href', scenarioBaseHREF + 'supply-chain-reinvention').show();
        $('.generic-modal-2-content .scenario-2-link h3').html('Supply chain reinvention');

        $('.generic-modal-2-content .scenario-3-link').attr('href', scenarioBaseHREF + 'wearable-tech').show();
        $('.generic-modal-2-content .scenario-3-link h3').html('Wearable tech');
        break;
    case 'insurance':
        //code block
        break;
    case 'life-sciences':
        //code block
        break;
    case 'media-and-entertainment':
        //code block
        break;
    case 'technology':
        //code block
        break;
    case 'telecommunications':
        //code block
}




  });

});
