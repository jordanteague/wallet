import React from "react";
import { Container } from "@chakra-ui/react";
import Head from "next/head";

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>[ title goes here ]</title>
      </Head>

      <Container
        minheight="100vh"
        maxW="container.md"
        alignItems="center"
        justifyContent="center"
      >
        {props.children}
      </Container>

    </>
  );
};
export default Layout;
