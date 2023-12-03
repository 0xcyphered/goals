import { Edge, Node } from "../interfaces";

// generates mock data
function generateData(maxGroup = 20, maxGroupItems = 3) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const dump: { [key: string]: boolean } = {};

  for (let index = 0; index < maxGroup; index++) {
    const items = Math.floor(Math.random() * maxGroupItems) + 1;
    const prvLevelItems = nodes.filter(({ group }) => group === index - 1);

    for (let _index = 0; _index < items; _index++) {
      const id = Math.random().toString();
      nodes.push({
        title: `Three words title ${index} ${_index}`,
        id,
        group: index,
      });
      if (prvLevelItems.length > 0) {
        const rnd = Math.floor(Math.random() * prvLevelItems.length);
        addEdge(prvLevelItems[rnd].id, id);
      }
    }
    for (let _index = 0; _index < prvLevelItems.length; _index++) {
      const thisLevelItems = nodes.filter(({ group }) => group === index);
      const startNode = prvLevelItems[_index].id;
      const endNode =
        thisLevelItems[Math.floor(Math.random() * thisLevelItems.length)].id;
      addEdge(startNode, endNode);
    }

    // add inside group edges
    // for (let _index = 0; _index < items; _index++) {
    //   const thisLevelItems = nodes.filter(
    //     ({ group, order }) => group === index && order !== _index,
    //   );
    //   if (thisLevelItems.length > 0) {
    //     const startNode =
    //       thisLevelItems[Math.floor(Math.random() * thisLevelItems.length)].id;
    //     const endNode = nodes.find(
    //       ({ group, order }) => group === index && order === _index,
    //     ).id;
    //     addEdge(startNode, endNode);
    //   }
    // }
  }

  return { nodes, edges };

  function addEdge(startNode: string, endNode: string) {
    // add edge if not added or not toward self node
    if (
      !dump[startNode + endNode] &&
      !dump[endNode + startNode] &&
      startNode !== endNode
    ) {
      dump[startNode + endNode] = true;
      edges.push({ startNode, endNode });
    }
  }
}

export default generateData;
