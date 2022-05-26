import {
  FolderIcon,
  FolderOpenIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import clsx from "clsx";
import { useState } from "react";

import usePlace from "../../api/hook/usePlace";

interface IProps {
  placeId: string;
  hidden?: boolean;
}

const Route = (props: IProps) => {
  const { placeId, hidden = true } = props;

  const [place, mutate] = usePlace(placeId, hidden);
  const [checked, setChecked] = useState(false);
  const [cachedPlace, setCachedPlace] = useState(() => place);

  return (
    <div className={clsx("border-l-4 ml-2 pl-2", { hidden, [placeId]: true })}>
      <div className="flex items-center	justify-between my-2">
        <button
          onClick={() => {
            setChecked((c) => !c);
            setCachedPlace(place);
          }}
          className="w-6"
        >
          {checked ? (
            <FolderOpenIcon className="text-gray-500" />
          ) : (
            <FolderIcon className="text-gray-500" />
          )}
        </button>

        <label className="mx-1">{place?.name}</label>
        <button onClick={() => mutate()} className="w-6">
          <PaperAirplaneIcon className="text-gray-500	rotate-90" />
        </button>
      </div>

      {(place ?? cachedPlace)?.travelRoutes?.map((r) => {
        return <Route key={r.to} placeId={r.to} hidden={!checked} />;
      })}
    </div>
  );
};
export default Route;
