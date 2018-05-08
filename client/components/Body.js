import React from 'react'
import LoginPage from './LoginPage'
import OrderPage from './OrderPage'

export default class Body extends React.Component{
    constructor(){
        super()
        this.state = { route: 'LoginPage', userDetails: {}}
        this.loginSuccess = this.loginSuccess.bind(this)
    }

    loginSuccess(formActionStatus){
        this.setState({route: 'OrderPage', userDetails: formActionStatus.userDetails},()=>{
            this.props.loginUser(formActionStatus.userDetails.username)
        })
    }

    render(){
        switch(this.state.route){
            case 'LoginPage': return(<LoginPage loginSuccess={this.loginSuccess}/>)
            case 'OrderPage': return(<OrderPage userDetails={this.state.userDetails} customerData={this.props.searchedData} searchTag={this.props.searchTag}/>)  
            default : <div>Something went wrong!!!!!</div>          
        }
    }
}
