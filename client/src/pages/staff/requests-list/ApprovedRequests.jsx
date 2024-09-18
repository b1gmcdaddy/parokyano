import React, { useState, useEffect } from "react";
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
import axios from "axios";
import config from "../../../config";
import util from "../../../utils/DateTimeFormatter";

const ApprovedRequests = () => {
  const [tableData, setTableData] = useState([]);
  const [modaltype, setModalType] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${config.API}/request/retrieve-request`, {
        params: {
          status: "approved",
          page: page + 1,
          limit: rowsPerPage,
        },
      });
      setTableData(res.data.result);
      console.log(res.data.result);
    } catch (err) {
      console.error("error retrieving pending reqs", err);
    }
  };

  const fetchTotalItems = async () => {
    try {
      const response = await axios.get(`${config.API}/request/count-request`, {
        params: {
          status: "approved",
        },
      });
      setTotalItems(response.data.count);
      console.log(totalItems);
      console.log(totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchTotalItems();
  }, [page]);

  return (
    <div style={{ margin: "0 auto" }}>
      <TableContainer
        sx={{
          display: "flex",
          borderRadius: "16px",
          overflowX: "auto",
          border: "none",
        }}
      >
        <Table
          stickyHeader
          aria-label="custom table"
          sx={{
            borderCollapse: "separate",
            borderSpacing: 0,
            sm: { minWidth: 650 },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  textAlign: "center",
                  border: "none",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                }}
              >
                SERVICE
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  border: "none",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                }}
              >
                SCHEDULED DATE
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  border: "none",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                }}
              >
                PRIEST ASSIGNED
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  border: "none",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                }}
              >
                REQUESTED BY
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  border: "none",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                }}
              >
                CONTACT NO.
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  border: "none",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                }}
              >
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((req) => (
                <React.Fragment key={req.requestID}>
                  {/* this is to add space in between rows sa table */}
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      sx={{
                        backgroundColor: "#ffffff",
                        padding: 0,
                        border: "none",
                      }}
                    >
                      <Box sx={{ height: "5px", backgroundColor: "white" }} />
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      backgroundColor: "#e0e0e0",
                      borderRadius: "10px",
                      "& > *": {
                        borderBottom: "none",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        border: "none",
                        padding: "16px",
                        textAlign: "center",
                        borderRadius: "15px 0 0 15px",
                        backgroundColor: "#e0e0e0",
                      }}
                    >
                      {req.service_name.length > 0
                        ? req.service_name.substring(0, 20) + "..."
                        : req.service_name}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "none",
                        padding: "16px",
                        textAlign: "center",
                        backgroundColor: "#e0e0e0",
                      }}
                    >
                      {util.formatDate(req.preferred_date)}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "none",
                        padding: "16px",
                        textAlign: "center",
                        backgroundColor: "#e0e0e0",
                      }}
                    >
                      assigned priest
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "none",
                        padding: "16px",
                        textAlign: "center",
                        backgroundColor: "#e0e0e0",
                      }}
                    >
                      {req.requested_by}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "none",
                        padding: "16px",
                        textAlign: "center",
                        backgroundColor: "#e0e0e0",
                      }}
                    >
                      {req.contact_no}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "none",
                        padding: "16px",
                        textAlign: "center",
                        borderRadius: "0 15px 15px 0",
                        backgroundColor: "#e0e0e0",
                      }}
                    >
                      <Button
                        type="button"
                        sx={{
                          backgroundColor: "#355173",
                          color: "white",
                          marginRight: "8px",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "#0036B1",
                          },
                        }}
                      >
                        INFO
                      </Button>
                      <Button
                        type="button"
                        sx={{
                          backgroundColor: "#C34444",
                          color: "white",
                          borderRadius: "10px",
                        }}
                      >
                        CANCEL
                      </Button>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              //NEEDS WORK
              //temporary:
              <div className="float ">
                <h1 className="">No requests found</h1>
              </div>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <IconButton
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0} // Disable on the first page
          sx={{
            backgroundColor: page === 0 ? "grey.300" : "black",
            color: page === 0 ? "grey.600" : "white",
            marginRight: "10px",
          }}
        >
          <KeyboardArrowLeft />
        </IconButton>

        <Typography sx={{ margin: "0 10px", fontWeight: "bold" }}>
          Page {page + 1} of {totalPages}
        </Typography>

        <IconButton
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1} // Disable on the last page
          sx={{
            backgroundColor: page === totalPages - 1 ? "grey.300" : "black",
            color: page === totalPages - 1 ? "grey.600" : "white",
            marginLeft: "10px",
          }}
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    </div>
  );
};

export default ApprovedRequests;
