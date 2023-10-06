import  { useState } from "react";
import "./Tree.css";
import Dialog from "../DialogComponent/Dialog";
import plusIcon from "../../assets/plus.png";
import correctIcon from "../../assets/correct.png";
import editIcon from "../../assets/pen.png";
import cancelRedIcon from "../../assets/cancel-red.png";
import cancelNormalIcon from "../../assets/cancel.png";
interface TreeNode {
  id: number;
  label: string;
  depth: number;
  editable: boolean;
  children: TreeNode[]; // Ensure children is always an array of TreeNodes
}

interface TreeNodeProps {
  data: TreeNode[];
  onAddClick: (parentNodeId: number, parentDepth: number) => void;
  onUpdateClick: (nodeId: number, nodeDepth: number, value: string) => void;
}
const TreeNode = ({ data, onAddClick, onUpdateClick }: TreeNodeProps) => {
  const [value, setValue] = useState("");
  const [dialogToggle, setDialogToggle] = useState("");
  const handleAddNode = (
    parentId: number,
    parentDepth: number,
    children: number ,
    categoryClicked: boolean
  ) => {
    setValue("");
    if (children > 0 || parentId === 1) {
      setDialogToggle("");
      onAddClick(parentId, parentDepth);
    } else {
      if (categoryClicked) {
        onAddClick(parentId, parentDepth);
        setDialogToggle("");
      } else {
        setDialogToggle(parentId.toString());
      }
    }
    console.log(dialogToggle, "dialog toggle id");
  };

  const handleUpdate = (
    parentId: number,
    parentDepth: number,
    value: string
  ) => {
    setValue("");
    onUpdateClick(parentId, parentDepth, value);
  };
  const handleChange = (value1: string) => {
    setValue(value1);
  };

  const depthColorMap = {
    1: "white",
    2: "#ffa476",
    3: "#1db3de",
    4: "#b7bec7",
    5: "#b7bec7",
  };

  return (
    <div className="tree">
      <ul>
        {data.map((node) => (
          <li key={node.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {node.editable ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(e.target.value)}
                  style={{
                    width: "100px",
                    padding: "4px 6px",
                    textAlign: "center",
                  }}
                />
              ) : (
                <a
                  href="#"
                  style={{
                    marginLeft: `${node.depth === 1 ? "25px" : "65px"}`,
                    backgroundColor: `${
                      node.depth > 5
                        ? "#b7bec7"
                        : `${depthColorMap[node.depth as keyof typeof depthColorMap]}`
                    }`,
                    color: `${node.depth === 1 ? "#444" : "white"}`,
                    border: `${
                      node.depth === 1 ? "1px dashed #c6cfda" : "none"
                    }`,
                    fontWeight: `${node.depth === 1 ? "bold" : "normal"}`,
                    borderRadius: "0px",
                  }}
                >
                  {node.label}
                </a>
              )}
              <button
                style={{
                  display: `${node.editable ? "inline" : "none"}`,
                  padding: "0px",
                  height: "16px",
                  marginLeft: "4px",
                  width: "16px",
                  color: "white",
                  backgroundColor: "white",
                  backgroundImage: `url(${cancelNormalIcon})`,
                  border: "1px solid #c6cfda",
                }}
                className="icon close"
              />
              <button
                style={{
                  display: `${node.editable ? "inline" : "none"}`,
                  padding: "0px",
                  marginLeft: "4px",
                  height: "16px",
                  width: "16px",
                  color: "white",
                  backgroundColor: "#66c27e",
                  backgroundImage: `url(${correctIcon})`,
                  border: "1px solid green",
                }}
                onClick={() => handleUpdate(node.id, node.depth, value)}
              />
              <button
                style={{
                  display: `${node.editable ? "none" : "inline"}`,
                  padding: "0em 0em",
                  width: "16px",
                  marginLeft: "4px",
                  fontSize: "14px",
                  height: "16px",
                  backgroundImage: `url(${plusIcon})`,
                  border: "1px solid #c6cfda",
                }}
                onClick={() =>
                  handleAddNode(
                    node.id,
                    node.depth,
                    node?.children?.length,
                    false
                  )
                }
              />

              <button
                style={{
                  display: `${
                    node.depth === 1 || node.editable ? "none" : "inline"
                  }`,
                  padding: "0px",
                  marginLeft: "4px",
                  height: "16px",
                  width: "16px",
                  backgroundColor: "#c6cfda",
                  backgroundImage: `url(${editIcon})`,
                  color: "white",
                  border: "1px solid #c6cfda",
                }}
              />

              <button
                style={{
                  padding: "0px",
                  height: "16px",
                  width: "16px",
                  marginLeft: "4px",
                  backgroundColor: "white",
                  border: "1px solid red",

                  display: `${
                    node.depth === 1 || node.editable ? "none" : "inline"
                  }`,
                  backgroundImage: `url(${cancelRedIcon})`,
                }}
              />

              {dialogToggle === node.id.toString() && dialogToggle != "" && (
                <div
                  style={{
                    position: "absolute",
                    left: "60%",
                    top: "100%",
                    marginTop: "14px",
                  }}
                >
                  <Dialog
                    handleAddCategory={() =>
                      handleAddNode(
                        node.id,
                        node.depth,
                        node?.children?.length,
                        true
                      )
                    }
                  />
                </div>
              )}
            </div>

            {node.children && node.children.length > 0 && (
              <TreeNode
                data={node.children}
                onAddClick={onAddClick}
                onUpdateClick={onUpdateClick}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

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
    console.log("here",parentNodeId,parentDepth)
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
    console.log(data,"the data")
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
      <TreeNode
        data={data}
        onAddClick={handleAddNode}
        onUpdateClick={valueUpdate}
      />
    </div>
  );
};

export default Tree;
