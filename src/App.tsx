import  { useState } from "react";
import DraggableComponent from "./component/DraggableComponent/DraggableComponent";
import HeaderBar from "./component/Appbar/Appbar";
import ArrowContainer from "./component/BodyContainer/BodyContainer";
function App() {
  const [scale, setScale] = useState(1);
  const [center, setCenter] = useState(false);
  const handleZoomIn = () => {
    if (scale < 1) {
      setScale(scale + 0.1);
    } else {
      setScale(scale + 0.25);
    }
  };

  const handleZoomOut = () => {
    if (scale <= 1) {
      setScale(scale - 0.1);
    } else {
      setScale(scale - 0.25);
    }
  };

  const handleZoomSelect = (value:number) => {
    console.log(value / 100, "the calue");
    setScale(value / 100);
  };

  const handleCenterContent = () => {
    setCenter((prev) => !prev);
  };

  return (
    <div style={{ width: "full" }}>
      <HeaderBar
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        handleCenter={handleCenterContent}
        scale={scale}
        handleZoomSelect={handleZoomSelect}
      />

      <div
        style={{
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "1100px", height: "440px" }}>
          <ArrowContainer
            children={
              <DraggableComponent scale={scale} triggerCenter={center} />
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
