import React from 'react';
import ReactDOM from 'react-dom';
import Button from './App';
import Webcam from './Webcam';
import Images from './Images';

// import Images from './Images';

window.onload = () => {

  ReactDOM.render(
    <div>
      <Button />
      <Webcam />
      <Images />
     </div>,
    document.querySelector('#container')
  );
};
