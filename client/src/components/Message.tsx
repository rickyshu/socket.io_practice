import { io } from "socket.io-client";
import { useEffect, useState } from "react";

// 영상에서의 connect와 달리 새로운 버전의 socket.io에서는 더 이상 connect이 필요없다.
const socket = io("http://localhost:3001");

function Message() {
  // container: width:100%으로 진행한다.
  //결국 이 강의에서 말하는 것은 프론트엔드A => 벡엔드 => 프론트엔드B의 과정을 거쳐서 소켓 통신이 가능하다고 하는 것이다.
  //event을 emit하면 서버에서 그것을 받아서 다른 client에 연결해주는 역할을 담당한다.(서버: 중간 다리 역할?
  const [message, setMessage] = useState<string>("");
  //다른 유저에게 받은 메세지를 받고 있다.
  const [messageReceived, setMessageReceived] = useState<string>("");

  const [room, setRoom] = useState<string>("");

  //room까지 추가되면, 어떤 room에 접속할건지에 대한 정보도 함께 보내야 한다.
  const sendMessage = () => {
    socket.emit("send_Message", { message, room });
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  //react 컴포넌트 외부에 있는 소켓을 내부에 작성하게 되면 변화가 생길 때마다 re-rendering하기 떄문에 무한 렌더링이 발생하게 된다.
  //오히려 밖에 둬서 렌더링 없이 메세지 상호 전달만 하도록하게 한다.
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="container p-2 border-solid border-2 border-slate-800 w-80">
      <input
        placeholder="join-room"
        className="border-2 border-solid border-slate-950 rounded h-10 p-1"
        onChange={(event) => setRoom(event.target.value)}
      ></input>
      <button className="rounded bg-cyan-500 ml-4 p-1" onClick={joinRoom}>
        입장하기
      </button>
      <input
        placeholder="메세지를 입력하시오"
        className="border-2 border-solid border-slate-950 rounded h-10 p-1"
        onChange={(event) => setMessage(event.target.value)}
      ></input>
      <button className="rounded bg-cyan-500 ml-4 p-1" onClick={sendMessage}>
        메세지 전송
      </button>
      <h1 className="">Message:</h1>
      {messageReceived}
    </div>
  );
}

export default Message;
