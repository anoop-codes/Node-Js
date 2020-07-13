/*
 * promise  : hold the eventual result of an async operation
 *
 * promise has 3 state
 *      -intial state is pending------>then(success)--->catch(failure)
 */

const p = new Promise(function (resolve, resject) {

    //async work..
    resolve({ data: "success data afer async job!!" })
});

p.then(data => console.log(data));
