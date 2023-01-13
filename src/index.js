const dns = require('dns');

/**
 * Soft: just all mechanism
 * Advanced: build the list and check for every IP
 */

const checkSPF = async (domainName) => {
    dns.resolveTxt(domainName, function(err, records) {
        records.forEach(function(r) {
            if (r[0] && r[0].includes("v=spf1")) {
                spfRecord = r[0].split('v=spf1 ');

                spfRecord.filter( elt => elt != '' ).forEach(elt => {
                    console.log('SPF for ' + domainName + ': v=spf1 ' + elt);

                    let mechanisms = elt.trim().split(' ');
                    
                    mechanisms.forEach(a => {
                        if (a.match(/[-~+?]{1}all/))
                            console.log(a);
                    });

                    let modifiers = mechanisms.filter(elt => {
                        return elt.includes('=');
                    })

                    console.log(modifiers);
                });
            }
        });

        if (!spfRecord) {
            console.log("No SPF Record found");
        }
    });
}

module.exports = {
    checkSPF,
}