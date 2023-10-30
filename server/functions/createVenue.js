const db = require('../database');
require('dotenv').config()


function convertToDatetimeObjects(datetimes) {
  return datetimes.map(datetimePair =>
    datetimePair.map(datetimeStr => new Date(datetimeStr))
  );
}

// Async function to insert venue data into the database
async function createVenue(venueData) {
  try{
  const sql = 'INSERT INTO ignite.venues (owner_id, reservation_type, venue_name, address, sport_name, status, dates) VALUES (?, ?, ?, ?, ?, "open", ?)';
  const values = [
    venueData.userid,
    venueData.reservationtype,
    venueData.name,
    venueData.addr,
    venueData.sporttype,
    
    JSON.stringify(convertToDatetimeObjects(venueData.datetimes)),
  ];
    await db.promise().query(sql, values);
    return values;
  }
  catch(error){
    return null;
  }
}
  
  module.exports = createVenue;