class BlockKitBuilder {

  generateMarkdownSectionBlock(text) {
    return {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text,
      },
    };
  }

  divider() {
    return {
      type: 'divider',
    };
  }

  generateInputSectionBlock(blockId, labelText, actionId, isMultiline, placeholder) {
    return {
      type: 'input',
      block_id: blockId,
      label: {
        type: 'plain_text',
        text: labelText,
      },
      element: {
        type: 'plain_text_input',
        action_id: actionId,
        multiline: isMultiline,
        placeholder: {
          type: 'plain_text',
          text: placeholder,
        },
      },
    };
  }

  togetterMessageBlocks() {
    return [
      this.inputBlock(this.togetterCheckboxesElement(), 'selected_messages', 'Select massages to use.'),
      this.actionsBlock(this.buttonElement('Show more', 'togetterShowMore')),
      this.inputBlock(this.togetterInputBlockElement('page_path', '/'), 'page_path', 'Page path'),
      this.actionsBlock(this.buttonElement('Cancel', 'togetterCancelPageCreation'), this.buttonElement('Create page', 'togetterCreatePage', 'primary')),
    ];
  }

  actionsBlock(...elements) {
    return {
      type: 'actions',
      elements: [
        ...elements,
      ],
    };
  }

  inputBlock(element, blockId, labelText) {
    return {
      type: 'input',
      block_id: blockId,
      element,
      label: {
        type: 'plain_text',
        text: labelText,
        emoji: true,
      },
    };
  }

  /**
   * Button element
   * https://api.slack.com/reference/block-kit/block-elements#button
   */
  buttonElement(text, actionId, style = undefined) {
    const button = {
      type: 'button',
      text: {
        type: 'plain_text',
        text,
      },
      action_id: actionId,
    };
    if (style === 'primary' || style === 'danger') {
      button.style = style;
    }
    return button;
  }

  togetterCheckboxesElement() {
    return {
      type: 'checkboxes',
      options: this.togetterCheckboxesElementOptions(),
      action_id: 'checkboxes_changed',
    };
  }

  togetterCheckboxesElementOptions() {
    // options を conversations.history の結果でインクリメント
    const options = [];
    // 仮置き
    for (let i = 0; i < 10; i++) {
      const option = this.checkboxesElementOption('*username*  12:00PM', 'sample slack messages ... :star:', `selected-${i}`);
      options.push(option);
    }
    return options;
  }

  /**
   * Option object
   * https://api.slack.com/reference/block-kit/composition-objects#option
   */
  checkboxesElementOption(text, description, value) {
    return {
      text: {
        type: 'mrkdwn',
        text,
      },
      description: {
        type: 'mrkdwn',
        text: description,
      },
      value,
    };
  }

  /**
   * Plain-text input element
   * https://api.slack.com/reference/block-kit/block-elements#input
   */
  togetterInputBlockElement(actionId, placeholderText = 'Write something ...') {
    return {
      type: 'plain_text_input',
      placeholder: {
        type: 'plain_text',
        text: placeholderText,
      },
      action_id: actionId,
    };
  }

}

module.exports = BlockKitBuilder;
