import { Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import React, { useState } from "react";
import all from '../../../components/IntentionInfoModal'

const dummyData = [
    {
        intention_details: ['francis', 'matthew', 'john'],
        type: 'souls',
        offered_by: 'john doe',
        payment_method: 'cash',
        schedule: 'mwf 1 2',
        transaction_no: '12345',
        status: 'paid'
    },
    {
        intention_details: ['lucas', 'matthew', 'john'],
        type: 'souls',
        offered_by: 'john doe',
        payment_method: 'cash',
        schedule: 'friday',
        transaction_no: '19103541',
        status: 'paid'
    },
    {
        intention_details: ['lucas', 'matthew', 'john'],
        type: 'souls',
        offered_by: 'jane doe',
        payment_method: 'cash',
        schedule: 'tuesdat',
        transaction_no: '19103541',
        status: 'paid'
    },
]

const IntentionsApproved = () => {

    const [open, setOpen] = useState(false)
    const [modalData, setModalData] = useState({        // initialized to avoid setting intention_details.map() as undefined
        intention_details: ['']
    })
    
    const openInfoModal = (row) => {
        setOpen(true)
        setModalData(row)
    }

    const closeInfoModal = () => {
        setOpen(false)
    }
    
    return(
        <div style={{margin: '0 auto'}}>
            <all.SoulsInfoModal open={open} data={modalData} close={closeInfoModal}/>

            <TableContainer sx={{ display: 'flex', borderRadius: '16px', overflowX: 'auto', border: 'none', }}>
                <Table stickyHeader aria-label="custom table" sx={{borderCollapse: 'separate', borderSpacing: 0, sm: {minWidth: 650},}}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{textAlign: 'center', border: 'none'}}>type</TableCell>
                            <TableCell sx={{textAlign: 'center', border: 'none'}}>offered_by</TableCell>
                            <TableCell sx={{textAlign: 'center', border: 'none'}}>method</TableCell>
                            <TableCell sx={{textAlign: 'center', border: 'none'}}>schedule</TableCell>
                            <TableCell sx={{textAlign: 'center', border: 'none'}}>transaction_no</TableCell>
                            <TableCell sx={{textAlign: 'center', border: 'none'}}>actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyData.map((row,index) => (
                            <React.Fragment key={index}>
                                {/* this is to add space in between rows sa table */}
                                <TableRow>
                                    <TableCell colSpan={5} sx={{ backgroundColor: '#ffffff', padding: 0, border: 'none' }}>
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
                                        {row.type}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: 'none',
                                            padding: '16px',
                                            textAlign: 'center', 
                                            backgroundColor: '#e0e0e0',
                                        }}
                                    >
                                        {row.offered_by}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: 'none',
                                            padding: '16px',
                                            textAlign: 'center',
                                            backgroundColor: '#e0e0e0',
                                        }}
                                    >
                                        {row.payment_method}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: 'none',
                                            padding: '16px',
                                            textAlign: 'center',
                                            backgroundColor: '#e0e0e0',
                                        }}
                                    >
                                        {row.schedule}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: 'none',
                                            padding: '16px',
                                            textAlign: 'center',
                                            backgroundColor: '#e0e0e0',
                                        }}
                                    >
                                        {row.transaction_no}
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
    )
}


export default IntentionsApproved