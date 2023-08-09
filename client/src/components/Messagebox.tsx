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
    <div className="flex flex-col space-y-10">
      {isSentByCurrentUser ? (
        <div className="border-2 border-solid border-slate-950">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{text}</p>
          </div>
        </div>
      ) : (
        <div className="border-2 border-soldi border-blue-500">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{text}</p>
          </div>
          <p className="sentText pl-10 ">{user}</p>
        </div>
      )}
    </div>
  );
};

export default Messagebox;
