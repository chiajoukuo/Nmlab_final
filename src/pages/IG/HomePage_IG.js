import React,{Component} from 'react';
import Post from './component/Post';
import './component/IG_style.css'
import getWeb3 from "../../utils/getWeb3";
import Posting from "../../../build/contracts/Posting.json"
import User from "../../../build/contracts/User.json"

class HomePage_IG extends Component{
    constructor(props) {
        super(props);
        this.asynConstructor = this.asynConstructor.bind(this);
        this.asynConstructor();
        this.state = {
            posts_id : [],
            post_num : 0,
            posts: [],
            likes:[]
        };
    }

    asynConstructor = async () => {
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Posting.networks[networkId];
            const instance = new web3.eth.Contract(
                Posting.abi,
                deployedNetwork && deployedNetwork.address,
            );
            // const instance1 = new web3.eth.Contract(
            //     User.abi,
            //     deployedNetwork && deployedNetwork.address,
            // );
            // this.setState({ web3, accounts, contract: instance, User: instance1 });
            this.setState({ web3, accounts, contract: instance ,});

        } catch (error) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
        var num = await this.state.contract.methods.getPostNum().call();
        var i;
        var posts_id = []
        var posts_tmp = []
        var likes = []
        //;console.log(await this.state.contract.methods.getPostByID(0).call())
        for (i = 0; i < num; i++) {
            var post_tmp = await this.state.contract.methods.getPostByID(i).call()
            //console.log(post_tmp)
            var like = await this.state.contract.methods.getWhetherUserLike(i).call()
            //post_tmp.push(like)
            // var authorID = post_tmp[0]
            // var userNum = post_tmp[1]
            // postInfo,
            // whoLike.length,
            // whoLike,
            // msgs.length
            //console.log(post_tmp)
            posts_tmp.push(post_tmp)
            likes.push(like)
            console.log(i,posts_tmp[i][3])
            posts_id.push(i)
        }
        this.setState({
            post_num : num,
            posts_id: posts_id,
            posts: posts_tmp,
            likes : likes
        })
        //console.log(this.state.posts[0])
        

    };

    render(){
        //console.log(this.state.posts.length)
        // if (this.state.posts.length){
        //     console.log(this.state.posts[0][0])
        // }
        //console.log(this.state.posts.length)
        return(
            <div className='homepage_ig'>
                {this.state.posts_id.map(
                    (post_id_element)=>{
                        
                        if(this.state.posts.length){
                            return(
                                <React.Fragment key={post_id_element}>
                                    <div className='between'></div>
                                    <Post 
                                        post_id={post_id_element}
                                        authorID = {this.state.posts[post_id_element][0]}
                                        author = "author_"
                                        userNum = {this.state.posts[post_id_element][1]}
                                        postInfo = {this.state.posts[post_id_element][2]}
                                        like = {this.state.likes[post_id_element]}
                                        likeNum = {this.state.posts[post_id_element][3]}
                                        msgNum = {this.state.posts[post_id_element][5]} 
                                        pic = {this.state.posts[post_id_element][6]}
                                        web3 = {this.state.web3}
                                    />
                                    <div className='between'></div>
                                </React.Fragment>
                            )
                        }
                        else{
                            return(
                                <h1 className='upload_title'>
                                    No post yet.
                                </h1>
                            )
                        }
                    }
                )}
            </div>
        );
    }
    
}

export default HomePage_IG;
