import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Enter Name" defaultValue={this.props.currentName} onBlur={this.props.changeName} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.enterFunc} />
      </footer>
    );
  }
}
export default ChatBar;
