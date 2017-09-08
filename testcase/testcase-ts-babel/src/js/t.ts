const t1 = ( str: string ) => {
    return new Promise((resolve, reject) => {
        resolve( str );
    });
}

const t2 = ( str ) => {
    console.log( str );
    document.body.innerHTML = `<h1>${ str }</h1>`;
}

t1( '1' ).then( t2 );
