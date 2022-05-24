import useSWR, { KeyedMutator } from "swr";

import fetcher from "../../lib/fetcher";
import { IPlace } from "../../lib/gamePlay";

const usePlace = (
  placeId?: string
): [IPlace | undefined, KeyedMutator<{ data: IPlace[] }>] => {
  const { data: res, mutate } = useSWR<{ data: IPlace[] }>(
    `/api/places?placeId=${placeId}`,
    fetcher
  );

  return [res?.data[0], mutate];
};

export default usePlace;
