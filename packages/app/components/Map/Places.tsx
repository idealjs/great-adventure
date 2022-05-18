import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useCallback } from "react";
import useSwr from "swr";

import fetcher from "../../lib/fetcher";
import { IPlace } from "../../pages/api/places/Graph";

interface IProps {
  map_id: string;
  onClick?: (mapId: string) => void;
}

const Places = (props: IProps) => {
  const { map_id, onClick } = props;
  const { t } = useTranslation();

  const { data: res, error } = useSwr<{ data?: IPlace[] }>(
    `/api/places?map_id=${map_id}`,
    fetcher
  );

  return (
    <div>
      <div>{t(map_id)}</div>
      <div>{t("map_reach")}</div>
      {res?.data?.map((edge) => {
        return (
          <div
            onClick={() => onClick && onClick(edge.point.id)}
            key={edge.point.id}
          >
            <div>{t(edge.point.name)}</div>
          </div>
        );
      })}
    </div>
  );
};
export default Places;
