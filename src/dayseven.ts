import fs from 'fs';

export const YOUR_BAG = 'shiny gold';

export type BagNode = {
  color: string;
  inner: BagEdge[];
};

type BagEdge = {
  next: BagNode;
  numBags: number;
};

export function buildBagTree(data: string): BagNode[] {
  const rules = data.split('\n');
  const nodes: BagNode[] = [];
  const nodeMapping = new Map();
  rules.forEach((rule) => {
    const color = rule.split(' bags contain')[0].trim();
    const node = { color, inner: [] };
    nodes.push(node);
    nodeMapping.set(color, node);
  });
  rules.forEach((rule) => {
    const rootBagColor = rule.split(' bags contain')[0].trim();
    const nodeUpdating = nodeMapping.get(rootBagColor);
    const contents = rule.split('bags contain ')[1];
    contents.split(', ').forEach((content) => {
      const match = content.match(/(\d+)([\w ]+) bags?\.?/);
      if (!match) {
        // Assuming valid input no match is "no other bags"
        return;
      }
      const numBags = Number.parseInt(match[1].trim(), 10);
      const next = nodeMapping.get(match[2].trim());
      nodeUpdating.inner.push({ numBags, next });
    });
  });
  return nodes;
}

function canContainTarget(node: BagNode, targetColor: string): boolean {
  if (node.color === targetColor) {
    return false; // bag cannot contain itself
  }
  const toVisit: BagNode[] = [];
  node.inner.forEach((e) => toVisit.push(e.next));
  while (toVisit.length) {
    const curNode = toVisit.pop();
    if (!curNode) {
      throw new Error('I Expected to always have a node');
    }
    if (curNode.color === targetColor) {
      return true;
    }
    curNode.inner.forEach((e) => toVisit.push(e.next));
  }
  return false;
}

export function countPotentialBags(nodes: BagNode[], targetBagColor: string): number {
  return nodes.reduce((acc, cur) => {
    return canContainTarget(cur, targetBagColor) ? acc + 1 : acc;
  }, 0);
}

type StackFrame = {
  multiplier: number;
  edge: BagEdge;
};

export function countNumberBagsRequired(nodes: BagNode[], startBagColor: string): number {
  const startNode = nodes.filter((n) => n.color === startBagColor)[0];
  if (!startNode) {
    throw new Error('Could not find start node');
  }
  let result = 0;
  const toVisit: StackFrame[] = [];
  startNode.inner.forEach((e) => {
    result += e.numBags;
    toVisit.push({ multiplier: e.numBags, edge: e });
  });
  while (toVisit.length) {
    const curEdge = toVisit.pop();
    if (!curEdge) {
      throw new Error('I Expected to always have a node');
    }
    for (const e of curEdge.edge.next.inner) {
      result += e.numBags * curEdge.multiplier;
      toVisit.push({ multiplier: curEdge.multiplier * e.numBags, edge: e });
    }
  }

  return result;
}

if (require.main === module) {
  try {
    const data = fs.readFileSync('input/dayseven', 'utf8');
    const bagTree = buildBagTree(data);
    console.log(countPotentialBags(bagTree, YOUR_BAG));
    console.log(countNumberBagsRequired(bagTree, YOUR_BAG));
  } catch (err) {
    console.log(err);
  }
}
