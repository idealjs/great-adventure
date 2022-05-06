import { getSession } from "next-auth/react";

export { default } from "../components/Profile";

export const getServerSideProps = async () => {
  return {
    props: {
      session: await getSession(),
    },
  };
};
