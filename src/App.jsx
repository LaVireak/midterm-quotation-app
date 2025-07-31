/*
TODO remove bootstrap and replace with MUI.
*/

import React, { useState, useRef } from 'react';
import initialData from './data.json';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import QuotationTable from './QuotationTable';

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const [ppu, setPpu] = useState(products[0].price);
  const [dataItems, setDataItems] = useState(initialData);
  const [discount, setDiscount] = useState(0);
  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code);
    const newItem = {
      item: item.name,
      ppu: Number(ppuRef.current.value),
      qty: Number(qtyRef.current.value),
      discount: Number(discount)
    };
    // Check for redundant item (same name and price)
    const idx = dataItems.findIndex(
      (v) => v.item === newItem.item && Number(v.ppu) === Number(newItem.ppu)
    );
    if (idx !== -1) {
      // Merge: sum qty and discount
      const merged = { ...dataItems[idx] };
      merged.qty = Number(merged.qty) + Number(newItem.qty);
      merged.discount = Number(merged.discount || 0) + Number(newItem.discount || 0);
      const updated = [...dataItems];
      updated[idx] = merged;
      setDataItems(updated);
    } else {
      setDataItems([...dataItems, newItem]);
    }
  };


  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code)
    setPpu(item.price)
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: '#e4e4e4', p: 2, borderRadius: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="item-label">Item</InputLabel>
              <Select
                labelId="item-label"
                inputRef={itemRef}
                defaultValue={products[0].code}
                label="Item"
                onChange={productChange}
              >
                {products.map((p) => (
                  <MenuItem key={p.code} value={p.code}>{p.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Price Per Unit"
              type="number"
              inputRef={ppuRef}
              value={ppu}
              onChange={() => setPpu(ppuRef.current.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Quantity"
              type="number"
              inputRef={qtyRef}
              defaultValue={1}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Discount"
              type="number"
              value={discount}
              onChange={e => setDiscount(e.target.value)}
              inputProps={{ min: 0 }}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button variant="contained" color="primary" onClick={addItem}>
                Add
              </Button>
              <Button variant="contained" color="error" onClick={() => setDataItems([])}>
                Clear
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
