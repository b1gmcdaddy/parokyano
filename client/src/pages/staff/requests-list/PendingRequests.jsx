import React, { useState, useEffect } from "react";
import { Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import axios from "axios";
import config from "../../../config";

const PendingRequests = () => {    

    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        const getPendingReqs = async () => {
            try {
                const res = await axios.get(`${config.API}/request/retrieve`, {
                    params: {
                        col: 'status',  
                        val: 'pending' 
                    }});
                setPendingRequests(res.data.result); 
            } catch (err) {
                console.error('error retrieving pending reqs', err);
            }
        }
        getPendingReqs();
    }, [])

    return(
        <div style={{margin: '0 auto'}}>

            <TableContainer sx={{ display: 'flex', borderRadius: '16px', overflowX: 'auto', border: 'none', }}>
                <Table stickyHeader aria-label="custom table" sx={{borderCollapse: 'separate', borderSpacing: 0, sm: {minWidth: 650},}}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{textAlign: 'center', border: 'none'}}>Type</TableCell>
                            <TableCell sx={{textAlign: 'center', border: 'none'}}>Date and Time</TableCell>
                            <TableCell sx={{textAlign: 'center', border: 'none'}}>Requested By</TableCell>
                            <TableCell sx={{textAlign: 'center', border: 'none'}}>Contact No.</TableCell>
                            <TableCell sx={{textAlign: 'center', border: 'none'}}>Transaction No.</TableCell>
                            <TableCell sx={{textAlign: 'center', border: 'none'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingRequests.map((req) => (
                            <React.Fragment key={req.requestID}>
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
                                        {req.type}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: 'none',
                                            padding: '16px',
                                            textAlign: 'center', 
                                            backgroundColor: '#e0e0e0',
                                        }}
                                    >
                                        date and time
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: 'none',
                                            padding: '16px',
                                            textAlign: 'center',
                                            backgroundColor: '#e0e0e0',
                                        }}
                                    >
                                        {req.requested_by}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: 'none',
                                            padding: '16px',
                                            textAlign: 'center',
                                            backgroundColor: '#e0e0e0',
                                        }}
                                    >
                                        {req.contact_no}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: 'none',
                                            padding: '16px',
                                            textAlign: 'center',
                                            backgroundColor: '#e0e0e0',
                                        }}
                                    >
                                        {req.transaction_no}
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
                                                marginRight: '8px',
                                                borderRadius: '10px',
                                                '&:hover': {
                                                    backgroundColor: '#0036B1'
                                                }
                                            }}
                                        
                                        >
                                            INFO    
                                        </Button>
                                        <Button 
                                            type="button"
                                            sx={{
                                                backgroundColor: '#C34444', 
                                                color: 'white', 
                                                borderRadius: '10px',
                                            }}
                                        
                                        >
                                            CANCEL    
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


export default PendingRequests;
