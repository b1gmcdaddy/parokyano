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
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import config from "../../../config";
import util from "../../../utils/DateTimeFormatter";

const CertificatesPending = () => {
  const [tableData, setTableData] = useState([]);
  const [modaltype, setModalType] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  //temp data
  const certDummyData = [
    {
      id: 1,
      requestedBy: "Jolo Tangpuz",
      type: "Baptismal",
      dateRequested: "2024-05-11",
      transaction_no: "2024-07-024ea5c508a6566e762407",
    },
    {
      id: 2,
      requestedBy: "Clyde Noob",
      type: "Wedding",
      dateRequested: "2024-04-11",
      transaction_no: "2024-07-024ea5c508a6566e762406",
    },
    {
      id: 3,
      requestedBy: "Carl Barrera",
      type: "Confimration",
      dateRequested: "2024-03-11",
      transaction_no: "2024-07-024ea5c508a6566e762405",
    },
  ];

  const schedule = (_date, _time) => {
    return (
      util.formatTime(_time) + " ,  " + util.formatDate(_date.slice(0, 10))
    );
  };

  const fetchCertificates = async () => {
    try {
      const res = await axios.get(`${config.API}/request/retrieve-certs`, {
        params: {
          status: "pending",
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
      const response = await axios.get(`${config.API}/request/count-certs`, {
        params: {
          status: "pending",
        },
      });
      setTotalItems(response.data.count);
      console.log(totalItems);
      console.log(totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  // const handlePageChange = (newPage) => {
  //   if (newPage >= 0 && newPage < totalPages) {
  //     setPage(newPage);
  //   }
  // };

  // useEffect(() => {
  //   // fetchIntentions();
  //   fetchTotalItems();
  // }, [page]);

  return (
    <div style={{ margin: "0 auto" }}>
      {/* {loading ? (
        <p>Loading...</p>
      ) : ( */}
      <>
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
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  }}
                >
                  REQUESTED BY
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    border: "none",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  }}
                >
                  TYPE OF CERTIFICATE
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    border: "none",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  }}
                >
                  DATE REQUESTED
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    border: "none",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  }}
                >
                  TRANSACTION NO.
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    border: "none",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  }}
                >
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certDummyData.map((row) => (
                <React.Fragment key={row.id}>
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
                      {row.requestedBy}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "none",
                        padding: "16px",
                        textAlign: "center",
                        backgroundColor: "#e0e0e0",
                      }}
                    >
                      {row.type}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "none",
                        padding: "16px",
                        textAlign: "center",
                        backgroundColor: "#e0e0e0",
                      }}
                    >
                      {row.dateRequested}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "none",
                        padding: "16px",
                        textAlign: "center",
                        backgroundColor: "#e0e0e0",
                      }}
                    >
                      {row.transaction_no}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "none",
                        padding: "16px",
                        textAlign: "center",
                        borderRadius: "0 15px 15px 0",
                        backgroundColor: "#e0e0e0",
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                      }}
                    >
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
                      >
                        INFO
                      </Button>
                      <Button
                        type="button"
                        sx={{
                          backgroundColor: "#44C360",
                          color: "white",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "green",
                          },
                        }}
                      >
                        SEARCH RECORDS
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
          }}
        >
          {/* <IconButton
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
            </IconButton> */}
        </Box>
      </>
    </div>
  );
};

export default CertificatesPending;
