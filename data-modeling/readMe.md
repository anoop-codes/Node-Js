there are 2 approch to bind related collection

# Normalization(unsing reference) : Consistency

//first collection
const author = {
    name:'anoop'
}

let courses = {
    author:''refer to the ID of the author Doc'
    ref:'author' //collection name
}



# De-normalization (embedded) : performace 

const author = {
    name:'anoop'
}

let courses = {
    author: {
        type : Author //collection schenma
    }
}



# hybrid approch

const author = {
    name:'anoop',
    //50 other property
}

let courses = {
    author: {
        id: 'refer to the ID of the author Doc'
        name:'anoop'
    }
}


help to keep the shapshot of the data.