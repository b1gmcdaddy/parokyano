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
import { Pie, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  LineElement,
  Title,
  Legend,
  ArcElement,
  defaults,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  ChartDataLabels,
  Title,
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
  const [loading, setLoading] = useState(true);
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [],
  });

  const currentYear = new Date().getFullYear();
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
  // for line chart
  const fetchLineChartData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.API}/service/getCountReqPerMonth`
      );
      const data = response.data || []; // Ensure data is at least an empty array

      // If no data, set default empty state
      if (!data.length) {
        setLineChartData({
          labels: [],
          datasets: [
            {
              data: [],
              borderColor: "#355173",
              backgroundColor: "rgba(53, 81, 115, 0.2)",
              borderWidth: 2,
              fill: true,
            },
          ],
        });
        return;
      }

      const months = data.map((item) => item.month);
      const requestCounts = data.map((item) => item.requestCount);

      setLineChartData({
        labels: months,
        datasets: [
          {
            data: requestCounts,
            borderColor: "#355173",
            backgroundColor: "rgba(53, 81, 115, 0.2)",
            borderWidth: 2,
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching request data:", error);
      // Set empty state on error
      setLineChartData({
        labels: [],
        datasets: [
          {
            data: [],
            borderColor: "#355173",
            backgroundColor: "rgba(53, 81, 115, 0.2)",
            borderWidth: 2,
            fill: true,
          },
        ],
      });
    } finally {
      setLoading(false);
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
    fetchLineChartData();
  }, []);

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        align: "center",
        overflowX: "auto",
        labels: {
          boxWidth: 10,
          font: {
            size: 14,
          },
          padding: 20,
          generateLabels: (chart) => {
            const datasets = chart.data.datasets[0];
            return chart.data.labels.map((label, index) => ({
              text: `${label}: ${datasets.data[index]}`,
              fillStyle: datasets.backgroundColor[index],
              hidden: false,
              index: index,
            }));
          },
        },
      },
      datalabels: {
        color: "white", // Set the color of the labels inside the pie chart
        font: {
          size: 16,
        },
        formatter: (value, context) => {
          return value; // Return the data value (requests) as the label
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
              <FontAwesomeIcon icon={faChurch} className="text-2xl" />
              <Typography
                variant="h6"
                sx={{ marginLeft: "16px", fontWeight: "bold" }}
              >
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
              <FontAwesomeIcon icon={faStamp} className="text-2xl" />
              <Typography
                variant="h6"
                sx={{ marginLeft: "16px", fontWeight: "bold" }}
              >
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
              <FontAwesomeIcon icon={faHandsPraying} className="text-2xl" />
              <Typography
                variant="h6"
                sx={{ marginLeft: "16px", fontWeight: "bold" }}
              >
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

        <Grid container spacing={1.1} marginTop={"2em"}>
          <Grid item xs={12} sm={4} sx={{ padding: 2 }}>
            <Paper elevation={4} sx={{ padding: 3 }}>
              <Typography
                sx={{ paddingBottom: 3, fontSize: "1.2em", fontWeight: "bold" }}
              >
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
                    height: "250px",
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
                <div style={{ height: "250px" }}>
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
                          backgroundColor: ["#355173", "#247E38", "#899499"],
                          hoverBackgroundColor: [
                            "#355173",
                            "#247E38",
                            "#899499",
                          ],
                        },
                      ],
                    }}
                    options={pieOptions}
                    plugins={[ChartDataLabels]}
                  />
                </div>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} sm={8} sx={{ padding: 0.1 }}>
            <Paper elevation={4} sx={{ padding: 3 }}>
              <Typography
                sx={{ paddingBottom: 3, fontSize: "1.2em", fontWeight: "bold" }}
              >
                Number of Requests Received for {currentYear}
              </Typography>
              <div style={{ height: "250px" }}>
                {loading ? (
                  <p>Loading data...</p>
                ) : (
                  lineChartData.labels && (
                    <Line
                      data={lineChartData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false,
                            position: "top",
                          },
                          tooltip: {
                            enabled: true,
                          },
                          datalabels: {
                            display: true,
                            align: "top",
                            anchor: "end",
                            font: {
                              weight: "bold",
                              size: 12,
                            },
                            formatter: (value) => value,
                          },
                        },
                        scales: {
                          x: {
                            title: {
                              display: true,
                              text: "Month",
                            },
                          },
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: "Number of Requests",
                            },
                            suggestedMax: function (context) {
                              const max = Math.max(
                                ...context.chart.data.datasets[0].data
                              );
                              return max + max * 0.1; // Add 10% padding
                            },
                          },
                        },
                      }}
                    />
                  )
                )}
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
