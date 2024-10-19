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
import dayjs from "dayjs";

const formatDate = (date) => date.toISOString().split("T")[0];
const now = new Date();
//   const lastMonth =
const last = formatDate(new Date(now.getFullYear(), now.getMonth() + 1, 1));

const start = formatDate(new Date(now.getFullYear(), now.getMonth(), 1));

const StaffReportSpecific = ({ startDate, endDate, category }) => {
  const [approved, setApproved] = useState(null);
  const [cancelled, setCancelled] = useState({});
  const [pending, setPending] = useState({});

  const getSummaryReport = async () => {
    console.log("clicked!");
    try {
      const res = await axios.get(`${config.API}/request/summary-specific`, {
        params: {
          startDate: startDate != "" ? startDate : start,
          endDate: endDate != "" ? endDate : last,
          category:
            category != "" ? `AND r.service_id = '${parseInt(category)}'` : "",
        },
      });
      setApproved(res.data.approved);
      setCancelled(res.data.cancelled);
      setPending(res.data.pending);
      console.log("query", res.data);
    } catch (err) {
      console.error("error retrieving summary", err);
    }
  };

  useEffect(() => {
    getSummaryReport();
  }, [startDate, endDate, category]);

  const dummyData = [
    {
      category: "Wedding",
      status: "approved",
      couple: "Clyde Noob & Carl Barrera",
      dateRequested: "October 24, 2024",
      dateApproved: "October 30, 2024",
      interval: "6 Days",
      fees: 500,
    },
    {
      category: "Wedding",
      status: "pending",
      couple: "Clyde Barrera & Carl Noob",
      dateRequested: "June 01, 2024",
      dateApproved: null,
      interval: null,
      fees: null,
    },
    {
      category: "Wedding",
      status: "approved",
      couple: "Bob Tani & Larry Bird",
      dateRequested: "October 01, 2024",
      dateApproved: "October 07, 2024",
      interval: "6 Days",
      fees: 500,
    },
    {
      category: "Wedding",
      status: "cancelled",
      couple: "Jebron Lames & Nick Dick",
      dateRequested: "October 01, 2024",
      dataCancelled: "October 07, 2024",
      interval: "6 Days",
    },
  ];

  //testing shite
  const pendingData = dummyData.filter(
    (data) => data.status === "pending" && data.category === category
  );
  const cancelledData = dummyData.filter(
    (data) => data.status === "cancelled" && data.category === category
  );
  const approvedData = dummyData.filter(
    (data) => data.status === "approved" && data.category === category
  );

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
                  colSpan={5}
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  {category}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    backgroundColor: "green",
                    color: "white",
                  }}
                >
                  APPROVED
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Date Requested
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Date Approved
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Interval
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Fees Collected
                </TableCell>
              </TableRow>

              {approved &&
                approved?.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {data.first_name} {data.last_name}
                    </TableCell>
                    <TableCell align="right">
                      {dayjs(data.date_requested).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell align="right">
                      {dayjs(data.transaction_date).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      {dayjs(data.transaction_date).diff(
                        dayjs(data.date_requested),
                        "day"
                      )}
                    </TableCell>
                    <TableCell align="right">{data.donation}</TableCell>
                  </TableRow>
                ))}

              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    backgroundColor: "#ED8234",
                    color: "white",
                  }}
                >
                  PENDING
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Date Requested
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Date Approved
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Interval
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Fees Collected
                </TableCell>
              </TableRow>

              {pendingData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{data.couple}</TableCell>
                  <TableCell align="right">{data.dateRequested}</TableCell>
                  <TableCell align="right">
                    {data.dateApproved || <i>N/A</i>}
                  </TableCell>
                  <TableCell align="right">
                    {data.interval || <i>N/A</i>}
                  </TableCell>
                  <TableCell align="right">{data.fees || <i>N/A</i>}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    backgroundColor: "#950000",
                    color: "white",
                  }}
                >
                  CANCELLED
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Date Requested
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Date Cancelled
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Interval
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Fees Collected
                </TableCell>
              </TableRow>

              {cancelledData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{data.couple}</TableCell>
                  <TableCell align="right">{data.dateRequested}</TableCell>
                  <TableCell align="right">
                    {data.dataCancelled || <i>N/A</i>}
                  </TableCell>
                  <TableCell align="right">
                    {data.interval || <i>N/A</i>}
                  </TableCell>
                  <TableCell align="right">{data.fees || <i>N/A</i>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default StaffReportSpecific;
