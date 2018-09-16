import React from 'react';
import Webcam from 'react-webcam';

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
        this.setState({ screenshot });
      }

      render() {
        return (
          <div>
            <h1>react-webcam</h1>
            <Webcam
              audio={false}
              ref={node => (this.webcam = node)}
            />
              <h2>Screenshots</h2>
              <div className='screenshots'>
                <div className='controls'>
                  <button onClick={this.handleClick}>capture</button>
                </div>
                {this.state.screenshot ? <img src={this.state.screenshot} /> : null}
            </div>
          </div>
        );
      }
    }

export default WebcamCapture;
