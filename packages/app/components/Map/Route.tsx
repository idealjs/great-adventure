import { useTranslation } from "next-i18next";
import { ChangeEventHandler, MouseEventHandler } from "react";

import usePlace from "./usePlace";

interface IProps {
  placeId: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Route = (props: IProps) => {
  const { placeId, checked, onChange } = props;
  const [place] = usePlace(placeId);
  const { t } = useTranslation();

  return place ? (
    <div key={placeId}>
      <input
        type="checkbox"
        name="place"
        checked={checked}
        value={placeId}
        onChange={onChange}
      />
      <label>{t(place?.name)}</label>
    </div>
  ) : null;
};
export default Route;
