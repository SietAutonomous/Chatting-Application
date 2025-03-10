import { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";

const ChatRoom = ({ chatID, user }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "chats", chatID), (doc) => {
      setMessages(doc.data()?.messages || []);
    });

    return () => unsubscribe();
  }, [chatID]);

  const sendMessage = async () => {
    if (text.trim()) {
      const message = {
        text,
        user: user.email,
        timestamp: new Date(),
      };

      await updateDoc(doc(db, "chats", chatID), {
        messages: arrayUnion(message),
      });

      setText("");
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h3>Chat Room</h3>
      <div style={{ height: "400px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.user === user.email ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: msg.user === user.email ? "#DCF8C6" : "#ECECEC",
              }}
            >
              <strong>{msg.user}:</strong> {msg.text}
              <div style={{ fontSize: "12px", color: "#666" }}>
                {new Date(msg.timestamp?.toDate()).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        style={{ width: "80%", padding: "10px", marginRight: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px 20px" }}>
        Send
      </button>
    </div>
  );
};

export default ChatRoom;