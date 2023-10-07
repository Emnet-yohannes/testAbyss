import { useState } from "react";
import PercentageSelectorDialog from '../DialogComponent/PercentageSelectorDialog/PercentageSelectorDialog'
import centerIcon from "../../assets/send.png";
import "./Appbar.css";
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
          <div style={{ color: "black" }}>Services</div>
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            style={{
              color: "white",
              border: "none",
              backgroundColor: "#6c76e2",
              borderRadius: "0px",
              padding: "0.8em 0.8em",
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
              height: "100%",
              overflow: "hidden",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url(${centerIcon})`,
            }}
            onClick={handleCenter}
          />
          <div>
            <button
              className="button"
              onClick={handleZoomOut}
              disabled={scale <= 0.3}
            >
              -
            </button>
            <button
              className="button"
              onClick={() => setShowDialogSelect(true)}
            >
              {Math.floor(scale * 100)} &#37;
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
                <PercentageSelectorDialog
                  onSelect={handleZoomSelect}
                  closeDialog={closeDialog}
                  scale={scale}
                />
              </div>
            )}
            <button
              className="button"
              onClick={handleZoomIn}
              disabled={scale >= 1.5}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <hr style={{ color: "#eff0f6", width: "97%" }} />
      </div>
    </div>
  );
};

export default HeaderBar;
