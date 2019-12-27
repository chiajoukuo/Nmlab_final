import React, { Component } from 'react';
import PostHead from './component/PostHead';
import PostImage from './component/PostImage';
import PostButton from './component/PostButton';
import PostContent from './component/PostContent';
import PostComments from './component/PostComments';
import './component/IG_style.css';
import getWeb3 from "../../utils/getWeb3";
import Posting from "../../../build/contracts/Posting.json"
import User from "../../../build/contracts/User.json"


class PicturePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // postID:post_id,
            // authorID : post[0],
            // author : "author_",
            // userNum : post[1],
            // postInfo : post[2],
            // like:like,
            // likeNum:post[3],
            // msgNum:post[5],
            // pic:post[6]
        }
        this.asynConstructor = this.asynConstructor.bind(this);
        this.asynConstructor();


    }
    asynConstructor = async () => {
        console.log('async')
        try {
            console.log('11')

            const web3 = await getWeb3();
            console.log('22')
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
            this.setState({ web3, accounts, contract: instance ,});

        } catch (error) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
        var post_id = this.props.match.params.id
        // console.log(post_id)
        var post = await this.state.contract.methods.getPostByID(post_id).call()
        // console.log(post)
        var authorID = post[0]
        var author = "author_"
        var userNum = post[1]
        var postInfo = post[2]
        var like = await this.state.contract.methods.getWhetherUserLike(post_id).call()
        var likeNum = post[3]
        var msgNum = post[5] 
        var pic = post[6]
        this.setState({
            postID:post_id,
            authorID : post[0],
            author : "author_",
            userNum : post[1],
            postInfo : post[2],
            like:like,
            likeNum:post[3],
            msgNum:post[5],
            pic:post[6]

        })
        // console.log('postID',post_id,
        //     'authorID' , post[0],
        //     'author' , "author_",
        //     'userNum' , post[1],
        //    ' postInfo' , post[2],
        //     'like:',like,
        //     'likeNum',post[3],
        //     'msgNum',post[5],
        //     'pic',post[6])
        console.log(this.state.pic)
        // var num = await this.state.contract.methods.getPostNum().call();
        // var i;
        // var posts_id = []
        // var posts_tmp = []
        // var likes = []
        // for (i = 0; i < num; i++) {
        //     var post_tmp = await this.state.contract.methods.getPostByID(i).call()
        //     //console.log(post_tmp)
        //     var like = await this.state.contract.methods.getWhetherUserLike(i, this.state.accounts[0]).call()
        //     posts_tmp.push(post_tmp)
        //     likes.push(like)
        //     console.log(i,posts_tmp[i][3])
        //     posts_id.push(i)
        // }
    }

    render(){
        console.log('render',this.state)
        // console.log('render')
        if(this.state.pic){

            return(
                <div className='picture_page'>
                    <div className='between'></div>
                        <article className="picture_Post" >
                            {/* <PostHead />
                            <PostImage />
                            <PostButton />
                            <PostContent />
                            <PostComments/> */}
                            <PostHead authorID = {this.state.authorID} author ={this.state.author} />
                            <PostImage pic = {this.state.pic}/>
                            {/* <PostButton like = {this.state.like} likeNum = {this.state.likeNum} msgNum = {this.state.msgNum} userNum = {this.state.userNum} postID = {this.state.post_id} web3={this.props.web3}/> */}
                            <PostContent content = {this.state.postInfo}/>
                            <PostComments/>
                            
                        </article>
                    <div className='between'></div>
                        {/* 
                        <a href="https://www.instagram.com/hannahkuo_1119/?hl=zh-tw">
                            <img src="https://www.102like.com/manage/0/product/30802/1516761523_922.jpg"/>
                        </a>	
                        
                        <h4>日期: 2019/11/26 11:48</h4>
                        <p>
                        <input type = "button" value = "購買" onClick="if(confirm('確定要購買嗎?'))this.form.submit();"/>
                        
                        <button type="button" >	讚</button>
                        : <a id="clicks">0</a>
                        </p>
                    
                        <h4>留言 <input type="text" /></h4> */}
                        
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