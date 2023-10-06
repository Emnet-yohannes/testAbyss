import React, { useState, useEffect } from "react";
import "./DraggableComponent.css";
import Tree from "../Tree/Tree";
interface DraggableComponentProps{
  scale:number;
  triggerCenter:boolean;
}
const DraggableComponent = ({scale,triggerCenter}:DraggableComponentProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [, setDragging] = useState(false);

  
  
  useEffect(() => {
    const centerComponent = () => {
      const component = document.querySelector(".draggable-component");
      if (component) {
        const x = (window.innerWidth - (component as HTMLElement).offsetWidth -1920 ) / 2;
        const y = (window.innerHeight - (component as HTMLElement).offsetHeight-240) / 2;
        
        setPosition({ x, y});
      }
    };
    // Center the component initially

    centerComponent();
    window.addEventListener("resize", centerComponent);

    return () => {
      window.removeEventListener("resize", centerComponent);
    };
  }, [triggerCenter]);

  const handleMouseDown = (e:React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);

    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;

    const handleMouseMove = (e:React.MouseEvent<Document>) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setDragging(false);
      document.removeEventListener("mousemove", handleMouseMove as unknown as (ev: MouseEvent) => void);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove",  handleMouseMove as unknown as (ev: MouseEvent) => void);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div 
    style={{ transform: `scale(${scale})` }}
    >
      <div
        className="draggable-component"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          display: "flex",
        }}
        onMouseDown={handleMouseDown}
      >
        <Tree />
      </div>
    </div>
  );
};

export default DraggableComponent;
