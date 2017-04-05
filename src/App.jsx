import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const newMessage = {username: this.state.currentUser.name, content: event.target.value};
      this.socket.send(JSON.stringify(newMessage));
      event.target.value = '';
    }
  }

  handleChangeName = (event) => {
    this.setState({currentUser: {name: event.target.value}});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://0.0.0.0:3001");

    this.socket.onopen = () => {
      console.log("Client connected");
    }
    this.socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    }
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentName={this.state.currentUser.name} enterFunc={this.handleKeyPress} changeName={this.handleChangeName} />
      </div>
    );
  }
}
export default App;