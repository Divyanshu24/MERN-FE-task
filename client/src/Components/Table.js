import React, { useEffect, useState } from 'react'

function Table({ check }) {
  const [tabledata, settabledata] = useState([]);

  const getdata = async () => {
    try {
      console.log('table component')
      const data = await fetch('/api/components/');
      const res = await data.json()
      settabledata(res);

    } catch (error) {
      console.log('getdata error:', error);
    }
  }

  useEffect(() => {
    getdata();
  }, [check]);

  return (
    <table class="table-auto">
      <thead>
        <tr >
          <th>Sr. no.</th>
          <th>Songs</th>

        </tr>
      </thead>
      <tbody>
        {tabledata.map((obj) => {
          return (<tr>
            <td>{obj.id}</td>
            <td>{obj.content}</td>
          </tr>)
        })}
      </tbody>
    </table>
  );
}

export default Table