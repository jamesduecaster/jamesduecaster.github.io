/**
 * EY Digital Tax Guide - 2016 edition JavaScript
 * last update: 5 October 2016 10:12 AM - JD
 */

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
