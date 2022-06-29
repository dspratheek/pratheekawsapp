import React, { useState } from 'react';


let App = () => {
  
  const [count, setCount] = useState(0);
   

  const IncNum = () => {
    setCount(count+1);
  }
  const DecNum = () => {
    if (count>0){
      setCount(count-1);
    }
  }
  return(
        <>
          <h1>{count}</h1>
          <button onClick={IncNum}>Inc</button>
          <button onClick={DecNum}>Dec</button>
        </>
    );
}

export default App;
