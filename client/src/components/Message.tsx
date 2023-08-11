import { io } from "socket.io-client";
import { ReactNode, useEffect, useState } from "react";
import Messagebox from "./Messagebox";
import { useNavigate } from "react-router-dom";

import threeD from "./Threejs/threeD";
// 영상에서의 connect와 달리 새로운 버전의 socket.io에서는 더 이상 connect이 필요없다.

const ENDPOINT = "http://localhost:3001";
const socket = io(ENDPOINT);

interface MessagesObj {
  user: string;
  text: string;
}

type MessageArray = MessagesObj[];

interface Users {
  id: string;
  name: string;
  room: string;
}

interface MessageProps {
  children: ReactNode;
}

//여기에서 Location을 받아야 한다
const Message: React.FC<MessageProps> = () => {
  //결국 이 강의에서 말하는 것은 프론트엔드A => 벡엔드 => 프론트엔드B의 과정을 거쳐서 소켓 통신이 가능하다고 하는 것이다.
  //event을 emit하면 서버에서 그것을 받아서 다른 client에 연결해주는 역할을 담당한다.(서버: 중간 다리 역할?
  //다른 유저에게 받은 메세지를 받고 있다.

  // const [name, setName] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [users, setUsers] = useState<Users[]>([]);
  const [messages, setMessages] = useState<MessageArray>([]);
  const navigate = useNavigate();
  // 추후에 유저를 식별하기 위해 사용해야 한다.
  //room까지 추가되면, 어떤 room에 접속할건지에 대한 정보도 함께 보내야 한다.
  const sendMessage = (event: any) => {
    console.log(message);
    event.preventDefault();
    socket.emit("send_Message", message, () => setMessage(""));
  };

  const leave = () => {
    console.log("퇴장", name);
    socket.emit("leave", name);
    navigate("/");
  };

  // 처음 마운트 될 때 처리하는 방식으로 전환했다.
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get("name");
    const room = searchParams.get("room");

    if (name && room) {
      setName(name);
      setRoom(room);
    }

    if (room !== "") {
      socket.emit("join_room", { room, name }, (error: any) => {
        alert(error);
      });
    }

    return () => {
      //언마운트될 때 연결을 끊는다.
      socket.off();
    };
  }, []);

  //react 컴포넌트 외부에 있는 소켓을 내부에 작성하게 되면 변화가 생길 때마다 re-rendering하기 떄문에 무한 렌더링이 발생하게 된다.
  //오히려 밖에 둬서 렌더링 없이 메세지 상호 전달만 하도록하게 한다.

  //서버를 보면 여러 message들이 있는데 구체적으로 어떤 것을 받오는 것인지 모호하다!!?!?
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    // socket.on("roomData", ({ users }) => {
    //   setUsers(users);
    // });
  }, [messages]);

  //처음 마운트 될 때만 적용하면 되나? =>추가적인 확인이 필요하다.
  useEffect(() => {
    socket.on("userData", (users) => {
      setUsers(users);
    });
  }, [message]);

  //function for sending messages
  return (
    <>
      <div className=" w-[500px] h-[700px] p-2 border-solid border-2 border-slate-800">
        {/* <threeD /> */}
        <p>방 번호: {room}</p>
        <p>이름: {name}</p>
        <div>
          <p>참여중인 유저:</p>
          {users.map((el) => {
            console.log(el);
            return <p></p>;
          })}
        </div>
        <div className="flex space-x-3">
          <input
            placeholder="메세지를 입력하시오"
            className="border-2 border-solid border-slate-950 rounded h-10 p-1"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></input>
          <button
            className="rounded bg-cyan-500 ml-4 p-1"
            onClick={sendMessage}
          >
            메세지 전송
          </button>
          <button className="rounded bg-cyan-500 ml-4 p-1" onClick={leave}>
            방 나가기
          </button>
        </div>
        <h1 className="flex flex-col space-y-3 overflow-scroll">Message:</h1>
        <div className="flex flex-col space-y-5">
          {messages.map((msg, idx) => {
            return <Messagebox key={idx} msg={msg} name={name} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Message;
