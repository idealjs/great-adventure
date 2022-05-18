import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useCallback } from "react";
import useSwr from "swr";

import fetcher from "../../lib/fetcher";
import { IGameData } from "../../pages/api/gameData";
import Layout from "../Layout";
import Places from "./Places";

const Map = () => {
  const [expands, setExpands] = useState<{ key: string; mapId: string }[]>([]);
  const { t } = useTranslation();

  const { data: res } = useSwr<{ data: IGameData }>("/api/gameData", fetcher);

  const currentMapId = res?.data.pointId;

  const onPlaceClick = useCallback((key: string, mapId: string) => {
    setExpands((expands) => {
      const target = expands.findIndex((expand) => expand.key === key);
      if (target !== -1) {
        if (expands[target].mapId === mapId) {
          return expands.slice(0, target);
        } else {
          return [...expands.slice(0, target), { key, mapId }];
        }
      }

      return expands.concat({
        key,
        mapId,
      });
    });
  }, []);

  return (
    <Layout>
      <div className="flex m-1">
        <div>
          <div>{t("map_title")}</div>
          {currentMapId && (
            <div>
              <Places
                map_id={currentMapId}
                onClick={(id) => {
                  onPlaceClick(currentMapId, id);
                }}
              />
              {expands.map((e) => {
                return (
                  <Places
                    key={e.mapId}
                    map_id={e.mapId}
                    onClick={(id) => {
                      onPlaceClick(e.mapId, id);
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
