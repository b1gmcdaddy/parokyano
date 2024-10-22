import React, {useEffect, useState} from "react";
import NavStaff from "../../components/NavStaff";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import config from "../../config";
import axios from "axios";
import AnnouncementForm from "../../components/AnnouncementForm";
import util from "../../utils/DateTimeFormatter";

const ManageEvents = () => {
  const [announcement, setAnnouncement] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [deleteBox, setDeleteBox] = useState(false);

  const getAnnouncement = async () => {
    try {
      const res = await axios.get(`${config.API}/announcement/retrieve-all`);
      setAnnouncement(res.data);
    } catch (err) {
      console.error("error retrieving announcements", err);
    }
  };

  useEffect(() => {
    getAnnouncement();
  }, []);

  const handleFormOpen = (announcement) => {
    setCurrentAnnouncement(announcement);
    setOpenForm(true);
  };

  const handleFormClose = () => {
    setOpenForm(false);
    setCurrentAnnouncement(null);
  };

  const handleDeleteOpen = (announcement) => {
    setCurrentAnnouncement(announcement);
    setDeleteBox(true);
  };

  const handleDeleteClose = () => {
    setDeleteBox(false);
    setCurrentAnnouncement(null);
  };

  const handleFormSave = async () => {
    handleFormClose();
    const res = await axios.get(`${config.API}/announcement/retrieve-all`);
    setAnnouncement(res.data);
  };

  const handleDeleteAnnouncement = async (announcementID) => {
    try {
      await axios.delete(`${config.API}/announcement/delete/${announcementID}`);
      handleDeleteClose();
      getAnnouncement();
    } catch (err) {
      console.error("Error deleting announcement:", err);
      alert("Failed to delete the announcement.");
    }
  };

  return (
    <Box sx={{display: "flex", mx: {md: "30px"}}}>
      <NavStaff />
      <Box
        component="main"
        sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${240}px)`}}}>
        <Toolbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
            alignItems: "center",
          }}>
          <Typography
            sx={{fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 600}}>
            Events & Announcements
          </Typography>
          <Button
            variant="contained"
            type="button"
            sx={{backgroundColor: "#355173"}}
            onClick={() => handleFormOpen()}>
            Add Announcement
          </Button>
        </Box>

        <Grid
          container
          spacing={2}
          sx={{marginY: "2em", fontSize: "12px", textAlign: "center"}}>
          <Grid item xs={3}>
            TITLE
          </Grid>
          <Grid item xs={5}>
            DESCRIPTION
          </Grid>
          <Grid item xs={2}>
            PUBLISH DATE
          </Grid>
          <Grid item xs={2}>
            ACTION
          </Grid>
        </Grid>
        {announcement.map((anncmt) => (
          <Paper
            className="py-8 mb-5"
            sx={{backgroundColor: "#D9D9D9", borderRadius: "8px"}}
            key={anncmt.announcementID}>
            <Grid container sx={{textAlign: "center"}}>
              <Grid item xs={3} sx={{fontWeight: "bold"}}>
                {anncmt.title}
              </Grid>
              <Grid item xs={5}>
                {anncmt.description}
              </Grid>
              <Grid item xs={2}>
                {util.formatDate(anncmt.date_announced)}
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <EditIcon
                  onClick={() => handleFormOpen(anncmt)}
                  sx={{cursor: "pointer", marginRight: "10px"}}
                />
                <DeleteIcon
                  onClick={() => handleDeleteOpen(anncmt)}
                  sx={{cursor: "pointer", color: "#C34444"}}
                />
              </Grid>
            </Grid>
          </Paper>
        ))}

        <Dialog
          open={openForm}
          onClose={handleFormClose}
          fullWidth
          maxWidth="md">
          <DialogTitle>
            {currentAnnouncement ? "Edit Announcement" : "Add Announcement"}
          </DialogTitle>
          <DialogContent>
            <AnnouncementForm
              announcementData={currentAnnouncement}
              onSave={handleFormSave}
              onCancel={handleFormClose}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={deleteBox}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {"Delete Announcement"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this announcement?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose} sx={{color: "grey"}}>
              cancel
            </Button>
            <Button
              sx={{color: "#C34444"}}
              onClick={() =>
                handleDeleteAnnouncement(currentAnnouncement.announcementID)
              }
              autoFocus>
              delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ManageEvents;
