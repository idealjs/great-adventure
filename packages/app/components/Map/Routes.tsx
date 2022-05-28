import {
  FolderIcon,
  FolderOpenIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import clsx from "clsx";
import { useState } from "react";
import { useSWRConfig } from "swr";

import usePlace from "../../api/hook/usePlace";
import { apiGameData, patchGameDataJourneys } from "../../lib/api";
import { ITravelRoute } from "../../lib/gamePlay";

interface IProps {
  placeId: string;
  hidden?: boolean;
  paths?: ITravelRoute[];
}

const Route = (props: IProps) => {
  const { placeId, hidden = true, paths = [] } = props;

  const { mutate } = useSWRConfig();
  const [place] = usePlace(placeId, hidden);
  const [checked, setChecked] = useState(false);
  const [cachedPlace, setCachedPlace] = useState(() => place);

  return (
    <div className={clsx("grow", { hidden })}>
      <div className="flex items-center my-2">
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
        <button
          onClick={() => {
            mutate(
              apiGameData,
              patchGameDataJourneys({
                userId: "1",
                journeys: paths,
              })
            );
          }}
          className="w-6"
        >
          <PaperAirplaneIcon className="text-gray-500	rotate-90" />
        </button>
      </div>
      {(place ?? cachedPlace)?.travelRoutes?.map((r, index, array) => {
        return (
          <div key={r.to} className="flex">
            <div
              className={clsx("border-l-4 ml-2 mr-1", {
                hidden: !checked,
                "h-6": index === array.length - 1,
              })}
            >
              <div className={clsx("w-2 border-t-4 top-5 relative", {})}></div>
            </div>
            <Route
              key={r.to}
              placeId={r.to}
              hidden={!checked}
              paths={[...paths, r]}
            />
          </div>
        );
      })}
    </div>
  );
};
export default Route;
