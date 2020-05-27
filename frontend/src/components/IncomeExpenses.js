import React from 'react';

export const IncomeExpenses = (wallet) => {
  let income = 0
  let expence = 0
  if (wallet.wallet){
    income = wallet.wallet.income
    expence = wallet.wallet.expense
  }

  return (
    <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
            <p className="money plus">{income}</p>
        </div>
        <div>
          <h4>Expense</h4>
            <p className="money minus">{expence}</p>
        </div>
      </div>
  )
}
