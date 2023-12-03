import { Node } from '../interfaces';
import { coordinateToOrder, orderToCoordinate } from './helperFunctions';
import { Tree } from './treeBuilder';

interface NodeCoordinate {
  group: number;
  goodOrders: number[];
  bestOrders: number[];
  levelItems: number;
  order?: number;
}
export interface NodesCoordinate {
  [k: string]: NodeCoordinate;
}

// reorder adjacent vertices based on edges
function nodesCoordinator(nodes: Node[], tree: Tree, groupsCount: number) {
  const dump: { [k: string]: string } = {};
  const newOrders: {
    [k: string]: NodeCoordinate;
  } = {};
  for (let index = 0; index < groupsCount; index++) {
    const prvLevelItems = nodes.filter(({ group }) => group === index - 1);
    const currentLevelItems = nodes.filter(({ group }) => group === index);
    const sortedCurrLevelItems = currentLevelItems.sort(
      (a, b) => tree[b.id].children.length - tree[a.id].children.length,
    );
    for (let _index = 0; _index < sortedCurrLevelItems.length; _index++) {
      const { id } = sortedCurrLevelItems[_index];
      const { parents } = tree[id];
      // order coordinate avg order
      if (prvLevelItems.length > 0) {
        const parentOrders = parents.map((i: string) => newOrders[i].order as number);
        const avg =
          parentOrders.reduce(
            (a: number, b: number) => a + orderToCoordinate(b),
            0,
          ) / parentOrders.length;
        const avgFloor = Math.floor(avg);
        const bestOrders = [coordinateToOrder(avgFloor)];
        if (avgFloor !== avg) {
          bestOrders.push(coordinateToOrder(avgFloor + 1));
        }
        const goodOrders = new Array(sortedCurrLevelItems.length)
          .fill('')
          .map((_, i) => i)
          .filter((i) => !bestOrders.includes(i))
          .sort(
            (a, b) => Math.abs(b - bestOrders[0]) - Math.abs(a - bestOrders[0]),
          );
        newOrders[id] = {
          group: index,
          goodOrders,
          bestOrders,
          levelItems: sortedCurrLevelItems.length,
        };
      } else {
        newOrders[id] = {
          group: index,
          goodOrders: [],
          bestOrders: [_index],
          levelItems: sortedCurrLevelItems.length,
        };
      }
    }
    for (let _index = 0; _index < sortedCurrLevelItems.length; _index++) {
      const { group, id } = sortedCurrLevelItems[_index];
      const { bestOrders } = newOrders[id];
      bestOrders.forEach((order: number) => {
        if (newOrders[id].order === void 0 && !dump[`${group}-${order}`]) {
          dump[`${group}-${order}`] = id;
          newOrders[id].order = order;
        }
      });
    }
    for (let _index = 0; _index < sortedCurrLevelItems.length; _index++) {
      const { group, id } = sortedCurrLevelItems[_index];
      const { goodOrders } = newOrders[id];
      goodOrders.forEach((order) => {
        if (newOrders[id].order === void 0 && !dump[`${group}-${order}`]) {
          dump[`${group}-${order}`] = id;
          newOrders[id].order = order;
        }
      });
    }
  }
  return newOrders;
}

export default nodesCoordinator;
