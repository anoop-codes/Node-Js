/**
 *  Functions that can take other functions as arguments are called higher-order functions.
 * 
 *  This is how callbacks were born: if you pass a function to another function as a parameter, you can call it within the function when you are finished with your job. No need to return values, only calling another function with the values.
 * 
 * 
 * The event loop is in the heart of Node.js / Javascript - it is responsible for scheduling asynchronous operations.
 * 
 * Event-driven programming is a programming paradigm in which the flow of the program is determined by events such as user actions (mouse clicks, key presses), sensor outputs, or messages from other programs/threads.
 */
console.log('Before!');

getUser(1, function (user) {
    console.log('user :', user);
});

console.log('After!');

//callback
//promises
//async/await



//callback
function getUser(id, callback) {
    setTimeout(() => {
        console.log('setTime Out....');
        callback({ id: id, username: 'anoop' });
    }, 2000);
}




//find the find using custom callback
Array.prototype.findName = function (toFind, callback) {

    if (this.indexOf(toFind) > -1) {
        callback({ msg: 'Name Exist' })
    }
    else
        callback({ msg: "Name  don't Exist" })

}

const arr = ['anoop', 'anuj'];

arr.findName('anoop', (result) => {
    console.log(result)
});


//callback on arry to find the min value

