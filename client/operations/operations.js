import React from 'react'

function getItemList(itemList) {
    var itemListNode = itemList.map((val, i) => {
        return (
                    <div key={i}>
                        <span className='width-33 input-items font-bold text-cap'>{val.item}</span>
                        <span className='width-33 input-items'>{val.itemQnt}</span>
                        <span className='width-33 input-items'>{val.itemPrc}</span>                           
                    </div>
                )
    })
    return itemListNode;
}

function getGrandSum(itemList) {
    var grandSum = 0    
    itemList.map((val, i) => grandSum += val.itemQnt * val.itemPrc )
    return grandSum
}

module.exports = {
    getItemList,
    getGrandSum
}