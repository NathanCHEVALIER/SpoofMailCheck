const { getSPF, checkSPF } = require('../src/index.js');

const domains = [
    'mgen.fr',
    'stroople.com',
    'babilou.com',
    'babiloufamily.com',
    'epimap.fr',
    'epita-premium.fr'
]

domains.map( async (elt) => {
    await checkSPF(elt).then(res => console.log(res));
});

/*
Promise.all(
    domains.map( async (elt) => {
        return new Promise( async (resolve, reject) => {
            await getSPF(elt).then(res => resolve(res));
        });
    })
)
.then( (values) => {
    console.log('+ ' + values);
})
*/