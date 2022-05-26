import useSWR, { KeyedMutator } from "swr";

import fetcher from "../../lib/fetcher";
import { IPlace } from "../../lib/gamePlay";

const usePlace = (
  placeId?: string,
  hidden?: boolean
): [IPlace | undefined, KeyedMutator<{ data: IPlace[] }>] => {
  const { data: res, mutate } = useSWR<{ data: IPlace[] }>(
    placeId != null && hidden !== true
      ? `/api/places?placeId=${placeId}`
      : null,
    fetcher
  );

  return [res?.data[0], mutate];
};

export default usePlace;
