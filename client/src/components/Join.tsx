interface JoinProps {
  room: string;
  name: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

function Join({ room, name, setRoom, setUsername, setAuth }: JoinProps) {
  const handleSubmit = (e: React.FormEvent) => {
    console.log("승인 완료");
    e.preventDefault();
    if (room !== "" && name !== "" && room !== undefined && name !== undefined)
      return setAuth(true);
    alert("사용자 이름과 방 번호를 입력하시오!");
  };

  return (
    <form onSubmit={handleSubmit}>
      {name}
      <input
        placeholder="user-name"
        className="border-2 border-solid border-slate-950 rounded h-10 p-1"
        value={name}
        onChange={(event) => setUsername(event.target.value)}
      ></input>
      <input
        placeholder="join-room"
        className="border-2 border-solid border-slate-950 rounded h-10 p-1"
        value={room}
        onChange={(event) => setRoom(event.target.value)}
      ></input>
      <button className="rounded bg-cyan-500 ml-4 p-1">입장하기</button>
    </form>
  );
}

export default Join;
