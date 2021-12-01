import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Box, Flex, Button, Input, Text, Spacer, VStack, HStack } from "@chakra-ui/react";
import Layout from "../components/Layout";

class App extends Component {

  state = {
    web3: null,
    account: null,
    network: null
  }

  async componentDidMount() {

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "f0d8e56e0aeb4a8594192dc550f05a2d" // required
        }
      }
    };

    const web3Modal = new Web3Modal({
      providerOptions
    });

    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);

    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];

    let chainId = await web3.eth.getChainId();

    this.setState({ web3, account, chainId });

  }

  send = async(e) => {

    e.preventDefault();
    let object = event.target;
    var array = [];
    for (let i = 0; i < object.length; i++) {
      array[object[i].name] = object[i].value;
    }

    var { recipient, amount } = array;

    const { web3, account, chainId } = this.state;

    await web3.eth.sendTransaction({from: account, to: array['to'], value: array['amount']});
  }

  render() {

    return (
      <Layout>
        <Button>{this.state.account!=null ? this.state.account : <>Connect Wallet</>}</Button>
        {this.state.chainId!=null ? <Button>chain: {this.state.chainId}</Button> : ''}
        <form onSubmit={this.send}>
          <Text>To</Text><Input name="to" />
          <Text>Amount</Text><Input name="amount" />
          <Button type="submit">Send</Button>
        </form>


      </Layout>
    );
}
}

export default App;
