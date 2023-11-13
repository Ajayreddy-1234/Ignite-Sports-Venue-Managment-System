const db = require('../database');
require('dotenv').config();

//closed status is capacity set to 0... open status is capacity
async function openCloseVenue({ closed, venueid }) {
    
    let status = 0;

    if(closed){
        status = 1;
    }

    try {
        const query = 'UPDATE ignite.reservation SET closed = ? WHERE venue_id = ?';
        await db.promise().query(query, [status, venueid]);
        return venueid;
    } catch (error) {
        return null;
    }
};

module.exports = openCloseVenue;