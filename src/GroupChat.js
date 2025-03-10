import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ChatRoom from "./ChatRoom";

const GroupChat = () => {
    const [groups, setGroups] = useState([]);
    const [activeChat, setActiveChat] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
            setGroups(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h2>Group Chats</h2>
            {groups.map(group => (
                <button key={group.id} onClick={() => setActiveChat(group.id)}>
                    {group.name}
                </button>
            ))}
            {activeChat && <ChatRoom chatID={activeChat} />}
        </div>
    );
};

export default GroupChat;
