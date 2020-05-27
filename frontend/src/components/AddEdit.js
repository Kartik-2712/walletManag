import React, { Component } from 'react'
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import axios from 'axios'

class AddEdit extends Component {
 constructor(props) {
     super(props)
     this.state = {
          Amount: this.props.transaction?this.props.transaction.amount: 0,
          Description:this.props.transaction?this.props.transaction.description:"",
          type:this.props.transaction?this.props.transaction.type: "expense",
          Date:this.props.transaction? moment(this.props.transaction.date ,'DD/MM/YYYY').toDate() : moment().toDate(),
          options: ["income", "expense"]
     }
     if(this.props.transaction)
     console.log(this.props.transaction.date)
 }
  async add(e){
    let finalDate = this.state.Date.getDate() + "-"+ parseInt(this.state.Date.getMonth()+1) +"-"+this.state.Date.getFullYear();
    if(this.state.Description === '' || !this.state.Description){
      alert('description is empty')
    }else if(this.state.Amount === ''){
      alert('amount is empty')
    }else if(this.state.type === ''){
      alert('type is empty')
    }else{
        console.log(this.props.transaction)
        if(!this.props.transaction)
        axios.post('http://localhost:5000/api/expense', { "description":this.state.Description,
            "amount":this.state.Amount,
            "date":finalDate,
            "type":this.state.type 
        })
        else
        axios.put(`http://localhost:5000/api/expense/${this.props.transaction.id}`, { "description":this.state.Description,
            "amount":this.state.Amount,
            "date":finalDate,
            "type":this.state.type 
        })
  }}

    render() {
        return (
            <div>
            <Modal isOpen={this.props.checkOpen}
            //  onClose={this.onCloseModal}
              >

<div style={{position:'absolute',right:0,top:0}}>
   <button style={{backgroundColor:'white',border: 'white', cursor:'pointer'}}>
         <img style={{height:50}}src={require('../Assets/close.png')} onClick={this.props.closeButton}/>
     </button>
   </div>
   <form>
 <p>Description</p>
    <input type='text' value={this.state.Description} onChange={(e)=>{this.setState({
        ...this.state, ...{Description:e.target.value}
    })}}/>
    <p>Date</p>
    <DatePicker selected={this.state.Date} onSelect={(e)=>{this.setState({Date: e})}} />
    <p>Type</p>
    <Dropdown options={this.state.options} default={this.state.type} value={this.state.type} placeholder="Select an option"  onChange={(e)=>{this.setState({
        type:e.value
    })}}/>
          <p>Amount</p>
          <input type='text' value ={this.state.Amount} onChange={(e)=>{this.setState({
            "Amount":e.target.value  
          })}}/>
          <div>
        <button style={{backgroundColor: 'green', margin: '5px', height:'30px', borderRadius:'5px', cursor:'pointer' }}onClick={(e)=>{
        this.add(e)}}>Submit</button>
        </div>
        </form>
             </Modal>
        </div>
        )
    }
}

export default AddEdit
