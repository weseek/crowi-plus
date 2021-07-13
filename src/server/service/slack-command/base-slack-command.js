// Implement any common process for slack commands
class BaseSlackCommand {

  constructor(crowi) {
    this.crowi = crowi;
  }

  runCommand() { throw new Error('Implement this') }

}

module.exports = BaseSlackCommand;
