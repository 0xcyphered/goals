import { Node } from "../interfaces";

function nodesAnalyzer(nodes: Node[]) {
  const dump: { [key: string]: number } = {};
  for (let index = 0; index < nodes?.length; index++) {
    if (!dump[nodes[index].group]) {
      dump[nodes[index].group] = 0;
    }
    dump[nodes[index].group]++;
  }
  const groupsCount = Object.keys(dump).length ?? 20;
  const maxGroupItems = Math.max(...Object.values(dump)) ?? 3;
  return { groupsCount, maxGroupItems };
}

export default nodesAnalyzer;
