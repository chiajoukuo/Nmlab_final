import HomePage from './HomePage'
import React from 'react';
import './IG/component/IG_style.css'


class PublicPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {userName: props.userName};
    }
  
  
    render() {
      return (
        <div>
            <h1>{this.state.userName}</h1>
            <img src={require('./personalPic.jpg')} height="100" width="100" alt=""/>
            <div className='between'></div>
            <HomePage></HomePage>
        </div>
      );
    }
  }
export default PublicPage;