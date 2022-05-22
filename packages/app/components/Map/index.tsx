import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useCallback } from "react";

import useGameData from "../../api/hook/useGameData";
import { patchGameData } from "../../lib/api";
import { ITravelRoute } from "../../lib/gamePlay";
import Layout from "../Layout";
import TravelRoutes from "./TravelRoutes";

const Map = () => {
  const [travelRoutes, setTravelRoutes] = useState<ITravelRoute[]>([]);

  const { t } = useTranslation();

  const [gameData, mutate] = useGameData();

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

  const onMapGoClick = useCallback(() => {
    if (gameData) {
      mutate(
        patchGameData({
          ...gameData,
          journeys: travelRoutes,
        })
      );
    }
  }, [gameData, mutate, travelRoutes]);

  console.log("test test travelRoutes", travelRoutes);

  return (
    <Layout>
      <div className="flex m-1">
        <div className="overflow-y-auto scrollbar">
          <div className="sticky top-0 bg-white">
            {t("map_title")}
            <button onClick={onMapGoClick}>{t("map_go")}</button>
          </div>
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
      </div>
    </Layout>
  );
};

export default Map;
