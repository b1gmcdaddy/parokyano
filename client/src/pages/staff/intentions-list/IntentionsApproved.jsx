import { Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import React from "react";

const dummyData = [
    {
        type: 'souls',
        offered_by: 'john doe',
        payment_method: 'cash',
        schedule: 'mwf 1 2',
        transaction_no: '19103541'
    },
    {
        type: 'souls',
        offered_by: 'john doe',
        payment_method: 'cash',
        schedule: 'mwf 1 2',
        transaction_no: '19103541'
    },
    {
        type: 'souls',
        offered_by: 'john doe',
        payment_method: 'cash',
        schedule: 'mwf 1 2',
        transaction_no: '19103541'
    },
]

const IntentionsApproved = () => {
    return(
        <div style={{margin: '0 auto'}}>
            <TableContainer  sx={{ display: 'flex', borderRadius: '16px', overflow: 'hidden', border: 'none', }}>
                <Table stickyHeader aria-label="custom table" sx={{borderCollapse: 'separate', borderSpacing: 0, minWidth: 1000,}}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{textAlign: 'center'}}>type</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>offered_by</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>method</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>schedule</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>transaction_no</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyData.map((data,index) => (
                            <React.Fragment key={index}>
                                {/* this is to add space in between rows sa table */}
                                <TableRow>
                                    <TableCell colSpan={5} sx={{ backgroundColor: '#ffffff', padding: 0 }}>
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
                                            border: 'none',
                                            padding: '16px',
                                            textAlign: 'center', 
                                            borderRadius: '15px 0 0 15px', 
                                            backgroundColor: '#e0e0e0',
                                        }}
                                    >
                                        {data.type}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: 'none',
                                            padding: '16px',
                                            textAlign: 'center', 
                                            backgroundColor: '#e0e0e0',
                                        }}
                                    >
                                        {data.offered_by}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: 'none',
                                            padding: '16px',
                                            textAlign: 'center',
                                            backgroundColor: '#e0e0e0',
                                        }}
                                    >
                                        {data.payment_method}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: 'none',
                                            padding: '16px',
                                            textAlign: 'center',
                                            backgroundColor: '#e0e0e0',
                                        }}
                                    >
                                        {data.schedule}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: 'none',
                                            padding: '16px',
                                            textAlign: 'center',
                                            backgroundColor: '#e0e0e0',
                                        }}
                                    >
                                        {data.transaction_no}
                                    </TableCell>
                                    <TableCell 
                                        sx={{
                                            border: 'none',
                                            padding: '16px',
                                            textAlign: 'center',
                                            borderRadius: '0 15px 15px 0',
                                            backgroundColor: '#e0e0e0',
                                        }}
                                    >
                                        <Button 
                                            sx={{
                                                backgroundColor: '#355173', 
                                                color: 'white', 
                                                borderRadius: '10px',
                                                '&:hover': {
                                                    backgroundColor: '#0036B1'
                                                }
                                            }}
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
    )
}


export default IntentionsApproved