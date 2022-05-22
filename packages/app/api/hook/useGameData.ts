import useSWR, { KeyedMutator } from "swr";

import { apiGameData } from "../../lib/api";
import fetcher from "../../lib/fetcher";
import { IGameData } from "../../lib/gamePlay";

const useGameData = (): [
  IGameData | undefined,
  KeyedMutator<{ data: IGameData }>
] => {
  const { data: res, mutate } = useSWR<{ data: IGameData }>(
    apiGameData,
    fetcher
  );

  return [res?.data, mutate];
};

export default useGameData;
