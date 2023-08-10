import Message from "./components/Message";
// import Join from "./components/Join";
import Login from "./components/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
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
