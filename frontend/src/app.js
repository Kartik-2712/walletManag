import React, { Component } from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import PlusButton from './components/PlusButton';
import AddPopup from './components/AddEdit'
import './App.css';
import axios from 'axios'


export class App1 extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            checkOpen: false,
            wallet:{},
            clickAction: ()=>{
                this.setState({
                    checkOpen: true
                })
            },          
             closeButton: ()=>{
                this.setState({
                    checkOpen: false
                })
            }
        

        }
    }

    async componentDidMount() {
        const data =  await axios.get('http://localhost:5000/api/expense')
        this.setState({
            wallet: data.data
        })
    }
    
    render() {
        return (
            <div>
                  <Header />
      <div className="container">
        <Balance  wallet={this.state.wallet}/>
        <IncomeExpenses wallet={this.state.wallet}/>
        <TransactionList wallet={this.state.wallet}/>
        <AddPopup 
        checkOpen={this.state.checkOpen}
        closeButton={this.state.closeButton}
        />
        
        {/* <AddTransaction /> */}
        <div
        style={{
          position:'absolute',
          right:15,
          bottom:0
        }}
        >
        <PlusButton plusClick={this.state.clickAction} />
        </div>
      </div>
            </div>
        )
    }
}

export default App1
