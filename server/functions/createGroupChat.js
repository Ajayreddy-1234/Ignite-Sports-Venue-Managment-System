// createGroupChat.js
const axios = require('axios');
require('dotenv').config()
const https = require('https');

async function createGroupChat(venueData) {
  try {
    const agent = new https.Agent({  
        rejectUnauthorized: false
      });
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    const apiResponse = await axios.put(`${process.env.CHAT_API_BASE_URL}/conversations/${venueData.userid}_${venueData.name.replaceAll(" ","")}`, {
      participants: [venueData.userid.toString()],
      subject: venueData.name,
      welcomeMessages: ["Hello there!", "Welcome to Bloomington events. :)"],
      custom: {
        productId: "454545"
      },
      photoUrl: "https://cdn-icons-png.flaticon.com/512/6710/6710808.png"
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.CHAT_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }, { httpsAgent: agent });

    console.log('Second API response:', apiResponse.data);
    return apiResponse.data;
  } catch (error) {
    console.error('Error calling second API:', error);
    throw error; // Rethrow the error to handle it in the main module
  }
}

module.exports =  createGroupChat;
