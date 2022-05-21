import { GameData } from "@prisma/client/gameData";
import useSWR, { KeyedMutator } from "swr";

import { apiGameData } from "../../lib/api";
import fetcher from "../../lib/fetcher";

const useGameData = (): [
  GameData | undefined,
  KeyedMutator<{ data: GameData }>
] => {
  const { data: res, mutate } = useSWR<{ data: GameData }>(
    apiGameData,
    fetcher
  );

  return [res?.data, mutate];
};

export default useGameData;
