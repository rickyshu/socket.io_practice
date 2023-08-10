const express = require("express");
const router = express.Router();

//router.get("/", (req, res) => {...})를 사용하여 "/" URL 경로에 대한 GET 요청을 처리하기 위한 콜백 함수를 정의합니다.
//"/" URL 경로에서 GET 요청이 수신되면, 서버 정상 작동 중라는 응답이 반환된다.
router.get("/", (req, res) => {
  res.send({ response: "서버 정상 작동." }).status(200);
});

module.exports = router;
