import { Edge } from "../interfaces";
import { NodesCoordinate } from "./nodesCoordinator";


function edgesAnalyzer(edges: Edge[], tree: NodesCoordinate) {
  const groupsEdgeCount: { [key: string]: number[] } = {};
  for (let index = 0; index < edges?.length; index++) {
    const { startNode, endNode } = edges[index];
    const { group: startGroup } = tree[startNode];
    const { group: endGroup } = tree[endNode];

    if (!groupsEdgeCount[startGroup]) {
      groupsEdgeCount[startGroup] = [0, 0];
    }
    groupsEdgeCount[startGroup][0]++;

    if (!groupsEdgeCount[endGroup]) {
      groupsEdgeCount[endGroup] = [0, 0];
    }
    groupsEdgeCount[endGroup][1]++;
  }
  return groupsEdgeCount;
}

export default edgesAnalyzer;
