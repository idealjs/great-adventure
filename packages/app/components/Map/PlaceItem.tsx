import { useTranslation } from "next-i18next";
import { MouseEventHandler } from "react";

import usePlace from "./usePlace";

interface IProps {
  placeId: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const PlaceItem = (props: IProps) => {
  const { placeId, onClick } = props;
  const [place] = usePlace(placeId);
  const { t } = useTranslation();

  return place ? (
    <div onClick={onClick} key={placeId}>
      <div>{t(place?.name)}</div>
    </div>
  ) : null;
};
export default PlaceItem;
