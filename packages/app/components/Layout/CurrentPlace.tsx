import { HandIcon } from "@heroicons/react/outline";
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
      <button
        className=" shadow-md py-2 px-6 inline-flex items-center"
        onClick={endJoureny}
      >
        <span className="whitespace-nowrap">{t("end_journey")}</span>
        <HandIcon height={24} width={24} />
      </button>
    </div>
  );
};
export default CurrentPlace;
