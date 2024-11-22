import React, {useRef, useState, useEffect} from "react";
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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ReactToPrint from "react-to-print";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import logo from "../../../assets/logoCert.png";
import {faFileExport, faPrint} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import axios from "axios";
import config from "../../../config";
import {Document, Packer, Paragraph} from "docx";
import util from "../../../utils/DateTimeFormatter";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const tableStyles = {
  tableCell: {
    width: "30%",
    padding: "8px",
  },
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f9f9f9",
    },
  },
  headerCell: {
    fontWeight: "bold",
    padding: "4px",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "50px",
    marginBottom: "20px",
    letterSpacing: 2,
  },
};

const PrintIntentions = ({open, close}) => {
  const [dateSelected, setDateSelected] = useState(null);
  const [timeSelected, setTimeSelected] = useState(null);
  const [tableData, setTableData] = useState([]);
  const componentRef = useRef();

  const timeOptions = [];
  for (let hour = 6; hour <= 21; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const value = dayjs().hour(hour).minute(minute).format("HH:mm");
      const label = dayjs().hour(hour).minute(minute).format("h:mm A");
      timeOptions.push({value, label});
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
              spacing: {after: 200},
            }),

            new Paragraph({
              text: "Souls",
              heading: "Heading1",
              spacing: {after: 100, before: 400},
            }),
            ...tableData
              .filter((row) => row.type === "Souls")
              .map((row) => {
                const requestedByParagraph = new Paragraph({
                  text: `Requested by: ${row.requested_by}`,
                  spacing: {after: 50},
                });
                let soulsParagraph = null;

                try {
                  const details = JSON.parse(row.details);
                  soulsParagraph = new Paragraph({
                    text: `For the Souls of: ${details.join(", ")}`,
                    spacing: {after: 200},
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
              spacing: {after: 100, before: 400},
            }),
            ...tableData
              .filter((row) => row.type === "Thanksgiving")
              .map((row) => {
                const requestedByParagraph = new Paragraph({
                  text: `Requested by: ${row.requested_by}`,
                  spacing: {after: 50},
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
                      spacing: {after: 200},
                    });
                  });

                return [requestedByParagraph, ...nonNullDetails];
              })
              .flat(),

            new Paragraph({
              text: "Petition",
              heading: "Heading1",
              spacing: {after: 100, before: 400},
            }),
            ...tableData
              .filter((row) => row.type === "Petition")
              .map((row) => {
                const requestedByParagraph = new Paragraph({
                  text: `Requested by: ${row.requested_by}`,
                  spacing: {after: 50},
                });
                const petitionParagraph = new Paragraph({
                  text: `Petition: ${row.details}`,
                  spacing: {after: 200},
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
      <AppBar sx={{position: "relative", backgroundColor: "#355173"}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={close}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
            Mass Intentions Print Preview
          </Typography>

          <Button
            autoFocus
            color="inherit"
            sx={{marginLeft: "1em"}}
            onClick={exportToWord}>
            <FontAwesomeIcon
              icon={faFileExport}
              className="text-white md:mr-5 md:ml-2"
            />
            Export Word
          </Button>

          <ReactToPrint
            trigger={() => (
              <Button autoFocus color="inherit" sx={{marginLeft: "1em"}}>
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
          className="gap-2">
          <Typography component="div" sx={{ml: 2, color: "black"}}>
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
          <Typography component="div" sx={{ml: 2, color: "black"}}>
            Select Time:
          </Typography>
          <Select
            size="small"
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              width: "110px",
            }}
            value={timeSelected ? timeSelected.slice(0, 5) : ""}
            onChange={handleTimeChange}>
            {timeOptions.map((time) => (
              <MenuItem key={time.value} value={time.value}>
                {time.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          sx={{
            height: "700px",
            overflowY: "auto",
            backgroundColor: "#F5F5F5",
          }}>
          {dateSelected !== null && timeSelected !== null ? (
            <Container
              maxWidth="lg"
              sx={{backgroundColor: "white"}}
              ref={componentRef}>
              <Box sx={{paddingTop: "20px"}}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,

                    flexDirection: {xs: "column", md: "row"},
                    textAlign: {xs: "center", md: "left"},
                  }}>
                  <img src={logo} className="h-auto md:w-20 xs:w-14" />
                  <div>
                    <Typography
                      sx={{
                        fontSize: {md: "16px", xs: "14px"},
                        fontFamily: "Palatino",
                      }}>
                      Catholic Church of Christ of the Agony
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {md: "1rem", xs: "0.9rem"},
                        fontFamily: "Tahoma, sans-serif",
                        fontWeight: "900",
                      }}>
                      GETHSEMANE PARISH CHURCH
                    </Typography>
                  </div>
                </div>
                <Typography
                  variant="h6"
                  sx={{paddingTop: "1.5em", textAlign: "center"}}>
                  Mass Intentions
                </Typography>
                <Typography
                  sx={{
                    fontStyle: "italic",
                    fontSize: "14px",
                    textAlign: "center",
                  }}>
                  {util.formatDate(dateSelected)}&nbsp;-{" "}
                  {util.formatTime(timeSelected)}
                </Typography>
              </Box>

              <Grid container spacing={2} sx={{padding: "20px"}}>
                {tableData.some((t) => t.type === "Souls") && (
                  <>
                    <Typography sx={tableStyles.sectionTitle}>SOULS</Typography>
                    <Table sx={{width: "100%"}}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={tableStyles.headerCell}>
                            <b>Requested by</b>
                          </TableCell>
                          <TableCell sx={tableStyles.headerCell}>
                            <b>For the Souls of</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData
                          .filter((t) => t.type === "Souls")
                          .map((row) => (
                            <TableRow
                              key={row.requestID}
                              sx={tableStyles.tableRow}>
                              <TableCell sx={tableStyles.tableCell}>
                                {row.requested_by}
                              </TableCell>
                              <TableCell sx={tableStyles.tableCell}>
                                {JSON.parse(row.details).join(", ")}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </>
                )}

                {tableData.some((t) => t.type === "Thanksgiving") && (
                  <>
                    <Typography sx={tableStyles.sectionTitle}>
                      THANKSGIVING
                    </Typography>
                    <Table sx={{width: "100%"}}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={tableStyles.headerCell}>
                            <b>Requested by</b>
                          </TableCell>
                          <TableCell sx={tableStyles.headerCell}>
                            <b>Details</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData
                          .filter((t) => t.type === "Thanksgiving")
                          .map((row) => {
                            const details = JSON.parse(row.details);
                            return (
                              <TableRow
                                key={row.requestID}
                                sx={tableStyles.tableRow}>
                                <TableCell sx={tableStyles.tableCell}>
                                  {row.requested_by}
                                </TableCell>
                                <TableCell sx={tableStyles.tableCell}>
                                  <ul
                                    style={{listStyleType: "none", padding: 0}}>
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
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </>
                )}

                {tableData.some((t) => t.type === "Petition") && (
                  <>
                    <Typography sx={tableStyles.sectionTitle}>
                      PETITION
                    </Typography>
                    <Table sx={{width: "100%"}}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={tableStyles.headerCell}>
                            <b>Requested by</b>
                          </TableCell>
                          <TableCell sx={tableStyles.headerCell}>
                            <b>Petition</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData
                          .filter((t) => t.type === "Petition")
                          .map((row) => (
                            <TableRow
                              key={row.requestID}
                              sx={tableStyles.tableRow}>
                              <TableCell sx={tableStyles.tableCell}>
                                {row.requested_by}
                              </TableCell>
                              <TableCell sx={tableStyles.tableCell}>
                                {row.details}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </>
                )}
              </Grid>
            </Container>
          ) : null}
        </Box>
      </Box>
    </Dialog>
  );
};

export default PrintIntentions;
