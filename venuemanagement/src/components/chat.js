import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';

function ChatComponent() {
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentTalkUserConfig = {
        id: window.localStorage.getItem("userId"),
        name: window.localStorage.getItem("username"),
        email: window.localStorage.getItem("userEmail"),
        photoUrl: 'henry.jpeg',
        welcomeMessage: 'Hello!',
        role: window.localStorage.getItem("role")
      };
      console.log("log--");
      console.log(currentTalkUserConfig);
      const currentUser = new Talk.User(currentTalkUserConfig);

      const otherUser = new Talk.User({
        id: '2',
        name: 'Jessica Wells',
        email: 'jessicawells@example.com',
        photoUrl: 'jessica.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const session = new Talk.Session({
        appId: 'tYoALSzq',
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      console.log("conversationId "+conversationId);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);
      /*
      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);
      */
      const popup = session.createPopup();
      popup.select(conversation);
      popup.mount({ show: false });

      const button = document.getElementById('btn-getInTouch');
      button.addEventListener('click', (event) => {
      event.preventDefault();
      popup.show();
      });
      
      //return () => session.destroy();
    }
  }, [talkLoaded]);

  //return <div ref={chatboxEl} height='100%' />;
  return(
    <button id="btn-getInTouch">Chat</button>
  )
}

export default ChatComponent;