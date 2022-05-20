import { useTranslation } from "next-i18next";

import Route from "./Route";
import usePlace from "./usePlace";

interface IProps {
  placeId: string;
  onPlaceClick?: (placeId: string) => void;
}

const TravelRoutes = (props: IProps) => {
  const { placeId, onPlaceClick } = props;

  const { t } = useTranslation();

  const [place] = usePlace(placeId);

  return (
    <div>
      <div>{t(placeId)}</div>
      <div>{t("map_reach")}</div>
      {place?.travelRoutes?.map((route) => {
        return (
          <Route
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
export default TravelRoutes;
