import { useTranslation } from "next-i18next";
import { MouseEventHandler } from "react";

import usePlace from "./usePlace";

interface IProps {
  placeId: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Route = (props: IProps) => {
  const { placeId, onClick } = props;
  const [place] = usePlace(placeId);
  const { t } = useTranslation();

  return place ? (
    <div onClick={onClick} key={placeId}>
      <input type="checkbox" name="place" />
      <label>{t(place?.name)}</label>
    </div>
  ) : null;
};
export default Route;
