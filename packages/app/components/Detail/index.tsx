import { useId } from "react";
import { useState } from "react";

import radomAdventurer from "../../lib/gamePlay/radomAdventurer";
import Layout from "../Layout";
import Card from "./Card";

const Detail = () => {
  const id = useId();
  const [mockAdventurer] = useState(() => radomAdventurer(id));
  const mockArray = Array.from({ length: 10 }, () => radomAdventurer(id));

  return (
    <Layout>
      <div className="flex flex-col overflow-y-auto scrollbar">
        {mockArray.map((adventurer, index) => (
          <Card key={index} adventurer={adventurer} />
        ))}
      </div>
    </Layout>
  );
};

export default Detail;
