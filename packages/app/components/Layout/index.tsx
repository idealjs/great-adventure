import Head from "next/head";
import { Fragment, PropsWithChildren } from "react";

import { SocketProvider } from "../Socket";
import NavBar from "./NavBar";

interface IProps {}

const Layout = (props: PropsWithChildren<IProps>) => {
  const { children } = props;
  return (
    <Fragment>
      <SocketProvider>
        <Head>
          <title>Great Adventure</title>
          <meta name="description" content="Game of Great Adventure" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar />
        {children}
      </SocketProvider>
    </Fragment>
  );
};

export default Layout;
