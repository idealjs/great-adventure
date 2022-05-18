import { NextApiRequest, NextApiResponse } from "next";

import Graph from "./Graph";

const graph = new Graph();

const point1 = { id: "1", name: "point1" };
const point2 = { id: "2", name: "point2" };
const point3 = { id: "3", name: "point3" };
const point4 = { id: "4", name: "point4" };
const point5 = { id: "5", name: "point5" };

graph.addEdge(point1, point2, 1);
graph.addEdge(point2, point3, 3);
graph.addEdge(point2, point4, 4);
graph.addEdge(point4, point5, 5);
graph.addEdge(point1, point5, 5);

const placesHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { map_id },
    method,
  } = req;

  switch (method) {
    case "GET":
      if (Array.isArray(map_id)) {
        res.status(200).json({
          data: map_id.map((i) => graph.adjacency.get(i) ?? []),
        });
      } else {
        res.status(200).json({
          data: graph.adjacency.get(map_id) ?? [],
        });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default placesHandler;
