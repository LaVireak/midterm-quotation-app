import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

function QuotationTable({ data, deleteByIndex }) {
  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <h1>Quotation</h1>
        <p><ShoppingCartIcon sx={{ verticalAlign: 'middle' }} /> No items</p>
      </Box>
    );
  }

  const total = data.reduce(
    (acc, v) => acc + (Number(v.qty) * Number(v.ppu ?? v.price) - Number(v.discount || 0)),
    0
  );
  const totalDiscount = data.reduce((acc, v) => acc + Number(v.discount || 0), 0);

  const handleDelete = (index) => {
    deleteByIndex(index)
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ m: 2 }}>Quotation</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Qty</TableCell>
              <TableCell>Item</TableCell>
              <TableCell align="right">Price/Unit</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              const qty = Number(v.qty);
              const ppu = Number(v.ppu ?? v.price);
              const discount = Number(v.discount || 0);
              const amount = qty * ppu - discount;
              return (
                <TableRow key={i}>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleDelete(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{qty}</TableCell>
                  <TableCell>{v.item || v.name}</TableCell>
                  <TableCell align="right">{ppu.toFixed(2)}</TableCell>
                  <TableCell align="right">{discount.toFixed(2)}</TableCell>
                  <TableCell align="right">{amount.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total Discount</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalDiscount.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>{total.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default QuotationTable;
