import { useSession } from "next-auth/react";
import { Fragment } from "react";

import Layout from "../Layout";
import Intro from "./Intro";
import Profile from "./Profile";

const Test = () => {
  const { data, status } = useSession();
  if (status === "loading") {
    return null;
  }

  return (
    <Fragment>
      {data ? (
        <Layout>
          <Profile session={data} />{" "}
        </Layout>
      ) : (
        <Intro />
      )}
    </Fragment>
  );
};

export default Test;
