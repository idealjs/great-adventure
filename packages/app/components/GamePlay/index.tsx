import useGameData from "../../api/hook/useGameData";
import useInterval from "../../lib/tick";

const GamePlay = () => {
  const [gameData, mutate] = useGameData();

  useInterval(() => {
    if (gameData?.journeys != null && gameData.journeys.length !== 0) {
      mutate();
    }
  }, 1000);

  return null;
};

export default GamePlay;
