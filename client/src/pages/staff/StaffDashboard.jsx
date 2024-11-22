import React, { useEffect, useState } from "react";
import NavStaff from "../../components/NavStaff";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import {
  Button,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChurch,
  faStamp,
  faHandsPraying,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import util from "../../utils/DateTimeFormatter";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ArcElement,
  Legend,
  defaults,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const StaffDashboard = () => {
  const [serviceRequests, setServiceRequests] = useState(0);
  const [certRequests, setCertRequests] = useState(0);
  const [massIntentions, setMassIntentions] = useState(0);
  const [dateFilter, setDateFilter] = useState("This Month");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [counts, setCounts] = useState({
    pending: 0,
    approved: 0,
    cancelled: 0,
    finished: 0,
  });

  const location = useLocation();
  const user = location.state?.user;

  const navigate = useNavigate();

  const serviceMap = {
    5: "Baptism",
    6: "Baptism",
    7: "Wedding",
    8: "Wedding",
    9: "Wake Mass",
    10: "Outside Mass",
    11: "Funeral Mass",
    12: "Anointing of the Sick",
    13: "Blessing",
  };
  // for cards at the top of page
  const fetchRequestCounts = async (filter) => {
    try {
      const response = await axios.get(
        `${config.API}/request/count-request-date`,
        {
          params: { dateFilter: filter },
        }
      );
      const { countA, countB, countC } = response.data;
      setServiceRequests(countC);
      setCertRequests(countB);
      setMassIntentions(countA);
    } catch (error) {
      console.error("Error fetching request counts", error);
    }
  };
  // for bar chart
  const fetchCountPerStatus = async () => {
    try {
      const response = await axios.get(
        `${config.API}/service/getCountPerStatus`
      );
      setCounts(response.data);
    } catch (error) {
      console.error("Error fetching request counts", error);
    }
  };

  useEffect(() => {
    fetchRequestCounts(dateFilter);
  }, [dateFilter]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get(`${config.API}/request/upcoming`);
        setUpcomingEvents(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUpcomingEvents();
    fetchCountPerStatus();
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false, // temporarry
        position: "left",
        align: "center",
        labels: {
          boxWidth: 10,
        },
      },
    },
  };
  return (
    <Box sx={{ display: "flex", mx: { md: "30px" } }}>
      <NavStaff user={user} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }}
      >
        <Toolbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 600 }}
          >
            Dashboard
          </Typography>
          <Link to="/generate-reports">
            <Button
              variant="contained"
              type="button"
              sx={{ backgroundColor: "#355173" }}
            >
              Generate Reports
            </Button>
          </Link>
        </Box>

        {/* Date Filter */}
        <div className="mt-8 border-1 border-neutral-900 inline-block">
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <Select
              onChange={(e) => setDateFilter(e.target.value)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dateFilter}
            >
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="This Week">This Week</MenuItem>
              <MenuItem value="This Month">This Month</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Request Counts */}
        <Box
          sx={{
            display: { md: "flex" },
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <Paper
            sx={{
              padding: "16px",
              display: "flex",
              width: { md: "35%" },
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "#e8e8e8",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon icon={faChurch} />
              <Typography sx={{ marginLeft: "8px", fontWeight: "bold" }}>
                Service Requests
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              {serviceRequests}
            </Typography>
          </Paper>
          <Paper
            sx={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "#e8e8e8",
              width: { md: "35%" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon icon={faStamp} />
              <Typography sx={{ marginLeft: "8px", fontWeight: "bold" }}>
                Certificate Requests
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              {certRequests}
            </Typography>
          </Paper>
          <Paper
            sx={{
              width: { md: "35%" },
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "#e8e8e8",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon icon={faHandsPraying} />
              <Typography sx={{ marginLeft: "8px", fontWeight: "bold" }}>
                Mass Intentions
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              {massIntentions}
            </Typography>
          </Paper>
        </Box>

        <Grid container spacing={0.1} marginTop={"2em"}>
          <Grid item xs={12} sm={4.3} sx={{ padding: 5 }}>
            <Paper elevation={4} sx={{ padding: 3 }}>
              <Typography sx={{ paddingBottom: 3 }}>
                {dateFilter == "Today"
                  ? "Today's Statistics"
                  : dateFilter == "This Week"
                  ? "Weekly Statistics"
                  : "Monthly Statistics"}
              </Typography>
              {serviceRequests === 0 &&
              certRequests === 0 &&
              massIntentions === 0 ? (
                <div
                  style={{
                    height: "200px",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      paddingTop: 10,
                    }}
                  >
                    No requests were received
                  </Typography>
                </div>
              ) : (
                <div style={{ height: "200px" }}>
                  <Pie
                    data={{
                      labels: [
                        "Service Requests",
                        "Certificate Requests",
                        "Mass Intentions",
                      ],
                      datasets: [
                        {
                          label: "# of Requests",
                          data: [serviceRequests, certRequests, massIntentions],
                          backgroundColor: ["#355173", "#247E38", "#D9D9D9"],
                          hoverBackgroundColor: [
                            "#355173",
                            "#247E38",
                            "#D9D9D9",
                          ],
                        },
                      ],
                    }}
                    options={options}
                  />
                </div>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} sm={7.7}>
            <Paper elevation={4} sx={{ padding: 3 }}>
              <Typography sx={{ paddingBottom: 3 }}>
                Request Status Distribution
              </Typography>
              <div style={{ height: "200px" }}>
                <Bar
                  data={{
                    labels: ["Pending", "Approved", "Finished", "Cancelled"],
                    datasets: [
                      {
                        label: "Request Status",
                        data: [
                          counts.pending,
                          counts.approved,
                          counts.finished,
                          counts.cancelled,
                        ],
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: [
                          "#d9d9d9",
                          "#355173",
                          "#247E38",
                          "#880808",
                        ],
                        barThickness: 60,
                      },
                    ],
                  }}
                  options={options}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>

        {/* Upcoming Events */}
        <Box sx={{ display: "flex", marginTop: "1em" }}>
          <h1 className="text-xl font-semibold">Upcoming Events</h1>
        </Box>
        <Box className="md:mt-5 xs:mt-2">
          <Box
            sx={{
              backgroundColor: "#355173",
              padding: "8px",
              display: "flex",
              alignItems: "center",
            }}
            className="gap-2"
          >
            <Typography
              onClick={() => navigate("/service-requests")}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                color: "whitesmoke",
                cursor: "pointer",
              }}
            >
              See More
            </Typography>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-white md:mr-5"
            />
          </Box>
          <Box
            sx={{
              border: "solid 1px",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            <Container maxWidth="lg">
              {upcomingEvents.map((req) => (
                <Paper
                  key={req.requestID}
                  sx={{
                    padding: "16px",
                    marginBottom: "16px",
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <Typography variant="h6">
                    {serviceMap[req.service_id]}
                  </Typography>
                  <Typography variant="body1">
                    <b>Requested by:</b>{" "}
                    {req.service_id == 5 || req.service_id == 6
                      ? req.father_name
                      : req.service_id == 7
                      ? req.first_name
                      : req.requested_by}
                  </Typography>
                  <Typography variant="body2">
                    <b>Date</b>: {util.formatDate(req.preferred_date)}
                  </Typography>
                </Paper>
              ))}
            </Container>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StaffDashboard;
