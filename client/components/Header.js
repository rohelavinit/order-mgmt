import React from 'react'
var axios = require('axios')

export default class Header extends React.Component{
    constructor(){
        super();
        this.loginUser = this.loginUser.bind(this)
        this.getLoginOrCustomerSearchNode = this.getLoginOrCustomerSearchNode.bind(this)
        this.seachCustomer = this.seachCustomer.bind(this)
    }

    loginUser(){
        this.props.loginUser('')
    }

    getLoginOrCustomerSearchNode(){
        return(
                this.props.loginAs ? 
                <div>
                    <div className="ui right icon input">
                        <input type="text" placeholder="Search customers..." onKeyUp={this.seachCustomer}/>
                        <i className="users icon"></i>
                    </div>
                    <span className='login-user'>{'Hi '+ this.props.loginAs + ' !'}</span>
                </div> : 
                <span className='login-user pointer' onClick={this.loginUser}>Login</span>
             )
    }

    seachCustomer(event){
        var val = event.target.value.trim()
        if(event.keyCode === 13 && val){
            axios.post('searchCustomer', {customerName: val})
            .then((res)=>{
                this.props.listSearchedCustomer(res.data)
            })
            .catch((err)=>{
                console.log('error : ', err)
            })
        }
    }

    render(){

        return(
            <header>
                <div className='top-div'>
                    <span className='logo'>AIBONO</span>
                    <span className='logo-extra'>Order Management Portal</span>
                    <span className='right-items'>
                        {this.getLoginOrCustomerSearchNode()}
                    </span>
                </div>
            </header>
        )
    }
}