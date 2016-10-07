/*

EYdate.js
29 May 2016 - JFL
 6 Oct 2016 - JD

releaseDate received from OBF

EYDate function supports the following formats:

YYYYMMDD : 20160529
YYYY-MM-DD : 2016-5-29; 2016-05-29  << RECOMMENDED FORMAT
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

        /* test releaseDate format for YYYYMMDD */

        if (parseFloat(releaseDate) === parseInt(releaseDate) && !isNaN(releaseDate) && releaseDate.length === 8) {

            var m = releaseDate.substring(4, 6);
            var d = releaseDate.substring(6, 8);
            var y = releaseDate.substring(0, 4);

            return new Date(m + ' ' + d + ' ' + y);

        } else if (releaseDate.indexOf('-') !== -1) {

            /* releaseDate format is YYYY-MM-DD */

            var parts = releaseDate.split("-");
            return new Date(parts[0], parts[1] - 1, parts[2]);

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
