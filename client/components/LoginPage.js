import React from 'react'
import axios from 'axios'

export default class LoginPage extends React.Component{
    constructor(){
        super()
        this.state = { toggleText : 'Login', error: ""}
        this.createNewAccount = this.createNewAccount.bind(this)
        this.formAction = this.formAction.bind(this)
        this.getUserNameNode = this.getUserNameNode.bind(this)
    }

    createNewAccount(){
        var toggleText = this.state.toggleText === 'Login' ? 'Registration' : 'Login'
        this.setState({toggleText, error: ""})
    }

    formAction(event){
       var username = document.getElementById('username') ? document.getElementById('username').value : "" 
       var email = document.getElementById('email').value 
       var phone = document.getElementById('phone').value 
       var password = document.getElementById('password').value 
       var loginAction = this.state.toggleText
       var userDetails = {username, email, phone, password, loginAction}

       axios.post('login', userDetails)
       .then((response) => { 
           if(response.data.authStatus){
               this.props.loginSuccess(response.data)
           } 
           else this.setState({error: response.data.authMsg})
        })
        .catch(error => {
            this.setState({error})
        })
    }

    getUserNameNode(){
        return (
                    this.state.toggleText === 'Registration' ? 
                        <div className="input-custom">
                            <label>User Name</label>
                            <input type="text" id='username' placeholder="Enter your name...."/>
                        </div> :
                        ""
                )
    }

    render(){
        var loginText = this.state.toggleText === 'Login' ? 'Create a new Account' : 'Already have an Account'
        var submitText = this.state.toggleText === 'Login' ? 'Login' : 'Create an Account'

        return(
            <div className='form-top'>
                <div>
                    <div className='form'>
                        <div className='error'>{this.state.error}</div>
                        <div className='toggle-div'>
                            <span className='toggle-element'>{this.state.toggleText}</span>
                        </div>
                        {this.getUserNameNode()}
                        <div className="input-custom">
                            <label>Email-Id</label>
                            <input type="email" id='email' placeholder="Enter your email-id...."/>
                        </div>
                        <div className="input-custom">
                            <label>Phone Number</label>
                            <input type="number" id='phone' placeholder="Enter your phone number...."/>
                        </div>
                        <div className="input-custom">
                            <label>Password</label>
                            <input type="password" id='password' placeholder="Enter your password...."/>
                        </div>
                        <div className="form-submit" onClick={this.formAction}>
                            {submitText}
                        </div>                                        
                    </div>
                </div>
                <div className="no-account">
                    <span className="no-account-text" onClick={this.createNewAccount}>{loginText}</span>
                </div>               
            </div> 
        )
    }
}