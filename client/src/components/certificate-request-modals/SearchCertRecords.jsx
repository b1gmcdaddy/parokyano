import React, {useState, useEffect} from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  Typography,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import config from "../../config";
import CompareRecords from "./CompareRecords";

const SearchCertRecords = ({open, data, close}) => {
  const [certType, setCertType] = useState(null);
  const [records, setRecords] = useState([]);
  const [openCompareModal, setOpenCompareModal] = useState(false);
  const [recordData, setRecordData] = useState([]);

  useEffect(() => {
    const searchRecords = async () => {
      try {
        const res = await axios.get(`${config.API}/request/search-records`, {
          params: {
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            contact_no: data.contact_no || "",
            birth_date: data.birth_date || "",
            preferred_date: data.preferred_date || "",
            preferred_time: data.preferred_time || "",
            service_id:
              data.service_id === 3 ? 5 : data.service_id === 4 ? 7 : null,
            status: "pending", //pending for testing purposes (change to 'finished' later)..
          },
        });
        setRecords(res.data.result);
        console.log(res.data.result);
      } catch (err) {
        console.error("error retrieving matching records", err);
      }
    };
    searchRecords();
    console.log(data.service_id);
  }, [open, data]);

  const handleOpenCompareModal = (rec) => {
    setOpenCompareModal(true);
    setRecordData(rec);
  };

  const closeCompareModal = () => {
    setOpenCompareModal(false);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogContent>
        {/* START COMPARISON OF CERTIFICATE MODAL */}
        <CompareRecords
          open={openCompareModal}
          close={closeCompareModal}
          certData={data}
          recordData={recordData}
        />
        {/* END COMPARISON OF CERTIFICATE MODAL */}
        <Box sx={{display: "flex", justifyContent: "center", gap: 2}}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              margin: "10px",
            }}>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "10px",
              }}>
              SEARCH RESULT
            </Typography>
            <IconButton
              aria-label="close"
              onClick={close}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}>
              <CloseIcon />
            </IconButton>

            <Grid
              container
              spacing={2}
              sx={{
                height: "auto",
                overflowY: "auto",
              }}>
              <Grid
                item
                xs={12}
                sx={{display: "flex", justifyContent: "center"}}>
                {records.length > 0 ? (
                  <CheckCircleIcon sx={{color: "green", fontSize: "5em"}} />
                ) : (
                  <CancelIcon sx={{color: "#C34444", fontSize: "5em"}} />
                )}
              </Grid>
              <Grid item xs={12} sx={{textAlign: "center"}}>
                <Typography sx={{fontWeight: "bold"}}>
                  {records.length} RECORDS FOUND
                </Typography>
              </Grid>

              {records.length > 0 ? (
                <Grid item xs={12}>
                  {records.map((rec) => (
                    <Paper
                      key={rec.requestID}
                      elevation={3}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "14px 14px",
                        backgroundColor: "#D9D9D9",
                        marginBottom: "8px",
                      }}>
                      <Typography>
                        {rec.first_name} {rec.last_name}
                      </Typography>

                      {/* Container for buttons */}
                      <Box sx={{display: "flex", gap: 1}}>
                        <Button
                          sx={{
                            backgroundColor: "#355173",
                            color: "white",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: "#0036B1",
                            },
                          }}
                          onClick={() => handleOpenCompareModal(rec)}>
                          INFO
                        </Button>
                        <Button
                          sx={{
                            backgroundColor: "#44C360",
                            color: "white",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: "green",
                            },
                          }}>
                          CONFIRM
                        </Button>
                      </Box>
                    </Paper>
                  ))}
                </Grid>
              ) : null}
            </Grid>

            <DialogActions>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{display: "flex", justifyContent: "center"}}>
                  <Button
                    size="small"
                    sx={{
                      backgroundColor: "#C34444",
                      color: "white",
                      paddingX: "12px",
                      "&:hover": {
                        backgroundColor: "maroon",
                      },
                    }}>
                    NOTIFY AND CANCEL REQUEST
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

export default SearchCertRecords;
