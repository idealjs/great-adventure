import { useTranslation } from "next-i18next";

import PlaceItem from "./PlaceItem";
import usePlace from "./usePlace";

interface IProps {
  placeId: string;
  onPlaceClick?: (placeId: string) => void;
}

const Places = (props: IProps) => {
  const { placeId, onPlaceClick } = props;
  const { t } = useTranslation();

  const [place] = usePlace(placeId);

  return (
    <div>
      <div>{t(placeId)}</div>
      <div>{t("map_reach")}</div>
      {place?.travelRoutes?.map((route) => {
        return (
          <PlaceItem
            key={route.placeId}
            placeId={route.placeId}
            onClick={() => {
              onPlaceClick && onPlaceClick(route.placeId);
            }}
          />
        );
      })}
    </div>
  );
};
export default Places;
