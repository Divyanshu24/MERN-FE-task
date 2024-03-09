import React, { useState, useEffect } from 'react'



function Counts({ check }) {
  const [counts, setcounts] = useState({})

  const getdata = async () => {
    try {

      const data = await fetch('/api/components/count');
      const res = await data.json()
      setcounts(res);
    } catch (error) {
      console.log('getdata error:', error);
    }
  }

  useEffect(() => {
    getdata();
  }, [check]);

  return (
    <div>
      <h1>Counts</h1>
      <h3>Add Api Count:{counts.addCount}</h3>
      <h3>update Api Count:{counts.updateCount}</h3>
    </div>
  )
}

export default Counts