/**
 * mongoDB has 2 type of reationalData types
 *
 * 1)using reference (normalisation)
 *
 * 2)using embedded Doucument(de-normalisation)
 */


//normalization
/**
 * it give data consistancy 
 * 
 */
let author = {
    name: ''
}

let course = {
    author: "id of the author collection of the author collection",
    authors: [
        'id1',
        'id2',
        'id3'
    ]
}


//de-Normaliszation
// we get performance
//we can have validation
let course = {
    author = {
        name: ''
        //all the other properties..
    }
}


//hybride obj
let author = {
    name: '',
    //..........
}

let course = {
    author: {
        id: 'refer to an auther doc',
        name: ''
    }
}

/**
 * above give the snapshot of the data.
 */