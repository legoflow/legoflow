fetch('/user').then(( r ) => {
    console.log( 'user:', r );
})

fetch('/mock-api').then(( r ) => {
    console.log( 'mock:', r );
})

fetch('/api/14').then(( r ) => {
    console.log( 'api', r );
})
