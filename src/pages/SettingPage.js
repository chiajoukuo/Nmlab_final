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
            user_name:'',
            user_input:'',
            user_photo:'',
            user_photo_input:''
        };
        this.asynConstructor = this.asynConstructor.bind(this);
        this.save_setting = this.save_setting.bind(this);
        this.asynConstructor();
    }
    asynConstructor = async () => {
        try {
            const web3 = this.props.web3
            console.log('web33',web3)
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
            this.setState({ 
                web3, accounts, 
                posting: instance, 
                user: instance1
            });

        } catch (error) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
        //this.setState({user_name: await this.state.posting.methods.SayHello().call()});
        // var arr1 = new Array();
        // var arr2 = new Array();
        // await this.state.user.methods.createAuthor(this.state.accounts[0], "haha", "cool",arr1, arr2).send({ from: this.state.accounts[0]});
    };
    async save_setting () {
        //await this.state.posting.methods.SetMessage(this.state.user_input).send({ from: this.state.accounts[0]});
        // var arr1 = new Array();
        // var arr2 = new Array();
        var arr1=[]
        var arr2=[]
        const REG = await this.state.user.methods.checkREG(this.state.accounts[0]).call()
        console.log(REG)
        if(REG){
            console.log('REG')
            //console.log('before',await this.state.user.methods.getAuthorByAddr(this.state.accounts[0]).call())
            await this.state.user.methods.setName(this.state.accounts[0], this.state.user_input).send({ from: this.state.accounts[0]});
            //console.log('after',await this.state.user.methods.getAuthorByAddr(this.state.accounts[0]).call())
        
        }
        else{
            await this.state.user.methods.createAuthor(this.state.accounts[0], this.state.user_photo_input, this.state.user_input,arr1, arr2).send({ from: this.state.accounts[0]});

        }
        this.setState({
            user_name:this.state.user_input,
            user_input:'',
            user_photo:this.state.user_photo_input,
            user_photo_input:''
        })
        
        console.log(await this.state.user.methods.getAuthorByAddr(this.state.accounts[0]).call())
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
        //console.log(this.state.text)
    };
    handleKeyDown = async(e) => {
        if (e.key === 'Enter') {
            //const comments = [...this.state.comments, this.state.comments.length]
            await this.state.posting.methods.SetMessage(this.state.user_input).send({ from: this.state.accounts[0]});
            this.setState({
                user_name:this.state.user_input,
                user_input:''
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
                        {/* <h4 className='setting_context'>{this.state.user_name}</h4> */}
                        <Input
                            value={this.state.user_input}
                            type="text"
                            name="user_input"
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
                        {/* <h4 className='setting_context'>{this.state.user_photo}</h4> */}
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
                        Upload
                        </Button>
                    </div>
                    
                </div>
                    
            </>
        );
    }
    
}

export default SettingPage;
