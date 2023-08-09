interface MessagesObj {
  user: string;
  text: string;
}
// { user, text }: MessagesObj

function Messagebox(msg: any) {
  //   console.log(user, text, "user and text");
  //   const { user, text } = msg;
  console.log(msg, "user and text");
  return (
    <div className="border-2 border-solid border-slate-950 p-3 m-5">
      <div>{msg.msg.user}</div>
      <div>{msg.msg.text}</div>
    </div>
  );
}

export default Messagebox;
