import React from 'react';
const PlusButton = ({ transaction,plusClick }) => {
  return (
   <div>
     <button style={{backgroundColor:'#f7f7f7',border: 'white', cursor:'pointer'}}>
      <img style={{height:50}}src={require('../Assets/plus.png')}
      onClick={plusClick}
      />
       </button>
     </div>
  )
}

export default PlusButton