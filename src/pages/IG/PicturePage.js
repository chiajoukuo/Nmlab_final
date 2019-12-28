import React, { Component } from 'react';
import PostHead from './component/PostHead';
import PostImage from './component/PostImage';
import PostButton from './component/PostButton';
import PostContent from './component/PostContent';
import PostComments from './component/PostComments';
import './component/IG_style.css';
import Posting from "../../../build/contracts/Posting.json"
import User from "../../../build/contracts/User.json"


class PicturePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // postID:post_id,
            // authorAddr : post[0],
            // author : "author_",
            // userNum : post[1],
            // postInfo : post[2],
            // like:like,
            // likeNum:post[3],
            // msgNum:post[5],
            // pic:post[6]
        }
    }
    UNSAFE_componentWillMount = async () =>  {
        try {
            const web3 = this.props.web3//await getWeb3();
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
        var post_id = this.props.match.params.id
        var post = await this.state.posting.methods.getPostByID(post_id).call()
        var author = await this.state.user.methods.getAuthorByAddr(post[0]).call()
        var author_name = author[2]
        var like = await this.state.posting.methods.getWhetherUserLike(post_id).call()
        this.setState({
            postID:post_id,//parseInt(post_id,10),
            authorAddr : post[0],
            author_name : author_name,
            userNum : post[1],
            postInfo : post[2],
            like:like,
            likeNum:post[3],
            msgNum:post[5],
            pic:post[6]

        })

    }

    render(){
        if(this.state.pic){
            return(
                <div className='picture_page'>
                    <div className='between'></div>
                        <article className="picture_Post" >
                            <PostHead authorAddr = {this.state.authorAddr} author ={this.state.author_name} web3={this.props.web3}/>
                            <PostImage pic = {this.state.pic}/>
                            <PostButton like = {this.state.like} likeNum = {this.state.likeNum} msgNum = {this.state.msgNum} userNum = {this.state.userNum} postID = {this.state.postID} web3={this.props.web3}/>
                            <PostContent content = {this.state.postInfo}/>
                            <PostComments web3={this.props.web3} msgNum = {this.state.msgNum} postID = {this.state.postID}/>
                        </article>
                    <div className='between'></div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }
}

export default PicturePage;