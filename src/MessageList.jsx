import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="messages">
        {this.props.messages.map(message => <Message message={message} key={message.id}/>)}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}
export default MessageList;
