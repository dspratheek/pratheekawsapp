import React, { useState, useEffect } from 'react';
// import './App.css';
import NavBar from './components/NavBar';
import Bodyheader from './components/Bodyheader';
import Maintable from './components/Maintable';
import Delete from './components/Delete';
import Edit from './components/Edit';
import AddData from './components/AddData';
import AdvSearch from './components/AdvSearch';
import Footer from './components/Footer';

function App() {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAdvSearch, setOpenAdvSearch] = useState(false);
  const [advRow, setAdvRow] = useState([]);
  const [reLoad, setReLoad] = useState(false);
  const [delData, setDelData] = useState([]);
  const [editEl, setEditEl] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [vals, setVals] = useState([]);
  const [searchVals, setSearchVals] = useState("");
  
  useEffect(() => {

    let advSearchRow = [];
    if(vals.length > 0){

      advSearchRow = gridData.filter((row) => {
        return row.doc_id === vals[0].doc_id && row.invoice_id === vals[0].invoice_id && row.cust_number === vals[0].cust_number && row.buisness_year == vals[0].buisness_year;
      })
      
      if(reLoad === true){    
        setAdvRow({});
        setVals([]);
      } 

      if(advSearchRow.length>0){
        let obj = {id: advSearchRow[0].sl_no,...advSearchRow[0]};
        delete obj.sl_no;
        setAdvRow([obj]);
      }
  }
  
  if(searchVals.length>0){

    let searchedResult = gridData.filter((el) => {
      // return el.cust_number === searchVals;
      return el.cust_number.includes(searchVals);
    })

    if(searchedResult.length>0){
      let newvals = [];
      for(let i = 0; i<searchedResult.length; i++){
        let obj = {id: searchedResult[i].sl_no,...searchedResult[i]};
        delete obj.sl_no;
        newvals.push(obj);
      }

      setAdvRow(newvals);
      setReLoad(false);
    }
  }
  if(reLoad===true){
    setAdvRow({});    
    setSearchVals("");
  }

  },[vals,gridData,reLoad,searchVals,delData]);

  return (
   <div>
   <NavBar/>
   <Bodyheader 
        setSearchVals={setSearchVals} 
        setDelOpen={() => setOpenDialog(!openDialog)} 
        setEditOpen={() => setOpenEditDialog(!openEditDialog)} 
        setAddOpen={() => setOpenAddDialog(!openAddDialog)} 
        setOpenAdvSearch={setOpenAdvSearch} 
        editEl={editEl} 
        setReLoad={setReLoad} 
        reLoad={reLoad} 
        delData={delData}
    />

   <Maintable 
        getRows={(e) => setDelData(e)} 
        getEdit={(e) => setEditEl(e)} 
        setGridData={(e) => setGridData(e)} 
        advRow = {advRow} 
        reLoad={reLoad}
   />

   {openDialog && <Delete 
        delData={delData} 
        setDelOpen={() => setOpenDialog(!openDialog)}
        setReLoad={setReLoad} 
        reLoad={reLoad}
   />}

   {openEditDialog && <Edit 
        editEl={editEl} 
        setEditOpen={() => setOpenEditDialog(!openEditDialog)}
        setReLoad={setReLoad} 
        reLoad={reLoad}
   />}

   {openAddDialog && <AddData 
        setAddOpen={() => setOpenAddDialog(!openAddDialog)} 
        setReLoad={setReLoad} 
        reLoad={reLoad}
   />}

   {openAdvSearch && <AdvSearch 
        setVals={setVals} 
        setOpenAdvSearch={setOpenAdvSearch} 
        setReLoad={setReLoad} 
   />}

   <Footer/>
   </div>
  );
}

export default App;

