const { v4: uuidv4 } = require("uuid");

class Register {
  constructor(register) {
    this.id = uuidv4();
    this.temperature = register.temperature;
    this.humidity = register.humidity;
  }
}

module.exports = Register;
