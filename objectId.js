/**
 * objectid : consist of 12 byte [24 char]
 *
 * first 4 byte repsent time stamp -- time of creation > id.getTimestamp();
 *
 * next 3 byte : machine identifer
 *
 * next 2 byte : diff process
 *
 * next 3 byte: counter
 * 
 * 
 * 
 */

//manully create 
const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId(); //5f1e4791dcc3d40334e86fdc

console.log('id :', id);
console.log('time stamp :', id.getTimestamp());

//to check the is a valid Object id

console.log(mongoose.Types.ObjectId.isValid(id));


//authentication
//authorization : have some right to perform certain action

//register :(post) /api/register/
//login :(post) /api/login/