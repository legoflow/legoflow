fetch('/user').then(( r ) => {
    console.log( 'user:', r );
})

fetch('/mock-api').then(( r ) => {
    console.log( 'mock:', r );
})

fetch('/api/24d501c0-cb49-11e7-ba75-c111f832c2e3').then(( r ) => {
    console.log( 'api', r );
})
