import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {Button, Typography, TextField, Divider} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import config from "../../config";
import NavStaff from "../../components/NavStaff";
import dayjs from "dayjs";
import axios from "axios";
import util from "../../utils/DateTimeFormatter";
import all from "../../components/SchedulesModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";

const ManageSchedules = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [priestList, setPriestList] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const fetchSchedules = async () => {
    try {
      const res = await axios.get(`${config.API}/priest/retrieve-schedule`);
      setActivities(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("error retrieving schedule", err);
    }
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
        setPriestList(response.data);
        console.log("Priest List:", response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPriest();
    fetchSchedules();
  }, []);

  const openScheduleModal = () => {
    setOpenModal(!openModal);
  };

  const openEditScheduleModal = (activity) => {
    setSelectedActivity(activity);
    setOpenEditModal(true);
  };

  const timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
  ];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const getActivityForSlot = (priestID, timeSlot) => {
    const slotTime = dayjs(
      `${selectedDate} ${timeSlot}`,
      "YYYY-MM-DD hh:mm A"
    ).format("HH:mm:ss");

    return activities.find(
      (activity) =>
        activity.priest_id === priestID &&
        dayjs(activity.date).isSame(selectedDate, "day") &&
        slotTime >= activity.start_time &&
        slotTime < activity.end_time
    );
  };

  const isActivityStart = (activity, timeSlot) => {
    const slotTime = dayjs(
      `${selectedDate} ${timeSlot}`,
      "YYYY-MM-DD hh:mm A"
    ).format("HH:mm:ss");
    return activity && slotTime === activity.start_time;
  };

  return (
    <>
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
              margin: "8px",
              alignItems: "center",
            }}>
            <Typography
              sx={{
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
                fontWeight: 600,
              }}>
              Priest Schedule
            </Typography>
            <Button
              variant="contained"
              type="button"
              onClick={openScheduleModal}
              sx={{backgroundColor: "#355173"}}>
              ADD ACTIVITY
            </Button>
          </Box>

          {/* Add schedule modal */}
          <all.AddSchedulesModal open={openModal} close={openScheduleModal} />
          {/*Edit Sched Modal */}
          <all.EditSchedulesModal
            open={openEditModal}
            close={() => setOpenEditModal(false)}
            activity={selectedActivity}
            priestList={priestList}
          />

          <Divider />

          <Box sx={{p: 2}}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.3em",
                  marginBottom: "1em",
                }}>
                {util.formatDate(selectedDate)}
              </Typography>
              <TextField
                label="Pick a date"
                type="date"
                size="small"
                value={selectedDate}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{my: 3, boxShadow: "1px 3px 1px #D9D9D9"}}
              />
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight: "bold"}}>Time</TableCell>
                    {priestList.map((priest) => (
                      <TableCell key={priest.priestID} align="center">
                        <Typography sx={{fontWeight: "bold"}}>
                          {priest.first_name} {priest.last_name}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timeSlots.map((time) => (
                    <TableRow key={time}>
                      <TableCell>{time}</TableCell>
                      {priestList.map((priest) => {
                        const activity = getActivityForSlot(
                          priest.priestID,
                          time
                        );
                        const isStart = isActivityStart(activity, time);

                        return (
                          <TableCell
                            align="center"
                            key={priest.priestID}
                            sx={{
                              backgroundColor: activity
                                ? "#355173"
                                : "transparent",
                              color: activity ? "#fff" : "inherit",
                            }}>
                            {isStart ? (
                              <>
                                {activity.activity}
                                <FontAwesomeIcon
                                  onClick={() =>
                                    openEditScheduleModal(activity)
                                  }
                                  icon={faPenToSquare}
                                  className="ml-2 cursor-pointer"
                                />{" "}
                              </>
                            ) : (
                              ""
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ManageSchedules;
