import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import React from "react";
import NavStaff from "../../components/NavStaff";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import config from "../../config";
import {
  Box,
  Toolbar,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import IntentionsApproved from "./intentions-list/IntentionsApproved";
import IntentionsPending from "./intentions-list/IntentionsPending";
import PrintIntentions from "./intentions-list/PrintIntentions";

const ManageIntentions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [inputValue, setValue] = useState("");
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const rowsPerPage = 10;

  const handleTabChange = (index) => {
    setActiveTab(index);
    setFilter([]);
    setPage(0);
    setTableData([]);
    setValue("");
  };

  const handlePageChange = (newPage, totalPages, filter) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
    if (filter && filter.length > 0) {
      handleSearch(inputValue, newPage);
    }
  };

  let status;
  switch (activeTab) {
    case 0:
      status = "pending";
      break;
    case 1:
      status = "approved";
      break;
    default:
      status = "pending";
      break;
  }

  useEffect(() => {
    // fetchTotalItems();
    handleSearch(inputValue, page);
  }, [activeTab, page, inputValue]);

  const handleSearch = async (inputValue, page) => {
    console.log(page);
    const response = await axios.get(
      `${config.API}/request/search-intentions`,
      {
        params: {
          val: inputValue,
          status: status,
          page: page + 1, // Use current page
          limit: rowsPerPage, // Rows per page
        },
      }
    );
    if (response.status === 401) {
      navigate("/login");
      return;
    }
    setFilter(response.data.result);
    setTotalItems(response.data.count[0].count);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Box sx={{display: "flex", mx: {md: "30px"}}}>
        <NavStaff />
        <Box
          component="main"
          sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${240}px)`}}}>
          <Toolbar />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
              alignItems: "center",
            }}>
            <Typography
              sx={{
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
                fontWeight: 600,
              }}>
              Mass Intentions
            </Typography>
            <Button
              variant="contained"
              type="button"
              sx={{backgroundColor: "#355173"}}>
              ADD INTENTIONS
            </Button>
          </Box>

          <Box sx={{width: "100%", marginTop: "20px"}}>
            <Grid container spacing={1}>
              <Grid item sm={6}>
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
                  onClick={() => handleTabChange(0)}>
                  Pending
                </Button>
              </Grid>
              <Grid item sm={6}>
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
                  onClick={() => handleTabChange(1)}>
                  Approved
                </Button>
              </Grid>

              <Grid
                item
                sm={12}
                sx={{display: "flex", flexDirection: "row", gap: 1}}>
                <TextField
                  name="search"
                  fullWidth
                  size="small"
                  value={inputValue}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                {/* <Button
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
                </Button> */}
              </Grid>

              <Grid item sm={12}>
                <Box sx={{p: 2}}>
                  {activeTab === 0 && (
                    <IntentionsPending
                      filter={filter}
                      page={page}
                      count={totalItems}
                      handlePageChange={handlePageChange}
                    />
                  )}
                  {activeTab === 1 && (
                    <IntentionsApproved
                      filter={filter}
                      page={page}
                      count={totalItems}
                      handlePageChange={handlePageChange}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ManageIntentions;
