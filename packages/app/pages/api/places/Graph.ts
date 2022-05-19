import { IPlace, IPoint } from "../../../lib/gamePlay";

class Graph {
  public adjacency: Readonly<Map<string, IPlace[]>> = new Map();
  public addEdge(from: IPoint, to: IPoint, distance: number) {
    this.adjacency.set(
      from.id,
      (this.adjacency.get(from.id) ?? [])
        .filter((t) => t.point.id !== to.id)
        .concat({ point: to, distance })
    );
  }

  public removeEdge(from: IPoint, to: IPoint) {
    this.adjacency.set(
      from.id,
      (this.adjacency.get(from.id) ?? []).filter((t) => t.point.id !== to.id)
    );
  }
}

export default Graph;
