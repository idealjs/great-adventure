import useSWR, { KeyedMutator } from "swr";

import fetcher from "../../lib/fetcher";
import { IGameData } from "../../lib/gamePlay";

const useGameData = (): [IGameData | undefined, KeyedMutator<IGameData>] => {
  const { data, mutate } = useSWR<IGameData>("/api/gameData", fetcher);

  return [data, mutate];
};

export default useGameData;
