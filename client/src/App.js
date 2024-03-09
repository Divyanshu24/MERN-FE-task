import { Resizable } from 're-resizable';
import './App.css';
import Table from './Components/Table';
import Counts from './Components/Counts';
import Buttons from './Components/Buttons';
import { useState } from 'react';


const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

function App() {
  const [check, setCheck] = useState(false);

  const handleCheck = (value) => {
    console.log(value)
    setCheck(value)
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className="flex flex-row w-screen">

        <Resizable defaultSize={{ width: '50vw', height: '50vh' }} style={style}>
          <Table check={check} />
        </Resizable>

        <div className='w-[100%] h-full' style={style}>
          <Buttons onCheck={handleCheck} check={check} />
        </div>

      </div>
      <div className='w-[100%] h-full' style={style}>
        <Counts check={check} />
      </div>
    </div>
  );
}

export default App;
