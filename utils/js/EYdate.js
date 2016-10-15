/*

EYdate.js
29 May 2016 - JFL
14 Oct 2016 - JD

releaseDate received from OBF

EYdate function supports the following formats:

YYYYMMDD : 20160529
YYYY-MM-DD : 2016-5-29; 2016-05-29  << RECOMMENDED FORMAT
YYYY/MM/DD : 2016/5/29; 2016/05/29
MMM DD YYYY : Oct 05 2016; Oct 5 2016; Oct 5, 2016; Oct 29, 2016
Month DD, YYYY : October 05 2016; October 5 2016; October 5, 2016; October 29, 2016
DD MMM YYYY : 05 Oct 2016; 5 Oct 2016
DD Month YYYY : 05 October 2016; 5 October 2016

valid format returns JavaScript Date object
invalid format returns 'Invalid Date'

*/

function EYdate(releaseDate) {

    if (releaseDate !== undefined) {

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
                  parts = releaseDate.split("-");
              } else if(hasSlash === true) {
                  parts = releaseDate.split("/");
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

            /* releaseDate format is other string */

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

    } else {

        return 'Invalid Date';

    }
}
