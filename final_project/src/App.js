import React from 'react';

class Button extends React.Component {
  render() {
    // This syntax ensures `this` is bound within handleClick
    return (

      <div style={{fontFamily: 'Courier New', fontWeight: 'bold', fontSize: '30px'}}>
                    <img style={{marginLeft: '0px'}} height='100px' width='100px' src='http://1000logos.net/wp-content/uploads/2017/02/Home-Depot-Logo-Meaning-history.jpg'/>

        (Press Next Picture to Begin The Game)
        </div>
    );
  }
}

export default Button;
