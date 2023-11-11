const db = require('../database');
require('dotenv').config()


function convertToDatetimeObjects(datetimes) {
  return datetimes.map(datetimePair =>
    datetimePair.map(datetimeStr => new Date(datetimeStr))
  );
}

// Async function to insert venue data into the database
function createVenue(venueData) {
  try{
    const sql = 'INSERT INTO ignite.venue (user_id, reservation_type, vname, address, sport, total_capacity, total_cost) VALUES (?, ?, ?, ?, ?, ?, 0.0)';
    const values = [
      venueData.userid,
      venueData.reservationtype,
      venueData.name,
      venueData.addr,
      venueData.sporttype,
      venueData.capacity
      
      
      //JSON.stringify(convertToDatetimeObjects(venueData.datetimes)),
    ];
    console.log(JSON.stringify(values));
    db.promise().query(sql, values);
    createReservation(venueData);
    return values;
  }
  catch(error){
    return null;
  }
}

function getStartEndDates(dateTimes) {
  var startDateTime = [];
  var endDateTime = [];

  for (var i = 0; i < dateTimes.length; i++) {
    for (var j = 0; j < dateTimes[i].length; j++) {
      var start = dateTimes[i][j][0];
      var end = dateTimes[i][j][1];

      if (Date.parse(start) && Date.parse(end)) {
        // Only add valid date-time pairs
        startDateTime.push(JSON.stringify(start));
        endDateTime.push(JSON.stringify(end));
      }// else {
        // Log invalid date-time pairs
        //console.log(`Invalid date-time pair at datetimes[${i}][${j}]: [${start}, ${end}]`);
      //}
    }
  }

  var pairs = [];

  for (var i = 0; i < startDateTime.length; i++) {
    pairs.push([startDateTime[i], endDateTime[i]]);
  }

  return pairs;
}

async function createReservation(venueData) {
  try{
    var datePairs = getStartEndDates(venueData.datetimes);
    console.log(JSON.stringify(datePairs));
    for (var i = 0; i < datePairs.length; i++){
      const theID = 'SELECT venue_id FROM ignite.venue WHERE vname = ? AND user_id = ?';
      const [theIDRow] = await db.promise().query(theID, [JSON.stringify(venueData.name), JSON.parse(venueData.userid)]);
      console.log(theIDRow);
      const venueId = theIDRow[0].venue_id;
      console.log(venueId);
      const sql = 'INSERT INTO ignite.reservation (reservation_type, vname, total_capacity, capacity_available, cost_paid, start_datetime, end_datetime, user_id, venue_id, closed) VALUES (?, ?, ?, ?, FALSE, ?, ?, ?, ?, FALSE)';
      const values = [
        venueData.reservationtype,
        venueData.name,
        venueData.capacity,
        venueData.capacity,
        datePairs[i,0],
        datePairs[i,1],
        venueData.userid,
        JSON.parse(venueId)
      ];
      //console.log(JSON.stringify(datePairs));
      await db.promise().query(sql, values);
    }
    return values;
  }
  catch(error){
    console.log(error);
    return null;
  }
}
  
  module.exports = createVenue;
  //module.exports = createReservation;