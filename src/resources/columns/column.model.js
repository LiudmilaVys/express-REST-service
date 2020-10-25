const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'column', order } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column) {
    const { id, _id, title, order } = column;
    return { id: _id, title, order };
  }
}

module.exports = Column;
