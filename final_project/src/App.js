import React from 'react';

class Button extends React.Component {
  handleClick() {
    console.log('hello');
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Start  Game
      </button>
    );
  }
}

export default Button;
