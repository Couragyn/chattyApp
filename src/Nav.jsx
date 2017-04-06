import React, {Component} from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h3 className="nav-count">{this.props.userCount} Users Online</h3>
        </nav>
    );
  }
}
export default Nav;
