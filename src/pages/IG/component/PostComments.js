import React,{Component} from 'react';
import PostComment from './PostComment'
import './IG_style.css';
import {Input} from "reactstrap";
import {Link } from "react-router-dom";
import PostMessage from './PostMessage';
import getWeb3 from "../../../utils/getWeb3";
import Posting from "../../../../build/contracts/Posting.json"



class PostComments extends Component{
    constructor(props) {
        super(props);
        this.state = {
            comments:[
                1,2,3,4
            ],
            photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzF2pFf814zRqNtePwN2Pr-YkNC3ZckLF09qpzaL2ZpXioAB_M&s',
            name:'AUTHOR',
            text: ''
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state.text)
    };
    handleKeyDown = async(e) => {
        if (e.key === 'Enter') {
            const comments = [...this.state.comments, this.state.comments.length]
            //await this.state.contract.methods.SetMessage(this.state.text).send({ from: this.state.accounts[0]});
            this.setState({
                comments:comments,
                text:''
            })
        }
    }
    render(){
        return(
            <div className='post_comments'>
                {this.state.comments.map(
                    comment_id=>(
                        <React.Fragment key={comment_id}>
                            <PostComment comment_id={comment_id}  text={'This is a testing comment. This is a testing comment. This is a testing comment.'}/>
                        </React.Fragment>
                    )
                )}
                <div className='post_comment'>
                    <div className="comment-user">
                        <div to="/public_profile" className="comment-user-link">
                            <div className="comment-avatar">
                                <img src={this.state.photo} alt={this.state.name} />
                            </div>
                            <div className="comment-user-nickname" style={{color:'black'}}>
                                <p>{this.state.name}</p>
                            </div>
                        </div>
                        
                        <div className='comment_text'>
                                {/* <p>{this.state.text}</p> */}
                                <Input
                                    value={this.state.text}
                                    type="text"
                                    name="text"
                                    className="mb-3"
                                    placeholder="Leave a message."
                                    style={{ width: "100%" }}
                                    onChange={this.onChange}
                                    onKeyDown={this.handleKeyDown}
                                    required
                                />
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
    
}

export default PostComments;