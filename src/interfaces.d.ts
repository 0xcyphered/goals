export interface Node {
  title: string;
  id: string;
  group: number;
}

export interface Edge {
  startNode: string;
  endNode: string;
}