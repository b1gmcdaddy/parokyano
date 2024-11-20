import React, { useState, useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import axios from "axios";
import config from "../config";

const AnnouncementForm = ({ announcementData, onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (announcementData) {
      setTitle(announcementData.title);
      setDescription(announcementData.description);
    }
  }, [announcementData]);

  const handleSubmit = async (e) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const announcement = { title, description, user_id: 4 };
    try {
      if (announcementData) {
        await axios.put(
          `${config.API}/announcement/edit/${announcementData.announcementID}`,
          announcement
        );
      } else {
        await axios.post(`${config.API}/announcement/create`, announcement);
      }
      onSave();
    } catch (err) {
      console.error("Error saving announcement", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={6}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant=""
          sx={{ backgroundColor: "#D9D9D9" }}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#355173" }}
          type="submit"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default AnnouncementForm;
