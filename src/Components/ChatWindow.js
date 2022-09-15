import React, { Component } from "react";
import { Launcher } from "react-chat-window";

class ChatWindow extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [
        {
          author: "them",
          type: "text",
          data: {
            text: "some text",
          },
        },

        {
          author: "them",
          type: "emoji",
          data: {
            code: "someCode",
          },
        },

        {
          author: "me",
          type: "file",
          data: {
            url: "somefile.mp3",
            fileName: "Any old name",
          },
        },
      ],
    };
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message],
    });
  }

  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [
          ...this.state.messageList,
          {
            author: "them",
            type: "text",
            data: { text },
            isIncoming: true,
          },
        ],
      });
    }
  }

  render() {
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: "Sail Bot",
            imageUrl: require("./../assets/images/Logo/72.png"),
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          showEmoji
          newMessagesCount={2}
        />
      </div>
    );
  }
}
export default ChatWindow;
