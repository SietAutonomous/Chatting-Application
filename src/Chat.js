import { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import sendMessage from "./Chat";

const ChatRoom = ({ chatID }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const user = "User1"; // Replace with authenticated user

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "chats", chatID), (doc) => {
      setMessages(doc.data()?.messages || []);
    });

    return () => unsubscribe();
  }, [chatID]);

  return (
    <div>
      <h3>Chat Messages</h3>
      {messages.map((msg, index) => (
        <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
      ))}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={() => sendMessage(chatID, user, text)}>Send</button>
    </div>
  );
};

export default ChatRoom;
