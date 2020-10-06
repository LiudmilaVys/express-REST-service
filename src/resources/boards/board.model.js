const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title } = board;
    return { id, name };
  }
}

module.exports = Board;
