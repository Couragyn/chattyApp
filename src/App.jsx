import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';

const color = ["#ff0000", "#0000cc", "#00e600", "#ff33cc"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: "Anon",
        color: color[getRandom()]
    },
      messages: []
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const newMessage = {type: "postMessage", username: this.state.currentUser.name, content: event.target.value, color: this.state.currentUser.color};
      this.socket.send(JSON.stringify(newMessage));
      event.target.value = '';
    }
  }

  handleChangeName = (event) => {
    const oldUsername = this.state.currentUser.name;
    this.setState({currentUser: {
      name: event.target.value,
      color: this.state.currentUser.color
    }});
    const newNotification = {type: "postNotification", oldUsername: oldUsername, newUsername: event.target.value};
    this.socket.send(JSON.stringify(newNotification));
  }


  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://0.0.0.0:3001");

    this.socket.onopen = () => {
      console.log("Client connected");
    }
    this.socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      if (newMessage.type === "incommingNotification" || newMessage.type === "incommingMessage") {
        const messages = this.state.messages.concat(newMessage);
        console.log(messages);
        this.setState({messages: messages});
      } else if (newMessage.type === "count") {
        this.setState({userCount: newMessage.size});
      } else {
        throw new Error("Unknown event type " + newMessage.type);
      }
    }
  }

  render() {
    return (
      <div>
        <Nav userCount={this.state.userCount} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentName={this.state.currentUser.name} enterFunc={this.handleKeyPress} changeName={this.handleChangeName} />
      </div>
    );
  }
}
export default App;

function getRandom() {
  return Math.floor(Math.random() * (4 - 0));
}