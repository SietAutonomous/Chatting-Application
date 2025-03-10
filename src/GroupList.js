import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import ChatRoom from "./ChatRoom";

const GroupList = ({ user }) => {
  const [groups, setGroups] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
      const allGroups = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setGroups(allGroups);
    });

    return () => unsubscribe();
  }, [user]);

  const joinGroup = async (groupID) => {
    try {
      const groupRef = doc(db, "chats", groupID);
      await updateDoc(groupRef, {
        users: arrayUnion(user.email), // Add the user to the group
      });
      alert("Joined the group!");
    } catch (error) {
      console.error("Error joining group:", error);
      alert("You are already a member of this group.");
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2>Available Groups</h2>
      {groups.map((group) => (
        <div
          key={group.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <div>
            <strong>{group.name}</strong> ({group.users.length} members)
          </div>
          {!group.users.includes(user.email) && (
            <button
              onClick={() => joinGroup(group.id)}
              style={{ padding: "5px 10px", fontSize: "14px" }}
            >
              Join
            </button>
          )}
        </div>
      ))}
      {activeChat && <ChatRoom chatID={activeChat} user={user} />}
    </div>
  );
};

export default GroupList;