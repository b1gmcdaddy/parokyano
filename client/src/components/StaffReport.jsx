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
  Grid,
} from "@mui/material";
import React, {useState, useEffect} from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import config from "../config";
import {ReactToPrint} from "react-to-print";
import util from "../utils/DateTimeFormatter";

const formatDate = (date) => date.toISOString().split("T")[0];

const now = new Date();
const last = formatDate(new Date(now.getFullYear(), now.getMonth() + 1, 1));
const start = formatDate(new Date(now.getFullYear(), now.getMonth(), 1));

const StaffReport = ({startDate, endDate, category}) => {
  const [reportInfo, setReportInfo] = useState({});
  const [baptismInfo, setBaptismInfo] = useState({});
  const [baptismGeneralInfo, setBaptismGeneralInfo] = useState({});
  const [weddingInfo, setWeddingInfo] = useState({});
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const getSummaryReport = async () => {
    console.log("clicked!");
    try {
      const res = await axios.get(`${config.API}/request/summary`, {
        params: {
          startDate: startDate != "" ? startDate : start,
          endDate: endDate != "" ? endDate : last,
          category:
            category != "" ? `AND r.service_id = '${parseInt(category)}'` : "",
        },
      });
      setReportInfo(res.data.results);
      setBaptismInfo(res.data.baptisms);
      setWeddingInfo(res.data.weddings);
      setBaptismGeneralInfo(res.data.baptismsGeneral);
      // console.log(res.data.results);
    } catch (err) {
      console.error("error retrieving summary", err);
    }
  };

  useEffect(() => {
    getSummaryReport();
  }, [startDate, endDate, category]);

  return (
    <>
      <Box sx={{display: "flex", alignItems: "center"}}>
        <img
          src={logo}
          style={{height: "auto", width: "10%", paddingTop: "1.5em"}}
          alt="Logo"
        />
        <Typography sx={{paddingTop: "1.5em"}}>
          Catholic Church of Christ of the Agony <br />
          Gethsemane Parish
        </Typography>
      </Box>
      <Box sx={{textAlign: "center", margin: "auto", marginTop: "1.5em"}}>
        <Typography
          sx={{
            fontWeight: "bold",
            letterSpacing: 1.5,
            fontSize: "1rem",
            textTransform: "uppercase",
          }}>
          Parokyano Generated Report
        </Typography>
        <Typography sx={{fontStyle: "italic", fontSize: "14px"}}>
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

      <Box sx={{marginTop: "3em"}}>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 450}} aria-label="simple table">
            <TableHead>
              <TableRow sx={{backgroundColor: "#D9D9D9"}}>
                <TableCell
                  sx={{fontWeight: "bold", textTransform: "uppercase"}}>
                  Parish Service
                </TableCell>
                <TableCell align="right" sx={{fontWeight: "bold"}}>
                  Pending Requests
                </TableCell>
                <TableCell align="right" sx={{fontWeight: "bold"}}>
                  Approved Requests
                </TableCell>

                <TableCell align="right" sx={{fontWeight: "bold"}}>
                  Fees Collected
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportInfo.length > 0 ? (
                <>
                  {reportInfo.map((report, index) => (
                    <TableRow
                      key={index}
                      sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                      <TableCell component="th" scope="row">
                        {report.name}
                        {baptismInfo && (
                          <>
                            <div className="ml-4 mt-2">
                              {report.name === "Baptism - Appointment" &&
                                baptismInfo.map((baptism, index) => (
                                  <li key={index}>
                                    {baptism.first_name} {baptism.last_name}
                                  </li>
                                ))}
                            </div>
                          </>
                        )}
                        {baptismGeneralInfo && (
                          <>
                            <div className="ml-4 mt-2">
                              {report.name === "Baptism - General" &&
                                baptismGeneralInfo.map((baptism, index) => (
                                  <li key={index}>
                                    {baptism.first_name} {baptism.last_name}
                                  </li>
                                ))}
                            </div>
                          </>
                        )}
                        {weddingInfo && (
                          <>
                            <div className="ml-4 mt-2">
                              {report.name.includes("Wedding") &&
                                weddingInfo.map((wedding, index) => (
                                  <li key={index}>
                                    {wedding.first_name} {wedding.last_name} and{" "}
                                    {wedding.spouse_firstName}{" "}
                                    {wedding.spouse_lastName}
                                  </li>
                                ))}
                            </div>
                          </>
                        )}
                      </TableCell>
                      <TableCell align="right">{report.pending}</TableCell>
                      <TableCell align="right">{report.approved}</TableCell>
                      <TableCell align="right">
                        {report.totalFee != null && report.totalFee > 0
                          ? ` ₱ ${parseFloat(report.totalFee).toLocaleString(
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

                  <TableRow>
                    <TableCell colSpan={1} sx={{textAlign: "right"}}>
                      <Typography sx={{fontWeight: "bold", fontSize: "18px"}}>
                        TOTAL
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <strong>
                        {reportInfo.reduce(
                          (total, report) => total + report.pending,
                          0
                        )}
                      </strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>
                        {reportInfo.reduce(
                          (total, report) => total + report.approved,
                          0
                        )}
                      </strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>
                        {"₱ "}
                        {reportInfo
                          .reduce(
                            (total, report) => total + (report.totalFee || 0),
                            0
                          )
                          .toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                      </strong>
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={{textAlign: "center"}}>
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
