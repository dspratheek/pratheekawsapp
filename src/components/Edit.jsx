import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState} from "react";
import axios from "axios";

export default function Edit({editEl, setEditOpen, setReLoad, reLoad}) {

  const [data, setData] = useState({
        invoice_currency:"",
        cust_payment_terms:"",
        sl_no:"",
  });
  useEffect(() => {
    setData({
        invoice_currency: editEl[2],
        cust_payment_terms: editEl[1],
        sl_no: editEl[0],
  });
},[]);

const handleEditEls = async () => {

   let str = `invoice_currency=${data.invoice_currency}&cust_payment_terms=${data.cust_payment_terms}&sl_no=${data.sl_no}`;
      
   let response = await axios.get(`ec2-44-201-90-156.compute-1.amazonaws.com:8080/backendvm/EditRow?${str}`);
   setEditOpen();
   setReLoad(!reLoad);
}

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div>
    
      <Dialog
        open={true}
        PaperProps={{
          style: {
            backgroundColor: "#2d4250",
            maxWidth: "800px",
          },
        }}
      >
        <DialogTitle style={{ color: "white" }}>Edit</DialogTitle>
        <DialogContent>
         
          <TextField
            margin="dense"
            id="demo-helper-text-aligned-no-helper"
            label="Invoice Currency"
            value={data.invoice_currency}
            type="text"
            fullWidth
            variant="standard"
            name="invoice_currency"
            style={{ width: 200, margin: "0px 20px 0px 0px" }}
            onChange={changeHandler}
          />

          <TextField
            margin="dense"
            id="demo-helper-text-aligned-no-helper"
            label="Customer Payment Terms"
            type="text"
            fullWidth
            value={data.cust_payment_terms}
            name="cust_payment_terms"
            variant="standard"
            style={{ width: 200, margin: "0px 20px 0px 0px" }}
            onChange={changeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditEls}>Edit</Button>
          <Button onClick={setEditOpen}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
