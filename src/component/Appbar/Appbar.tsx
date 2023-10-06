import  { useState } from "react";
import SelectDialog from "../DialogComponent/Select/Select";
import centerIcon from "../../assets/send.png";
interface HeaderBarProps {
  handleZoomOut: () => void;
  handleZoomIn: () => void;
  handleCenter: () => void;
  handleZoomSelect: (value: number) => void;
  scale: number;
}
const HeaderBar = ({
  handleZoomOut,
  handleZoomIn,
  handleCenter,
  handleZoomSelect,
  scale,
}: HeaderBarProps) => {
  const [showDialogSelect, setShowDialogSelect] = useState(false);
  const closeDialog = () => {
    setShowDialogSelect(false);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "auto",
          padding: "10px 30px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ color: "#404549" }}>Services</div>
          <div
            style={{
              width: "12px",
              height: "15px",
              backgroundColor: "#fdbb3a",
              color: "white",
              borderRadius: "40%",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "10px",
              marginLeft: "3px",
              marginTop: "2px",
            }}
          >
            O
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <button
              style={{
                color: "white",
                border: "none",
                backgroundColor: "#6c76e2",
                borderRadius: "0px",
                padding: "0.5em 0.6em",
                marginLeft: "3px",
                fontSize: "11px",
              }}
            >
              LIST VIEW
            </button>
            <button
              style={{
                borderRadius: "0px",
                backgroundColor: "white",
                border: "none",

                color: "#c6cfda",
                padding: "0.5em 0.6em",
                marginLeft: "3px",
                fontSize: "12px",
                width: "30px",
                height: "25px",
                overflow: "hidden",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${centerIcon})`,
                backgroundPosition: "center",
              }}
              onClick={handleCenter}
            />
          </div>
          <div>
            <button
              style={{
                borderRadius: "0px",
                backgroundColor: "white",
                color: "#c6cfda",
                padding: "0.5em 0.6em",
                marginLeft: "10px",
                border: "none",

                fontSize: "11px",
              }}
              onClick={handleZoomOut}
              disabled={scale <= 0.3}
            >
              -
            </button>
            <button
              style={{
                borderRadius: "0px",
                backgroundColor: "white",
                color: "#c6cfda",
                padding: "0.5em 0.6em",
                border: "none",

                marginLeft: "3px",
                fontSize: "11px",
              }}
              onClick={() => setShowDialogSelect(true)}
            >
              {scale * 100} &#37;
            </button>
            {showDialogSelect && (
              <div
                style={{
                  zIndex: "100",
                  position: "absolute",
                  right: "px",
                  top: "5%",
                  marginTop: "14px",
                  backgroundColor: "white",
                  padding: "4px",
                }}
              >
                <SelectDialog
                  onSelect={handleZoomSelect}
                  closeDialog={closeDialog}
                  scale={scale}
                />
              </div>
            )}
            <button
              style={{
                borderRadius: "0px",
                border: "none",

                backgroundColor: "white",
                color: "#c6cfda",
                padding: "0.5em 0.6em",
                marginLeft: "3px",
                fontSize: "11px",
              }}
              onClick={handleZoomIn}
              disabled={scale >= 1.5}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <hr style={{ height: "2px", color: "#eff0f6", width: "97%" }} />
      </div>
    </div>
  );
};

export default HeaderBar;
