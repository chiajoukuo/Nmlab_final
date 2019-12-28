import React from 'react';
//import ImageUploader from '../components/ImageUploader';
//import {Input, Button} from "reactstrap";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import './IG/component/IG_style.css'

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
  } from "reactstrap";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Posting from "../../build/contracts/Posting.json"
import User from "../../build/contracts/User.json"


class UploadPage extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzF2pFf814zRqNtePwN2Pr-YkNC3ZckLF09qpzaL2ZpXioAB_M&s',
        name:'AUTHOR',
        content:'',
        url:'http://www.freeiconspng.com/uploads/upload-icon-30.png',
        url_input:'',//https://i.pinimg.com/originals/06/8d/de/068dde048a027d55b74216b801a6c2f5.png
        modal:false,
        value:0
      };
      this.asynConstructor();
      
    }

    asynConstructor = async () => {
      try {
          const web3 = this.props.web3
          console.log('herere', web3)
          const accounts = await web3.eth.getAccounts();
          const networkId = await web3.eth.net.getId();
          const PostingdeployedNetwork = Posting.networks[networkId];
          const UserdeployedNetwork = User.networks[networkId];
          const instance = new web3.eth.Contract(
            Posting.abi,
            PostingdeployedNetwork && PostingdeployedNetwork.address,
          );
          const instance1 = new web3.eth.Contract(
            User.abi,
            UserdeployedNetwork && UserdeployedNetwork.address,
          );
          this.setState({ web3, accounts, posting: instance, user: instance1 });
      } catch (error) {
          alert(
              `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
      }

      var author = await this.state.user.methods.getAuthorByAddr(this.state.accounts[0]).call()
      console.log(author)
      var author_name = author[2]
      var author_photo = author[1]
      console.log(author_name,author_photo)
      this.setState({
        photo:author_photo,
        name:author_name
      })


    };

    upload_post = async() => {
      console.log("upload")
      //this.setState({content:''})
      await this.state.posting.methods.createPost(this.state.content,this.state.url).send({ from: this.state.accounts[0]})
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

    handleChange = (e, newValue) => {
        this.setState({
          value: newValue
        });
    };

    handleChangeIndex = index => {
        this.setState({
            value: index
        });
    };

    loader = () => {
        const { isUploading, isUploaded } = this.state;
        if (isUploading) {
          // isUploading
          return (
            <div
              className="spinner-border text-info"
              role="status"
              style={{ marginRight: "1rem", verticalAlign: "bottom " }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          );
        } else if (!isUploading && isUploaded) {
          // !isUploading && isUploaded
          return (
            <img
              src="https://image.flaticon.com/icons/svg/179/179372.svg"
              alt='uploading'
              style={{ width: "24px", margin: "3px", marginRight: "1rem" }}
            />
          );
        } else {
          return null;
        }
    };
    upload = e => {
        this.setState({
            isUploading: true,
            isUploaded: false,
        });
    };


    render() {
      return (
        <>
            <div className='between'></div>
            <h1 className='upload_title'>Upload</h1>
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


              <div className="Post-image">
                  <div className="Post-image-bg">
                      <img alt="Upload your own." src={this.state.url} onClick={this.toggle } className='uploader'/>
                  </div>
              </div>


              <div className='post_buttons'>
                <img className='like_button_static' src='https://image.flaticon.com/icons/svg/149/149217.svg' alt='like_button'/>
                <span className='like_num'>0</span>
                <img className='message_button' src='https://image.flaticon.com/icons/svg/1380/1380338.svg' alt='message_button'/>
                <span className='like_num'>0</span>
                <img className='purchase_button_static' src='https://image.flaticon.com/icons/svg/1170/1170678.svg' alt='pyrchase_button'/>
                <span className='like_num'>0</span>
              </div>

              <div className='post_content'>
                <Input
                    value={this.state.content}
                    type="textarea"
                    name="content"
                    placeholder="Write some discription here."
                    style={{ height: "100px" }}
                    onChange={this.onChange}
                    required
                />
              </div>
              <div>
                <Button size="sm" onClick={this.upload_post} style={{ marginBottom: "5px"}} >
                  Upload
                  <CloudUploadIcon
                  size="small"
                  style={{ marginLeft: "5px" }}
                  />
                </Button>
              </div>

            </article>
            <div className='between'></div>
            <div className='foot'></div>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader onClick={this.toggle}>
                        Upload your own image.
                    </ModalHeader>
                    <ModalBody>
                        <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label="URL" />
                            <Tab label="Upload" />
                        </Tabs>
                        </AppBar>
                        <SwipeableViews
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                        >
                            <Typography
                                component="div"
                                style={{
                                padding: 6 * 3,
                                marginTop: "15px",
                                alignItems: "center"
                                }}
                            >
                                <Form>
                                <FormGroup>
                                    <Label for="url">Image URL</Label>
                                    <Input
                                    value={this.state.url_input}
                                    type="text"
                                    name="url_input"
                                    //id="url"
                                    className="mb-3"
                                    placeholder="please enter Image URL"
                                    onChange={this.onChange}
                                    required
                                    />
                                </FormGroup>
                                </Form>
                            </Typography>

                            <Typography
                                component="div"
                                style={{ padding: 6 * 3, marginTop: "15px" }}
                            >
                                <Form>
                                <FormGroup>
                                    <Label for="upload">Select An Image File</Label>
                                    <Input type="file" name="file" id="upload" />
                                    <div
                                    id="upload-btn"
                                    style={{ float: "right", marginTop: "0px" }}
                                    >
                                    {this.loader()}
                                    <Button size="sm" onClick={this.upload}>
                                        Upload
                                        <CloudUploadIcon
                                        size="small"
                                        style={{ marginLeft: "5px" }}
                                        />
                                    </Button>
                                    </div>
                                </FormGroup>
                                </Form>
                            </Typography>
                        </SwipeableViews>
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
export default UploadPage;