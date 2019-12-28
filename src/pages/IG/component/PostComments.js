import React,{Component} from 'react';
import PostComment from './PostComment'
import './IG_style.css';
import {Input} from "reactstrap";
import Posting from "../../../../build/contracts/Posting.json";
import User from "../../../../build/contracts/User.json";




class PostComments extends Component{
    constructor(props) {
        super(props);
        this.state = {
            //comments_id:[],
            comments:[],
            photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzF2pFf814zRqNtePwN2Pr-YkNC3ZckLF09qpzaL2ZpXioAB_M&s',
            name:'AUTHOR',
            text: '',
            msgNum:this.props.msgNum
        };
    }
    UNSAFE_componentWillMount = async () =>  {
        try {
            const web3 = this.props.web3;//await getWeb3();
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
        var msgs = []
        var ids = []
        for (var i = 0; i < this.state.msgNum; i++) {
            var msg_tmp = await this.state.posting.methods.getSingleMsg(this.props.postID,i).call()
            var auth = await this.state.user.methods.getAuthorByAddr(msg_tmp[1]).call()
            msgs.push({idx:i,msg:msg_tmp[0],author:auth[2],authorID:msg_tmp[1]})
            ids.push(i)
        }
        var my_name = await this.state.user.methods.getAuthorByAddr(this.state.accounts[0]).call()
        my_name = my_name[2]
        //msgs.push({msg:'msg_tmp',author:'auth',authorID:'0'})
        //ids.push(0)
        this.setState({
            //comments_id:ids,
            comments:msgs,
            name:my_name
        })

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state.text)
    };
    handleKeyDown = async(e) => {
        if (e.key === 'Enter') {
            //console.log(this.state.comments)
            //var comments_id = [...this.state.comments_id, this.state.comments_id.length]
            const comments = [...this.state.comments, {idx:this.state.comments.length,msg:this.state.text,author:this.state.name,authorID:this.state.accounts[0]}]
            console.log('comments sate',this.state.comments)
            console.log('commments',comments)
            await this.state.posting.methods.addMessage(this.props.postID,this.state.text).send({ from: this.state.accounts[0]});
            this.setState({
                //comments_id:comments_id,
                comments:comments,
                text:''
            })
        }
    }
    render(){
        console.log(this.state.comments)
        if(this.state.msgNum>0){
            return(
                <div className='post_comments'>
                    {this.state.comments.map(
                        item=>(
                            <React.Fragment key={item.idx}>
                                <PostComment  text={item.msg} author={item.author} authorID={item.authorID}/>
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
        else{
            return(
                <div className='post_comments'>
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
    
}

export default PostComments;