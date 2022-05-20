import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useCallback } from "react";

import useGameData from "../GamePlay/useGameData";
import Layout from "../Layout";
import TravelRoutes from "./TravelRoutes";

const Map = () => {
  const [expands, setExpands] = useState<{ key: string; placeId: string }[]>(
    []
  );

  const { t } = useTranslation();

  const [gameData] = useGameData();

  const currentPlaceId = gameData?.currentPlaceId;

  const onPlaceClick = useCallback((key: string, placeId: string) => {
    setExpands((expands) => {
      const target = expands.findIndex((expand) => expand.key === key);
      if (target !== -1) {
        if (expands[target].placeId === placeId) {
          return expands.slice(0, target);
        } else {
          return [...expands.slice(0, target), { key, placeId }];
        }
      }

      return expands.concat({
        key,
        placeId,
      });
    });
  }, []);

  return (
    <Layout>
      <div className="flex m-1">
        <div>
          <div>{t("map_title")}</div>
          {currentPlaceId && (
            <div>
              <TravelRoutes
                placeId={currentPlaceId}
                onPlaceClick={(id) => {
                  onPlaceClick(currentPlaceId, id);
                }}
              />
              {expands.map((e) => {
                return (
                  <TravelRoutes
                    key={e.placeId}
                    placeId={e.placeId}
                    onPlaceClick={(id) => {
                      onPlaceClick(e.placeId, id);
                    }}
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
