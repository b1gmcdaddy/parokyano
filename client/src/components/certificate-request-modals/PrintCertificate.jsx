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
import axios from "axios";
import config from "../../config";
import ReactToPrint from "react-to-print";
import dayjs from "dayjs";

const PrintCertificate = ({ open, data, close }) => {
  const componentRef = useRef();

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
              }}
            >
              <Container
                maxWidth="lg"
                sx={{ backgroundColor: "#EEEEEE" }}
                ref={componentRef}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                voluptate expedita cum. Aliquid natus non quasi nesciunt, est
                iure repellendus eveniet ducimus impedit facilis obcaecati
                assumenda odit asperiores hic corporis!
              </Container>
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
