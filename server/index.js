const express = require("express");
const app = express(); //instance of express lib
const http = require("http"); //socket.io 공식문서를 참고
const { Server } = require("socket.io"); //Server class
const cors = require("cors");

app.use(cors()); //cors middleWare를 사용 for accept the cors

//유저와 관련된 모든 동작을 처리하기 위해 import을 해준다.
const { addUser, removeUser, getUser, getUsersInRoom } = require("./user");

const server = http.createServer(app); //create the http server with expres
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", //이건 vite이기 때문에 유동적으로 변경을 해야 한다.
    methods: ["GET", "POST"],
  },
});

//server listening to an event from client each user will recieve different id
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", ({ room, name }, callback) => {
    //client에서 보는 특정 room에 접속하게 되는 것이다.

    //임의로 추가한 것 (falsy한 값이면 error를 return하도록 작성함)
    if (!room || !name) return callback(error);

    const { error, user } = addUser({ id: socket.id, name, room });

    //어떤 callback 인지 어떻게 특정할 수 있지?? 의문이다.
    if (error) return callback(error);

    //error가 발생하지 않으면 아래 코드들이 실행된다.

    //telling user welcome to the chat
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });

    //방에 있는 모든 이들이 유저의 참가를 알 수 있도록 하는 것이다.
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    socket.join(user.room);

    //이건 왜 추가하는거지?
    callback();
  });

  //listening to specific data response
  socket.on("send_Message", (message) => {
    //sending to everyone but yourself
    // socket.broadcast.emit("receive_message", data);
    console.log("message from client", message);
    const user = getUser(socket.id);

    //sending the data to specific room users
    //클라이언트에서 아래 데이터를 받을 수 있다.
    socket.to(user.room).emit("message", { user: user.name, text: message });
    // console.log(data);
  });
  //can sepcify the room_id that want tobe joined
  // callback();
});

// port number should be change based on the react
server.listen(3001, () => {
  console.log(`server is running on port ${3001}`);
});
