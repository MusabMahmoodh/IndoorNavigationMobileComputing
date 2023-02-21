import createGraph, {Graph, Node} from 'ngraph.graph';
import {aStar} from 'ngraph.path';
import {capitalizeFirstLetter} from './javascriptUtils';

export function createPathFinder(graph) {
  return aStar(graph, {
    distance(fromNode, toNode, link) {
      return Math.hypot(
        toNode.data.x - fromNode.data.x,
        toNode.data.y - fromNode.data.y,
      );
    },
    heuristic(fromNode, toNode) {
      return Math.hypot(
        toNode.data.x - fromNode.data.x,
        toNode.data.y - fromNode.data.y,
      );
    },
  });
}

// use this function to create a graph from the output of a pathfinding algorithm
export function createGraphFromPathNodes(nodes) {
  const graph = createGraph();
  for (let index = nodes.length - 1; index >= 0; index--) {
    const node = nodes[index];
    graph.addNode(node.id, node.data);

    if (index > 0) {
      const nextNode = nodes[index - 1];
      graph.addLink(node.id, nextNode.id);
    }
  }
  return graph;
}

/**
 * Return all graph nodes that are navigable (this means they have a meaningful id, and not a number)
 * TODO rework to use labels i.p.o string ids
 */
export function createNavigableOptions(jsonGraph) {
  return jsonGraph.nodes
    .filter(node => node.name !== undefined)
    .map(node => {
      return {
        label: capitalizeFirstLetter(node.name.replace(/_/g, ' ')),
        value: node.id,
      };
    });
}

/**
 * Return all graph nodes that are navigable (this means they have a meaningful id, and not a number)
 * TODO rework to use labels i.p.o string ids
 */
export function createNavigableNodes(nodes) {
  return nodes
    .filter(node => !Number.isInteger(node.id))
    .map(node => {
      return {
        id: capitalizeFirstLetter(node.id.replace(/_/g, ' ')),
        data: node.data,
      };
    });
}
