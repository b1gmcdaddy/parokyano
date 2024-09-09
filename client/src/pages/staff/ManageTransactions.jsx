import { useState } from "react";
import React from "react";
import NavStaff from "../../components/NavStaff";
import SearchIcon from '@mui/icons-material/Search';
import { Box, Toolbar, Typography, Button, Grid, TextField, InputAdornment } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const dummyData = [
    {
        intention_details: ['francis', 'matthew', 'john'],
        type: 'souls',
        offered_by: 'benedict jesus de la cruz',
        payment_method: 'cash',
        schedule: 'mwf 1 2',
        transaction_no: '12345',
        status: 'unpaid'
    },
    {
        intention_details: ['lucas', 'matthew', 'john'],
        type: 'souls',
        offered_by: 'john doe asasaasasasas',
        payment_method: 'cash',
        schedule: 'fridayasasasasasasasasas',
        transaction_no: '19103541',
        status: 'unpaid'
    },
    {
        intention_details: ['lucas', 'matthew', 'john'],
        type: 'souls',
        offered_by: 'jane doe',
        payment_method: 'cash',
        schedule: 'tuesdat',
        transaction_no: '19103541',
        status: 'unpaid'
    },
]

const ManageTransactions = () => {

    const [open, setOpen] = useState(false)
    const [modalData, setModalData] = useState({})
    
    // const openInfoModal = (row) => {
    //     setOpen(true)
    //     setModalData(row)
    // }

    // const closeInfoModal = () => {
    //     setOpen(false)
    // }

    return(
        <>
            <Box sx={{ display: "flex", mx: { md: "30px" } }}>
                <NavStaff />
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }} >
                    <Toolbar />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' , alignItems: 'center' }}>
                        <Typography sx={{fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 600}}>List of Transactions</Typography> 
                    </Box>

                    <Box sx={{ width: '100%', marginTop: '20px'}}>
                        <Grid container spacing={1}>

                            <Grid item sm={12}>
                                <TextField fullWidth size="small" InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                    ),
                                }}/>
                            </Grid>

                            <Grid item sm={12}>

                                <div style={{margin: '0 auto'}}>

                                    <TableContainer sx={{ display: 'flex', borderRadius: '16px', overflowX: 'auto', border: 'none', }}>
                                        <Table stickyHeader aria-label="custom table" sx={{borderCollapse: 'separate', borderSpacing: 0, sm: {minWidth: 650, maxWidth: 650},}}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{fontSize: '12px', fontWeight: 'bold', textAlign: 'center', border: 'none'}}>NAME</TableCell>
                                                    <TableCell sx={{fontSize: '12px', fontWeight: 'bold', textAlign: 'center', border: 'none'}}>REQUEST</TableCell>
                                                    <TableCell sx={{fontSize: '12px', fontWeight: 'bold', textAlign: 'center', border: 'none'}}>AMOUNT</TableCell>
                                                    <TableCell sx={{fontSize: '12px', fontWeight: 'bold', textAlign: 'center', border: 'none'}}>DATE</TableCell>
                                                    <TableCell sx={{fontSize: '12px', fontWeight: 'bold', textAlign: 'center', border: 'none'}}>CONTACT NO.</TableCell>
                                                    <TableCell sx={{fontSize: '12px', fontWeight: 'bold', textAlign: 'center', border: 'none'}}>ACTIONS</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {dummyData.map((row,index) => (
                                                    <React.Fragment key={index}>
                                                        {/* this is to add space in between rows sa table */}
                                                        <TableRow>
                                                            <TableCell colSpan={5} sx={{padding: '10px',backgroundColor: '#ffffff', border: 'none' }}>
                                                                <Box sx={{ height: '5px', backgroundColor: 'white',}} />
                                                            </TableCell>
                                                        </TableRow>

                                                        <TableRow
                                                            sx={{
                                                                backgroundColor: '#e0e0e0',
                                                                borderRadius: '10px',
                                                                '& > *': {
                                                                    borderBottom: 'none',
                                                                },
                                                            }}
                                                        >
                                                            <TableCell
                                                                sx={{
                                                                    fontSize: '16px', 
                                                                    border: 'none',
                                                                    // padding: '16px',
                                                                    textAlign: 'center', 
                                                                    borderRadius: '15px 0 0 15px', 
                                                                    backgroundColor: '#e0e0e0',
                                                                }}
                                                            >
                                                                {row.type}
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    fontSize: '16px',
                                                                    border: 'none',
                                                                    // padding: '16px',
                                                                    textAlign: 'center', 
                                                                    backgroundColor: '#e0e0e0',
                                                                }}
                                                            >
                                                                {row.offered_by}
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    fontSize: '16px',
                                                                    border: 'none',
                                                                    // padding: '16px',
                                                                    textAlign: 'center',
                                                                    backgroundColor: '#e0e0e0',
                                                                }}
                                                            >
                                                                {row.payment_method}
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    fontSize: '16px',
                                                                    border: 'none',
                                                                    // padding: '16px',
                                                                    textAlign: 'center',
                                                                    backgroundColor: '#e0e0e0',
                                                                }}
                                                            >
                                                                {row.schedule}
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    fontSize: '16px',
                                                                    border: 'none',
                                                                    // padding: '16px',
                                                                    textAlign: 'center',
                                                                    backgroundColor: '#e0e0e0',
                                                                }}
                                                            >
                                                                {row.transaction_no}
                                                            </TableCell>
                                                            <TableCell 
                                                                sx={{
                                                                    fontSize: '16px',
                                                                    border: 'none',
                                                                    // padding: '16px',
                                                                    textAlign: 'center',
                                                                    borderRadius: '0 15px 15px 0',
                                                                    backgroundColor: '#e0e0e0',
                                                                }}
                                                            >
                                                                <Button 
                                                                    type="button"
                                                                    sx={{
                                                                        backgroundColor: '#355173', 
                                                                        color: 'white', 
                                                                        borderRadius: '10px',
                                                                        '&:hover': {
                                                                            backgroundColor: '#0036B1'
                                                                        }
                                                                    }}
                                                                    onClick={() => openInfoModal(row)}
                                                                >
                                                                    INFO    
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    </React.Fragment>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    </div>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ManageTransactions