import  { useState } from "react";
interface SelectDialogProps{
    scale:number;
    onSelect: (value: number) => void;
    closeDialog:()=>void;
}

const SelectDialog = ({ onSelect, closeDialog,scale }:SelectDialogProps) => {
  const percentValues = [25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150];
  const [selectedPercent, setSelectedPercent] = useState(0);

  const handleSelectPercent = (percent:number) => {
    setSelectedPercent(percent);
    onSelect(percent);
    closeDialog();
  };

  return (
    <div className="dialog">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        {percentValues.map((percent) => (
          <div key={percent} style={{display:'flex',justifyContent:'right'}}>
            <button
              style={{ border: "none",padding:'0px 4px',backgroundColor:'white', margin: "4px" }}
              className={percent === selectedPercent ? 'selected' : ''}
              onClick={() => handleSelectPercent(percent)}
            >
              {percent}%
              {percent === selectedPercent && <div className="icon">&#10004;</div>}
            </button>
            {
                scale*100 ==percent &&
            <div> &#10004;</div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectDialog;
