import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  return (
    <div className="border-2 border-solid border-slate-950 m-5 flex space-x-4 p-4">
      <div className="flex space-x-3 border">
        <h1 className="flex justify-center items-center">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="border-2 border-blue-500 rounded p-2"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
      </div>
      <div>
        <input
          placeholder="Room"
          className="border-2 border-blue-500 rounded p-2"
          type="text"
          onChange={(event) => setRoom(event.target.value)}
        />
      </div>
      <Link
        onClick={(e) => (!name || !room ? e.preventDefault() : null)}
        to={`/message?name=${name}&room=${room}`}
      >
        <button
          className="border-2 rounded border-solid bg-blue-600 p-2"
          type="submit"
        >
          Sign In
        </button>
      </Link>
    </div>
  );
}

export default Login;
