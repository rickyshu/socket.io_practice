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
        <div className="border-2 border-solid border-red-500 rounded-lg p-3 bg-red-500">
          <p className="text-lg font-bold">{user}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{text}</p>
          </div>
        </div>
      ) : isSentByCurrentUser ? (
        <div>
          <p className="font-bold text-right pr-2">{trimmedName}</p>
          <div className="border-2 border-solid border-slate-950 rounded-lg p-3 bg-slate-600">
            <p className="text-right pr-2">{text}</p>
          </div>
        </div>
      ) : (
        <div>
          <p className="font-bold text-left pl-2">{user}</p>
          <div className="border-2 border-soldi border-blue-500 rounded-lg p-3 bg-blue-600">
            <p className="text-left pl-2">{text}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Messagebox;

//https://bobbyhadz.com/blog/react-scroll-to-bottom
//scroll 하는건 위 방법을 참고해라!
