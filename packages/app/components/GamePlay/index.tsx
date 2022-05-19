import useInterval from "../../lib/tick";
import useGameData from "./useGameData";

const GamePlay = () => {
  const [gameData, mutate] = useGameData();

  useInterval(() => {
    if (gameData?.destination != null && gameData.destination.length !== 0) {
      mutate();
    }
  }, 1000);

  return null;
};

export default GamePlay;
