import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useCallback } from "react";

import useGameData from "../../api/hook/useGameData";
import usePlace from "../../api/hook/usePlace";
import { patchGameData } from "../../lib/api";
import { ITravelRoute } from "../../lib/gamePlay";
import Layout from "../Layout";
import TravelRoutes from "./TravelRoutes";

const Map = () => {
  const { t } = useTranslation();

  const [gameData, mutate] = useGameData();
  const [place] = usePlace(gameData?.currentPlaceId);

  return (
    <Layout>
      <div className="flex m-1">
        <div className="overflow-y-auto scrollbar">
          <div className="sticky top-0 bg-white">
            <h1 className="mx-1">{t("map_title")}</h1>
            <span className="mx-1">{place?.name}</span>
            <span className="mx-1">{t("map_reach")}</span>
          </div>

          {place?.travelRoutes && (
            <TravelRoutes travelRoutes={place?.travelRoutes} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Map;
