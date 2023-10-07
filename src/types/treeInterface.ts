export interface TreeNode {
    id: number;
    label: string;
    depth: number;
    editable: boolean;
    children: TreeNode[]; // Ensure children is always an array of TreeNodes
  }
  