interface MessageProps {
  msg: {
    text: string;
    user: string;
  };
  name: string;
}

const Messagebox: React.FC<MessageProps> = ({ msg: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  console.log(name, "hahaha");
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    <>
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
    </>
  );
};

export default Messagebox;

//https://bobbyhadz.com/blog/react-scroll-to-bottom
//scroll 하는건 위 방법을 참고해라!
