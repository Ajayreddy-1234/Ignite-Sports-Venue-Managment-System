// registerChatUser.js
const axios = require('axios');

async function registerChatUser(user) {
  try {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    const response = await axios.put(`${process.env.CHAT_API_BASE_URL}/users/${user.userid}`, {
      name: user.username,
      email: [user.email],
      welcomeMessage: "Hi there, how are you? :-)",
      photoUrl: "https://talkjs.com/images/avatar-1.jpg",
      role: user.role,
      phone: ["+1123456789"],
      custom: {
        country: "ca"
      },
      pushTokens: null
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.CHAT_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Third API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error calling third API:', error);
    throw error; // Rethrow the error to handle it in the main module
  }
}

module.exports = {
  registerChatUser
};
