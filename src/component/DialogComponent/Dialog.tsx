import  { MouseEventHandler } from 'react';

interface DialogInterface {
  handleAddCategory: MouseEventHandler<HTMLButtonElement>;
}

const Dialog = ({ handleAddCategory }: DialogInterface) => {
  return (
    <div style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '6px', padding: '10px 10px', width: '240px', height: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
      <div>
        <p style={{ color: 'black' }}>
          What do you want to create?
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '200px' }}>
        <button style={{ color: '#444', padding: '4px', borderRadius: '0px' }} onClick={handleAddCategory}>
          Category
        </button>
        <button disabled style={{ padding: '4px', borderRadius: '0px', color: '#444' }}>
          Service
        </button>
      </div>
    </div>
  );
}

export default Dialog;
