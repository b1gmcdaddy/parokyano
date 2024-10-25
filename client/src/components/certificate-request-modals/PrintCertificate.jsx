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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import config from "../../config";
import ReactToPrint from "react-to-print";
import logo from "../../assets/logoCert.png"
import confirmationSaint from "../../assets/confirmationSaint.jpg"
import util from "../../utils/DateTimeFormatter"

const PrintCertificate = ({ open, data, close }) => {
  const [sponsors, setSponsors] = useState([]);
  const [priests, setPriests] = useState([]);
  const dateToday = new Date().toJSON().slice(0, 10);
  const componentRef = useRef();
  const [CertData, setCertData] = useState({
    full_name: "",
    birth_day: "",
    birth_month: "",
    birth_year: "",
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
    OR_no: "",
    purpose: "",
    transaction_no: "",
    service_id: "",
    priest_id: "",
    request_id: "",
  });

  useEffect(() => {
    if (open && data) {
      setCertData({
        full_name: data.first_name + " " + data.middle_name + " " + data.last_name,
        birth_day: "",
        birth_month: "",
        birth_year: "",
        preffered_day: "",
        preffered_month: "",
        preffered_year: "",
        birth_place: data.birth_place,
        data_issue: formatDate(dateToday),
        father_name: data.father_name,
        mother_name: data.mother_name,
        book_no: data.details.book_no,
        line_no: data.details.line_no,
        page_no: data.details.page_no,
        OR_no: data.details.OR_no,
        purpose: data.purpose,
        transaction_no: data.transaction_no,
        service_id: data.service_id,
        priest_id: data.priest_id,
        request_id: data.requestID,
      });
    }
    BirthDayFormatter(data.birth_date);
    BaptismDayFormatter(data.preferred_date)
    console.log(data);
  }, [open, data]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const BirthDayFormatter = (dateString) => {
    const date = new Date(dateString);

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
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
    fetchSponsors(CertData.request_id);
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
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
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

const renderCertificateContainer = () => {
    switch (data.service_id) {
      case 2:
        return (
          <Container
            sx={{ position: "relative", height: "1122.24px", width: "793.92px", py: 3 }}
            ref={componentRef}
          >
            <Box sx={{position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${logo})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              opacity: 0.2,
            }}>
            </Box>

            <Grid container spacing={2} justifyContent={"center"}>
              <Grid item sm={4}>
                <img
                  src={logo}
                  style={{height: "60%", width: "100%"}}
                  alt="Logo"
                />
              </Grid>

              <Grid item sm={5}>
                <Box textAlign={"center"} sx={{marginTop: '30px'}}>
                  <Typography sx={{fontFamily: 'Dharma Gothic', fontSize: '27px', lineHeight: '1', letterSpacing: 2, color: '#040063'}}>Archdiocese of Cebu</Typography>
                  <Typography sx={{fontFamily: 'Palatino',fontSize: '16px', lineHeight: '1', letterSpacing: 0, color: '#040063', fontWeight: 'bold'}}>Catholic Church of Christ of the Agony</Typography>
                  <Typography sx={{fontFamily: 'Artegra', fontSize: '20px', lineHeight: '2', letterSpacing: 0, color: '#040063'}}>GETHSEMANE PARISH</Typography>
                  <Typography sx={{fontWeight: 'bold',letterSpacing: 0, fontSize: '12px', lineHeight: '0',}}>Casuntingan, Mandaue City Cebu, Philippines 6014</Typography>
                  <FontAwesomeIcon size="xs" icon={faPhone}/>
                  <Typography sx={{fontWeight: 'bold',letterSpacing: 0, fontSize: '12px', lineHeight: '3', display: 'inline'}}>/fax no: (032) 346-9560</Typography>
                </Box>
              </Grid>

              <Grid item sm={3}>
                <img
                  src={confirmationSaint}
                  style={{ height: "60%", width: "100%"}}
                  alt="confirmationSaint"
                />
              </Grid>

              <Grid item sm={12} sx={{marginTop: '-80px'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <div style={{flex: .1, height: '2px', backgroundColor: 'black'}} />
                  <div style={{flex: 1, height: '2px', backgroundColor: 'black'}} />
                </div>
              </Grid>

              <Grid item sm={12} sx={{marginTop: '-70px'}}>
                <Typography sx={{fontFamily: 'Cursiva',fontSize: '40px', lineHeight: '1', letterSpacing: 3, fontWeight: 'bold', textAlign: 'center'}}>CONFIRMATION CERTIFICATE</Typography>
              </Grid>
              <Grid item sm={12} sx={{marginTop: '-15px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '1', letterSpacing: 1, fontWeight: 'bold', textAlign: 'center'}}>This is to certify that</Typography>
              </Grid>
              <Grid item sm={12} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '20px', lineHeight: '1', letterSpacing: 1, fontWeight: 'bold', textAlign: 'center', textDecoration: "underline"}}>{CertData.full_name}</Typography>
              </Grid>

              <Grid item sm={12} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1,fontWeight: 'regular', textAlign: 'justify'}}>
                  Son/daughter of <span style={{textDecoration: "underline", fontWeight: 'bold'}}>{CertData.father_name}</span> and <span style={{textDecoration: "underline", fontWeight: 'bold'}}>{CertData.mother_name}</span> was, CONFIRMED on 
                  the <span style={{textDecoration: "underline", fontWeight: 'bold'}}>{CertData.preffered_day}</span> day of <span style={{textDecoration: "underline", fontWeight: 'bold'}}>{CertData.preffered_month}</span> in the year of our Lord <span style={{textDecoration: "underline", fontWeight: 'bold'}}>{CertData.preffered_year}</span> <span style={{fontStyle: 'italic'}}>according to the Rites of the 
                  <span style={{fontWeight: 'bold'}}>Holy Roman Catholic Church.</span></span> 
                </Typography>
              </Grid>

              <Grid item sm={12} sx={{marginTop: '10px'}}>
                <Box sx={{marginLeft: '40px'}}>
                  <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1,fontWeight: 'regular', textAlign: 'justify'}}>
                    Minister: <span style={{fontWeight: 'bold'}}>{
                      priests.find(
                        (priest) => priest.priestID === CertData.priest_id
                      )?.first_name +
                      " " +
                      priests.find(
                        (priest) => priest.priestID === CertData.priest_id
                      )?.last_name
                    }</span>
                  </Typography>
                  <Box sx={{display: 'flex', alignItems: 'flex-start' }}>
                    <Typography
                      sx={{
                        fontSize: '18px',
                        lineHeight: '2',
                        letterSpacing: 1,
                        fontWeight: 'regular',
                        textAlign: 'justify',
                        marginRight: '10px',
                      }}
                    >
                      Sponsors:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {sponsors.map((sponsor, index) => (
                        <Typography
                          key={index}
                          sx={{
                            fontSize: '18px',
                            lineHeight: '1.8',
                            letterSpacing: 1,
                            fontWeight: 'bold',
                            textAlign: 'justify',
                            marginRight: '10px',
                          }}
                        >
                          {sponsor.name},
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item sm={12} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  CONFIRMATION Registry Bk. No: {CertData.book_no} Page No. {CertData.page_no} Line No. {CertData.line_no}
                </Typography>
              </Grid>
              <Grid item sm={12} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  Date of issue: <span style={{textDecoration: 'underline'}}>{util.formatDate(CertData.data_issue)}</span>
                </Typography>
              </Grid>
              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  O.R No. <span style={{textDecoration: 'underline'}}>{CertData.OR_no}</span>
                </Typography>
              </Grid>
              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  Purpose: <span style={{textDecoration: 'underline'}}>{CertData.purpose}</span>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        );
      case 3:
        return (
          <Container
            sx={{ position: "relative", height: "1122.24px", width: "793.92px", py: 3 }}
            ref={componentRef}
          >
            <Box sx={{position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${logo})`, //kani lang sa for now since wala pay soft copy sa background
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              opacity: 0.2,
            }}>
            </Box>

            <Grid container spacing={2} justifyContent={"center"}>
              <Grid item sm={12}>
                <Typography sx={{fontFamily: 'Cursiva', color: '#000000', fontWeight: 1000, fontSize: '40px', textAlign: 'center'}}>Catholic Church of Christ of the Agony</Typography>
              </Grid>
              <Grid item sm={4}>
                <img
                  src={logo}
                  style={{height: "90%", width: "60%", justifySelf: 'center'}}
                  alt="Logo"
                />
              </Grid>
              <Grid item sm={8}>
                <Box textAlign={"center"} sx={{marginTop: '10px'}}>
                  <Typography sx={{fontFamily: 'Palatino', fontSize: '40px', lineHeight: '2', letterSpacing: 0, color: '#000000', fontWeight: 'bold'}}>GETHSEMANE PARISH</Typography>
                  <Typography sx={{fontWeight: 'bold',letterSpacing: 0, fontSize: '15px', lineHeight: '0',}}>Casuntingan, Mandaue City Cebu, Philippines 6014</Typography>
                  <FontAwesomeIcon size="xs" icon={faPhone}/>
                  <Typography sx={{fontWeight: 'bold',letterSpacing: 0, fontSize: '15px', lineHeight: '3', display: 'inline'}}>/fax no: (032) 346-9560</Typography>
                </Box>
              </Grid>
              <Grid item sm={12}>
                <Typography sx={{fontFamily: 'Cursiva',fontSize: '50px', lineHeight: '1', letterSpacing: 3, fontWeight: 'bold', textAlign: 'center'}}>BAPTISMAL CERTIFICATE</Typography>
              </Grid>
              <Grid item sm={12} sx={{marginTop: '-15px'}}>
                <Typography sx={{fontSize: '25px', lineHeight: '1', letterSpacing: 0, fontWeight: 'bold', textAlign: 'center'}}>through the Mercy and Love of God</Typography>
              </Grid>
              <Grid item sm={12} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '25px', lineHeight: '1', letterSpacing: 0, fontWeight: 'bold', textAlign: 'center'}}>This is to certify that</Typography>
              </Grid>
              <Grid item sm={12} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '30px', lineHeight: '1', letterSpacing: 1, fontWeight: 'bold', textAlign: 'center', textDecoration: "underline"}}>{CertData.full_name}</Typography>
              </Grid>

              <Grid item sm={12} sx={{marginTop: '20px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1,fontWeight: 'regular', textAlign: 'justify'}}>
                  born in <span style={{textDecoration: "underline", fontWeight: 'bold'}}>{CertData.birth_place}</span> on the <span style={{textDecoration: "underline", fontWeight: 'bold'}}>{CertData.birth_day}</span> day 
                  of <span style={{textDecoration: "underline", fontWeight: 'bold'}}>{CertData.birth_month}</span> year of our Lord <span style={{textDecoration: "underline", fontWeight: 'bold'}}>{CertData.birth_year}</span>
                  . Legitimate child of <span style={{textDecoration: "underline", fontWeight: 'bold'}}>{CertData.father_name}</span> and <span style={{textDecoration: "underline", fontWeight: 'bold'}}>{CertData.mother_name}</span> was solemnly 
                  baptized on the <span style={{textDecoration: "underline", fontWeight: 'bold'}}>{CertData.preffered_day}</span> day of <span style={{textDecoration: "underline", fontWeight: 'bold'}}>{CertData.preffered_month}</span> in the year of our 
                  Lord <span style={{textDecoration: "underline", fontWeight: 'bold'}}>{CertData.preffered_year}</span>, according to the Rites of the Holy Roman Catholic Church.
                </Typography>
              </Grid>

              <Grid item sm={12} sx={{marginTop: '10px'}}>
                <Box sx={{marginLeft: '40px'}}>
                  <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1,fontWeight: 'regular', textAlign: 'justify'}}>
                    Minister of Baptism: <span style={{fontWeight: 'bold'}}>{
                      priests.find(
                        (priest) => priest.priestID === CertData.priest_id
                      )?.first_name +
                      " " +
                      priests.find(
                        (priest) => priest.priestID === CertData.priest_id
                      )?.last_name
                    }</span>
                  </Typography>
                  <Box sx={{display: 'flex', alignItems: 'flex-start' }}>
                    <Typography
                      sx={{
                        fontSize: '18px',
                        lineHeight: '2',
                        letterSpacing: 1,
                        fontWeight: 'regular',
                        textAlign: 'justify',
                        marginRight: '10px',
                      }}
                    >
                      Sponsors:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {sponsors.map((sponsor, index) => (
                        <Typography
                          key={index}
                          sx={{
                            fontSize: '18px',
                            lineHeight: '1.8',
                            letterSpacing: 1,
                            fontWeight: 'bold',
                            textAlign: 'justify',
                            marginRight: '10px',
                          }}
                        >
                          {sponsor.name},
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  Registry Bk. No: <span style={{textDecoration: 'underline'}}>{CertData.book_no}</span>
                </Typography>
              </Grid>
              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  Date of issue: <span style={{textDecoration: 'underline'}}>{util.formatDate(CertData.data_issue)}</span>
                </Typography>
              </Grid>

              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  Page No. <span style={{textDecoration: 'underline'}}>{CertData.page_no}</span>
                </Typography>
              </Grid>
              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  Line No. <span style={{textDecoration: 'underline'}}>{CertData.line_no}</span>
                </Typography>
              </Grid>

              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  O.R No. <span style={{textDecoration: 'underline'}}>{CertData.OR_no}</span>
                </Typography>
              </Grid>
              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  Purpose: <span style={{textDecoration: 'underline'}}>{CertData.purpose}</span>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        );
      case 4:
        return (
          <Container
            sx={{ position: "relative", height: "1122.24px", width: "793.92px", py: 3 }}
            ref={componentRef}
          >
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
                scrollbarWidth: 'none',   
                "&::-webkit-scrollbar": {  
                display: "none"
                }
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
                        sx={{
                          backgroundColor: "#307C41",
                          color: "white",
                          paddingX: "12px",
                          "&:hover": {
                            backgroundColor: "#1E5730",
                          },
                        }}
                      >
                        print
                      </Button>
                    )}
                    content={() => componentRef.current}
                  />

                  <Button
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
