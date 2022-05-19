import { NextApiRequest, NextApiResponse } from "next";

import { IPlace } from "../../../lib/gamePlay";
import Graph from "./Graph";

const graph = new Graph();

const point1: IPlace = { id: "1", name: "point1", travelRoutes: [] };
const point2: IPlace = { id: "2", name: "point2", travelRoutes: [] };
const point3: IPlace = { id: "3", name: "point3", travelRoutes: [] };
const point4: IPlace = { id: "4", name: "point4", travelRoutes: [] };
const point5: IPlace = { id: "5", name: "point5", travelRoutes: [] };

graph.addTravelRoute(point1, point2, 1);
graph.addTravelRoute(point2, point3, 3);
graph.addTravelRoute(point2, point4, 4);
graph.addTravelRoute(point4, point5, 5);
graph.addTravelRoute(point1, point5, 5);
graph.addPlace(point5);
graph.addPlace(point3);

const placesHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { place_id },
    method,
  } = req;

  switch (method) {
    case "GET":
      if (Array.isArray(place_id)) {
        res.status(200).json(place_id.map((i) => graph.places.get(i)));
      } else {
        res.status(200).json(graph.places.get(place_id));
      }
      return;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
};

export default placesHandler;
