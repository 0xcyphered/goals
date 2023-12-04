// @ts-nocheck
import { useEffect, useState } from 'react';
import { MapCard, MapEdge } from './components';
import generateData from './utils/mockDataGenerator';
import treeBuilder from './utils/treeBuilder';
import { coordinateToOrder, orderToCoordinate } from './utils/helperFunctions';
import edgesAnalyzer from './utils/edgesAnalyzer';
import nodesCoordinator from './utils/nodesCoordinator';
import nodesAnalyzer from './utils/nodesAnalyzer';

function Map() {
  const cardWidth = 290;
  const cardHeight = 76;
  const cardsVGap = 160;
  const cardsHGap = 110;
  const [data, setData] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [leftMargin, setLeftMargin] = useState(0);

  useEffect(() => {
    const _data = generateData(23, 3);
    console.log('data', _data);
    setData(_data);
  }, []);

  useEffect(() => {
    if (data.edges) {
      const graph = buildGraph(data);
      console.log('graph', graph);
      const _nodes = graph.nodes ?? [];
      setNodes(_nodes);
      const _edges = graph.edges ?? [];
      setEdges(_edges);
      setLeftMargin((graph.maxGroupItems * (cardWidth + cardsHGap)) / 2);
    }
  }, [data]);

  return (
    <div className="h-screen w-screen relative">
      <div className="relative" style={{ left: leftMargin, top: 80 }}>
        {nodes.map((node) => (
          <MapCard
            key={node.id}
            title={node.title}
            x={node.x * (cardWidth + cardsHGap)}
            y={node.y * (cardsVGap + cardHeight)}
          />
        ))}
        {edges.map((edge) => (
          <MapEdge
            key={`${edge.startNode}${edge.endNode}`}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            cardsVGap={cardsVGap}
            cardsHGap={cardsHGap}
            {...edge}
          />
        ))}
      </div>
    </div>
  );
}

export default Map;

function buildGraph({ nodes, edges }) {
  const { groupsCount, maxGroupItems } = nodesAnalyzer(nodes);
  const tree = treeBuilder(edges);
  const nodesCoordinate = nodesCoordinator(nodes, tree, groupsCount);
  const groupsEdgeCount = edgesAnalyzer(edges, nodesCoordinate);
  const filledEdges = {};

  const _edges = edges.map(({ startNode, endNode }) => {
    const {
      order: startOrder,
      group: startGroup,
      levelItems: startLevelItems,
    } = nodesCoordinate[startNode];
    const startGroupStartEdges = groupsEdgeCount[startGroup][0];
    const {
      order: endOrder,
      group: endGroup,
      levelItems: endLevelItems,
    } = nodesCoordinate[endNode];
    const { children } = tree[startNode];
    const { parents } = tree[endNode];
    if (!filledEdges[startGroup]) {
      filledEdges[startGroup] = 0;
    }

    filledEdges[startGroup]++;

    const heightDisplace =
      80 - (filledEdges[startGroup] / startGroupStartEdges) * 60;

    const startOrderCoordinate = orderToCoordinate(startOrder);
    const endOrderCoordinate = orderToCoordinate(endOrder);
    const delta = endOrderCoordinate - startOrderCoordinate;

    // maybe add very tiny random amount ?!
    const startDisplace =
      children.length > 1
        ? (delta > 0
            ? Math.min(
                endOrderCoordinate - startOrderCoordinate,
                children.length,
              )
            : Math.max(
                endOrderCoordinate - startOrderCoordinate,
                -1 * children.length,
              )) / children.length
        : 0;
    const endDisplace =
      parents.length > 1
        ? Math.min(startOrderCoordinate - endOrderCoordinate, parents.length) /
          parents.length
        : 0;

    // TODO use groupsEdgeCount
    // let heightDisplace =
    //   10 +
    //   (delta > 0
    //     ? ((maxGroupItems - Math.abs(delta)) / maxGroupItems) * 40 + 40
    //     : (startOrder / startGroupStartEdges) * 40);

    return {
      startNode,
      endNode,
      startOrder: startOrderCoordinate,
      endOrder: endOrderCoordinate,
      startGroup,
      endGroup,
      endDisplace,
      startDisplace,
      heightDisplace,
    };
  });
  const _nodes = nodes.map(({ id, group, title }) => {
    const { children, parents, tag } = tree[id];
    const { order, levelItems, bestOrders, goodOrders } = nodesCoordinate[id];
    return {
      id,
      title: `${title}, ${id} , Order: ${order}`,
      tag,
      group,
      children,
      parents,
      levelItems,
      order,
      y: group,
      x: orderToCoordinate(order),
      // x: maxGroupItems - levelItems + 2 * order,
      bestOrders,
      goodOrders,
    };
  });
  return { nodes: _nodes, edges: _edges, groupsCount, maxGroupItems };
}
