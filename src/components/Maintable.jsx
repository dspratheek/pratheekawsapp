import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
// import "./Maintable.css";

const Maintable = ({getRows, getEdit, setGridData, advRow,reLoad}) => {
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState([]);
    const [pageSize, setPageSize] = useState(10);

    // useEffect(() => {
    //   getEdit(editData);
    // },[editData]);

    useEffect(() => {
      setGridData(data);
    },[data]);


    
    useEffect(async () => {       
        const response =  await axios.get("http://ec2-44-201-90-156.compute-1.amazonaws.com:8080/backendvm/GetData");
        // const response =  await axios.get("http://localhost:8080/HRCBackend/GetData");
        setData(response.data);
      },[reLoad])
  
    let rows = data.map((el) => {
        let obj = {id: el.sl_no,...el};
        delete obj.sl_no;
        return (obj);
    })
  
    const columns = [
        { field: 'id', headerName: 'Sl No', width: 50 },
        { field: 'business_code', headerName: 'Business Code', width: 130, editable: true },
        { field: 'buisness_year', headerName: 'Business year', width: 110, editable: true },
        { field: 'clear_date', headerName: 'Clear Date', width: 110, editable: true },
        { field: 'cust_number', headerName: 'Customer Number', width: 140, editable: true },
        { field: 'cust_payment_terms', headerName: 'Customer Payment Terms', width: 190, editable: true },
        { field: 'doc_id', headerName: 'Document ID', width: 130, editable: true },
        { field: 'document_create_date', headerName: 'Document Create Date', width: 170, editable: true },
        { field: 'document_type',headerName: 'Document Type',width: 120,editable: true },
        { field: 'due_in_date', headerName: 'Due Date', width: 120,editable: true },
        { field: 'invoice_currency', headerName: 'Invoice Currency', width: 130, editable: true },
        { field: 'invoice_id', headerName: 'Invoice ID', width: 150, editable: true },
        { field: 'posting_date', headerName: 'Posting Date', width: 130, editable: true },
        { field: 'posting_id', headerName: 'Posting ID', width: 100, editable: true },
        { field: 'total_open_amount', headerName: 'Total Open Amount', width: 150, editable: true }
    ]
    
    let slnums = [];

  return (
    <>
    <div style={{ height: 525, width: '100%' }}>

      <DataGrid      
        className="griddata"
        // getRowId={(row) => row.sl_no}
        rows={advRow.length > 0 ? advRow : rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5,10,20]}
        checkboxSelection
        disableSelectionOnClick
        sx={{ color: "white", bgcolor: '#2d4250'}}
        rowHeight={38}
        headerHeight={60}
   
        onSelectionModelChange = {(e) => {

          slnums.push(e);  

          if(e.length === 0){                  
            // setEditData([]);
            getEdit([]);
            // setArr([]);
            getRows([]);
          }

          getRows([...slnums[0]]);

          let arr = [];

          if(e.length === 1){
            arr[0] = e[0];
            let editEl = rows.find((el) => {
                return el.id === e[0];
            });
            arr[1] = editEl.cust_payment_terms;
            arr[2] = editEl.invoice_currency; 
          }
          getEdit(arr);
        }}
      />
    </div>
        </>
  );

}

export default Maintable;










