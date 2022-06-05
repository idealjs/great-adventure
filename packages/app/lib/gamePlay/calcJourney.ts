import { IGameData } from ".";

const calcJourney = (data: IGameData): IGameData => {
  const { journeys, currentPlaceId } = data;

  const [current, ...tail] = journeys;

  if (current.distance === 0) {
    return {
      ...data,
      currentPlaceId: current.to,
      journeys: tail,
    };
  } else {
    return {
      ...data,
      currentPlaceId: currentPlaceId,
      journeys: [
        {
          ...current,
          distance: current.distance - 1,
        },
        ...tail,
      ],
    };
  }
};

export default calcJourney;
