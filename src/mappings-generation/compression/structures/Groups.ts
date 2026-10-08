import type { GroupItem, GroupType, Group } from "@/mappings-generation/compression/shared/types";

/**
 * Called for each group
 *
 * @returns `true`, if walking must be stopped at the current branch
 */
export type GroupWalker = (group: Group) => boolean | void;

/** Group initialization data */
export interface GroupInit {
  /** Group contents. See {@link GroupItem} for the details. */
  items: Iterable<GroupItem>;

  /** Total size that this group occupies. Sum of: `subgroup size * subgroup count`. */
  size: number;

  /**
   * Number of times this group occurs
   *
   * @default 1
   */
  count?: number;

  /** Group type */
  type: GroupType;
}

/** Stores and retrieves groups */
export class Groups {
  /** All registered groups */
  private groups: Group[] = [];

  /** Maps a stable string representation of items to the group containing these items */
  private itemsToGroup = new Map<string, Group>();

  /** Maps a group ID to every immediate group's ancestors */
  private groupToParents = new Map<number, Set<number>>();

  /** @returns Group by ID */
  getById(id: number): Group | undefined {
    return this.groups[id];
  }

  /**
   * Adds a group. If a group is already added, increments {@link Group.count}.
   * @param init Group initialization data
   * @returns Added group
   */
  add(init: GroupInit): Group {
    // Convert items to their string representation. This algorithm produces the same string for the same collection
    // of items.

    const arr = [...init.items];

    if (init.type === "KeyValueGroup") {
      arr.sort();
    }

    const str = JSON.stringify(arr); // Faster than arr.map(...).join(",")

    // Get group and count

    let group = this.itemsToGroup.get(str);
    const count = init.count ?? 1;

    // Update a group if exists

    if (group) {
      group.count += count;
      return group;
    }

    // Otherwise, create a new group

    group = { ...init, items: arr, id: this.groups.length, count };
    this.groups.push(group);
    this.itemsToGroup.set(str, group);
    this.addParent(group);
    return group;
  }

  /** Registers a parent and its every descendant */
  private addParent(parent: Group) {
    if (this.groupToParents.has(parent.id)) {
      return;
    }

    for (const child of parent.items) {
      if (typeof child === "string") {
        continue;
      }

      let parents = this.groupToParents.get(child);

      if (!parents) {
        parents = new Set();
        this.groupToParents.set(child, parents);
      }

      parents.add(parent.id);
      this.addParent(this.getById(child)!);
    }
  }

  /** @returns All registered groups */
  all(): readonly Readonly<Group>[] {
    return this.groups;
  }

  /**
   * Walks up the tree, calling `cb` for every group's ancestor.
   *
   * The walk stops at the first compressed ancestor on each path: further ancestors see that ancestor
   * as a compressed sequence whose size is fixed.
   */
  walkUp(group: Group, cb: GroupWalker) {
    const parents = this.groupToParents.get(group.id);

    if (!parents) {
      return;
    }

    for (const parentId of parents) {
      const parent = this.getById(parentId)!;
      const end = cb(parent);

      if (!end) {
        this.walkUp(parent, cb);
      }
    }
  }

  /**
   * Walks down the tree, calling `cb` for every group's descendant.
   *
   * The walk stops at the first compressed descendant on each path: their own descendants size does not affect
   * the given group's size.
   */
  walkDown(group: Group, cb: GroupWalker) {
    for (const childId of group.items) {
      if (typeof childId === "string") {
        continue;
      }

      const child = this.getById(childId)!;
      const end = cb(child);

      if (!end) {
        this.walkDown(child, cb);
      }
    }
  }
}
