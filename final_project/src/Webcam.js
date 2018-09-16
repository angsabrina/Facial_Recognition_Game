import React from 'react';
import Webcam from 'react-webcam';

let imgYou = null;

class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      screenshot: null,
      tab: 0
    };
  }

  handleClick() {
        const screenshot = this.webcam.getScreenshot();
        //console.log(screenshot);
        imgYou = screenshot;
        this.setState({ screenshot });
      }

      render() {
        return (
          <div>
            <h1>Objective: Copy the facial expression!</h1>
            <Webcam
              audio={false}
              ref={node => (this.webcam = node)}
            />
              <h2>Accomplish 2: Capture your expression</h2>
              <div className='screenshots'>
                <div className='controls'>
                  <button onClick={this.handleClick}>Capture</button>
                </div>
                {this.state.screenshot ? <img src={this.state.screenshot} /> : null}
            </div>
          </div>
        );
      }
    }

export default WebcamCapture;

//export imgYou;
