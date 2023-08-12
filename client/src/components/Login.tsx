import React, { useEffect, useState } from "react";
import { socket } from "./Message";
import { useNavigate } from "react-router-dom";

//types
import { Users } from "../types";

function Login() {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [usersInfo, setUsersInfo] = useState<Users[]>([]);

  const navigate = useNavigate();

  const handleSubmitclick = (event: React.FormEvent) => {
    event.preventDefault();

    socket.emit("checkforvalidation", room);

    socket.on("userInfo", (usersInfo) => {
      console.log(usersInfo, "로그인할 때 나오는 userInfo이다");
      setUsersInfo(usersInfo);
    });

    //아래 로직은 벡엔드에서 처리해도 상관없다. 오히려 좋을 수도??
    //아래 방법이 제대로 작동 안 하는 듯? find 말고 다른 방법을 사용해야 하나?
    const alreadyPicked = usersInfo.find((user) => user.name === name);
    console.log(alreadyPicked, name, room, "alreadypicked");
    if (alreadyPicked) {
      return window.alert("이미 있는 이름입니다.");
    }

    if (name && room) {
      navigate(`/message?name=${name}&room=${room}`);
      return;
    }
    return window.alert("오류가 발생했습니다!");
  };

  //dependencies가 뭔가 잘못된 것 같은데 추가로 확인이 필요하다.
  useEffect(() => {}, [usersInfo]);
  return (
    <form action="" onSubmit={handleSubmitclick}>
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
        <button
          className="border-2 rounded border-solid bg-blue-600 p-2"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}

export default Login;
