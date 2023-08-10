const users = []; //user 목록이 저장된다.

const addUser = ({ id, name, room }) => {
  console.log(name, room, "this is from server");
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //이미 존재하는 유저가 동일한 이름으로 동일한 방에 들어가려고 할 때 막는다.
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  //위 조건을 모두 통과하면 접속이 가능하도록 설정한다.
  const user = { id, name, room };

  users.push(user);
  console.log(user); //서버에 유저 정보를 저장하고 있다.
  return { user };
};

const removeUser = (id) => {
  //특정 유저를 제거하는 것
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
  //못찾으면 기능이 없음
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
