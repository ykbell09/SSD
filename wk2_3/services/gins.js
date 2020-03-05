// RE-DO THIS WHOLE THING



/*
// "database" on server

// gin factory function
function createGin(name, location) {
    return {
        name,
        location
    };
}

const gin1 = createGin('Grey Whale', 'California');
const gin2 = createGin('Greenhouse', 'Texas');
const gin3 = createGin('Amass Spirits', 'California');

// creates an array and adds gins to it
const ginList = [];
ginList.push(gin1, gin2, gin3);

// search ginList for location based on button click
// return the results in an array

export const checkLocation = (location) => {
    const ginResults = ginList.filter(gin => gin.location === location);
    const ginNames = ginResults.map(ginObject => ginObject.name);
    return ginNames;
}; 
*/
import knex from '../database'

module.exports = {
    gins: {
        getAll: function () {
            return knex('gins');
        }
    }
}

// SELECT gin_name, distiller, rating
// FROM gins
// WHERE state_located = 'CA';



export default checkLocation;