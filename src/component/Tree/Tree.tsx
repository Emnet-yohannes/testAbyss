import  { useState } from 'react';
import TreeNodeItem from './TreeNodeItem';
import { TreeNode } from '../../types/treeInterface';

const Tree = () => {
  const [data, setData] = useState<TreeNode[]>([
    {
      id: 1,
      label: "categories",
      depth: 1,
      editable: false,
      children: [],
    },
  ]);

  const handleAddNode = (parentNodeId: number, parentDepth: number) => {
    const newNode: TreeNode = {
      id: Math.random(),
      label: "New Node",
      depth: parentDepth + 1,
      editable: true,
      children: [],
    };

    const newData = [...data];

    const findParentNode = (nodes: TreeNode[]) => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === parentNodeId) {
          nodes[i].children = nodes[i].children
            ? [...nodes[i].children, newNode]
            : [newNode];
          break;
        }
        if (nodes[i].children && nodes[i].children.length > 0) {
          findParentNode(nodes[i].children);
        }
      }
    };

    findParentNode(newData);
    setData(newData);
  };

  const valueUpdate = (nodeId: number, nodeDepth: number, value: string) => {
    const newData = data.map((node) => {
      if (node.id === nodeId && node.depth === nodeDepth) {
        return {
          ...node,
          label: value,
          editable: false,
        };
      }

      if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: valueUpdateInNode(node.children, nodeId, nodeDepth, value),
        };
      }

      return node;
    });

    setData(newData);
  };

  const valueUpdateInNode = (
    nodes: TreeNode[],
    nodeId: number,
    nodeDepth: number,
    value: string
  ): TreeNode[] => {
    return nodes.map((node) => {
      if (node.id === nodeId && node.depth === nodeDepth) {
        return {
          ...node,
          label: value,
          editable: false,
        };
      }

      if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: valueUpdateInNode(node.children, nodeId, nodeDepth, value),
        };
      }

      return node;
    });
  };

  return (
    <div>
      <TreeNodeItem
        data={data}
        onAddClick={handleAddNode}
        onUpdateClick={valueUpdate}
      />
    </div>
  );
};

export default Tree;
