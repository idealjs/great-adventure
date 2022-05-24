import { Fragment } from "react";
import { useState } from "react";

import usePlace from "../../api/hook/usePlace";
import { ITravelRoute } from "../../lib/gamePlay";
import Route from "./Route";

interface IProps {
  travelRoutes: ITravelRoute[];
  selected?: ITravelRoute[];
}

const TravelRoutes = (props: IProps) => {
  const { travelRoutes } = props;
  const [selected, setSelected] = useState<ITravelRoute | null>(null);

  return (
    <Fragment>
      {travelRoutes?.map((r) => {
        return (
          <Route
            key={r.to}
            placeId={r.to}
            checked={selected?.to === r.to}
            onChange={() => {
              setSelected((selected) => (selected?.to !== r.to ? r : null));
            }}
          />
        );
      })}
    </Fragment>
  );
};

export default TravelRoutes;
