import  { useState } from "react";
import "./Tree.css";
import Dialog from "../DialogComponent/Dialog";
import plusIcon from "../../assets/plus.png";
import correctIcon from "../../assets/correct.png";
import editIcon from "../../assets/pen.png";
import cancelRedIcon from "../../assets/cancel-red.png";
import cancelNormalIcon from "../../assets/cancel.png";
import { truncateText } from "../../helpers/truncateText";
interface TreeNode {
  id: number;
  label: string;
  depth: number;
  editable: boolean;
  children: TreeNode[]; 
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
                  placeholder="category name"
                  onChange={(e) => handleChange(e.target.value)}
                  style={{
                    marginLeft:'52px',
                    outline:'none',
                    textAlign: "center",
                    fontSize:'14px',
                    padding:'6px 16px',
                    width:'100px',
                    border:'none'
                  }}
                />
              ) : (
                <a
                  className="blur-effect"
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
                    fontSize:'16px',
                    padding:'6px 16px',
                    width:'80px',
                    overflow:'hidden',
                    whiteSpace:'nowrap',
                    textOverflow:'clip'
                  }}
                >
                   {truncateText(node.label,12)}
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
                  overflow: "hidden",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              border:'none'
                }}
              />
              <button
                style={{
                  display: `${node.editable ? "inline" : "none"}`,
                  padding: "0px",
                  marginLeft: "4px",
                  height: "16px",
                  width: "16px",
                  color: "white",
                  backgroundImage: `url(${correctIcon})`,
                  overflow: "hidden",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  border:'none'
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
                  overflow: "hidden",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  border:'none'
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
                  overflow: "hidden",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  border:'none'
                }}
              />

              <button
                style={{
                  padding: "0px",
                  height: "16px",
                  width: "16px",
                  marginLeft: "4px",
                  backgroundColor: "white",
                  overflow: "hidden",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  border:'none',

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
export default TreeNode;