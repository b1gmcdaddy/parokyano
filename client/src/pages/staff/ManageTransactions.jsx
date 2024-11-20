import { useEffect, useState } from "react";
import React from "react";
import NavStaff from "../../components/NavStaff";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Grid,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
import config from "../../config";
import util from "../../utils/DateTimeFormatter";
import ManageTransactionsModal from "../../components/TransactionModal";

const ManageTransactions = () => {
  const [tableData, setTableData] = useState([]);
  const [modalData, setModalData] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState([]);
  const [inputValue, setValue] = useState("");

  const openModal = (row) => {
    setOpen(true);
    setModalData(row);
  };

  const closeModal = () => setOpen(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${config.API}/request/retrieve-transactions`,
        {
          params: {
            col1: "status",
            val1: "approved",
            col2: "payment_status",
            val2: "paid",
            order: "transaction_date",
            page: page + 1,
            limit: rowsPerPage,
          },
        }
      );
      setTableData(response.data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalItems = async () => {
    try {
      const response = await axios.get(`${config.API}/request/count`, {
        params: {
          col1: "status",
          val1: "approved",
          col2: "payment_status",
          val2: "paid",
        },
      });
      setTotalItems(response.data.count);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (inputValue) => {
    if (inputValue.trim() === "") {
      setFilter([]);
      setPage(0);
      await fetchTransactions();
      return;
    }

    try {
      const response = await axios.get(
        `${config.API}/request/search-transactions`,
        {
          params: {
            val: inputValue,
            page: 1,
            limit: rowsPerPage,
          },
        }
      );
      setFilter(response.data.result);
      // setTotalItems(response.data.count);
      setPage(0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (filter.length > 0) {
      setTableData(filter);
    } else {
      fetchTransactions();
      fetchTotalItems();
    }
  }, [page, filter]);

  useEffect(() => {
    handleSearch(inputValue);
  }, [inputValue]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <ManageTransactionsModal
        open={open}
        data={modalData}
        close={closeModal}
      />

      <Box sx={{ display: "flex", mx: { md: "30px" } }}>
        <NavStaff />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }}
        >
          <Toolbar />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
                fontWeight: 600,
              }}
            >
              List of Transactions
            </Typography>
          </Box>

          <Box sx={{ width: "100%", marginTop: "20px" }}>
            <Grid container spacing={1}>
              <Grid
                item
                sm={12}
                sx={{ display: "flex", flexDirection: "row", gap: 1 }}
              >
                <TextField
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item sm={12}>
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
                            AMOUNT
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              border: "none",
                              fontSize: "0.85rem",
                              fontWeight: "bold",
                            }}
                          >
                            PAYMENT METHOD
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              border: "none",
                              fontSize: "0.85rem",
                              fontWeight: "bold",
                            }}
                          >
                            DATE
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
                            VIEW
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData.map((row, index) => (
                          <React.Fragment key={row.requestID}>
                            <TableRow>
                              <TableCell
                                colSpan={5}
                                sx={{
                                  padding: 0,
                                  backgroundColor: "#ffffff",
                                  border: "none",
                                }}
                              >
                                <Box
                                  sx={{
                                    height: "5px",
                                    backgroundColor: "white",
                                  }}
                                />
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
                                {row.service_id == 5 || row.service_id == 6
                                  ? row.father_name
                                  : row.service_id == 7 ||
                                    row.service_id == 2 ||
                                    row.service_id == 3 ||
                                    row.service_id == 4
                                  ? row.first_name
                                  : row.requested_by}
                              </TableCell>
                              <TableCell
                                sx={{
                                  border: "none",
                                  padding: "16px",
                                  textAlign: "center",
                                  backgroundColor: "#e0e0e0",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "16px",
                                  }}
                                >
                                  {row.donation
                                    ? ` ₱ ${parseFloat(
                                        row.donation
                                      ).toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })}`
                                    : "N/A"}
                                </span>
                              </TableCell>
                              <TableCell
                                sx={{
                                  border: "none",
                                  padding: "16px",
                                  textAlign: "center",
                                  backgroundColor: "#e0e0e0",
                                }}
                              >
                                {row.payment_method == "cash"
                                  ? "Cash"
                                  : "Gcash"}
                              </TableCell>
                              <TableCell
                                sx={{
                                  border: "none",
                                  padding: "16px",
                                  textAlign: "center",
                                  backgroundColor: "#e0e0e0",
                                }}
                              >
                                {util.formatDate(row.transaction_date)}
                              </TableCell>
                              <TableCell
                                sx={{
                                  border: "none",
                                  padding: "16px",
                                  textAlign: "center",
                                  backgroundColor: "#e0e0e0",
                                }}
                              >
                                {row.contact_no}
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
                                  variant="contained"
                                  type="button"
                                  sx={{
                                    backgroundColor: "#355173",
                                    color: "white",
                                    borderRadius: "6px",
                                    "&:hover": {
                                      backgroundColor: "#0036B1",
                                    },
                                  }}
                                  onClick={() => openModal(row)}
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
                        backgroundColor:
                          page === totalPages - 1 ? "grey.300" : "black",
                        color: page === totalPages - 1 ? "grey.600" : "white",
                        marginLeft: "10px",
                      }}
                    >
                      <KeyboardArrowRight />
                    </IconButton>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ManageTransactions;
