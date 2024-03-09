import React, { useState } from 'react'

import axios from 'axios'


const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

function Buttons(props) {
  const [text, settext] = useState({ content: "" });

  const [updatedata, setupdatedata] = useState({ id: 0, content: "" });

  const handlesubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/components/add', text);

    e.target.reset();

    props.onCheck(!props.check)
  }

  const handleedit = async (e) => {
    e.preventDefault();
    await axios.put('/api/components/update', updatedata);
    e.target.reset();
    props.onCheck(!props.check)
  }

  const handlechangetoadd = (e) => {
    const { name, value } = e.target;
    settext(prev => ({
      ...prev,
      [name]: value
    }))
  }


  const handlechangetoedit = (e) => {
    const { name, value } = e.target;

    setupdatedata(prev => ({
      ...prev,
      [name]: value
    }))

  }

  return (
    <div className="flex flex-col justify-center gap-4 w-[30%]">
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="Type here"
          className="input w-full max-w-xs"
          name="content"
          value={text.content}
          onChange={handlechangetoadd}
        />
        <button type="submit" className="btn btn-primary btn-lg">ADD</button>
      </form>

      <form onSubmit={handleedit}>
        <label htmlFor='FROM'>FROM</label>
        <input
          type="number"
          placeholder="Enter Sr. NO."
          name="id"
          value={updatedata.id}
          onChange={handlechangetoedit}
          className="input w-full max-w-xs"
        />
        <label htmlFor='TO'>TO</label>
        <input
          type="text"
          placeholder="Type here"
          className="input w-full max-w-xs"
          name="content"
          value={updatedata.content}
          onChange={handlechangetoedit}
        />
        <button type="submit" className="btn btn-primary btn-lg">EDIT</button>
      </form>

    </div>
  );
}

export default Buttons