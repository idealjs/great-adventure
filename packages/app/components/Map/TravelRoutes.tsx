import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useState } from "react";

import { ITravelRoute } from "../../lib/gamePlay";
import Route from "./Route";
import usePlace from "./usePlace";

interface IProps {
  from: string;
  onRouteChanged?: (from: string, travelRoute: ITravelRoute | null) => void;
}

const TravelRoutes = (props: IProps) => {
  const { from, onRouteChanged } = props;
  const [selected, setSelected] = useState<ITravelRoute | null>(null);
  const { t } = useTranslation();

  const [place] = usePlace(from);

  useEffect(() => {
    onRouteChanged && onRouteChanged(from, selected);
  }, [from, onRouteChanged, selected]);

  return (
    <div>
      <div>{t(from)}</div>
      <div>{t("map_reach")}</div>
      {place?.travelRoutes?.map((r) => {
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
    </div>
  );
};

export default TravelRoutes;