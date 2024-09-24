import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import config from "../config";
import { ReactToPrint } from "react-to-print";

const formatDate = (date) => date.toISOString().split("T")[0];

const now = new Date();
//   const lastMonth =
const last = formatDate(new Date(now.getFullYear(), now.getMonth() + 1, 1));

const start = formatDate(new Date(now.getFullYear(), now.getMonth(), 1));

const StaffReport = ({ startDate, endDate }) => {
  const [reportInfo, setReportInfo] = useState({});
  console.log(startDate);
  console.log(start);
  const getSummaryReport = async () => {
    try {
      const res = await axios.get(`${config.API}/request/summary`, {
        params: {
          startDate: startDate != "" ? startDate : start,
          endDate: endDate != "" ? endDate : last,
        },
      });
      setReportInfo(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("error retrieving summary", err);
    }
  };

  useEffect(() => {
    getSummaryReport();
  }, [startDate, endDate]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          style={{ height: "auto", width: "10%", marginTop: "1em" }}
          alt="Logo"
        />
        <Typography>
          Catholic Church of Christ of the Agony <br />
          Gethsemane Parish
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center", margin: "auto" }}>
        <Typography>Parokyano Generated Report</Typography>
        <Typography sx={{ fontStyle: "italic", fontSize: "14px" }}>
          {"Date Here"}
        </Typography>
      </Box>

      <Box sx={{ marginTop: "3em" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#D9D9D9" }}>
                <TableCell
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  Parish Service
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Pending Requests
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Approved Requests
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Cancelled Requests
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Fees Collected
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportInfo.length > 0 ? (
                reportInfo.map((report, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {report.name}
                    </TableCell>
                    <TableCell align="right">{report.pending}</TableCell>
                    <TableCell align="right">{report.approved}</TableCell>
                    <TableCell align="right">{report.cancelled}</TableCell>
                    <TableCell align="right"> {/* to implement */} </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default StaffReport;
