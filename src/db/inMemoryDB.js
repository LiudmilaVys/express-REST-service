const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Column = require('../resources/columns/column.model');
const Task = require('../resources/tasks/task.model');

const users = [];
const boards = [];
const tasks = [];

const init = () => {
  for (let i = 0; i < 3; i++) {
    const user = new User({
      name: `USER${i}`,
      login: `user${i}`,
      password: `P@55w0rd${i}`
    });
    users.push(user);

    for (let j = 0; j < i; j++) {
      const columns = [];
      for (let k = 0; k < 4; k++) {
        const column = new Column({ title: `column${j}${k}`, order: k });
        columns.push(column);

        const board = new Board({ title: `board${i}${j}`, columns });
        boards.push(board);
        
        for (let l = 0; l < 5; l++) {
          const task = new Task({
            title: `task${k}${k}`,
            order: l,
            description: `about task${l}`,
            userId: user.id,
            boardId: board.id,
            columnId: column.id
          });
          tasks.push(task);
        }
      }
    }
  }
};

module.exports = {
  init,
  users,
  boards,
  tasks
};
