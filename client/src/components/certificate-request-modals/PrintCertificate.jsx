import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  TextField,
  Box,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Select,
  MenuItem,
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
import dayjs from "dayjs";
import logo from "../../assets/logoCert.png"
import confirmationSaint from "../../assets/confirmationSaint.jpg"

const godparents = [
  "Clyde Joseph Noob",
  "Carl Dave Barrera",
  "Jolony Tangpuz",
  "Carl Joseph Noob",
  "Clyde Joseph Noob",
  "Carl Dave Barrera",
  "Jolony Tangpuz",
  "Carl Joseph Noob",
];

const sponsors = [
  "Clyde Joseph Noob",
  "Carl Dave Barrera",
  "Jolony Tangpuz",
  "Carl Joseph Noob",
  "Clyde Joseph Noob",
  "Carl Dave Barrera",
  "Jolony Tangpuz",
  "Carl Joseph Noob",
];

const PrintCertificate = ({ open, data, close }) => {
  const componentRef = useRef();

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
                <Typography sx={{fontSize: '20px', lineHeight: '1', letterSpacing: 1, fontWeight: 'bold', textAlign: 'center', textDecoration: "underline"}}>Carl Dave Barrera</Typography>
              </Grid>

              <Grid item sm={12} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1,fontWeight: 'regular', textAlign: 'justify'}}>
                  Son/daughter of <span style={{textDecoration: "underline", fontWeight: 'bold'}}>Richar Barrera</span> and <span style={{textDecoration: "underline", fontWeight: 'bold'}}>Serina Barrera</span> was, CONFIRMED on 
                  the <span style={{textDecoration: "underline", fontWeight: 'bold'}}>27</span> day of <span style={{textDecoration: "underline", fontWeight: 'bold'}}>March</span> in the year of our Lord <span style={{textDecoration: "underline", fontWeight: 'bold'}}>2013</span> <span style={{fontStyle: 'italic'}}>according to the Rites of the 
                  <span style={{fontWeight: 'bold'}}>Holy Roman Catholic Church.</span></span> 
                </Typography>
              </Grid>

              <Grid item sm={12} sx={{marginTop: '10px'}}>
                <Box sx={{marginLeft: '40px'}}>
                  <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1,fontWeight: 'regular', textAlign: 'justify'}}>
                    Minister: <span style={{fontWeight: 'bold'}}>Father Peter</span>
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
                      {godparents.map((godparent, index) => (
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
                          {godparent},
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item sm={12} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  CONFIRMATION Registry Bk. No: 12 Page No. 14 Line No. 34
                </Typography>
              </Grid>
              <Grid item sm={12} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  Date of issue: <span style={{textDecoration: 'underline'}}>October 27, 2024</span>
                </Typography>
              </Grid>
              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  O.R No. <span style={{textDecoration: 'underline'}}>Ambot unsa ni</span>
                </Typography>
              </Grid>
              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  Purpose: <span style={{textDecoration: 'underline'}}>Marriage</span>
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
                <Typography sx={{fontSize: '30px', lineHeight: '1', letterSpacing: 1, fontWeight: 'bold', textAlign: 'center', textDecoration: "underline"}}>Carl Dave Barrera</Typography>
              </Grid>

              <Grid item sm={12} sx={{marginTop: '20px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1,fontWeight: 'regular', textAlign: 'justify'}}>
                  born in <span style={{textDecoration: "underline", fontWeight: 'bold'}}>Mandaue City</span> on the <span style={{textDecoration: "underline", fontWeight: 'bold'}}>28</span> day 
                  of <span style={{textDecoration: "underline", fontWeight: 'bold'}}>December</span> year of our Lord <span style={{textDecoration: "underline", fontWeight: 'bold'}}>2001</span>
                  . Legitimate child of <span style={{textDecoration: "underline", fontWeight: 'bold'}}>Richard Barrera</span> and <span style={{textDecoration: "underline", fontWeight: 'bold'}}>Serina Barrera</span> was solemnly 
                  baptized on the <span style={{textDecoration: "underline", fontWeight: 'bold'}}>27</span> day of <span style={{textDecoration: "underline", fontWeight: 'bold'}}>April</span> in the year of our 
                  Lord <span style={{textDecoration: "underline", fontWeight: 'bold'}}>2002</span>, according to the Rites of the Holy Roman Catholic Church.
                </Typography>
              </Grid>

              <Grid item sm={12} sx={{marginTop: '10px'}}>
                <Box sx={{marginLeft: '40px'}}>
                  <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1,fontWeight: 'regular', textAlign: 'justify'}}>
                    Minister of Baptism: <span style={{fontWeight: 'bold'}}>Father Peter</span>
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
                          {sponsor},
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  Registry Bk. No: <span style={{textDecoration: 'underline'}}>10</span>
                </Typography>
              </Grid>
              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  Date of issue: <span style={{textDecoration: 'underline'}}>October 25, 2024</span>
                </Typography>
              </Grid>

              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  Page No. <span style={{textDecoration: 'underline'}}>12</span>
                </Typography>
              </Grid>
              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  Line No. <span style={{textDecoration: 'underline'}}>8</span>
                </Typography>
              </Grid>

              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  O.R No. <span style={{textDecoration: 'underline'}}>Ambot unsa ni</span>
                </Typography>
              </Grid>
              <Grid item sm={6} sx={{marginTop: '10px'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '2', letterSpacing: 1, fontWeight: 'bold', textAlign: 'justify'}}>
                  Purpose: <span style={{textDecoration: 'underline'}}>Marriage</span>
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
