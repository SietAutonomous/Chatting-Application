import { useState } from "react";
import { db } from "./firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const JoinGroup = ({ user }) => {
  const [groupID, setGroupID] = useState("");

  const joinGroup = async () => {
    if (!groupID) {
      alert("Enter a group ID.");
      return;
    }

    try {
      const groupRef = doc(db, "chats", groupID);
      await updateDoc(groupRef, {
        users: arrayUnion(user.email), // Add the user to the group
      });
      alert("Joined the group!");
      setGroupID("");
    } catch (error) {
      console.error("Error joining group:", error);
      alert("Group not found or you are already a member.");
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2>Join Group</h2>
      <input
        type="text"
        placeholder="Enter Group ID"
        value={groupID}
        onChange={(e) => setGroupID(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button
        onClick={joinGroup}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Join Group
      </button>
    </div>
  );
};

export default JoinGroup;