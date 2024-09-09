import { Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import all from '../../../components/IntentionInfoModal'
import axios from "axios";
import config from "../../../config";


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

    const [tableData, setTableData] = useState([])
    const [page, setPage] = useState(1)
    const [modaltype, setModalType] = useState(null)
    const [modalData, setModalData] = useState({        // initialized to avoid setting intention_details.map() as undefined
        intention_details: ['']
    })
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIntentions = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${config.API}/request/retrieve-multiple`, {
                    params: {
                        col1: 'service_id',
                        val1: 1,
                        col2: 'status',
                        val2: 'approved',
                        page: page,
                        limit: 25
                    }
                })
                setTableData(response.data);
            } catch(err) {
                console.error(err)
            } finally {
                setLoading(false); // Set loading to false when fetching is done
            }
        }
        fetchIntentions()
    }, [page])
    
    const openInfoModal = (row) => {
        setModalData(row)
        setModalType(row.type)
        console.log(row)
    }

    const closeInfoModal = () => {
        setModalType(null)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    return(
        <div style={{margin: '0 auto'}}>
          
            {/* VERY IMPORTANT: caps ang first letter sa type */}
            {modaltype === 'Souls' && (
                <all.SoulsInfoModal open={true} data={modalData} close={closeInfoModal}/>
            )}
            {modaltype === 'Thanksgiving' && (
                <all.ThanksgivingInfoModal open={true} data={modalData} close={closeInfoModal}/>
            )}
            {modaltype === 'Petition' && (
                <all.PetitionInfoModal open={true} data={modalData} close={closeInfoModal}/>
            )}    
            

            {loading ? (
                <p>Loading...</p> 
            ) : (
                <>
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
                                {tableData.result.map((row,index) => (
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
                    <TablePagination
                        component="div"
                        count={-1}
                        rowsPerPage={25}
                        rowsPerPageOptions={[]}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={null}
                        labelDisplayedRows={() => ''} 
                    />
                </>
            )} 
        </div>
    )
}


export default IntentionsApproved