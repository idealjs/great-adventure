import useSWR, { KeyedMutator } from "swr";

import fetcher from "../../lib/fetcher";
import { IPlace } from "../../lib/gamePlay";

const usePlace = (
  placeId: string
): [IPlace | undefined, KeyedMutator<IPlace>] => {
  const { data, mutate } = useSWR<IPlace>(
    `/api/places?place_id=${placeId}`,
    fetcher
  );

  return [data, mutate];
};

export default usePlace;
