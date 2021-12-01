import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Box, Flex, Button, Text, Spacer, VStack, HStack } from "@chakra-ui/react";
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

  send = async() => {

    const { web3, account, chainId } = this.state;

    await web3.eth.sendTransaction({from: account, to: '0x348E75571db50E4572871eaBC0Fa4ECF5f6DEe30', value: 100});
  }

  render() {

    return (
      <Layout>
        <Text>account: {this.state.account}</Text>
        <Text>chain: {this.state.chainId}</Text>

        <Button onClick={this.send}>Test Sign</Button>
      </Layout>
    );
}
}

export default App;
