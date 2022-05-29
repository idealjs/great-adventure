import { IJourney } from ".";

const calcJourney = (data: {
  journeys: IJourney[];
  currentPlaceId: string;
}) => {
  const { journeys, currentPlaceId } = data;

  const [current, ...tail] = journeys;

  if (current.distance === 0) {
    return {
      currentPlaceId: current.to,
      journeys: tail,
    };
  } else {
    return {
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
