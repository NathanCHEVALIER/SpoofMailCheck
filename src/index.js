const dns = require('dns');

const Status = {
    Valid: 'Valid',
    Undefined: 'Undefined',
    Error: 'Error',
    DnsError: 'DNS Resolution Error',
    MultipleSpfRecord: 'Multiple SPF Record Collision',
    NoSpfRecord: 'No SPF Record Found'
}


const checkSPF = async (domainName, advanced = false) => {
    return new Promise( async (resolve, reject) => {
        return await getSPF(domainName).then(spf => {
            spf.mechanisms = [];
            spf.modifiers = [];

            spf.spfRecord.slice(7).trim().split(' ').forEach(elt => {
                if ((found = elt.match(/^([-~+?]?)(all|ip4|ip6|a|mx|ptr|exists|include)(:.*)?$/))) {
                    spf.mechanisms.push({
                        'mechanism': found[0],
                        'qualifier': found[1],
                        'rule': found[2],
                        'value': found[3] === undefined ? found[3] : found[3].slice(1)
                    });
                }
                else if ((found = elt.match(/^(redirect|exp)(=.*)?$/))) {
                    spf.modifiers.push({ 'mechanism': found[0] });
                }
                else if ( !elt.match(/^\s*$/)) {
                    console.log('Unexpected Token: |' + elt + '|');
                }
            });
            
            resolve(spf);
        })
        .catch(e => reject(e));
    });
}


const getSPF = async (domainName) => {
    return new Promise( (resolve, reject) => {
        dns.resolveTxt(domainName, async (err, records) => {
            if (err)
                reject({'domain': domainName, 'dnsStatus': Status.DnsError });

            let spf = records.filter( record => {
                return record[0] && record[0].startsWith("v=spf1");
            });

            if (spf.length > 1)
                reject({'domain': domainName, 'dnsStatus': Status.MultipleSpfRecord });
                
            if (spf.length < 1)
                reject({'domain': domainName, 'dnsStatus': Status.NoSpfRecord});

            resolve({'domain': domainName, 'dnsStatus': Status.Valid, 'spfRecord': spf[0][0]});
        });
    });
}

module.exports = {
    getSPF,
    checkSPF
}