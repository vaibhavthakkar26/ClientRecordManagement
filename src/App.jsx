import { useState } from 'react'
import './App.css'
import ClientsData from './Components/clients'
import ThemeContext from './Context';

function App() {
  const [clientRecord,setClientRecord] = useState([]);
  const [tempData,setTempData] = useState([]);

  return (
    <>

        {/* as of now we want display single component as per requerment */}
        <ThemeContext.Provider value={{clientRecord,setClientRecord,tempData,setTempData}}>
          <ClientsData />
        </ThemeContext.Provider>
    </>
  )
}

export default App
