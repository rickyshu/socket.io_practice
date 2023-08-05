const express = require("express");
const app = express(); //instance of express lib
const http = require("http"); //socket.io 공식문서를 참고
const { Server } = require("socket.io"); //Server class
const cors = require("cors");

app.use(cors()); //cors middleWare를 사용 for accept the cors

const server = http.createServer(app); //create the http server with expres
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", //이건 vite이기 때문에 유동적으로 변경을 해야 한다.
    methods: ["GET", "POST"],
  },
});

// port number should be change based on the react
server.listen(3001, () => {
  console.log("server is running");
});

