import React, { Component, useEffect } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Box, Flex, Button, Text, Spacer, VStack, HStack } from "@chakra-ui/react";
import Layout from "../components/Layout";

class Home extends Component {

  state = {
    fetching: false,
    address: "",
    web3: null,
    provider: null,
    connected: false,
    chainId: 1,
    networkId: 1,
    assets: [],
    showModal: false,
    pendingRequest: false,
    result: null
  };

  constructor(props) {
    super(props);
  }

  getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "26e178ea568e492983f2431ad6a31e74" // required
        }
      }
    };
    return providerOptions;
  }

  componentDidMount = async() => {

    const web3Modal = new Web3Modal({
      providerOptions: this.getProviderOptions()
    });

    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);

    console.log(web3);

    this.setState({ web3, provider })

  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  testSignMessage = async () => {

    const { web3 } = this.state;

    let accounts = await web3.eth.getAccounts();
    let address = accounts[0];

    if (!web3) {
      return;
    }

    // test message
    const message = "My email is john@doe.com - 1537836206101";

    // hash message
    //const hash = hashPersonalMessage(message);
    const hash = "fakehash";

    try {
      // open modal
      this.toggleModal();

      // toggle pending request indicator
      this.setState({ pendingRequest: true });

      // send message
      const result = await web3.eth.sign(hash, address);

      // verify signature
      const signer = recoverPublicKey(result, hash);
      const verified = signer.toLowerCase() === address.toLowerCase();

      // format displayed result
      const formattedResult = {
        action: ETH_SIGN,
        address,
        signer,
        verified,
        result
      };

      // display result
      this.setState({
        web3,
        pendingRequest: false,
        result: formattedResult || null
      });
    } catch (error) {
      console.error(error); // tslint:disable-line
      this.setState({ web3, pendingRequest: false, result: null });
    }
  };

  testSend = async() => {

    const { web3 } = this.state;

    let accounts = await web3.eth.getAccounts();
    let address = accounts[0];
    let recipient = "0x348E75571db50E4572871eaBC0Fa4ECF5f6DEe30";

    if (!web3) {
      return;
    }

    try {
      this.toggleModal();
      await web3.eth.sendTransaction({ from: address, to: recipient, value: 10000000 });
      console.log("worked")
    } catch(e) {
      console.log(e)
    }

  }

  render() {
    return (
      <Layout>
        <Button onClick={this.testSend}>Test</Button>
      </Layout>
    );
  }
}

export default Home;
