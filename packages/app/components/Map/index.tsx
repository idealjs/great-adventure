import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";

import { ITravelRoute } from "../../lib/gamePlay";
import useGameData from "../GamePlay/useGameData";
import Layout from "../Layout";
import TravelRoutes from "./TravelRoutes";

const Map = () => {
  const [travelRoutes, setTravelRoutes] = useState<ITravelRoute[]>([]);

  const { t } = useTranslation();

  const [gameData] = useGameData();

  const currentPlaceId = gameData?.currentPlaceId;

  const onRouteChanged = useCallback(
    (from: string, travelRoute: ITravelRoute | null) => {
      setTravelRoutes((routes) => {
        const target = routes.findIndex((route) => route.from === from);

        if (travelRoute != null && target === -1) {
          return routes.concat(travelRoute);
        }

        if (travelRoute != null && target !== -1) {
          return routes.slice(0, target).concat(travelRoute);
        }

        if (travelRoute == null && target !== -1) {
          return routes.slice(0, target);
        }

        return routes;
      });
    },
    []
  );

  return (
    <Layout>
      <div className="flex m-1">
        <div>
          <div>{t("map_title")}</div>
          {currentPlaceId && (
            <div>
              <TravelRoutes
                from={currentPlaceId}
                onRouteChanged={onRouteChanged}
              />
              {travelRoutes.map((r) => {
                return (
                  <TravelRoutes
                    key={r.to}
                    from={r.to}
                    onRouteChanged={onRouteChanged}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div></div>
      </div>
    </Layout>
  );
};

export default Map;
