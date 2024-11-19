import { useState, useEffect, useRef } from "react";
import {
  Button,
  Box,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import config from "../../config";
import ReactToPrint from "react-to-print";
import logo from "../../assets/logoCert.png";
import confirmationSaint from "../../assets/confirmationSaint.jpg";
import util from "../../utils/DateTimeFormatter";

const PrintCertificate = ({ open, data, close }) => {
  const [sponsors, setSponsors] = useState([]);
  const [priests, setPriests] = useState([]);
  const dateToday = new Date().toJSON().slice(0, 10);
  const componentRef = useRef();
  const bookDetails = JSON.parse(data.details || "{}");
  const [CertData, setCertData] = useState({
    full_name: "",
    birth_day: "",
    birth_month: "",
    birth_year: "",
    marriage_day: "",
    marriage_month: "",
    marriage_year: "",
    birth_place: "",
    preffered_day: "",
    preffered_month: "",
    preffered_year: "",
    data_issue: "",
    father_name: "",
    mother_name: "",
    book_no: "",
    line_no: "",
    page_no: "",
    sponsor_no1: "",
    sponsor_no2: "",
    OR_no: "",
    purpose: "",
    transaction_no: "",
    service_id: "",
    priest_id: "",
    sponsor_id: "",
    spouse_name: "",
    groom_details: {
      groom_father: "",
      groom_mother: "",
      groom_address: "",
      groom_bday: "",
      groom_bplace: "",
      groom_bapday: "",
      groom_bapplace: "",
    },
    bride_details: {
      bride_father: "",
      bride_mother: "",
      bride_address: "",
      bride_bday: "",
      bride_bplace: "",
      bride_bapday: "",
      bride_bapplace: "",
    },
  });

  useEffect(() => {
    if (open && data) {
      setCertData({
        full_name:
          data.first_name + " " + data.middle_name + " " + data.last_name,
        birth_place: data.birth_place,
        data_issue: formatDate(dateToday),
        father_name: data.father_name,
        mother_name: data.mother_name,
        book_no: bookDetails.book_no,
        line_no: bookDetails.line_no,
        page_no: bookDetails.page_no,
        sponsor_no1: bookDetails.sponsor_no1,
        sponsor_no2: bookDetails.sponsor_no2,
        OR_no: data.details.OR_no,
        purpose: data.purpose,
        transaction_no: data.transaction_no,
        service_id: data.service_id,
        priest_id: data.priest_id,
        sponsor_id: bookDetails.record_id,
      });
    }
    fetchSponsors(bookDetails.record_id);
    fetchWeddingData();
    BirthDayFormatter(data.birth_date);
    BaptismDayFormatter(data.preferred_date);
    MarriageDayFormatter(data.preferred_date);
    console.log(data);
  }, [open, data]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const updateCertStatus = async () => {
    try {
      const response = await axios.put(
        `${config.API}/request/approve-dynamic`,
        null,
        {
          params: {
            col: "payment_status",
            val: "paid",
            col2: "donation",
            val2:
              data.service_id == 2
                ? "50"
                : data.service_id == 3
                ? "100"
                : "150",
            col3: "transaction_date",
            val3: new Date().toISOString().slice(0, 19).replace("T", " "),
            col4: "requestID",
            val4: data.requestID,
          },
        }
      );
      close();
    } catch (e) {
      console.log(e);
    }
  };

  const BirthDayFormatter = (dateString) => {
    const date = new Date(dateString);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    setCertData((prevData) => ({
      ...prevData,
      birth_day: day,
      birth_month: month,
      birth_year: year,
    }));
  };

  const MarriageDayFormatter = (dateString) => {
    const date = new Date(dateString);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    setCertData((prevData) => ({
      ...prevData,
      marriage_day: day,
      marriage_month: month,
      marriage_year: year,
    }));
  };

  useEffect(() => {
    const fetchPriest = async () => {
      try {
        const response = await axios.get(`${config.API}/priest/retrieve`, {
          params: {
            col: "status",
            val: "active",
          },
        });
        setPriests(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPriest();
  }, [open, data]);

  const fetchSponsors = async (id) => {
    try {
      const response = await axios.get(`${config.API}/sponsor/retrieve`, {
        params: {
          reqID: id,
        },
      });
      setSponsors(response.data.result);
      return;
    } catch (err) {
      console.error("error retrieving sponsors", err);
    }
  };

  const BaptismDayFormatter = (dateString) => {
    const date = new Date(dateString);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    setCertData((prevData) => ({
      ...prevData,
      preffered_day: day,
      preffered_month: month,
      preffered_year: year,
    }));
  };

  const fetchWeddingDetails = async (id) => {
    try {
      const response = await axios.get(`${config.API}/wedding/retrieve`, {
        params: { reqID: id },
      });

      return response.data?.result[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const fetchWeddingData = async () => {
    try {
      const weddingDetails = await fetchWeddingDetails(bookDetails.record_id);
      const groomDetails = JSON.parse(weddingDetails.groomDetails || "{}");
      const brideDetails = JSON.parse(weddingDetails.brideDetails || "{}");

      if (weddingDetails) {
        setCertData((prevData) => ({
          ...prevData,
          spouse_name:
            weddingDetails.spouse_firstName +
            " " +
            weddingDetails.spouse_middleName +
            " " +
            weddingDetails.spouse_lastName,
          groom_details: {
            groom_father: groomDetails.groomFather,
            groom_mother: groomDetails.groomMother,
            groom_address: groomDetails.groomAddress,
            groom_bday: groomDetails.groomBirthDate,
            groom_bplace: groomDetails.groomBirthPlace,
            groom_bapday: groomDetails.groomBaptismDate,
            groom_bapplace: groomDetails.groomBaptismPlace,
          },
          bride_details: {
            bride_father: brideDetails.brideFather,
            bride_mother: brideDetails.brideMother,
            bride_address: brideDetails.brideAddress,
            bride_bday: brideDetails.brideBirthDate,
            bride_bplace: brideDetails.brideBirthPlace,
            bride_bapday: brideDetails.brideBaptismDate,
            bride_bapplace: brideDetails.brideBaptismPlace,
          },
        }));
      }
    } catch (err) {
      console.error("Error fetching wedding details", err);
    }
  };

  const renderCertificateContainer = () => {
    switch (data.service_id) {
      case 2:
        return (
          <Container
            sx={{
              position: "relative",
              height: "1122.24px",
              width: "793.92px",
              py: 3,
            }}
            ref={componentRef}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${logo})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
                opacity: 0.2,
              }}
            ></Box>

            <Grid container spacing={2} justifyContent={"center"}>
              <Grid item sm={3}>
                <img
                  src={logo}
                  style={{ height: "60%", width: "auto" }}
                  alt="Logo"
                />
              </Grid>

              <Grid item sm={5}>
                <Box textAlign={"center"} sx={{ marginTop: "20px" }}>
                  <Typography
                    sx={{
                      fontFamily: "Dharma Gothic",
                      fontSize: "23px",
                      lineHeight: "1",
                      letterSpacing: 2,
                      color: "#040063",
                    }}
                  >
                    Archdiocese of Cebu
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Palatino",
                      fontSize: "16px",
                      lineHeight: "1",
                      letterSpacing: 0,
                      color: "#040063",
                      fontWeight: "bold",
                    }}
                  >
                    Catholic Church of Christ of the Agony
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Artegra",
                      fontSize: "18px",
                      lineHeight: "2",
                      color: "#040063",
                    }}
                  >
                    GETHSEMANE PARISH
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      letterSpacing: 0,
                      fontSize: "12px",
                      lineHeight: "0",
                    }}
                  >
                    Casuntingan, Mandaue City Cebu, Philippines 6014
                  </Typography>
                  <FontAwesomeIcon size="xs" icon={faPhone} />
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      letterSpacing: 0,
                      fontSize: "12px",
                      lineHeight: "3",
                      display: "inline",
                    }}
                  >
                    /fax no: (032) 346-9560
                  </Typography>
                </Box>
              </Grid>

              <Grid item sm={3} container justifyContent="flex-end">
                <img
                  src={confirmationSaint}
                  style={{ height: "60%", width: "auto" }}
                  alt="confirmationSaint"
                />
              </Grid>

              <Grid item sm={11} sx={{ marginTop: "-80px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      flex: 0.1,
                      height: "2px",
                      backgroundColor: "black",
                    }}
                  />
                  <div
                    style={{ flex: 1, height: "2px", backgroundColor: "black" }}
                  />
                </div>
              </Grid>

              <Grid item sm={12} sx={{ marginTop: "-60px" }}>
                <Typography
                  sx={{
                    fontFamily: "Cursiva",
                    fontSize: "36px",
                    lineHeight: "1",
                    letterSpacing: 4,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  CONFIRMATION CERTIFICATE
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    lineHeight: "1",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  This is to certify that
                </Typography>
              </Grid>
              <Grid item sm={12} sx={{ marginTop: "10px" }}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    lineHeight: "1",
                    letterSpacing: 1,
                    fontWeight: "bold",
                    textAlign: "center",
                    textDecoration: "underline",
                  }}
                >
                  {CertData.full_name}
                </Typography>
              </Grid>

              <Grid item sm={11} sx={{ marginTop: "10px" }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    lineHeight: "2",
                    fontWeight: "regular",
                    textAlign: "justify",
                  }}
                >
                  Son/daughter of{" "}
                  <span
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {CertData.father_name}
                  </span>{" "}
                  and{" "}
                  <span
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {CertData.mother_name}
                  </span>{" "}
                  was, CONFIRMED on the{" "}
                  <span
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {CertData.preffered_day}
                  </span>{" "}
                  day of{" "}
                  <span
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {CertData.preffered_month}
                  </span>{" "}
                  in the year of our Lord{" "}
                  <span
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {CertData.preffered_year}
                  </span>{" "}
                  <span style={{ fontStyle: "italic" }}>
                    according to the Rites of the{" "}
                    <span style={{ fontWeight: "bold" }}>
                      Holy Roman Catholic Church.
                    </span>
                  </span>
                </Typography>
              </Grid>

              <Grid item sm={12}>
                <Box sx={{ marginLeft: "4em" }}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      lineHeight: "2",
                      fontWeight: "regular",
                      textAlign: "justify",
                    }}
                  >
                    Minister: &nbsp;&nbsp;
                    <span
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      {priests.find(
                        (priest) => priest.priestID === CertData.priest_id
                      )?.first_name +
                        " " +
                        priests.find(
                          (priest) => priest.priestID === CertData.priest_id
                        )?.last_name}
                    </span>
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        lineHeight: "2",
                        fontWeight: "regular",
                        textAlign: "justify",
                        marginRight: "10px",
                      }}
                    >
                      Sponsors:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        textDecoration: "underline",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "18px",
                          lineHeight: "1.8",
                          fontWeight: "bold",
                          textAlign: "justify",
                          marginRight: "10px",
                        }}
                      >
                        {CertData.sponsor_no1},
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "18px",
                          lineHeight: "1.8",
                          fontWeight: "bold",
                          textAlign: "justify",
                        }}
                      >
                        {CertData.sponsor_no2},
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item sm={11} sx={{ marginTop: "10px" }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    lineHeight: "2",
                    fontWeight: "bold",
                    textAlign: "justify",
                  }}
                >
                  CONFIRMATION Registry Bk. No:{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.book_no}
                  </span>{" "}
                  &nbsp; Page No.{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.page_no}
                  </span>{" "}
                  &nbsp; Line No.{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.line_no}
                  </span>
                </Typography>
              </Grid>
              <Grid item sm={11} sx={{ marginTop: "10px" }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    lineHeight: "2",
                    fontWeight: "bold",
                    textAlign: "justify",
                  }}
                >
                  Date of issue:{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {util.formatDate(CertData.data_issue)}
                  </span>
                </Typography>
              </Grid>
              <Grid
                item
                sm={11}
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  gap: 15,
                  alignItems: "center",
                }}
              >
                <div>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      lineHeight: "2",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    O.R No.{" "}
                    <span style={{ textDecoration: "underline" }}>
                      {CertData.transaction_no}
                    </span>
                  </Typography>
                </div>

                <div>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      lineHeight: "2",
                      fontWeight: "bold",
                      textAlign: "justify",
                    }}
                  >
                    Purpose:{" "}
                    <span style={{ textDecoration: "underline" }}>
                      {CertData.purpose}
                    </span>
                  </Typography>
                </div>
              </Grid>

              <Grid item sm={6} sx={{ marginTop: "150px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      flex: 0.1,
                      height: "1px",
                      backgroundColor: "black",
                    }}
                  />
                  <div
                    style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                  />
                </div>
              </Grid>
            </Grid>
          </Container>
        );
      case 3:
        return (
          <Container
            sx={{
              position: "relative",
              height: "1122.24px",
              width: "793.92px",
              py: 3,
            }}
            ref={componentRef}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${logo})`, //kani lang sa for now since wala pay soft copy sa background
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
                opacity: 0.2,
              }}
            ></Box>

            <Grid container spacing={1}>
              <Grid item sm={12}>
                <Typography
                  sx={{
                    fontFamily: "Cursiva",
                    color: "#000000",
                    fontWeight: 1000,
                    fontSize: "40px",
                    letterSpacing: 2.5,
                    textAlign: "center",
                  }}
                >
                  Catholic Church of Christ of the Agony
                </Typography>
              </Grid>
              <Grid
                item
                sm={12}
                align="center"
                sx={{ display: "flex", justifyContent: "center", gap: 2 }}
              >
                <img
                  src={logo}
                  style={{
                    height: "30%",
                    width: "auto",
                  }}
                  alt="Logo"
                />
                <Box textAlign={"center"} sx={{ marginTop: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: "Palatino",
                      fontSize: "36px",
                      lineHeight: "1",
                      color: "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    GETHSEMANE PARISH
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Times New Roman",
                      fontSize: "16px",
                      lineHeight: "2",
                    }}
                  >
                    Casuntingan, Mandaue City Cebu, Philippines 6014
                  </Typography>
                  <FontAwesomeIcon size="xs" icon={faPhone} />
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Times New Roman",
                      fontSize: "15px",
                      display: "inline",
                    }}
                  >
                    /fax no: (032) 346-9560
                  </Typography>
                </Box>
              </Grid>

              <Grid item sm={12} sx={{ marginTop: -30 }}>
                <Typography
                  sx={{
                    fontFamily: "Cursiva",
                    fontSize: "50px",
                    letterSpacing: 1.5,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  BAPTISMAL CERTIFICATE
                </Typography>
              </Grid>
              <Grid item sm={12} sx={{ marginTop: -21 }}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  through the Mercy and Love of God
                </Typography>
              </Grid>
              <Grid item sm={12} sx={{ marginTop: -15 }}>
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  This is to certify that
                </Typography>
              </Grid>
              <Grid item sm={12} sx={{ marginTop: -8 }}>
                <Typography
                  sx={{
                    fontSize: "24px",
                    lineHeight: "1",
                    fontWeight: "bold",
                    textAlign: "center",
                    textDecoration: "underline",
                  }}
                >
                  {CertData.full_name}
                </Typography>
              </Grid>

              <Grid
                item
                sm={12}
                sx={{ marginLeft: "30px", marginRight: "30px" }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    lineHeight: "2",
                    fontWeight: "regular",
                    textAlign: "justify",
                  }}
                >
                  born in{" "}
                  <span
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {CertData.birth_place}
                  </span>{" "}
                  on the{" "}
                  <span
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {CertData.birth_day}
                  </span>{" "}
                  day of{" "}
                  <span
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {CertData.birth_month}
                  </span>{" "}
                  year of our Lord{" "}
                  <span
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {CertData.birth_year}
                  </span>
                  . Legitimate child of{" "}
                  <span
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {CertData.father_name}
                  </span>{" "}
                  and{" "}
                  <span
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {CertData.mother_name}
                  </span>{" "}
                  was solemnly baptized on the{" "}
                  <span
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {CertData.preffered_day}
                  </span>{" "}
                  day of{" "}
                  <span
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {CertData.preffered_month}
                  </span>{" "}
                  in the year of our Lord{" "}
                  <span
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {CertData.preffered_year}
                  </span>
                  , according to the Rites of the Holy Roman Catholic Church.
                </Typography>
              </Grid>

              <Grid item sm={12} sx={{ marginTop: "10px" }}>
                <Box sx={{ marginLeft: "30px" }}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      lineHeight: "2",
                      fontWeight: "regular",
                      textAlign: "justify",
                    }}
                  >
                    Minister of Baptism:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {priests.find(
                        (priest) => priest.priestID === CertData.priest_id
                      )?.first_name +
                        " " +
                        priests.find(
                          (priest) => priest.priestID === CertData.priest_id
                        )?.last_name}
                    </span>
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        lineHeight: "2",
                        fontWeight: "regular",
                        textAlign: "justify",
                        marginRight: "10px",
                      }}
                    >
                      Sponsors:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                      {sponsors.map((sponsor, index) => (
                        <Typography
                          key={index}
                          sx={{
                            fontSize: "18px",
                            lineHeight: "1.8",
                            letterSpacing: 1,
                            fontWeight: "bold",
                            textAlign: "justify",
                            marginRight: "10px",
                          }}
                        >
                          {sponsor.name},
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item sm={4} sx={{ marginTop: "20px", ml: "30px" }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    lineHeight: "2",
                    fontWeight: "bold",
                    textAlign: "justify",
                  }}
                >
                  Registry Bk. No:{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.book_no}
                  </span>
                </Typography>
              </Grid>
              <Grid item sm={6} sx={{ marginTop: "20px", ml: 10 }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    lineHeight: "2",
                    fontWeight: "bold",
                    textAlign: "justify",
                  }}
                >
                  Date of issue:{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {util.formatDate(CertData.data_issue)}
                  </span>
                </Typography>
              </Grid>

              <Grid
                item
                sm={4}
                sx={{ marginTop: "10px", ml: "30px", display: "flex", gap: 3 }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    lineHeight: "2",
                    fontWeight: "bold",
                    textAlign: "justify",
                  }}
                >
                  Page No.{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.page_no}
                  </span>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    lineHeight: "2",
                    fontWeight: "bold",
                    textAlign: "justify",
                  }}
                >
                  Line No.{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.line_no}
                  </span>
                </Typography>
              </Grid>

              <Grid
                item
                sm={12}
                sx={{ marginTop: "10px", ml: "30px", display: "flex", gap: 6 }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    lineHeight: "2",
                    letterSpacing: 1,
                    fontWeight: "bold",
                  }}
                >
                  O.R No.{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.transaction_no}
                  </span>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    lineHeight: "2",
                    letterSpacing: 1,
                    fontWeight: "bold",
                  }}
                >
                  Purpose:{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.purpose}
                  </span>
                </Typography>
              </Grid>

              <Grid
                item
                sm={11}
                align="center"
                sx={{ marginTop: "100px", ml: "30px" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      flex: 0.1,
                      height: "1px",
                      backgroundColor: "black",
                    }}
                  />
                  <div
                    style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                  />
                </div>
              </Grid>
            </Grid>
          </Container>
        );
      case 4:
        return (
          <Container
            sx={{
              position: "relative",
              height: "1122.24px",
              width: "793.92px",
              py: 5,
            }}
            ref={componentRef}
          >
            <Grid container spacing={2}>
              <Grid
                item
                sm={11}
                display={"flex"}
                justifyContent={"center"}
                gap={1}
              >
                <img
                  src={logo}
                  style={{
                    height: "30%",
                    width: "auto",
                  }}
                  alt="Logo"
                />
                <Box textAlign={"center"}>
                  <Typography
                    sx={{
                      fontFamily: "Cursiva",
                      color: "#000000",
                      fontWeight: "bold",
                      fontSize: "26px",
                      textAlign: "center",
                    }}
                  >
                    Catholic Church of Christ of the Agony
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Palatino",
                      fontSize: "27px",
                      lineHeight: "1",
                      color: "#040063",
                      fontWeight: "bold",
                    }}
                  >
                    GETHSEMANE PARISH
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      lineHeight: "1",
                      mb: "3px",
                    }}
                  >
                    Casuntingan, Mandaue City
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      lineHeight: "1",
                    }}
                  >
                    Cebu, Philippines 6014
                  </Typography>
                  <FontAwesomeIcon size="xs" icon={faPhone} />
                  <Typography
                    sx={{
                      fontSize: "15px",
                      lineHeight: "0",
                      display: "inline",
                    }}
                  >
                    /fax no: (032) 346-9560
                  </Typography>
                </Box>
              </Grid>

              <Grid item sm={12} sx={{ marginTop: -30 }}>
                <Typography
                  sx={{
                    fontFamily: "Cursiva",
                    fontSize: "40px",
                    lineHeight: "1",
                    letterSpacing: 1,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Certificate of Marriage
                </Typography>
              </Grid>
              <Grid item sm={12} sx={{ marginTop: -20 }}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    lineHeight: "1",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  This certifies that
                </Typography>
              </Grid>
              <Grid item sm={12} sx={{ marginTop: -13 }}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    lineHeight: "1",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.full_name}
                  </span>{" "}
                  and{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.spouse_name}
                  </span>
                </Typography>
              </Grid>

              <Grid item sm={12} sx={{ mt: -8 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid black",
                          padding: "0px 0px 0px 0px",
                        }}
                      ></TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderBottom: "1px solid black",
                          padding: "0px 0px 0px 0px",
                        }}
                      >
                        (Husband)
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderBottom: "1px solid black",
                          padding: "0px 0px 0px 0px",
                        }}
                      >
                        (Wife)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "200px",
                        }}
                      >
                        Legal Status
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {data.relationship}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {data.relationship}
                      </TableCell>
                    </TableRow> */}
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "200px",
                        }}
                      >
                        Actual Address
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {CertData?.groom_details?.groom_address}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {CertData?.bride_details?.bride_address}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "200px",
                        }}
                      >
                        Date of Birth
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {util.formatDate(CertData?.groom_details?.groom_bday)}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {util.formatDate(CertData?.bride_details?.bride_bday)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "200px",
                        }}
                      >
                        Place of Birth
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {CertData?.groom_details?.groom_bplace}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {CertData?.bride_details?.bride_bplace}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "200px",
                        }}
                      >
                        Date of Baptism
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {util.formatDate(CertData?.groom_details?.groom_bapday)}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {util.formatDate(CertData?.bride_details?.bride_bapday)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "200px",
                        }}
                      >
                        Place of Baptism
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {CertData?.groom_details?.groom_bapplace}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {CertData?.bride_details?.bride_bapplace}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "200px",
                        }}
                      >
                        Father
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {CertData?.groom_details?.groom_father}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {CertData?.bride_details?.bride_father}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "200px",
                        }}
                      >
                        Mother
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {CertData?.groom_details?.groom_mother}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "300px",
                        }}
                      >
                        {CertData?.bride_details?.bride_mother}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                          width: "200px",
                          height: "50px",
                        }}
                      >
                        Witnesses
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                        }}
                      >
                        <Box display="flex" flexDirection="column">
                          <TableCell
                            align="center"
                            sx={{
                              borderBottom: "1px solid black",
                              padding: "0px 0px 0px 0px",
                              height: "25px",
                            }}
                          >
                            {sponsors[0]?.name || ""}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ padding: "0px 0px 0px 0px", height: "25px" }}
                          >
                            {sponsors[2]?.name || ""}
                          </TableCell>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid black",
                          padding: "0px 0px 0px 0px",
                        }}
                      >
                        <Box display="flex" flexDirection="column">
                          <TableCell
                            align="center"
                            sx={{
                              borderBottom: "1px solid black",
                              padding: "0px 0px 0px 0px",
                              height: "25px",
                            }}
                          >
                            {sponsors[1]?.name || ""}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ padding: "0px 0px 0px 0px", height: "25px" }}
                          >
                            {sponsors[3]?.name || ""}
                          </TableCell>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>

              <Grid item sm={12}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    lineHeight: "0",
                    textAlign: "center",
                  }}
                >
                  were united in
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography
                  sx={{
                    fontFamily: "Cursiva",
                    fontSize: "20px",
                    lineHeight: "1",
                    letterSpacing: 1,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Holy Matrimony
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    lineHeight: "1",
                    textAlign: "center",
                  }}
                >
                  according to the rules of the Holy Roman Catholic Church{" "}
                  <br />
                  on the{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.marriage_day}
                  </span>{" "}
                  day of{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.marriage_month}
                  </span>{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.marriage_year}
                  </span>
                </Typography>
              </Grid>

              <Grid item sm={12}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    lineHeight: "1",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  The Marraige was solemized by{" "}
                  <span
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {priests.find(
                      (priest) => priest.priestID === CertData.priest_id
                    )?.first_name +
                      " " +
                      priests.find(
                        (priest) => priest.priestID === CertData.priest_id
                      )?.last_name}
                  </span>{" "}
                  <br /> I further certify to the correcteness of the above data
                  as appears from the <br /> Catholic Marriage Register Book of
                  the Church.
                </Typography>
              </Grid>

              <Grid item sm={6} mt={2}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Book No.{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.book_no}
                  </span>
                </Typography>
              </Grid>
              <Grid item sm={6} mt={2}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Date of Issue:{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {util.formatDate(CertData.data_issue)}
                  </span>
                </Typography>
              </Grid>

              <Grid item sm={6}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Line No.{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.line_no}
                  </span>
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    ml: 7.5,
                  }}
                >
                  Purpose:{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.purpose}
                  </span>
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Page No.{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {CertData.page_no}
                  </span>
                </Typography>
              </Grid>

              <Grid item sm={7} sx={{ marginTop: "80px", ml: 20 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      flex: 0.1,
                      height: "1px",
                      backgroundColor: "black",
                    }}
                  />
                  <div
                    style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                  />
                </div>
              </Grid>
            </Grid>
          </Container>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              margin: "10px",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {data.service_id == 2
                ? "Confirmation"
                : data.service_id == 3
                ? "Baptism"
                : data.service_id == 4
                ? "Marriage"
                : ""}{" "}
              Certificate Print Preview
            </Typography>
            <IconButton
              aria-label="close"
              onClick={close}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>

            <Box
              sx={{
                border: "solid 1px",
                maxHeight: "700px",
                overflowY: "auto",
                borderRadius: "4px",
                boxShadow: "2px 3px #949494",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {renderCertificateContainer()}
            </Box>

            <DialogActions>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                  }}
                >
                  <ReactToPrint
                    trigger={() => (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#307C41",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#1E5730",
                          },
                        }}
                      >
                        print
                      </Button>
                    )}
                    content={() => componentRef.current}
                    onAfterPrint={updateCertStatus}
                  />

                  <Button
                    variant="contained"
                    onClick={close}
                    sx={{
                      backgroundColor: "#D9D9D9",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#D9D9C9",
                      },
                    }}
                  >
                    close
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PrintCertificate;
