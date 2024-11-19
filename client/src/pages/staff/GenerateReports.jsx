import React, { useState, useRef, useEffect } from "react";
import NavStaff from "../../components/NavStaff";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Container,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import StaffReport from "../../components/StaffReport";
import ReactToPrint from "react-to-print";
import StaffReportSpecific from "../../components/StaffReportSpecific";

const PrintStyle = {
  border: "solid 1px",
  backgroundColor: "#F5F5F5",
};

const NotPrintStyle = {
  border: "solid 1px",
  maxHeight: "700px",
  overflowY: "auto",
  backgroundColor: "#F5F5F5",
};

const GenerateReports = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [reportDetails, setReportDetails] = useState({
    startDate: "",
    endDate: "",
    category: "",
    view: "general",
  });

  const handleChange = (e) => {
    setReportDetails({ ...reportDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(reportDetails);
  }, [reportDetails]);

  const componentRef2 = useRef();
  const componentRef = useRef();

  const handleBeforePrint = () => {
    setIsPrinting(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  };

  const handleAfterPrint = () => {
    setIsPrinting(false);
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
            marginBottom: "1.5em",
          }}
        >
          <Typography
            sx={{ fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 600 }}
          >
            Generate Report
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={1.5}>
            <label>Start Date:</label>
            <TextField
              type="date"
              size="small"
              name="startDate"
              variant="outlined"
              value={reportDetails.startDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6} sm={1.5}>
            <label>End Date:</label>
            <TextField
              type="date"
              size="small"
              name="endDate"
              variant="outlined"
              value={reportDetails.endDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <label>Category: </label>
            <TextField
              select
              variant="outlined"
              name="category"
              onChange={(e) => {
                handleChange(e);
              }}
              value={reportDetails.category}
              size="small"
              fullWidth
              required
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="5">Baptism - Appointment</MenuItem>
              <MenuItem value="6">Baptism - General</MenuItem>
              <MenuItem value="7">Wedding</MenuItem>
              <MenuItem value="12">Anointing of the Sick</MenuItem>
              <MenuItem value="11">Funeral Mass</MenuItem>
              <MenuItem value="10">Outside Mass</MenuItem>
              <MenuItem value="9">Wake Mass</MenuItem>
              <MenuItem value="13">Blessing</MenuItem>
              <MenuItem value="3">Certificate - Baptism</MenuItem>
              <MenuItem value="4">Certificate - Wedding</MenuItem>
              <MenuItem value="2">Certificate - Confirmation</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6} sm={2}>
            <label>View: </label>
            <TextField
              select
              variant="outlined"
              name="view"
              onChange={(e) => {
                handleChange(e);
              }}
              value={reportDetails.view}
              size="small"
              fullWidth
              required
            >
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="detailed">Detailed</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* General View */}
        {reportDetails.view === "general" ? (
          <Box className="md:mt-14 xs:mt-14">
            <Box
              sx={{
                backgroundColor: "#355173",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                color: "white",
                justifyContent: "space-between",
              }}
              className="gap-2"
            >
              <Typography sx={{ width: "100%", color: "whitesmoke" }}>
                {reportDetails.startDate} &nbsp;-&nbsp; {reportDetails.endDate}
              </Typography>
              <ReactToPrint
                trigger={() => (
                  <Button sx={{ color: "white" }}>
                    Print
                    <FontAwesomeIcon
                      icon={faPrint}
                      className="text-white md:mr-5 md:ml-2"
                    />
                  </Button>
                )}
                content={() => componentRef2.current}
                onBeforeGetContent={handleBeforePrint}
                onAfterPrint={handleAfterPrint}
              />
            </Box>

            <Box
              sx={isPrinting ? PrintStyle : NotPrintStyle}
              ref={componentRef2}
            >
              <Container maxWidth="lg" sx={{ backgroundColor: "white" }}>
                <StaffReport
                  startDate={reportDetails.startDate}
                  endDate={reportDetails.endDate}
                  category={reportDetails.category}
                />
              </Container>
            </Box>
          </Box>
        ) : null}

        {/*-----------------for testing specific service category...--------------------*/}
        {reportDetails.view == "detailed" ? (
          <Box className="md:mt-14 xs:mt-14">
            <Box
              sx={{
                backgroundColor: "#355173",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                color: "white",
                justifyContent: "space-between",
              }}
              className="gap-2"
            >
              <Typography sx={{ width: "100%", color: "whitesmoke" }}>
                {reportDetails.startDate} &nbsp;-&nbsp; {reportDetails.endDate}
              </Typography>

              <ReactToPrint
                trigger={() => (
                  <Button sx={{ color: "white" }}>
                    Print
                    <FontAwesomeIcon
                      icon={faPrint}
                      className="text-white md:mr-5 md:ml-2"
                    />
                  </Button>
                )}
                content={() => componentRef.current}
                onBeforeGetContent={handleBeforePrint}
                onAfterPrint={handleAfterPrint}
              />
            </Box>
            <Box
              sx={isPrinting ? PrintStyle : NotPrintStyle}
              ref={componentRef}
            >
              <Container maxWidth="lg" sx={{ backgroundColor: "white" }}>
                <StaffReportSpecific
                  startDate={reportDetails.startDate}
                  endDate={reportDetails.endDate}
                  category={reportDetails.category}
                />
              </Container>
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default GenerateReports;
