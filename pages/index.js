import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Box, Flex, Button, Input, Text, Spacer, VStack, HStack } from "@chakra-ui/react";
import Layout from "../components/Layout";

export default function App() {

  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    connect();

    if (window.ethereum) {
      setChainId(window.ethereum.networkVersion);

      ethereum.on("accountsChanged", function (accounts) {
        connect();
        console.log("changed!");
      });
      window.ethereum.on("chainChanged", () => {
        connect();
      });
    }
  }, []);

  const connect = async() => {

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

    setWeb3(web3);
    console.log(web3)
    setAccount(account);
    setChainId(chainId);

  }

  const send = async(e) => {

    e.preventDefault();
    let object = event.target;
    var array = [];
    for (let i = 0; i < object.length; i++) {
      array[object[i].name] = object[i].value;
    }

    var { recipient, amount } = array;

    await web3.eth.sendTransaction({from: account, to: array['to'], value: array['amount']});
  }



    return (
      <Layout>
        <Button>{account!=null ? account : <>Connect Wallet</>}</Button>
        {chainId!=null ? <Button>chain: {chainId}</Button> : ''}
        <form onSubmit={send}>
          <Text>To</Text><Input name="to" />
          <Text>Amount</Text><Input name="amount" />
          <Button type="submit">Send</Button>
        </form>


      </Layout>
    );

}
