import { useTranslation } from "next-i18next";

import usePlace from "../../api/hook/usePlace";

interface IProps {
  placeId: string;
  endJoureny: () => void;
}

const CurrentPlace = (props: IProps) => {
  const { placeId, endJoureny } = props;
  const [place] = usePlace(placeId);
  const { t } = useTranslation();

  return (
    <div>
      {t("place_locate")}
      {place?.name}
      <button onClick={endJoureny}>{t("end_journey")}</button>
    </div>
  );
};
export default CurrentPlace;
