import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
        <>
        <TableContainer  sx={{ borderRadius: '16px', overflow: 'hidden' }}>
            <Table stickyHeader aria-label="custom table">
                <TableHead>
                    <TableRow sx={{borderRadius: 10}}>
                        <TableCell>type</TableCell>
                        <TableCell>offered_by</TableCell>
                        <TableCell>method</TableCell>
                        <TableCell>schedule</TableCell>
                        <TableCell>transaction_no</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dummyData.map((data) => (
                        <TableRow
                            sx={{
                                backgroundColor: '#e0e0e0',
                                borderRadius: '8px',
                                '& > *': {
                                    borderBottom: 'none',
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    padding: '16px',
                                    textAlign: 'center', 
                                    borderRadius: '12px 0 0 12px', 
                                    backgroundColor: '#e0e0e0',
                                }}
                            >
                            {data.type}
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '16px',
                                    textAlign: 'center', 
                                    backgroundColor: '#e0e0e0',
                                }}
                            >
                            {data.offered_by}
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '16px',
                                    textAlign: 'center',
                                    backgroundColor: '#e0e0e0',
                                }}
                            >
                            {data.payment_method}
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '16px',
                                    textAlign: 'center',
                                    backgroundColor: '#e0e0e0',
                                }}
                            >
                            {data.schedule}
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '16px',
                                    textAlign: 'center',
                                    borderRadius: '0 12px 12px 0',
                                    backgroundColor: '#e0e0e0',
                                }}
                            >
                            {data.transaction_no}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}


export default IntentionsApproved