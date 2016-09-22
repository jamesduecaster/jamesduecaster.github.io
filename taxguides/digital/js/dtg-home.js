/**
 * EY Digital Tax Guide - 2016 edition JavaScript
 * last update: 22 Sep 2016 11:43 AM - JD
 */


var CCTaxGuideCountryISO;

$(document).ready(function(){

  $('[data-iso]').on('click', function(){

      CCTaxGuideCountryISO = $(this).attr('data-iso');

      var baseHREF = 'gl/en/services/tax/ey-digital-tax-guide---cloud-service-operating-model';

      $('.commissioned-agent-link').attr('href', baseHREF + '#' + CCTaxGuideCountryISO + 'Commissioned%20agent');
      $('.commissionaire-link').attr('href', baseHREF + '#' + CCTaxGuideCountryISO + 'Commissionaire');
      $('.buy-sell-link').attr('href', baseHREF + '#' + CCTaxGuideCountryISO + 'Buy-sell');

  });

});
