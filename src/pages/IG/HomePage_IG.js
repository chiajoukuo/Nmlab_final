import React,{Component} from 'react';
import Post from './component/Post';
import './component/IG_style.css'

class HomePageIG extends Component{
    constructor(props) {
        super(props);
        this.state = {
            web3:this.props.web3,
            accounts:this.props.accounts,
            posting:this.props.posting,
            user:this.props.user,

            posts_id : [],
            post_num : 0,
            posts: [],
            likes:[]
        };
    }

    UNSAFE_componentWillMount = async () => {
        var num = await this.state.posting.methods.getPostNum().call();
        var i;
        var posts_id = []
        var posts_tmp = []
        var likes = []
        var authors = []
        var b = []
        for (i = 0; i < num; i++) {
            var post_tmp = await this.state.posting.methods.getPostByID(i).call()
            var like = await this.state.posting.methods.getWhetherUserLike(i,this.state.accounts[0]).call()
            var author = await this.state.user.methods.getAuthorByAddr(post_tmp[0]).call()
            
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
            authors.push(author)
            posts_id.push(i)
        }

        this.setState({
            post_num : num,
            
            posts_id: posts_id,
            posts: posts_tmp,
            likes : likes,
            authors : authors,
        })
    };

    render(){
        //console.log(this.state.posts)
        return(
            <>
                <div className='homepage_ig'>
                    {this.state.posts_id.map(
                        (idx,post_id_element)=>{
                            if(this.state.posts.length){
                                return(
                                    <React.Fragment key={post_id_element}>
                                        <div className='between'></div>
                                        <Post 
                                            post_id={post_id_element}
                                            authorID = {this.state.posts[post_id_element][0]}
                                            author = {this.state.authors[post_id_element][2]}
                                            author_pic = {this.state.authors[post_id_element][1]}
                                            userNum = {this.state.posts[post_id_element][1]}
                                            postInfo = {this.state.posts[post_id_element][2]}
                                            like = {this.state.likes[post_id_element]}
                                            likeNum = {this.state.posts[post_id_element][3]}
                                            msgNum = {this.state.posts[post_id_element][5]} 
                                            pic = {this.state.posts[post_id_element][6]}
                                            web3 = {this.props.web3}
                                            posting={this.props.posting}
                                            user={this.props.user} 
                                            accounts={this.props.accounts}
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
            </>
        );
    }
    
}

export default HomePageIG;
