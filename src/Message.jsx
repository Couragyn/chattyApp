import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

        <div className="message">
          <div className="message system">
            {this.props.message.notificaton}
          </div>
          <span className="message-username" style={{color:this.props.message.color}}>{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
    );
  }
}
export default Message;
