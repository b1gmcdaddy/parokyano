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
import dayjs from "dayjs";
import util from "../utils/DateTimeFormatter";

const formatDate = (date) => date.toISOString().split("T")[0];
const now = new Date();
const last = formatDate(new Date(now.getFullYear(), now.getMonth() + 1, 1));

const start = formatDate(new Date(now.getFullYear(), now.getMonth(), 1));

const StaffReportSpecific = ({ startDate, endDate, category }) => {
  const [approved, setApproved] = useState(null);
  const [cancelled, setCancelled] = useState(null);
  const [pending, setPending] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  let serviceType =
    category == 1
      ? "Mass Intention"
      : category == 2
      ? "Confirmation Certificate"
      : category == 3
      ? "Baptismal Certificate"
      : category == 4
      ? "Marriage Certificate"
      : category == 5 || category == 6
      ? "Baptism"
      : category == 7
      ? "Wedding"
      : category == 9
      ? "Wake Mass"
      : category == 10
      ? "Outside Mass"
      : category == 11
      ? "Funeral Mass"
      : category == 12
      ? "Anointing"
      : category == 13
      ? "Blessing"
      : "";

  // console.log(serviceType);

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
      // console.log("query", res.data);
    } catch (err) {
      console.error("error retrieving summary", err);
    }
  };

  useEffect(() => {
    getSummaryReport();
  }, [startDate, endDate, category]);

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
      <Box sx={{ textAlign: "center", margin: "auto", marginTop: "1.5em" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            letterSpacing: 1.5,
            fontSize: "1rem",
            textTransform: "uppercase",
          }}
        >
          Parokyano Generated Report
        </Typography>
        <Typography sx={{ fontStyle: "italic", fontSize: "14px" }}>
          Generated on: {util.formatDate(new Date())}
          <br />
          Created by: {currentUser.name}
          <br />
          {startDate && endDate ? (
            <span>
              {util.formatDate(startDate)} - {util.formatDate(endDate)}
            </span>
          ) : (
            "Overall"
          )}
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
                  {serviceType}
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
                      {data.first_name
                        ? `${data.first_name} ${data.last_name}`
                        : data.requested_by}
                    </TableCell>
                    <TableCell align="right">
                      {util.formatDate(data.date_requested)}
                    </TableCell>
                    <TableCell align="right">
                      {util.formatDate(data.transaction_date)}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      {dayjs(data.transaction_date).diff(
                        dayjs(data.date_requested),
                        "day"
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {data.donation != null
                        ? ` ₱ ${parseFloat(data.donation).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}`
                        : ""}
                    </TableCell>
                  </TableRow>
                ))}

              {approved && approved.length > 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="right"
                    sx={{ fontWeight: 900, fontSize: "18px" }}
                  >
                    <strong>TOTAL</strong>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 900, fontSize: "18px" }}
                  >
                    <strong>
                      ₱{" "}
                      {approved
                        .reduce((total, data) => {
                          return (
                            total +
                            (data.donation ? parseFloat(data.donation) : 0)
                          );
                        }, 0)
                        .toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                    </strong>
                  </TableCell>
                </TableRow>
              )}

              {/* <TableRow>
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

              {pending &&
                pending?.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {data.first_name !== null
                        ? data.first_name + data.last_name
                        : data.requested_by}
                    </TableCell>
                    <TableCell align="right">
                      {util.formatDate(data.date_requested)}
                    </TableCell>
                    <TableCell align="right">{<i>N/A</i>}</TableCell>
                    <TableCell align="right">{<i>N/A</i>}</TableCell>
                    <TableCell align="right">{<i>N/A</i>}</TableCell>
                  </TableRow>
                ))}

              {/* <TableRow>
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
              </TableRow> */}

              {/* {cancelled &&
                cancelled?.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {data.first_name !== null
                        ? data.first_name + data.last_name
                        : data.requested_by}
                    </TableCell>
                    <TableCell align="right">
                      {util.formatDate(data.date_requested)}
                    </TableCell>
                    <TableCell align="right">{<i>N/A</i>}</TableCell>
                    <TableCell align="right">{<i>N/A</i>}</TableCell>
                    <TableCell align="right">{<i>N/A</i>}</TableCell>
                  </TableRow>
                ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default StaffReportSpecific;
