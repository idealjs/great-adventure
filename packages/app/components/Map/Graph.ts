interface IPoint {
  id: string;
  name: string;
}

class Graph {
  public adjacency: Readonly<
    Map<
      string,
      {
        point: IPoint;
        weight: number;
      }[]
    >
  > = new Map();
  public addEdge(from: IPoint, to: IPoint, weight: number) {
    this.adjacency.set(
      from.id,
      (this.adjacency.get(from.id) ?? [])
        .filter((t) => t.point.id != to.id)
        .concat({ point: to, weight })
    );
  }

  public removeEdge(from: IPoint, to: IPoint) {
    this.adjacency.set(
      from.id,
      (this.adjacency.get(from.id) ?? []).filter((t) => t.point.id != to.id)
    );
  }
}

export default Graph;
