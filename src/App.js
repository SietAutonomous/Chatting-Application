import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import CreateGroup from "./CreateGroup";
import GroupList from "./GroupList";
import Login from "./Login";
import JoinGroup from "./JoinGroup";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <h1>WhatsApp-like Group Chat</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "30%", borderRight: "1px solid #ccc" }}>
          <CreateGroup user={user} />
          <JoinGroup user={user} />
          <GroupList user={user} />
        </div>
        <div style={{ width: "70%" }}>
          {/* Active chat will be displayed here */}
        </div>
      </div>
    </div>
  );
}

export default App;