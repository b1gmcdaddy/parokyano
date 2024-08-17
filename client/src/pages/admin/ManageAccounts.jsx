import React, { useEffect, useState } from 'react';
import NavStaff from '../../components/NavStaff';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button, Typography, Container } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChurch, faStamp, faHandsPraying } from '@fortawesome/free-solid-svg-icons';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const ManageAccounts = () => {

   return (
    <Box sx={{ display: 'flex', mx: { md: '30px' } }}>
      <NavStaff />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }} >
          <Toolbar />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', 
            marginTop: '8px', alignItems: 'center' }}>
            <Typography sx={{fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 600}}>Manage Accounts</Typography> 
            <Button variant="contained" type="button" sx={{backgroundColor:"#355173"}}>Create New Staff</Button>
        </Box>
        
        <Box sx={{ marginTop: '3em' }}>
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead >
                <TableRow>
                    <StyledTableCell>Username</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Created On</StyledTableCell>
                    <StyledTableCell>Last Activity</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell>
                    <StyledTableCell>{row.calories}</StyledTableCell>
                    <StyledTableCell>{row.fat}</StyledTableCell>
                    <StyledTableCell>{row.carbs}</StyledTableCell>
                    <StyledTableCell>{row.protein}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
         </TableContainer>
        </Box>
      </Box>
      
    </Box>
    
  );
}


export default ManageAccounts;
