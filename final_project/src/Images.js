import React from 'react';

// import sab_1 from '/mnt/c/Users/angsa/THD_Hack/react_app/react-webpack-starter/public/sab_1.jpg';
// import sab_2 from '/mnt/c/Users/angsa/THD_Hack/react_app/react-webpack-starter/public/sab_2.jpg';
// import sab_3 from '/mnt/c/Users/angsa/THD_Hack/react_app/react-webpack-starter/public/sab_3.jpg';

let pictures = [
 'https://i.dailymail.co.uk/i/pix/2017/07/18/14/427394C200000578-4707164-Happy_people_are_healthier_Some_65_percent_of_relevant_studies_f-m-21_1500384450707.jpg',
  'http://socialpsychonline.com/wp-content/uploads/2016/07/fear01_banner.jpg',
  'https://d1o50x50snmhul.cloudfront.net/wp-content/uploads/2014/10/dn26481-1_1200.jpg',
  'http://www.randymoraitis.com/wp-content/uploads/2018/01/angryface.jpg',
  'https://i.ytimg.com/vi/22yQbNVqFOQ/maxresdefault.jpg',
  'https://i.pinimg.com/originals/6c/58/e9/6c58e93e9ff00d07d094762c357d93b9.jpg',
  'https://static1.squarespace.com/static/5784c5bc2994ca687a5cd9f9/59afcd0ff9a61eccbf986af8/59afcd0fa9db09ad7b9dd663/1504693984443/thomas-ruff-portraits.png'];

let emotes = ['happy', 'fear', 'disgust', 'angry', 'sad', 'surprised', 'neutral'];
// let array = [sab_1, sab_2, sab_3];
let index = 0;
let imgBase = null;

class Images extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      screenshot: null,
      tab: 0
    };
  }

  handleClick() {
        let image = pictures[(index++)%pictures.length];
        console.log(index);
        imgBase = image;
        const screenshot = <img key={image} src={image}/>;

        this.setState({ screenshot });
  }

      render() {
        return (
          <div>
              <h2>Accomplish 1: Images to Copy</h2>
              <div className='screenshots'>
                <div className='controls'>
                  <button onClick={this.handleClick}>NEXT PICTURE</button>
                </div>
                {this.state.screenshot}
            </div>
          </div>
        );
      }
    }

export default Images;
//export imgBase;