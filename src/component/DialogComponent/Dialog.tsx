import  { MouseEventHandler } from 'react';

interface DialogInterface {
  handleAddCategory: MouseEventHandler<HTMLButtonElement>;
}

const Dialog = ({ handleAddCategory }: DialogInterface) => {
  return (
    <div style={{ backgroundColor: 'white'  ,boxShadow: '0px 0px 52px -14px #c6cfda',padding: '6px 6px', width: '320px', height: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
      <div>
        <p style={{ color: 'black',fontWeight:"bold" }}>
          What do you want to create?
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '220px' }}>
        <button style={{ color: '#657d9a',fontSize:'14px',backgroundColor:'#e0e4eb', padding: '12px 10px', border: 'none',borderRadius:'0px' }} onClick={handleAddCategory}>
          CATEGORY
        </button>
        <button disabled style={{ border: 'none', color: '#657d9a',backgroundColor:'#f0f2f5', padding: '12px 10px',borderRadius:'0px' }}>
          SERVICES
        </button>
      </div>
    </div>
  );
}

export default Dialog;
