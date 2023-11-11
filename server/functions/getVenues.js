const db = require('../database');
require('dotenv').config()

async function getVenues(){
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM venue';
    
        db.query(query, (err, results) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            reject('Internal Server Error');
          } else {
            resolve(results);
          }
        });
    });
};

module.exports = getVenues;