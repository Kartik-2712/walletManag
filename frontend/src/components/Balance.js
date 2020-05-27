import React from 'react';
export const Balance = (wallet) => {
  let balanceAmt = 0
  if (wallet.wallet){
      let income = wallet.wallet.income
      let expence = wallet.wallet.expense
      balanceAmt = income - expence
      balanceAmt = isNaN(balanceAmt)? 0: balanceAmt
  }
  return (
    <>
      <h4>Your Balance</h4>
    <h1>{balanceAmt}</h1>
    </>
  )
}
