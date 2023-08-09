import Message from "./components/Message";
import Join from "./components/Join";
import { useState } from "react";

function App() {
  const [room, setRoom] = useState<string>("");
  const [name, setUsername] = useState<string>("");
  const [auth, setAuth] = useState<boolean>(false);
  return (
    <div className="p-10 flex border-solid border-red-500 border-2 h-full">
      {auth ? (
        <Message room={room} name={name} />
      ) : (
        <Join
          room={room}
          name={name}
          setRoom={setRoom}
          setUsername={setUsername}
          setAuth={setAuth}
        />
      )}
    </div>
  );
}

export default App;
