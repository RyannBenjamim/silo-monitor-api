const { v4: uuid } = require("uuid");

class Silo {
  constructor(status) {
    this.id = uuid();
    this.status = status?.toUpperCase() ?? null;
  }
}

module.exports = Silo;
