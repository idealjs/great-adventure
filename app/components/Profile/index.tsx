import { useSession } from "next-auth/react";

import Intro from "./Intro";
import Profile from "./Profile";

const Test = () => {
  const { data, status } = useSession();
  if (status === "loading") {
    return null;
  }

  if (data) {
    return <Profile session={data} />;
  } else {
    return <Intro />;
  }
};

export default Test;
