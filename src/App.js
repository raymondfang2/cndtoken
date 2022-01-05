
import "./App.css";
import React from "react";


import cnd from "./cnd"

class App extends React.Component {

  state = {
    totalSupply: '',
    transferHistory: [],
  };

  async componentDidMount() {
    const totalSupply = await cnd.methods.totalSupply().call();
    console.log("=========>");
    console.log(totalSupply);

    let options = {
      filter: {

      },
      fromBlock: 9817281,                  //Number || "earliest" || "pending" || "latest"
      toBlock: 'latest'
    };

    let transferHistory = await cnd.getPastEvents('Transfer', options);
    console.log(transferHistory);

    this.setState({totalSupply, transferHistory});


    console.log(this.state.transferHistory[1].returnValues.from);
    console.log(this.state.transferHistory[1].returnValues.to);
    console.log(this.state.transferHistory[1].returnValues.value);

  }

  renderTransferHistory() {
    return this.state.transferHistory.map((transferEvent,index)=>{
      return <tr
          key={index}
          id={index}>
        <td>{index+1}</td>
        <td>{transferEvent.returnValues.from}</td>
        <td>{transferEvent.returnValues.to}</td>
        <td>{transferEvent.returnValues.value/1000000000000000000}</td>
      </tr>;
    });
  }


  //2. render to be called with manager=''
  render() {
    return (
      <div >
        <hr />
          <h4>CND Coin Transfer History</h4>
          <div>
            <label>Total Supply:</label>
            <label>{this.state.totalSupply/1000000000000000000}</label>
          </div>
        <div>
          <label>Total Transfers:</label>
          <label>{this.state.transferHistory.length}</label>
        </div>
        <div>
          <label>History:</label>
          <table id='TransferEvents'><tbody>
          <th>No</th><th>From Account</th><th>To Account</th><th>Amount</th>
          {this.renderTransferHistory()}
          </tbody></table>
        </div>
      </div>
    );
  }
}
export default App;
