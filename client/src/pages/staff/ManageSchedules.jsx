import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  Button,
  Typography,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import config from "../../config";
import NavStaff from "../../components/NavStaff";



function Calendar() {

  const [events, setEvents] = useState([
    {
      title: "Meeting",
      start: "2024-09-02T10:00:00",
      end: "2024-08-01T11:00:00",
    },
    {
      title: "Lunch Break",
      start: "2024-09-01T12:00:00",
      end: "2024-08-29T12:30:00",
    },
  ]);

  const priests = ['priest A', 'priest B', 'priest C']

  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <strong>{eventInfo.event.title}</strong>  
      </div>
    );
  };

  const handleDateClick = (info) => {
    const newEvent = {
      title: "New Event",
      start: info.dateStr,
      end: new Date(info.date).setMinutes(
        new Date(info.date).getMinutes() + 30
      ),
    };
    setEvents([...events, newEvent]);
  };

  return (
    <>
      <Box sx={{ display: "flex", mx: { md: "30px" } }}>
        <NavStaff />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }}
        >
          <Toolbar />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "8px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
                fontWeight: 600,
              }}
            >
              Priest Schedule
            </Typography>
            <Button
              variant="contained"
              type="button"
              sx={{ backgroundColor: "#355173" }}
            >
              ADD ACTIVITY
            </Button>
          </Box>

          <Divider />

          <Box sx={{ width: "100%" }}>
            <Grid container spacing={1}>
              <Grid item sm={12}>
                <Box sx={{ p: 2 }}>
                  <div style={{ padding: "10px" }}>
                    <FullCalendar
                      plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                      ]}

                      //  needs rework
                      customButtons={{
                        customPriestA: {
                          text: priests[0],  // Custom text or HTML
                          click: () => alert('Priest A')  // Function to execute on click
                        },
                        customPriestB: {
                          text: priests[1],  // Custom text or HTML
                          click: () => alert('Priest B')  // Function to execute on click
                        },
                        customPriestC: {
                          text: priests[2],  // Custom text or HTML
                          click: () => alert('Priest C')  // Function to execute on click
                        }
                      }}


                      initialView="timeGridWeek"
                      headerToolbar={{
                        start: "customPriestA customPriestB customPriestC",
                        center: "title",
                        end: "prev,next",
                      }}
                      events={events}
                      allDaySlot={false}
                      slotDuration="00:30:00"
                      slotLabelInterval="00:30:00"
                      height="90vh"
                      dateClick={handleDateClick}
                      eventTextColor="#ffffff"
                      eventBackgroundColor="#1976d2"
                      eventContent={renderEventContent}
                      slotMinTime="06:00:00"
                      slotMaxTime="19:30:00"
                      slotEventOverlap={false}
                      dayHeaderFormat={{
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                        omitCommas: true,
                      }}
                      views={{
                        timeGridWeek: {
                          slotLabelFormat: {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          },
                          titleFormat: {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        },
                      }}
                      slotLabelStyle={{ fontSize: "16px", padding: "10px" }} // Increased padding for slot labels
                      dayHeaderClassNames={({ date }) => [
                        "custom-day-header",
                        date.getDay() === 0 || date.getDay() === 6
                          ? "weekend-header"
                          : "",
                      ]}
                      dayCellClassNames="custom-day-cell"
                      dayMaxEventRows={2}
                    />
                    <style>
                      {`
                          .fc .fc-toolbar-title {
                            font-size: 26px; /* Larger title font */
                          }
                          .fc .fc-button {
                            font-size: 18px; /* Increase button font size */
                          }
                          .fc .fc-button-primary {
                            background-color: #1976d2; /* Blue button background */
                            border-color: #1976d2;
                          }
                          .fc .fc-button-primary:hover {
                            background-color: #0d47a1; /* Darker blue on hover */
                            border-color: #0d47a1;
                          }
                          .fc-theme-standard th, .fc-theme-standard td {
                            border: 1px solid #d1d1d1; /* Subtle border color for better contrast */
                          }
                          .fc-daygrid-day-number {
                            font-size: 16px; /* Larger day number */
                            padding: 8px;
                          }
                          .fc-daygrid-event {
                            padding: 8px;
                            border-radius: 6px; /* More rounded corners for events */
                          }
                          .fc-timegrid-slot-label {
                            font-size: 18px; /* Larger time slot label font size */
                            padding: 10px; /* Increased padding */
                            height: 200px; /* Increased height of time slots */
                          }
                          .fc-timegrid-event {
                            font-size: 12px; /* Larger event font size */
                            padding: 2px;
                            background-color: #1976d2; /* Consistent blue color */
                            border: none;
                          }
                          .fc-timegrid-slot {
                            height: 200px; /* Increased height of time slots */
                          }
                          .weekend-header {
                            background-color: #f5f5f5; /* Light grey background for weekends */
                          }
                        `}
                    </style>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Calendar;
