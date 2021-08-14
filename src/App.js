import logo from "./logo.svg";
import "./App.css";
import React from "react";

import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  //1. This is part of the constructor will be invoked when page lanuch index.js
  state = {
    manager: '',
    players:[],
    balance: '',
    value: '',
    message: ''
  };

  //3. This will be invoked after rendering
  //state.manager changed
  //4. state change will cause the re-render!
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault(); //Not classical html way

    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success...'})

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })

    this.setState({message: 'You have been entered!'})

  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success..'})
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked!'})
  }



  //2. render to be called with manager=''
  render() {
    return (
      <div >
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}
          There are currently {this.state.players.length} people
          competing to win {web3.utils.fromWei(this.state.balance,'ether')} ether!
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try you luck?</h4>
          <div>
            <label>Amount of ether to enter:</label>
            <input
                value = {this.state.value}
                onChange={event => {this.setState({value: event.target.value} )}}
            />
          </div>
            <button>Enter</button>
        </form>

        <hr/>
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner</button>
        <hr/>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;
