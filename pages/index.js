import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Box, Flex, Button, Text, Spacer, VStack, HStack } from "@chakra-ui/react";
import Layout from "../components/Layout";

class App extends Component {

  state = {
    web3: null
  }

  async componentDidMount() {

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "26e178ea568e492983f2431ad6a31e74" // required
        }
      }
    };

    const web3Modal = new Web3Modal({
      providerOptions
    });

    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);

    this.setState({ web3 });

  }

  send = async() => {

    const { web3 } = this.state;

    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    await web3.eth.sendTransaction({from: account, to: '0x348E75571db50E4572871eaBC0Fa4ECF5f6DEe30', value: 100});
  }

  render() {

    return (
      <Layout>
        <>Connected:</>

        <Button onClick={this.send}>Test Sign</Button>
      </Layout>
    );
}
}

export default App;
