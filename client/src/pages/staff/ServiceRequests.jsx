import React, { useState, useEffect, act } from "react";
import NavStaff from "../../components/NavStaff";
import {
  Box,
  Toolbar,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PendingRequests from "./requests-list/PendingRequests";
import ApprovedRequests from "./requests-list/ApprovedRequests";
import CancelledRequests from "./requests-list/CancelledRequests";
import axios from "axios";
import config from "../../config";

const ServiceRequests = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState([]);
  const [inputValue, setValue] = useState("");
  const rowsPerPage = 10;

  const totalPages = Math.ceil(totalItems / rowsPerPage);

  let status;
  switch (activeTab) {
    case 0:
      status = "approved";
      break;
    case 1:
      status = "pending";
      break;
    case 2:
      status = "cancelled";
      break;
    default:
      status = "approved";
      break;
  }

  const handleTabChange = (index) => {
    setActiveTab(index);
    setFilter([]);
    setPage(0);
    setValue("");
  };

  const fetchTotalItems = async () => {
    try {
      const response = await axios.get(`${config.API}/request/count-request`, {
        params: {
          status: status,
        },
      });
      setTotalItems(response.data.count);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    fetchTotalItems();
  }, [activeTab, status]);

  const handleSearch = async (inputValue, page) => {
    const response = await axios.get(`${config.API}/request/search-requests`, {
      params: {
        val: inputValue,
        status: status,
        page: page + 1, // Use current page
        limit: rowsPerPage, // Rows per page
      },
    });
    if (response.status === 401) {
      navigate("/login");
      return;
    }
    setFilter(response.data.result);
    setTotalItems(response.data.count[0].count);
    console.log(totalItems);
  };

  return (
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
            marginTop: "8px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 600 }}
          >
            Service Requests
          </Typography>
          <Button
            variant="contained"
            type="button"
            sx={{ backgroundColor: "#355173" }}
          >
            ADD REQUEST
          </Button>
        </Box>

        <Box sx={{ width: "100%", marginTop: "20px" }}>
          <Grid container spacing={1}>
            <Grid item sm={4}>
              <Button
                fullWidth
                variant="contained"
                type="button"
                sx={{
                  backgroundColor: activeTab === 0 ? "#355173" : "#D9D9D9",
                  height: "40px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  color: activeTab === 0 ? "white" : "black",
                }}
                onClick={() => handleTabChange(0)}
              >
                Approved Requests
              </Button>
            </Grid>
            <Grid item sm={4}>
              <Button
                fullWidth
                variant="contained"
                type="button"
                sx={{
                  backgroundColor: activeTab === 1 ? "#355173" : "#D9D9D9",
                  height: "40px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  color: activeTab === 1 ? "white" : "black",
                }}
                onClick={() => handleTabChange(1)}
              >
                Pending Requests
              </Button>
            </Grid>
            <Grid item sm={4}>
              <Button
                fullWidth
                variant="contained"
                type="button"
                sx={{
                  backgroundColor: activeTab === 2 ? "#355173" : "#D9D9D9",
                  height: "40px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  color: activeTab === 2 ? "white" : "black",
                }}
                onClick={() => handleTabChange(2)}
              >
                Cancelled Requests
              </Button>
            </Grid>

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
              <Button
                fullWidth
                variant="contained"
                type="button"
                onClick={() => {
                  setPage(0);
                  handleSearch(inputValue, 0);
                }}
                sx={{
                  backgroundColor: "#355173",
                  width: "100px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                }}
              >
                Search
              </Button>
            </Grid>

            <Grid item sm={12}>
              <Box sx={{ p: 3 }}>
                {activeTab === 0 && (
                  <ApprovedRequests
                    filter={filter}
                    page={page}
                    totalItems={totalItems}
                    handlePageChange={handlePageChange}
                  />
                )}
                {activeTab === 1 && (
                  <PendingRequests
                    filter={filter}
                    page={page}
                    totalItems={totalItems}
                    handlePageChange={handlePageChange}
                  />
                )}
                {activeTab === 2 && (
                  <CancelledRequests
                    filter={filter}
                    page={page}
                    totalItems={totalItems}
                    handlePageChange={handlePageChange}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ServiceRequests;
