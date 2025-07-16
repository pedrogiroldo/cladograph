/**
 *
 * @param {string} tree the newick string that contains the generated tree
 * @returns saved newick string
 */
export function saveTreeNewick(tree: string) {
  sessionStorage.setItem('treeNewick', tree);
  return tree;
}

/**
 *
 * @returns tree newick string or undefined
 */
export function getTreeNewick(): string | undefined {
  const tree: string | null = sessionStorage.getItem('treeNewick');
  if (tree === null) return undefined;

  return tree;
}

/**
 *
 * @returns deleted external group
 */
export function deleteTreeNewick() {
  const tree: string | null = sessionStorage.getItem('treeNewick');
  sessionStorage.removeItem('treeNewick');

  if (tree === null) return null;

  return tree;
}
