import React,{Component} from 'react';
import './IG/component/IG_style.css'
import '../css/style.css'
import {Button,Input} from "reactstrap";
import Posting from "../../build/contracts/Posting.json"
import User from "../../build/contracts/User.json"

class SettingPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            web3:this.props.web3,
            accounts:this.props.accounts,
            posting:this.props.posting,
            user:this.props.user,
            user_name_input:'',
            user_photo_input:''
        };
        this.save_setting = this.save_setting.bind(this);
    }
    // UNSAFE_componentWillMount = async () => {
    //     try {
    //         const web3 = this.props.web3
    //         const accounts = await web3.eth.getAccounts();
    //         const networkId = await web3.eth.net.getId();
    //         const PostingdeployedNetwork = Posting.networks[networkId];
    //         const UserdeployedNetwork = User.networks[networkId];
    //         const instance = new web3.eth.Contract(
    //             Posting.abi,
    //             PostingdeployedNetwork && PostingdeployedNetwork.address,
    //         );
    //         const instance1 = new web3.eth.Contract(
    //             User.abi,
    //             UserdeployedNetwork && UserdeployedNetwork.address,
    //         );
    //         this.setState({ 
    //             web3, accounts, 
    //             posting: instance, 
    //             user: instance1
    //         });
    //         console.log('accounts',accounts)
    //         console.log(networkId)
    //         console.log(this.state.posting)
    //         console.log(this.state.user)

    //     } catch (error) {
    //         alert(
    //             `Failed to load web3, accounts, or contract. Check console for details.`,
    //         );
    //         console.error(error);
    //     }
    // };
    async save_setting () {
        if(this.state.user_name_input==='' && this.state.user_photo_input===''){
            alert(
                `Nothing to set!`,
            );
        }
        else{
            const REG = await this.state.user.methods.checkREG(this.state.accounts[0]).call()
            if(REG){
                if(this.state.user_name_input!==''){
                    await this.state.user.methods.setName(this.state.accounts[0], this.state.user_name_input).send({ from: this.state.accounts[0]});
                }
                if(this.state.user_photo_input!==''){
                    await this.state.user.methods.setPersonalPic (this.state.accounts[0], this.state.user_photo_input).send({ from: this.state.accounts[0]});
                }
                this.setState({
                    user_name_input:'',
                    user_photo_input:''
                })
            }
            else{
                if(this.state.user_name_input===''){
                    alert(
                        `Please enter your name!`,
                    );
                }
                else if(this.state.user_photo_input===''){
                    alert(
                        `Please choose a photo!`,
                    );
                }
                else{
                    var arr1=[]
                    var arr2=[]
                    await this.state.user.methods.createAuthor(this.state.accounts[0], this.state.user_photo_input, this.state.user_name_input,arr1, arr2).send({ from: this.state.accounts[0]});
                    this.setState({
                        user_name_input:'',
                        user_photo_input:''
                    })
                }
            }
        }
        // console.log(await this.state.user.methods.getAuthorByID(0).call())
        // console.log(await this.state.user.methods.getAuthorByID(1).call())
        // console.log(await this.state.user.methods.getAuthorByID(2).call())
        // console.log(await this.state.user.methods.getAuthorByID(3).call())
        // console.log(await this.state.user.methods.getAuthorByID(4).call())
        // console.log(await this.state.user.methods.getAuthorByID(5).call())
        // console.log(await this.state.user.methods.getAuthorByID(6).call())
        // console.log(await this.state.user.methods.getAuthorByID(7).call())
        
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleKeyDown = async(e) => {
        if (e.key === 'Enter') {
            //const comments = [...this.state.comments, this.state.comments.length]
            await this.state.posting.methods.SetMessage(this.state.user_name_input).send({ from: this.state.accounts[0]});
            this.setState({
                user_name_input:''
            })
            console.log(await this.state.posting.methods.SayHello().call());
        }
    }
    render(){
        return(
            //https://medium.com/@willhowardgb/building-a-beautiful-text-input-component-in-react-f85564cc7e86
            <>
                <div className='between'></div>
                <h1 className='upload_title'>Settings</h1>
                <div className='between'></div>
                <div className='setting_bg'>
                    <div className='setting_line'>
                        <h3 className='setting_item_name'>User Name : </h3>
                        <Input
                            value={this.state.user_name_input}
                            type="text"
                            name="user_name_input"
                            className="setting_input"
                            placeholder="Enter your name here."
                            style={{ width: "60%",backgroundColor:"transparent", color:"#d3cfcf" }} // margin:"0px auto",
                            onChange={this.onChange}
                            //onKeyDown={this.handleKeyDown}
                            required
                        />
                    </div>
                    <div className='setting_line'>
                        <h3 className='setting_item_name'>Photo : </h3>
                        <Input
                            value={this.state.user_photo_input}
                            type="text"
                            name="user_photo_input"
                            className="setting_input"
                            placeholder="Enter your photo here."
                            style={{ width: "72%",backgroundColor:"transparent", color:"#d3cfcf" }} // margin:"0px auto",
                            onChange={this.onChange}
                            //onKeyDown={this.handleKeyDown}
                            required
                        />
                    </div>
                    <div className='setting_line'>
                        <Button size="sm" onClick={this.save_setting} style={{ marginBottom: "5px"}} >
                        Save
                        </Button>
                    </div>
                    
                </div>
                    
            </>
        );
    }
    
}

export default SettingPage;
