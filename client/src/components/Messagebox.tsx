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
      {user === "admin" ? (
        <div className="border-2 border-solid border-red-500">
          <p className="sentText pr-10">{user}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{text}</p>
          </div>
        </div>
      ) : isSentByCurrentUser ? (
        <div>
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="border-2 border-solid border-slate-950">
            <div className="messageBox backgroundBlue">
              <p className="messageText colorWhite">{text}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="messageText colorDark">{text}</p>
          <div className="border-2 border-soldi border-blue-500">
            <div className="messageBox backgroundLight"></div>
            <p className="">{user}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Messagebox;

//https://bobbyhadz.com/blog/react-scroll-to-bottom
//scroll 하는건 위 방법을 참고해라!
