import CloseIcon from "@mui/icons-material/Close";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  TextField,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import {useState, useEffect} from "react";
import React from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import config from "../../config";
import ConfirmationDialog from "../ConfirmationModal";

const fetchWeddingDetails = async (id) => {
  try {
    const response = await axios.get(`${config.API}/wedding/retrieve`, {
      params: {reqID: id},
    });

    return response.data?.result[0];
  } catch (err) {
    console.error(err);
    return null;
  }
};

const RequirementsModal = ({id, type, onClose}) => {
  const [open, setOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState("");
  const handleOpen = () => setOpen(true);
  const [tabValue, setTabValue] = useState(0);
  const [selectedWeddingId, setSelectedWeddingId] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    age: "",
    isMarried: "",
    isCatholic: "",
  });
  const [sponsors, setSponsors] = useState([]);
  const [newSponsor, setNewSponsor] = useState({
    name: "",
    age: "",
    isMarried: "",
    isCatholic: "",
  });
  const [requirements, setRequirements] = useState({
    groom_baptismCert: 0,
    groom_confirmationCert: 0,
    groom_birthCert: 0,
    spouse_baptismCert: 0,
    spouse_confirmationCert: 0,
    spouse_birthCert: 0,
    groomMarriageLicense: 0,
    brideMarriageLicense: 0,
    groomCENOMAR: 0,
    brideCENOMAR: 0,
    groomCEDULA: 0,
    brideCEDULA: 0,
    isParishPermit: 0,
    isPrenuptial: 0,
    isPreCana: 0,
    isMarriageBann: 0,
    isJointAffidavit: 0,
    isCivilContract: 0,
    isDeathCert: 0,
  });

  const fetchSponsors = async () => {
    try {
      const response = await axios.get(`${config.API}/sponsor/retrieve`, {
        params: {
          reqID: id,
        },
      });
      setSponsors(response.data.result);
    } catch (err) {
      console.error("error retrieving sponsors", err);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setNewSponsor((prev) => ({...prev, [name]: value}));
  };

  const handleAddSponsor = async () => {
    setErrors({
      name: "",
      age: "",
      isMarried: "",
      isCatholic: "",
    });

    let hasErrors = false;
    const newErrors = {};

    if (!newSponsor.name.trim()) {
      newErrors.name = "Name is required";
      hasErrors = true;
    }

    if (!newSponsor.age) {
      newErrors.age = "Age is required";
      hasErrors = true;
    } else if (newSponsor.age <= 0) {
      newErrors.age = "Age must be a positive number.";
      hasErrors = true;
    } else if (newSponsor.age < 18) {
      newErrors.age = "Sponsor must be at least 18 years old.";
      hasErrors = true;
    }

    if (newSponsor.isMarried === "") {
      newErrors.isMarried = "Marital status is required";
      hasErrors = true;
    }

    if (newSponsor.isCatholic === "") {
      newErrors.isCatholic = "Required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        `${config.API}/sponsor/create-sponsor`,
        {
          ...newSponsor,
          request_id: id,
        }
      );
      if (response && sponsors.length >= 4) {
        await axios.put(`${config.API}/request/add-sponsor-fee`, {
          requestID: id,
        });
      }
      const newSponsorData = {
        ...newSponsor,
      };
      fetchSponsors();
      setNewSponsor({name: "", age: "", isMarried: "", isCatholic: ""});
    } catch (err) {
      console.error("Error adding sponsor", err);
    }
  };

  const handleDeleteSponsor = async (sponsor) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${sponsor.name}?`
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `${config.API}/sponsor/delete-sponsor/${sponsor.sponsorID}`
        );

        if (sponsors.length >= 4) {
          await axios.put(`${config.API}/request/remove-sponsor-fee`, {
            requestID: id,
          });
        }
        await fetchSponsors();
      } catch (err) {
        console.error("Error deleting sponsor", err);
        await fetchSponsors();
      }
    }
  };

  useEffect(() => {
    const fetchAndSetRequirements = async () => {
      const req = await fetchWeddingDetails(id);
      if (req) {
        setRequirements({
          groom_baptismCert: req.groom_baptismCert ?? 0,
          groom_confirmationCert: req.groom_confirmationCert ?? 0,
          groom_birthCert: req.groom_birthCert ?? 0,
          spouse_baptismCert: req.spouse_baptismCert ?? 0,
          spouse_confirmationCert: req.spouse_confirmationCert ?? 0,
          spouse_birthCert: req.spouse_birthCert ?? 0,
          groomMarriageLicense: req.groomMarriageLicense ?? 0,
          brideMarriageLicense: req.brideMarriageLicense ?? 0,
          groomCENOMAR: req.groomCENOMAR ?? 0,
          brideCENOMAR: req.brideCENOMAR ?? 0,
          groomCEDULA: req.groomCEDULA ?? 0,
          brideCEDULA: req.brideCEDULA ?? 0,
          isParishPermit: req.isParishPermit ?? 0,
          isPrenuptial: req.isPrenuptial ?? 0,
          isPreCana: req.isPreCana ?? 0,
          isMarriageBann: req.isMarriageBann ?? 0,
          isJointAffidavit: req.isJointAffidavit ?? 0,
          isCivilContract: req.isCivilContract ?? 0,
          isDeathCert: req.isDeathCert ?? 0,
        });
        setSelectedWeddingId(req.wedding_id);
      }
    };
    if (open) {
      fetchAndSetRequirements();
    }
  }, [open, id]);

  const dynamicRequirements = [
    {
      type: "Civilly Married",
      requirements: [
        {name: "Civil Marriage Contract", field: "isCivilContract"},
        {name: "Parish Permit", field: "isParishPermit"},
        {name: "Prenuptial Agreement", field: "isPrenuptial"},
        {name: "Pre-Cana Certificate", field: "isPreCana"},
        {name: "Marriage Bann", field: "isMarriageBann"},
      ],
    },
    {
      type: "Live-in for under 4 years",
      requirements: [
        {name: "Parish Permit", field: "isParishPermit"},
        {name: "Prenuptial Agreement", field: "isPrenuptial"},
        {name: "Pre-Cana Certificate", field: "isPreCana"},
        {name: "Marriage Bann", field: "isMarriageBann"},
      ],
    },
    {
      type: "Live-in for more than 4 years",
      requirements: [
        {name: "Parish Permit", field: "isParishPermit"},
        {name: "Prenuptial Agreement", field: "isPrenuptial"},
        {name: "Pre-Cana Certificate", field: "isPreCana"},
        {name: "Joint Affidavit of Cohabitation", field: "isJointAffidavit"},
        {name: "Marriage Bann", field: "isMarriageBann"},
      ],
    },
    {
      type: "Widow",
      requirements: [
        {name: "Parish Permit", field: "isParishPermit"},
        {name: "Prenuptial Agreement", field: "isPrenuptial"},
        {name: "Pre-Cana Certificate", field: "isPreCana"},
        {name: "Marriage Bann", field: "isMarriageBann"},
        {name: "Partner's Death Certificate", field: "isDeathCert"},
      ],
    },
  ];

  const selectedRequirements =
    dynamicRequirements.find((req) => req.type === type)?.requirements || [];

  const handleClose = () => {
    setOpen(false);
    setSaveSuccess("");
    if (onClose) {
      onClose();
      setSaveSuccess("");
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const updateRequirements = () => {
    try {
      const reqs = {
        ...requirements,
        type,
      };
      axios.put(
        `${config.API}/wedding/requirements/${selectedWeddingId}`,
        reqs
      );
      setSaveSuccess("Update Requirements Successful!");
      fetchWeddingDetails(id);
    } catch (error) {
      setSaveSuccess("Update Failed");
      fetchWeddingDetails(id);
    }
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          backgroundColor: "white",
          height: "30px",
          color: "#355173",
          fontSize: 12,
          "&:hover": {bgcolor: "#E5E4E2"},
        }}>
        Requirements
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{mt: 3, p: 2, textAlign: "center"}}>
          <b>Manage Wedding Requirements</b>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{position: "absolute", right: 8, top: 8}}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Tabs sx={{margin: "20px"}} value={tabValue} onChange={handleTabChange}>
          <Tab label="Requirements" />
          <Tab label="Sponsors" />
        </Tabs>

        <Box sx={{padding: "20px", borderRadius: "0px 0px 5px 5px"}}>
          <Grid container spacing={2}>
            {tabValue === 0 && (
              <>
                {/* Groom and Bride Requirements Section */}
                <Grid item sm={12}>
                  <Typography
                    sx={{
                      marginBottom: "10px",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}>
                    Groom's Requirements
                  </Typography>
                  <Grid container spacing={1}>
                    {/* Groom Birth Certificate */}
                    <Grid item sm={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={requirements.groom_birthCert === 1}
                            onChange={(e) =>
                              setRequirements((prev) => ({
                                ...prev,
                                groom_birthCert: e.target.checked ? 1 : 0,
                              }))
                            }
                          />
                        }
                        label={
                          <Typography sx={{fontSize: "14px"}}>
                            Birth Certificate
                          </Typography>
                        }
                      />
                    </Grid>

                    {/* Groom Baptismal Certificate */}
                    <Grid item sm={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={requirements.groom_baptismCert === 1}
                            onChange={(e) =>
                              setRequirements((prev) => ({
                                ...prev,
                                groom_baptismCert: e.target.checked ? 1 : 0,
                              }))
                            }
                          />
                        }
                        label={
                          <Typography sx={{fontSize: "14px"}}>
                            Baptismal Certificate
                          </Typography>
                        }
                      />
                    </Grid>

                    {/* Groom Confirmation Certificate */}
                    <Grid item sm={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={requirements.groom_confirmationCert === 1}
                            onChange={(e) =>
                              setRequirements((prev) => ({
                                ...prev,
                                groom_confirmationCert: e.target.checked
                                  ? 1
                                  : 0,
                              }))
                            }
                          />
                        }
                        label={
                          <Typography sx={{fontSize: "14px"}}>
                            Confirmation Certificate
                          </Typography>
                        }
                      />
                    </Grid>

                    {/* Additional Groom Requirements (Civil Marriage) */}
                    {type !== "Civilly Married" && (
                      <>
                        <Grid item sm={12} md={4}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={requirements.groomCENOMAR === 1}
                                onChange={(e) =>
                                  setRequirements((prev) => ({
                                    ...prev,
                                    groomCENOMAR: e.target.checked ? 1 : 0,
                                  }))
                                }
                              />
                            }
                            label={
                              <Typography sx={{fontSize: "14px"}}>
                                CENOMAR
                              </Typography>
                            }
                          />
                        </Grid>
                        <Grid item sm={12} md={4}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={requirements.groomCEDULA === 1}
                                onChange={(e) =>
                                  setRequirements((prev) => ({
                                    ...prev,
                                    groomCEDULA: e.target.checked ? 1 : 0,
                                  }))
                                }
                              />
                            }
                            label={
                              <Typography sx={{fontSize: "14px"}}>
                                CEDULA
                              </Typography>
                            }
                          />
                        </Grid>
                        <Grid item sm={12} md={4}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  requirements.groomMarriageLicense === 1
                                }
                                onChange={(e) =>
                                  setRequirements((prev) => ({
                                    ...prev,
                                    groomMarriageLicense: e.target.checked
                                      ? 1
                                      : 0,
                                  }))
                                }
                              />
                            }
                            label={
                              <Typography sx={{fontSize: "14px"}}>
                                Marriage License
                              </Typography>
                            }
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Grid>

                <Grid item sm={12}>
                  <Typography
                    sx={{
                      marginBottom: "10px",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}>
                    Bride's Requirements
                  </Typography>
                  <Grid container spacing={1}>
                    {/* Bride Birth Certificate */}
                    <Grid item sm={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={requirements.spouse_birthCert === 1}
                            onChange={(e) =>
                              setRequirements((prev) => ({
                                ...prev,
                                spouse_birthCert: e.target.checked ? 1 : 0,
                              }))
                            }
                          />
                        }
                        label={
                          <Typography sx={{fontSize: "14px"}}>
                            Birth Certificate
                          </Typography>
                        }
                      />
                    </Grid>

                    {/* Bride Baptismal Certificate */}
                    <Grid item sm={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={requirements.spouse_baptismCert === 1}
                            onChange={(e) =>
                              setRequirements((prev) => ({
                                ...prev,
                                spouse_baptismCert: e.target.checked ? 1 : 0,
                              }))
                            }
                          />
                        }
                        label={
                          <Typography sx={{fontSize: "14px"}}>
                            Baptismal Certificate
                          </Typography>
                        }
                      />
                    </Grid>

                    {/* Bride Confirmation Certificate */}
                    <Grid item sm={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={requirements.spouse_confirmationCert === 1}
                            onChange={(e) =>
                              setRequirements((prev) => ({
                                ...prev,
                                spouse_confirmationCert: e.target.checked
                                  ? 1
                                  : 0,
                              }))
                            }
                          />
                        }
                        label={
                          <Typography sx={{fontSize: "14px"}}>
                            Confirmation Certificate
                          </Typography>
                        }
                      />
                    </Grid>

                    {/* Additional Bride Requirements (Civil Marriage) */}
                    {type !== "Civilly Married" && (
                      <>
                        <Grid item sm={12} md={4}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={requirements.brideCENOMAR === 1}
                                onChange={(e) =>
                                  setRequirements((prev) => ({
                                    ...prev,
                                    brideCENOMAR: e.target.checked ? 1 : 0,
                                  }))
                                }
                              />
                            }
                            label={
                              <Typography sx={{fontSize: "14px"}}>
                                CENOMAR
                              </Typography>
                            }
                          />
                        </Grid>
                        <Grid item sm={12} md={4}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={requirements.brideCEDULA === 1}
                                onChange={(e) =>
                                  setRequirements((prev) => ({
                                    ...prev,
                                    brideCEDULA: e.target.checked ? 1 : 0,
                                  }))
                                }
                              />
                            }
                            label={
                              <Typography sx={{fontSize: "14px"}}>
                                CEDULA
                              </Typography>
                            }
                          />
                        </Grid>
                        <Grid item sm={12} md={4}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  requirements.brideMarriageLicense === 1
                                }
                                onChange={(e) =>
                                  setRequirements((prev) => ({
                                    ...prev,
                                    brideMarriageLicense: e.target.checked
                                      ? 1
                                      : 0,
                                  }))
                                }
                              />
                            }
                            label={
                              <Typography sx={{fontSize: "14px"}}>
                                Marriage License
                              </Typography>
                            }
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Grid>

                {/* Dynamic Requirements Section */}
                <Grid item sm={12}>
                  <Typography
                    sx={{
                      marginBottom: "10px",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}>
                    Joint Requirements
                  </Typography>
                  <Grid container spacing={1}>
                    {selectedRequirements.map((req) => (
                      <Grid item sm={12} md={4} key={req.field}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={requirements[req.field] === 1}
                              onChange={(e) =>
                                setRequirements((prev) => ({
                                  ...prev,
                                  [req.field]: e.target.checked ? 1 : 0,
                                }))
                              }
                            />
                          }
                          label={
                            <Typography sx={{fontSize: "14px"}}>
                              {req.name}
                            </Typography>
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                  {/* Actions */}
                  <Grid
                    item
                    sm={12}
                    sx={{marginTop: "50px", textAlign: "center"}}>
                    <Button
                      onClick={updateRequirements}
                      variant="contained"
                      sx={{padding: "10px 20px"}}>
                      Confirm
                    </Button>
                    <Button
                      onClick={() => handleClose()}
                      variant="contained"
                      sx={{
                        padding: "10px 20px",
                        marginLeft: 2,
                        backgroundColor: "#D9D9D9",
                        color: "black",
                      }}>
                      Close
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}

            {tabValue === 1 && (
              <>
                <Grid item sm={12} md={4}>
                  <label>Name:</label>
                  <TextField
                    fullWidth
                    variant="filled"
                    size="small"
                    name="name"
                    value={newSponsor.name}
                    onChange={handleInputChange}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item sm={12} md={2}>
                  <label>Age:</label>
                  <TextField
                    type="number"
                    fullWidth
                    variant="filled"
                    size="small"
                    name="age"
                    value={newSponsor.age}
                    onChange={handleInputChange}
                    error={Boolean(errors.age)}
                    helperText={errors.age}
                  />
                </Grid>
                <Grid item sm={12} md={3}>
                  <label>Marital Status:</label>
                  <TextField
                    fullWidth
                    select
                    variant="filled"
                    size="small"
                    name="isMarried"
                    value={newSponsor.isMarried}
                    onChange={handleInputChange}
                    error={Boolean(errors.isMarried)}
                    helperText={errors.isMarried}>
                    <MenuItem value="1">Married</MenuItem>
                    <MenuItem value="0">Not Married</MenuItem>
                  </TextField>
                </Grid>
                <Grid item sm={12} md={3}>
                  <label>Catholic?:</label>
                  <TextField
                    fullWidth
                    variant="filled"
                    size="small"
                    select
                    name="isCatholic"
                    value={newSponsor.isCatholic}
                    onChange={handleInputChange}
                    error={Boolean(errors.isMarried)}
                    helperText={errors.isMarried}>
                    <MenuItem value="1">Yes</MenuItem>
                    <MenuItem value="0">No</MenuItem>
                  </TextField>
                </Grid>
                <Grid item sm={12} display={"flex"} justifyContent={"flex-end"}>
                  <Button variant="outlined" onClick={handleAddSponsor}>
                    Add Sponsor
                  </Button>
                </Grid>

                {/* Table */}
                <Grid item sm={12} marginTop={3}>
                  <TableContainer sx={{overflowY: "auto", maxHeight: "30vh"}}>
                    <Table sx={{tableLayout: "fixed", width: "100%"}}>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{fontWeight: "bold", width: "35%"}}
                            align="left">
                            Full Name
                          </TableCell>
                          <TableCell
                            sx={{fontWeight: "bold", width: "10"}}
                            align="left">
                            Age
                          </TableCell>
                          <TableCell
                            sx={{fontWeight: "bold", width: "20%"}}
                            align="left">
                            M. Status
                          </TableCell>
                          <TableCell
                            sx={{fontWeight: "bold", width: "20%"}}
                            align="left">
                            Catholic?
                          </TableCell>
                          <TableCell
                            sx={{fontWeight: "bold", width: "10%"}}></TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {sponsors.map((sponsor) => (
                          <TableRow key={sponsor.sponsorID}>
                            <TableCell sx={{width: "35%"}}>
                              {sponsor.name}
                            </TableCell>
                            <TableCell sx={{width: "10%"}}>
                              {sponsor.age}
                            </TableCell>
                            <TableCell sx={{width: "20%"}}>
                              {sponsor.isMarried === 1 ? "Yes" : "No"}
                            </TableCell>
                            <TableCell sx={{width: "20%"}}>
                              {sponsor.isCatholic === 1 ? "Yes" : "No"}
                            </TableCell>
                            <TableCell sx={{width: "10%"}}>
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteSponsor(sponsor)}>
                                <FontAwesomeIcon icon={faXmark} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </>
            )}
          </Grid>

          {/* Success Message */}
          <Grid item sm={12} sx={{marginTop: "10px", textAlign: "center"}}>
            {saveSuccess === "Update Requirements Successful!" ? (
              <Typography sx={{color: "green"}}>{saveSuccess}</Typography>
            ) : (
              <Typography>{saveSuccess}</Typography>
            )}
          </Grid>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default RequirementsModal;
