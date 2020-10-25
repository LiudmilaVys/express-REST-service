const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'task',
    order,
    description = 'about task',
    userId = uuid(), //assignee
    boardId = uuid(),
    columnId = uuid()
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const {
      id,
      _id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    } = task;
    return { id: _id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
