import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Messagebox from "./Messagebox";
import queryString from "query-string";
import { useLocation, useSearchParams } from "react-router-dom";

// 영상에서의 connect와 달리 새로운 버전의 socket.io에서는 더 이상 connect이 필요없다.

const ENDPOINT = "http://localhost:3001";
const socket = io(ENDPOINT);

interface MessageProps {
  room: string;
  name: string;
}

interface MessagesObj {
  user: string;
  text: string;
}

type MessageArray = MessagesObj[];

function Message({ room, name }: MessageProps) {
  // const { search } = useLocation();
  // const values = queryString.parse(search);

  // const [searchParams] = useSearchParams();
  // const query = queryString.parse(searchParams.toString());

  // container: width:100%으로 진행한다.
  //결국 이 강의에서 말하는 것은 프론트엔드A => 벡엔드 => 프론트엔드B의 과정을 거쳐서 소켓 통신이 가능하다고 하는 것이다.
  //event을 emit하면 서버에서 그것을 받아서 다른 client에 연결해주는 역할을 담당한다.(서버: 중간 다리 역할?
  //다른 유저에게 받은 메세지를 받고 있다.
  // const [messageReceived, setMessageReceived] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageArray>([]);
  // 추후에 유저를 식별하기 위해 사용해야 한다.
  //room까지 추가되면, 어떤 room에 접속할건지에 대한 정보도 함께 보내야 한다.
  const sendMessage = (event: any) => {
    console.log(message);
    event.preventDefault();
    socket.emit("send_Message", message, () => setMessage(""));
  };
  useEffect(() => {
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
  }, [messages]);

  //function for sending messages

  return (
    <div className="container p-2 border-solid border-2 border-slate-800 w-80">
      <input
        placeholder="메세지를 입력하시오"
        className="border-2 border-solid border-slate-950 rounded h-10 p-1"
        onChange={(event) => setMessage(event.target.value)}
      ></input>
      <button className="rounded bg-cyan-500 ml-4 p-1" onClick={sendMessage}>
        메세지 전송
      </button>
      <h1 className="">Message:</h1>
      {messages.map((msg, idx) => {
        console.log(msg, "msg");
        return <Messagebox key={idx} msg={msg} />;
      })}
    </div>
  );
}

export default Message;
