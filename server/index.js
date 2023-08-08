const express = require("express");
const app = express(); //instance of express lib
const http = require("http"); //socket.io 공식문서를 참고
const { Server } = require("socket.io"); //Server class
const cors = require("cors");

app.use(cors()); //cors middleWare를 사용 for accept the cors

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

  //listening to specific data response
  socket.on("send_Message", (data) => {
    //sending to everyone but yourself
    // socket.broadcast.emit("receive_message", data);

    //sending the data to specific room users
    socket.to(data.room).emit("receive_message", data);
    // console.log(data);
  });
  //can sepcify the room_id that want tobe joined
  socket.on("join_room", (data) => {
    //client에서 보는 특정 room에 접속하게 되는 것이다.
    socket.join(data);
  });
});

// port number should be change based on the react
server.listen(3001, () => {
  console.log(`server is running on port ${3001}`);
});
