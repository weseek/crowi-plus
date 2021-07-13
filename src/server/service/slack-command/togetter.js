const BaseSlackCommand = require('./base-slack-command');
const BlockKitBuilder = require('../../util/block-kit-builder');

const B = new BlockKitBuilder();

module.exports = (crowi) => {
  const command = new BaseSlackCommand(crowi);

  command.runCommand = (client, body, args) => {
    // Checkbox Message を返す
    client.chat.postEphemeral({
      channel: body.channel_id,
      user: body.user_id,
      text: 'Select messages to use.',
      blocks: B.togetterMessageBlocks(),
    });
  };

  return command;
};
