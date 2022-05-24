import {
  FolderIcon,
  FolderOpenIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";
import { MouseEventHandler } from "react";

import usePlace from "../../api/hook/usePlace";
import TravelRoutes from "./TravelRoutes";

interface IProps {
  placeId: string;
  checked: boolean;
  onChange: MouseEventHandler<HTMLButtonElement>;
}

const Route = (props: IProps) => {
  const { placeId, checked, onChange } = props;
  const [place, mutate] = usePlace(placeId);
  const { t } = useTranslation();

  return place ? (
    <div className="border-l-4 ml-2 pl-2">
      <div className="flex items-center	justify-between my-2">
        <button onClick={onChange} className="w-6">
          {checked ? (
            <FolderOpenIcon className="text-gray-500" />
          ) : (
            <FolderIcon className="text-gray-500" />
          )}
        </button>

        <label className="mx-1">{t(place?.name)}</label>
        <button onClick={() => mutate()} className="w-6">
          <PaperAirplaneIcon className="text-gray-500	rotate-90" />
        </button>
      </div>

      {checked && <TravelRoutes travelRoutes={place.travelRoutes} />}
    </div>
  ) : null;
};
export default Route;
