const { v4: uuid } = require("uuid");

class User {
  constructor(user) {
    this.id = uuid();
    this.username = user.username;
    this.password = user.password;
    this.role = user.role?.toUpperCase() ?? null;
  }
}

module.exports = User;
