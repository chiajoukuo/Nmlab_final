import React from 'react';
// import PostHead from './IG/component/PostHead';
// import PostImage from './IG/component/PostImage';
// import PostButton from './IG/component/PostButton';
// import PostContent from './IG/component/PostContent';
// import PostComments from './IG/component/PostComments';
import Photos from '../components/photos';
import './IG/component/IG_style.css'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input
} from "reactstrap";

class NewPostPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzF2pFf814zRqNtePwN2Pr-YkNC3ZckLF09qpzaL2ZpXioAB_M&s',
        name:'AUTHOR',
        src:'http://www.freeiconspng.com/uploads/upload-icon-30.png',
        content:'',
        modal:false,
        value:0,

        // web3:this.props.web3,
        // accounts:this.props.accounts,
        // posting:this.props.posting,
        // user:this.props.user,
      };
    }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = e => {
      // e.preventDefault();
      
      if (this.state.url_input !== "") {
          //console.log(this.state.url_input)
          this.setState({
              url:this.state.url_input,
              url_input:''
          })
          this.toggle();
      }
    };
    toggle = () => {
      this.setState({
          modal: !this.state.modal,
          url_input:'',
          isUploading: false,
          isUploaded: false
      });
    };
  
    render() {
      console.log(this.state)
      return (
        <>
            <div className='between'></div>
            <h1 className='upload_title'>New Post</h1>
            <div className='between'></div>
            <div style={{display:'inline'}}>
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
                {/* <ImageUploader /> */}
                <div className="Post-image">
                  <div className="Post-image-bg">
                      <img alt="Upload your own." src={this.state.src} onClick={this.toggle } className='uploader'/>
                  </div>
              </div>
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
            </div>
            {/* <div style={{display:'inline'}}>
              <HomePage/> 
            </div> */}
            
            <div className='between'></div>
            
            <div className='foot'></div>


            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader onClick={this.toggle}>
                        Choose one image.
                    </ModalHeader>
                    <ModalBody>
                        <Photos/>

                        <Button
                        color="dark"
                        style={{ marginTop: "1rem" }}
                        block
                        onClick={this.onSubmit}
                        >
                        Add Image
                        </Button>
                    </ModalBody>
                </Modal>
            
        </>
      );
    }
  }
export default NewPostPage;