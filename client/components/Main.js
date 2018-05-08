import React from 'react'
import Header from './Header.js'
import Body from './Body.js'

export default class Main extends React.Component{
    constructor(){
        super()
        this.state = {loginAs: '', searchedData: {}, searchTag: false}
        this.loginUser = this.loginUser.bind(this)
        this.listSearchedCustomer = this.listSearchedCustomer.bind(this)
    }

    loginUser(username){
        this.setState({loginAs: username, searchTag: false})
    }

    listSearchedCustomer(data){
        this.setState({
            searchTag: true,
            searchedData: data
        })
    }

    render(){
        return(
            <div>
                <Header loginAs={this.state.loginAs} loginUser={this.loginUser} listSearchedCustomer={this.listSearchedCustomer}/>
                <Body loginUser={this.loginUser} searchedData={this.state.searchedData} searchTag={this.state.searchTag}/>
            </div>
        )
    }
}

