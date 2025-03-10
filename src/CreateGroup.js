import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

const CreateGroup = ({ user }) => {
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState(""); // Comma-separated emails
  const [isPublic, setIsPublic] = useState(false); // Public group flag

  const createGroupChat = async () => {
    const userArray = users.split(",").map((user) => user.trim());

    if (!groupName) {
      alert("Enter a group name.");
      return;
    }

    await addDoc(collection(db, "chats"), {
      name: groupName,
      users: [...userArray, user.email], // Include the creator in the group
      messages: [],
      createdAt: new Date(),
      isPublic, // Add public flag
    });

    setGroupName("");
    setUsers("");
    alert("Group Created!");
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2>Create Group Chat</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <input
        type="text"
        placeholder="User Emails (comma separated)"
        value={users}
        onChange={(e) => setUsers(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        Make Group Public
      </label>
      <button
        onClick={createGroupChat}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Create Group
      </button>
    </div>
  );
};

export default CreateGroup;