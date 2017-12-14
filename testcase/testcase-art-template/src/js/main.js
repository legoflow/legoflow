const runtime = require('art-template/lib/runtime');

runtime.test = function ( value ) {
    return `TEST-${ value }`
};

document.body.innerHTML = require('./template')({
    content: '<div>test</div>',
    list: [
        { name: 't1', },
        { name: 't2', },
        { name: 't3', },
        { name: 't4', },
    ]
})
