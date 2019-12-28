import React from 'react';
// import PostHead from './IG/component/PostHead';
// import PostImage from './IG/component/PostImage';
// import PostButton from './IG/component/PostButton';
// import PostContent from './IG/component/PostContent';
// import PostComments from './IG/component/PostComments';
import ImageUploader from '../components/ImageUploader';
import {Input} from "reactstrap";
import './IG/component/IG_style.css'

class NewPostPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzF2pFf814zRqNtePwN2Pr-YkNC3ZckLF09qpzaL2ZpXioAB_M&s',
        name:'AUTHOR',
        src:'http://www.freeiconspng.com/uploads/upload-icon-30.png',
        content:''
      };
    }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
  
    render() {
      return (
        <>
            <div className='between'></div>
            <h1 className='upload_title'>New Post</h1>
            <div className='between'></div>
            <article className="picture_Post" >
              <header className='post_head'>
                  <div className="Post-user">
                      <div className="Post-user-avatar">
                          <img src={this.state.photo} alt={this.state.name} />
                      </div>
                      <div className="Post-user-nickname" style={{color:'black'}}>
                          <span>{this.state.name}</span>
                      </div>
                      
                  </div>
              </header>
              {/* <div className="Post-image">
                    <div className="Post-image-bg">
                        <img alt="Upload your own image." src={this.state.src} />
                    </div>
              </div> */}
              <ImageUploader />
              <div className='post_buttons'>
                <img className='like_button_static' src='https://image.flaticon.com/icons/svg/149/149217.svg' alt='like_button_static'/>
                <span className='like_num'>0</span>
                <img className='message_button' src='https://image.flaticon.com/icons/svg/1380/1380338.svg' alt='message_button'/>
                <span className='like_num'>0</span>
                <img className='purchase_button_static' src='https://image.flaticon.com/icons/svg/1170/1170678.svg' alt='purchase_button'/>
                <span className='like_num'>0</span>
              </div>
              <div className='post_content'>
                {/* <p>{this.state.content}</p> */}
                <Input
                    value={this.state.content}
                    type="text"
                    name="content"
                    id="content"
                    className="mb-3"
                    placeholder="Write some discription here."
                    onChange={this.onChange}
                    required
                />
              </div>
                {/* <PostHead/>
                <PostImage/>
                <PostButton/> 
                <PostContent/>*/}
            </article>
            <div className='between'></div>
            <div className='foot'></div>
        </>
      );
    }
  }
export default NewPostPage;