import {
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {useEffect, useState} from "react";
import React from "react";
import all from "../../../components/IntentionInfoModal";
import axios from "axios";
import config from "../../../config";
import util from "../../../utils/DateTimeFormatter";
import PrintIntentions from "./PrintIntentions";

const schedule = (_date, _time) => {
  return util.formatTime(_time) + " ,  " + util.formatDate(_date.slice(0, 10));
};

const IntentionsApproved = ({filter, page, count, handlePageChange}) => {
  const [tableData, setTableData] = useState([]);
  const [modaltype, setModalType] = useState(null);
  const [modalData, setModalData] = useState({
    // initialized to avoid setting intention_details.map() as undefined
    intention_details: [""],
  });
  const [loading, setLoading] = useState(true);
  const [openPrint, setOpenPrint] = useState(false);
  const rowsPerPage = 10;
  const [totalItems, setTotalItems] = useState(count);
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const handleOpenPrintModal = () => {
    setOpenPrint(true);
  };

  const fetchIntentions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${config.API}/request/retrieve-multiple`,
        {
          params: {
            col1: "service_id",
            val1: 1,
            col2: "status",
            val2: "approved",
            order: "date_requested",
            page: page + 1,
            limit: rowsPerPage,
          },
        }
      );
      setTableData(response.data.result);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false when fetching is done
    }
  };

  const fetchTotalItems = async () => {
    try {
      const response = await axios.get(`${config.API}/request/count`, {
        params: {
          col1: "service_id",
          val1: 1,
          col2: "status",
          val2: "pending",
        },
      });
      setTotalItems(response.data.count);
      console.log(totalItems);
      console.log(totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (filter && filter.length > 0) {
      setTableData(filter);
      setTotalItems(count);
    } else {
      fetchIntentions();
      fetchTotalItems();
    }
    // console.log(totalItems);
  }, [page, totalItems, filter]);

  const openInfoModal = (row) => {
    setModalData(row);
    setModalType(row.type);
    console.log(row);
  };

  const closeInfoModal = () => {
    setModalType(null);
  };

  return (
    <div style={{margin: "0 auto"}}>
      {/* VERY IMPORTANT: caps ang first letter sa type */}
      {modaltype === "Souls" && (
        <all.SoulsInfoModal
          open={true}
          data={modalData}
          close={closeInfoModal}
        />
      )}
      {modaltype === "Thanksgiving" && (
        <all.ThanksgivingInfoModal
          open={true}
          data={modalData}
          close={closeInfoModal}
        />
      )}
      {modaltype === "Petition" && (
        <all.PetitionInfoModal
          open={true}
          data={modalData}
          close={closeInfoModal}
        />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Button
            variant="contained"
            onClick={handleOpenPrintModal}
            sx={{
              float: "right",
              color: "#355173",
              backgroundColor: "#FFFFFF",
              border: "solid 1px #888888",
              "&:hover": {bgcolor: "#F2F2FF"},
            }}>
            Print Mass Intentions
          </Button>
          <TableContainer
            sx={{
              display: "flex",
              borderRadius: "16px",
              overflowX: "auto",
              border: "none",
            }}>
            <Table
              stickyHeader
              aria-label="custom table"
              sx={{
                borderCollapse: "separate",
                borderSpacing: 0,
                sm: {minWidth: 650},
              }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "none",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}>
                    TYPE
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "none",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}>
                    OFFERED BY
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "none",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                    }}>
                    SCHEDULED MASS
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "none",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}>
                    TRANSACTION NO.
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "none",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}>
                    DATE REQUESTED
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "none",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}>
                    ACTIONS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <React.Fragment key={index}>
                    {/* this is to add space in between rows sa table */}
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        sx={{
                          backgroundColor: "#ffffff",
                          padding: 0,
                          border: "none",
                        }}>
                        <Box sx={{height: "5px", backgroundColor: "white"}} />
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "10px",
                        "& > *": {
                          borderBottom: "none",
                        },
                      }}>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          borderRadius: "15px 0 0 15px",
                          backgroundColor: "#e0e0e0",
                        }}>
                        {row.type}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          backgroundColor: "#e0e0e0",
                        }}>
                        {row.requested_by}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          backgroundColor: "#e0e0e0",
                        }}>
                        {schedule(row.preferred_date, row.preferred_time)}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          backgroundColor: "#e0e0e0",
                        }}>
                        {row.transaction_no}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          backgroundColor: "#e0e0e0",
                        }}>
                        {util.formatDate(row.date_requested)}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          borderRadius: "0 15px 15px 0",
                          backgroundColor: "#e0e0e0",
                        }}>
                        <Button
                          type="button"
                          sx={{
                            backgroundColor: "#355173",
                            color: "white",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: "#0036B1",
                            },
                          }}
                          onClick={() => openInfoModal(row)}>
                          INFO
                        </Button>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 2,
            }}>
            <IconButton
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0} // Disable on the first page
              sx={{
                backgroundColor: page === 0 ? "grey.300" : "black",
                color: page === 0 ? "grey.600" : "white",
                marginRight: "10px",
              }}>
              <KeyboardArrowLeft />
            </IconButton>

            <Typography sx={{margin: "0 10px", fontWeight: "bold"}}>
              Page {page + 1} of {totalPages}
            </Typography>

            <IconButton
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1} // Disable on the last page
              sx={{
                backgroundColor: page === totalPages - 1 ? "grey.300" : "black",
                color: page === totalPages - 1 ? "grey.600" : "white",
                marginLeft: "10px",
              }}>
              <KeyboardArrowRight />
            </IconButton>
          </Box>
          <PrintIntentions open={openPrint} close={() => setOpenPrint(false)} />
        </>
      )}
    </div>
  );
};

export default IntentionsApproved;
