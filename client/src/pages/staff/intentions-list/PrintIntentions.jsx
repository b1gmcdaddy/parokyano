import React, { useState, useEffect } from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Divider,
  Dialog,
  Slide,
  Box,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ReactToPrint from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faPrint,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import config from "../../../config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const fetchIntentions = async () => {
  setLoading(true);
  try {
    const response = await axios.get(
      `${config.API}/request/retrieve-multiple`,
      {
        params: {
          col1: "service_id",
          val1: 1,
          col2: "status",
          val2: "approved",
          order: "date_requested",
          page: page + 1,
          limit: rowsPerPage,
        },
      }
    );
    setTableData(response.data.result);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false); // Set loading to false when fetching is done
  }
};

// const componentRef = useRef();

const PrintIntentions = ({ open, close }) => {
  const [dateSelected, setDateSelected] = useState(null);
  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative", backgroundColor: "#355173" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={close}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Mass Intentions Print Preview
          </Typography>

          <Button autoFocus color="inherit">
            <FontAwesomeIcon
              icon={faFileExport}
              className="text-white md:mr-5 md:ml-2"
            />
            Export
          </Button>

          <Button autoFocus color="inherit" sx={{ marginLeft: "1em" }}>
            <FontAwesomeIcon
              icon={faPrint}
              className="text-white md:mr-5 md:ml-2"
            />
            Print
          </Button>
        </Toolbar>
      </AppBar>

      <Box className="md:mt-14 xs:mt-14 w-3/4 m-auto ">
        <Box
          sx={{
            backgroundColor: "#d9d9d9",
            color: "white",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "16px",
          }}
          className="gap-2"
        >
          <Typography component="div" sx={{ ml: 2, color: "black" }}>
            Select Date:
          </Typography>
          <TextField
            type="date"
            size="small"
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          />
        </Box>

        <Box
          sx={{
            height: "700px",
            overflowY: "auto",
            backgroundColor: "#F5F5F5",
          }}
        >
          <Box sx={{ backgroundColor: "white", height: "700px" }}>lkjlkjlk</Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PrintIntentions;
