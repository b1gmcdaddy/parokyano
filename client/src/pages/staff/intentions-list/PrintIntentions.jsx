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
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ReactToPrint from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faPrint } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import axios from "axios";
import config from "../../../config";
import { Document, Packer, Paragraph, TextRun } from "docx";
import util from "../../../utils/DateTimeFormatter";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PrintIntentions = ({ open, close }) => {
  const [dateSelected, setDateSelected] = useState(null);
  const [timeSelected, setTimeSelected] = useState(null);
  const [tableData, setTableData] = useState([]);
  const componentRef = useRef();

  const timeOptions = [];
  for (let hour = 8; hour <= 19; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = dayjs().hour(hour).minute(minute).format("HH:mm");
      timeOptions.push(time);
    }
  }

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
            val2: "approved",
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
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const formattedTime = `${selectedTime}:00`;
    setTimeSelected(formattedTime);
  };

  useEffect(() => {
    fetchData();
  }, [dateSelected, timeSelected]);

  //START EXPORT WORD METHOD
  const exportToWord = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Mass Intentions",
              heading: "Title",
            }),
            new Paragraph({
              text: `${util.formatDate(dateSelected)} - ${timeSelected}`,
              spacing: { after: 200 },
            }),

            new Paragraph({
              text: "Souls",
              heading: "Heading1",
              spacing: { after: 100 },
            }),
            ...tableData
              .filter((row) => row.type === "Souls")
              .map((row) => {
                const requestedByParagraph = new Paragraph({
                  text: `Requested by: ${row.requested_by}`,
                  spacing: { after: 50 },
                });
                let soulsParagraph = null;

                try {
                  const details = JSON.parse(row.details);
                  soulsParagraph = new Paragraph({
                    text: `For the Souls of: ${details.join(", ")}`,
                    spacing: { after: 200 },
                  });
                } catch (error) {
                  console.error("Error parsing details:", error);
                }

                return [requestedByParagraph, soulsParagraph].filter(Boolean);
              })
              .flat(),

            new Paragraph({
              text: "Thanksgiving",
              heading: "Heading1",
              spacing: { after: 100 },
            }),
            ...tableData
              .filter((row) => row.type === "Thanksgiving")
              .map((row) => {
                const requestedByParagraph = new Paragraph({
                  text: `Requested by: ${row.requested_by}`,
                  spacing: { after: 50 },
                });
                let thanksgivingDetails = {};

                try {
                  thanksgivingDetails = JSON.parse(row.details);
                } catch (error) {
                  console.error("Error parsing details:", error);
                }

                const nonNullDetails = Object.keys(thanksgivingDetails)
                  .filter((key) => thanksgivingDetails[key])
                  .map((key) => {
                    return new Paragraph({
                      text: `${key.charAt(0).toUpperCase() + key.slice(1)}: ${
                        thanksgivingDetails[key]
                      }`,
                      spacing: { after: 200 },
                    });
                  });

                return [requestedByParagraph, ...nonNullDetails];
              })
              .flat(),

            new Paragraph({
              text: "Petition",
              heading: "Heading1",
              spacing: { after: 100 },
            }),
            ...tableData
              .filter((row) => row.type === "Petition")
              .map((row) => {
                const requestedByParagraph = new Paragraph({
                  text: `Requested by: ${row.requested_by}`,
                  spacing: { after: 50 },
                });
                const petitionParagraph = new Paragraph({
                  text: `Petition: ${row.details}`,
                  spacing: { after: 200 },
                });

                return [requestedByParagraph, petitionParagraph];
              })
              .flat(),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mass_intentions.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };
  //END EXPORT WORD METHOD

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
          {/* 
          <Button autoFocus color="inherit" onClick={exportToPDF}>
            <FontAwesomeIcon
              icon={faFileExport}
              className="text-white md:mr-5 md:ml-2"
            />
            Export PDF
          </Button> */}
          <Button
            autoFocus
            color="inherit"
            sx={{ marginLeft: "1em" }}
            onClick={exportToWord}
          >
            <FontAwesomeIcon
              icon={faFileExport}
              className="text-white md:mr-5 md:ml-2"
            />
            Export Word
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
          <Select
            size="small"
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              width: "80px",
            }}
            value={timeSelected || ""}
            onChange={handleTimeChange}
          >
            {timeOptions.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          sx={{
            height: "700px",
            overflowY: "auto",
            backgroundColor: "#F5F5F5",
          }}
        >
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
                  {util.formatDate(dateSelected)}&nbsp;-{" "}
                  {util.formatTime(timeSelected)}
                </Typography>
              </Box>

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
            </Container>
          ) : null}
        </Box>
      </Box>
    </Dialog>
  );
};

export default PrintIntentions;
