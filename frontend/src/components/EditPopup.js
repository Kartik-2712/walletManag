import React from 'react';
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

const EditPopup = ({checkOpen,closeButton, transaction}) => {

    const options = [
        'expense', 'income'
      ];
      const update=(e)=>{
        let finalDate = date.getDate() + "-"+ parseInt(date.getMonth()+1) +"-"+date.getFullYear();
        console.log({
            finalDate, type, amount,description
        })
        if(description == '' || !description){
          alert('description is empty')
        }else if(amount == ''){
          alert('amount is empty')
        }else if(type == ''){
          alert('type is empty')
        }else{
        // checkOpen = false
        axios.post('http://localhost:5000/api/expense', { "description":description,
        "amount":amount,
        "date":finalDate,
        "type":type })
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{
          console.log(err)
        })
      }}
      const [description, setDescription] = useState('')
      const [date, setDate] = useState(new Date())
      const [type, setType] = useState('');
      const [amount, setAmount] = useState(0)
      if(transaction.amount)   setAmount(transaction.amount)      
     if(transaction.date) setDate(transaction.date)
      if(transaction.type) setType(transaction.type)
      if(transaction.description) setDescription(transaction.description)
     return (
         <div>
              <Modal isOpen={checkOpen}
              //  onClose={this.onCloseModal}
                >

<div style={{position:'absolute',right:0,top:0}}>
     <button style={{backgroundColor:'white',border: 'white', cursor:'pointer'}}>
   <img style={{height:50}}src={require('./plus.png')}
   onClick={closeButton}
   />
 
       </button>
     </div>
     <form>
   <p>Description</p>
      <input type='text' value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
      <p>Date</p>
      <DatePicker 
 selected={date} onSelect={(e)=>{setDate(e)}}/>
      <p>Type</p>
      <Dropdown options={options} default={type} value={type} placeholder="Select an option"  onChange={(e)=>{setType(e.value)}}/>
            <p>Amount</p>
            <input type='text' value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
<button onClick={(e)=>{
    update(e)}}>Submit</button>
   </form>



               </Modal>
          </div>
     );
  }

export default EditPopup