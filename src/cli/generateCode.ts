// Dependencies graph

interface Node {
  generators: (() => Promise<{ default: () => Promise<void> }>)[];
  dependents?: Node[];
}

const graph: Node = {
  generators: [() => import("@/generators/units")],
  dependents: [
    { generators: [() => import("@/generators/conversions")] },
    {
      generators: [
        () => import("@/generators/ellipsoids"),
        () => import("@/generators/meridians"),
        () => import("@/generators/vertical-cs"),
      ],
      dependents: [{ generators: [() => import("@/generators/datums"), () => import("@/generators/crs")] }],
    },
  ],
};

// Generators runner

async function walk(node: Node) {
  await Promise.all(node.generators.map((imp) => imp().then((r) => r.default())));

  if (node.dependents) {
    await Promise.all(node.dependents.map((node) => walk(node)));
  }
}

export async function generateCode() {
  await walk(graph);
}
