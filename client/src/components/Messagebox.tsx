interface MessageProps {
  msg: {
    text: string;
    user: string;
  };
  name: string;
}
// { user, text }: MessagesObj

const Messagebox: React.FC<MessageProps> = ({ msg: { text, user }, name }) => {
  //   console.log(user, text, "user and text");
  //   const { user, text } = msg;

  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    <div className="border-2 border-solid border-slate-950 p-3 m-5">
      <div>{text}</div>
      <div>{user}</div>
    </div>
  );
};

export default Messagebox;
