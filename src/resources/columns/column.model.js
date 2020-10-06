const uuid = require('uuid');

class Column{
    constructor( {
         id = uuid(), 
         title = 'column',
          order  } = {}){
        this.id = id;
        this.title = name;
        this.order  = order F;
    }

    static toResponse(column){
        const {id, title} = column;
        return {id, title};
    }
}

module.exports = Column;