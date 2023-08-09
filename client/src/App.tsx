import Message from "./components/Message";
// import Join from "./components/Join";
import Login from "./components/Login";
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [room, setRoom] = useState<string>("");
  const [name, setUsername] = useState<string>("");
  const [auth, setAuth] = useState<boolean>(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/message" element={<Message />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// <div className="p-10 flex border-solid border-red-500 border-2 h-full">
//   {/* {auth ? (
//     <Message room={room} name={name} />
//   ) : (
//     <Join
//       room={room}
//       name={name}
//       setRoom={setRoom}
//       setUsername={setUsername}
//       setAuth={setAuth}
//     />
//   )} */}
// </div>
