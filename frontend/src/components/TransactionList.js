import React, { useState } from 'react';
import EditPopup from './AddEdit';

import axios from 'axios';
export const TransactionList = (wallet) => {
  const history = wallet.wallet.history
  const [checkOpen, setcheckOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({})
  function closeButton(){
    setcheckOpen(false)
  }
 function edit(transaction){
      setCurrentTransaction(transaction)
      setcheckOpen(true)
      }
  const incometransactions = [], expensetransactions = []
  function deleteTransaction(transaction){
    axios.delete(`http://localhost:5000/api/expense/${transaction.id}`)
    window.location.reload()
  }
  for (const key in history) {
    if(history[key].income){
      for (const iterator of history[key].income) {
        incometransactions.push({
        "date":key,
        "description": iterator.description,
        "amount":iterator.amount,
        "type":"income",
        "id":iterator.id
      })}
    }
    if(history[key].expense){
      for (const iterator of history[key].expense) {
        expensetransactions.push({
          "date":key,
          "description": iterator.description,
          "amount":iterator.amount,
          "type":"expense",
          "id":iterator.id
        })
}
    }
}
  if (wallet.wallet){
    if(checkOpen === true){
      return (<EditPopup 
      checkOpen={checkOpen}
      closeButton={closeButton}
      transaction = {currentTransaction}
      />)
    }else{
      return (
        <>
          <h3>Income Transactions</h3>
          <ul className="list">
          {incometransactions.map(transaction => 
          <li className={transaction.type} key={transaction.id}>
            <a onClick={(e)=>{ edit(transaction) }} style={{textDecoration:'underline',textDecorationColor: 'blue', cursor:'pointer'}} >{transaction.description}</a> <span>${Math.abs(transaction.amount)}</span><button onClick={() => deleteTransaction(transaction)} className="delete-btn">x</button>  
          </li>
          )}    
        </ul>
        <h3>Expense Transactions</h3>
          <ul className="list">
          {expensetransactions.map(transaction => <li key={transaction.id} className={transaction.type} >
            <a onClick={(e)=>{edit(transaction) }}style={{textDecoration:'underline',textDecorationColor: 'blue', cursor:'pointer'}} >{transaction.description}</a> <span>${Math.abs(transaction.amount)}</span><button onClick={() => deleteTransaction(transaction)} className="delete-btn">x</button>  
          </li>)}
        </ul>           
         </>
      )
    } 
  } 
}
