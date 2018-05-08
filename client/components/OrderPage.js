import React from 'react'
var axios = require('axios')
import {getItemList, getGrandSum} from '../operations/operations.js'

export default class OrderPage extends React.Component{
    constructor(){
        super()
        this.state = {itemList: [], customerName: '', error: ""} 
        this.addItem = this.addItem.bind(this)
        this.onEnterKeyPress = this.onEnterKeyPress.bind(this)
        this.getManagerInputNode = this.getManagerInputNode.bind(this)
    }

    addItem(){
        var customerName = document.getElementById('customer').value.trim()
        var item = document.getElementById('item').value.trim()
        var itemQnt = document.getElementById('itemQnt').value.trim()
        var itemPrc = document.getElementById('itemPrc').value.trim()
        if(customerName && item && itemQnt && itemPrc){
            axios.post('saveCustomer', {
                customerName, item, itemQnt, itemPrc
            })
            .then(()=>{
                this.clearInputFields()            
                var itemList = this.state.itemList
                itemList.push({item, itemQnt, itemPrc})
                this.setState({itemList, customerName, error: ""})
            })
            .catch((error)=>{
                console.log('error : ',error)
            })
        }
    } 

    clearInputFields(){
        document.getElementById('item').value = ''
        document.getElementById('itemQnt').value = ''
        document.getElementById('itemPrc').value = ''
    }

    onEnterKeyPress(event){
        if(event.keyCode === 13){
            this.addItem()
        }
    }  

    getManagerInputNode(){
        return(
                !this.props.searchTag ?
                <div>
                    <input className='width-33 input-items font-bold text-cap' placeholder='Item Name' type='text' id='item' onKeyUp={this.onEnterKeyPress}/>                    
                    <input className='width-33 input-items' placeholder='Item Quantity in Kg' type='number' id='itemQnt' onKeyUp={this.onEnterKeyPress}/>                    
                    <input className='width-33 input-items' placeholder='Item Price per Kg' type='number' id='itemPrc' onKeyUp={this.onEnterKeyPress}/>                                        
                </div> :
                ""
        )
    
    } 

    getCustomerName(){
        return(
                !this.props.searchTag ?
                <input className='width-66 input-items' placeholder='Customer Name' type='text' id='customer' onKeyUp={this.onEnterKeyPress} defaultValue={this.state.customerName}/>:
                <span className='width-66 input-items'type='text'>{this.props.customerData.customerName}</span>                                    
        )
    }

    render(){
        var itemArr = this.props.searchTag ? this.props.customerData.details : this.state.itemList
        var itemList = getItemList(itemArr)
        var grandSum = getGrandSum(itemArr)
        return(
            <div className='top-div item-wrap'>
                <div className='items-content'>
                    <div>
                        <span className='width-33 input-items font-bold text-cap'>Customer Name </span>
                        {this.getCustomerName()}
                    </div>
                    <div>
                        {itemList}
                    </div>
                        {this.getManagerInputNode()}
                    <div>
                        <span className='width-33 input-items font-bold text-cap'>Grand Sum</span>
                        <span className='width-66 input-items font-bold'>{grandSum}</span>
                    </div>
                </div>
            </div>
        )
    }
}
