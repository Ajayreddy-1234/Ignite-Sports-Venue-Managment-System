const db = require('../database');
require('dotenv').config();

async function openCloseVenue({ venueid, status }) {
    try {
        const query = 'UPDATE ignite.venues SET status = ? WHERE venue_id = ?';
        await db.promise().query(query, [status, venueid]);
        return status;
    } catch (error) {
        return null;
    }
};

module.exports = openCloseVenue;