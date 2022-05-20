import { IPlace } from "../../../lib/gamePlay";

class Graph {
  public places: Map<string, IPlace> = new Map();

  public addPlace(place: IPlace) {
    this.places.set(place.id, {
      ...(this.places.get(place.id) ?? place),
    });
  }

  public addTravelRoute(from: IPlace, to: IPlace, distance: number) {
    this.places.set(from.id, {
      ...(this.places.get(from.id) ?? from),
      travelRoutes: (this.places.get(from.id) ?? from).travelRoutes
        .filter((route) => {
          return route.to !== to.id;
        })
        .concat({
          from: from.id,
          to: to.id,
          distance,
        }),
    });
  }

  public removeTravelRoute(from: IPlace, to: IPlace) {
    this.places.set(from.id, {
      ...(this.places.get(from.id) ?? from),
      travelRoutes: (this.places.get(from.id) ?? from).travelRoutes.filter(
        (route) => {
          return route.to !== to.id;
        }
      ),
    });
  }
}

export default Graph;
