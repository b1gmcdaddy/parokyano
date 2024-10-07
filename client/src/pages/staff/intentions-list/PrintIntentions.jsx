import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Dialog,
  Slide,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ReactToPrint from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faPrint } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import config from "../../../config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PrintIntentions = ({ open, close }) => {
  const [dateSelected, setDateSelected] = useState(null);
  const [timeSelected, setTimeSelected] = useState(null);
  const [tableData, setTableData] = useState([]);
  const componentRef = useRef();

  const fetchData = async () => {
    if (!dateSelected) return;

    try {
      const response = await axios.get(
        `${config.API}/request/retrieve-multiple-byDate`,
        {
          params: {
            col1: "service_id",
            val1: 1,
            col2: "status",
            val2: "pending", //change to approved later..
            preferred_date: dateSelected,
            preferred_time: timeSelected,
          },
        }
      );
      setTableData(response.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateChange = (e) => {
    setDateSelected(e.target.value);
    console.log(dateSelected);
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const formattedTime = `${selectedTime}:00`;
    setTimeSelected(formattedTime);
    console.log(formattedTime);
  };

  useEffect(() => {
    fetchData();
  }, [dateSelected, timeSelected]);

  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative", backgroundColor: "#355173" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={close}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Mass Intentions Print Preview
          </Typography>

          <Button autoFocus color="inherit">
            <FontAwesomeIcon
              icon={faFileExport}
              className="text-white md:mr-5 md:ml-2"
            />
            Export
          </Button>

          <ReactToPrint
            trigger={() => (
              <Button autoFocus color="inherit" sx={{ marginLeft: "1em" }}>
                <FontAwesomeIcon
                  icon={faPrint}
                  className="text-white md:mr-5 md:ml-2"
                />
                Print
              </Button>
            )}
            content={() => componentRef.current}
          />
        </Toolbar>
      </AppBar>

      <Box className="md:mt-14 xs:mt-14 w-3/4 m-auto ">
        <Box
          sx={{
            backgroundColor: "#d9d9d9",
            color: "white",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "16px",
          }}
          className="gap-2"
        >
          <Typography component="div" sx={{ ml: 2, color: "black" }}>
            Select Date:
          </Typography>
          <TextField
            type="date"
            size="small"
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
            }}
            onChange={handleDateChange}
          />
          <Typography component="div" sx={{ ml: 2, color: "black" }}>
            Select Time:
          </Typography>
          <TextField
            type="time"
            size="small"
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
            }}
            onChange={handleTimeChange}
          />
        </Box>

        <Box
          sx={{
            height: "700px",
            overflowY: "auto",
            backgroundColor: "#F5F5F5",
          }}
        >
          {/* START ToPrintComponent */}
          {dateSelected !== null && timeSelected !== null ? (
            <Container
              maxWidth="lg"
              sx={{ backgroundColor: "white" }}
              ref={componentRef}
            >
              <Box sx={{ textAlign: "center", margin: "auto" }}>
                <Typography sx={{ paddingTop: "3em" }}>
                  Mass Intentions
                </Typography>
                <Typography sx={{ fontStyle: "italic", fontSize: "14px" }}>
                  {dateSelected}&nbsp;- {timeSelected}
                </Typography>
              </Box>

              {/* <Box sx={{ marginTop: "3em" }}> */}
              {tableData.some((t) => t.type === "Souls") && (
                <>
                  <Typography sx={{ fontSize: "14px" }}>SOULS</Typography>
                </>
              )}

              <Grid container spacing={2} sx={{ padding: "20px" }}>
                {tableData
                  .filter((t) => t.type === "Souls")
                  .map((row, index) => (
                    <Grid item xs={6} key={row.requestID}>
                      <Typography>
                        <b>Requested by:</b> {row.requested_by}
                      </Typography>
                      <Typography>
                        <b>For the Souls of: </b>
                        {JSON.parse(row.details).join(", ")}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
              {/* </Box> */}

              {/* <Box sx={{ marginTop: "3em" }}> */}
              {tableData.some((t) => t.type === "Thanksgiving") && (
                <>
                  <Typography sx={{ fontSize: "14px" }}>
                    THANKSGIVING
                  </Typography>
                </>
              )}

              <Grid container spacing={2} sx={{ padding: "20px" }}>
                {tableData
                  .filter((t) => t.type === "Thanksgiving")
                  .map((row, index) => {
                    const details = JSON.parse(row.details);

                    return (
                      <Grid item xs={6} key={row.requestID}>
                        <Typography>
                          <b>Requested by:</b> {row.requested_by}
                        </Typography>

                        <ul style={{ listStyleType: "none", padding: 0 }}>
                          {details.birthday && (
                            <li>
                              <b>Birthday:</b> {details.birthday}
                            </li>
                          )}
                          {details.wedding && (
                            <li>
                              <b>Wedding:</b> {details.wedding}
                            </li>
                          )}
                          {details.success && (
                            <li>
                              <b>Success:</b> {details.success}
                            </li>
                          )}
                          {details.saint && (
                            <li>
                              <b>Saint:</b> {details.saint}
                            </li>
                          )}
                          {details.others && (
                            <li>
                              <b>Others:</b> {details.others}
                            </li>
                          )}
                        </ul>
                      </Grid>
                    );
                  })}
              </Grid>
              {/* // </Box> */}
              {/* <Box sx={{ marginTop: "3em" }}> */}
              {tableData.some((t) => t.type === "Petition") && (
                <>
                  <Typography sx={{ fontSize: "14px" }}>PETITION</Typography>
                </>
              )}

              <Grid container spacing={2} sx={{ padding: "20px" }}>
                {tableData
                  .filter((t) => t.type === "Petition")
                  .map((row, index) => (
                    <Grid item xs={6} key={row.requestID}>
                      <Typography>
                        <b>Requested by:</b> {row.requested_by}
                      </Typography>
                      <Typography>
                        <b>Petition: </b>
                        {row.details}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
              {/* // </Box> */}
            </Container>
          ) : null}
          {/* END of ToPrintComponent */}
        </Box>
      </Box>
    </Dialog>
  );
};

export default PrintIntentions;
