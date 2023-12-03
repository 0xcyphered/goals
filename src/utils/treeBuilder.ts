import { Edge } from '../interfaces';

export interface TreeItem {
  parents: string[];
  children: string[];
  tag: string;
}

export interface Tree {
  [key: string]: TreeItem;
}

// extracting node parents and children information
function treeBuilder(edges: Edge[]) {
  const tree: Tree = {};

  for (let index = 0; index < edges?.length; index++) {
    const { startNode, endNode } = edges[index];
    const tag = Math.random();

    if (!tree[startNode]) {
      tree[startNode] = {
        children: [],
        parents: [],
        tag: tree[endNode]?.tag ?? tag,
      };
    }
    tree[startNode].children.push(endNode);

    if (!tree[endNode]) {
      tree[endNode] = {
        children: [],
        parents: [],
        tag: tree[startNode]?.tag ?? tag,
      };
    }
    tree[endNode].parents.push(startNode);
  }

  return tree;
}

export default treeBuilder;
