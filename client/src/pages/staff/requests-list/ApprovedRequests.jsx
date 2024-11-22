import React, {useState, useEffect} from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
import config from "../../../config";
import util from "../../../utils/DateTimeFormatter";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

//Modals
import AnointingApproved from "../../../components/service-request-modals/pending/approved/anointingApproved";
import BaptismApproved from "../../../components/service-request-modals/pending/approved/baptismApproved";
import BlessingApproved from "../../../components/service-request-modals/pending/approved/blessingApproved";
import FuneralMassModalApproved from "../../../components/service-request-modals/pending/approved/funeralMassApproved";
import OutsideApproved from "../../../components/service-request-modals/pending/approved/outsideMassApproved";
import WakeApproved from "../../../components/service-request-modals/pending/approved/wakeApproved";
import WeddingApproved from "../../../components/service-request-modals/pending/approved/weddingApproved";
import ConfirmationDialog from "../../../components/ConfirmationModal";

const ApprovedRequests = ({filter, page, totalItems, handlePageChange}) => {
  const [tableData, setTableData] = useState([]);
  const [tableDataPriests, setTableDataPriests] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const cancelRequest = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const req = selectedRequest;
    try {
      axios.put(`${config.API}/request/update`, null, {
        params: {
          col: "status",
          val: "cancelled",
          id: req.requestID,
        },
      });
      axios
        .delete(`${config.API}/priest/deleteSched`, {
          params: {
            col: "request_id",
            val: req.requestID,
          },
        })
        .then(() => {
          axios.post(`${config.API}/logs/create`, {
            activity: `Cancelled Request - Transaction number: ${req.transaction_no}`,
            user_id: currentUser.id,
            request_id: req.requestID,
          });
          console.log("logs success!");
          setSuccess({
            message: "Cancelation Success",
            details: "The request has been successfully canceled.",
          });
          fetchRequests();
        });
    } catch (err) {
      console.error("error updating request", err);
      setError({
        message: err,
        details: "",
      });
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${config.API}/request/retrieve-request`, {
        params: {
          status: "approved",
          page: page + 1,
          limit: 10,
        },
      });
      setTableData(res.data.result);
    } catch (err) {
      console.error("error retrieving pending reqs", err);
    }
  };

  const fetchPriests = async () => {
    try {
      const res = await axios.get(`${config.API}/priest/retrieve`, {
        params: {
          col: "status",
          val: "active",
        },
      });
      setTableDataPriests(res.data);
    } catch (err) {
      console.error("error retrieving pending reqs", err);
    }
  };

  const refreshList = async () => {
    await fetchRequests();
  };

  const handleOpenDialog = (action, req) => {
    setSelectedRequest(req);
    setCurrentAction(action);
    setDialogOpen(true);
  };

  // const handlePageChange = (newPage) => {
  //   if (newPage >= 0 && newPage < totalPages) {
  //     setPage(newPage);
  //   }
  // };

  useEffect(() => {
    if (filter && filter?.length > 0) {
      setTableData(filter);
    } else {
      fetchRequests();
    }
    // fetchTotalItems();
  }, [filter, page, totalItems]);

  useEffect(() => {
    fetchPriests();
  }, [open, page]);

  const renderModal = () => {
    switch (modalType) {
      case "Anointing of the sick":
        return (
          <AnointingApproved
            open={modalOpen}
            data={modalData}
            handleClose={() => setModalOpen(false)}
            refreshList={refreshList}
          />
        );
      case "Baptism - General":
        return (
          <BaptismApproved
            open={modalOpen}
            data={modalData}
            handleClose={() => setModalOpen(false)}
            refreshList={refreshList}
          />
        );
      case "Baptism - Appointment":
        return (
          <BaptismApproved
            open={modalOpen}
            data={modalData}
            handleClose={() => setModalOpen(false)}
            refreshList={refreshList}
          />
        );
      case "Blessing":
        return (
          <BlessingApproved
            open={modalOpen}
            data={modalData}
            handleClose={() => setModalOpen(false)}
            refreshList={refreshList}
          />
        );
      case "Funeral Mass":
        return (
          <FuneralMassModalApproved
            open={modalOpen}
            data={modalData}
            handleClose={() => setModalOpen(false)}
            refreshList={refreshList}
          />
        );
      case "Outside Mass":
        return (
          <OutsideApproved
            open={modalOpen}
            data={modalData}
            handleClose={() => setModalOpen(false)}
            refreshList={refreshList}
          />
        );
      case "Wake Mass":
        return (
          <WakeApproved
            open={modalOpen}
            data={modalData}
            handleClose={() => setModalOpen(false)}
            refreshList={refreshList}
          />
        );
      case "Wedding":
        return (
          <WeddingApproved
            open={modalOpen}
            data={modalData}
            handleClose={() => setModalOpen(false)}
            refreshList={refreshList}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {error && (
        <Snackbar
          anchorOrigin={{vertical: "top", horizontal: "center"}}
          open={true}
          autoHideDuration={5000}
          onClose={() => setError(null)}>
          <Alert severity="error" sx={{width: "100%"}}>
            <AlertTitle>{error.message}</AlertTitle>
            {error.details}
          </Alert>
        </Snackbar>
      )}

      {success && (
        <Snackbar
          anchorOrigin={{vertical: "top", horizontal: "center"}}
          open={true}
          autoHideDuration={5000}
          onClose={() => setSuccess(null)}>
          <Alert severity="info" sx={{width: "100%"}}>
            <AlertTitle>{success.message}</AlertTitle>
            {success.details}
          </Alert>
        </Snackbar>
      )}

      <div style={{margin: "0 auto"}}>
        <TableContainer
          sx={{
            display: "flex",
            borderRadius: "16px",
            overflowX: "auto",
            border: "none",
          }}>
          <Table
            stickyHeader
            aria-label="custom table"
            sx={{
              borderCollapse: "separate",
              borderSpacing: 0,
              sm: {minWidth: 650},
            }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    textAlign: "center",
                    border: "none",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                  }}>
                  SERVICE
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    border: "none",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                  }}>
                  SCHEDULED DATE
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    border: "none",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                  }}>
                  PRIEST ASSIGNED
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    border: "none",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                  }}>
                  REQUESTED BY
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    border: "none",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                  }}>
                  CONTACT NO.
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    border: "none",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                  }}>
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.length > 0 ? (
                tableData.map((req) => (
                  <React.Fragment key={req.requestID}>
                    {/* this is to add space in between rows sa table */}
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        sx={{
                          backgroundColor: "#ffffff",
                          padding: 0,
                          border: "none",
                        }}>
                        <Box sx={{height: "5px", backgroundColor: "white"}} />
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "10px",
                        "& > *": {
                          borderBottom: "none",
                        },
                      }}>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          borderRadius: "15px 0 0 15px",
                          backgroundColor: "#e0e0e0",
                        }}>
                        {req?.service_name?.length > 20
                          ? req.service_name.substring(0, 20) + "..."
                          : req.service_name}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          backgroundColor: "#e0e0e0",
                        }}>
                        {util.formatDate(req.preferred_date)}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          backgroundColor: "#e0e0e0",
                        }}>
                        {tableDataPriests.find(
                          (p) => p.priestID == req.priest_id
                        )?.first_name +
                          " " +
                          tableDataPriests.find(
                            (p) => p.priestID == req.priest_id
                          )?.last_name}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          backgroundColor: "#e0e0e0",
                        }}>
                        {req.service_id == 5 || req.service_id == 6
                          ? req.father_name
                          : req.service_id == 7
                          ? req.first_name
                          : req.requested_by}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          backgroundColor: "#e0e0e0",
                        }}>
                        {req.contact_no}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          borderRadius: "0 15px 15px 0",
                          backgroundColor: "#e0e0e0",
                        }}>
                        <Button
                          variant="contained"
                          type="button"
                          sx={{
                            backgroundColor: "#355173",
                            color: "white",
                            marginRight: "8px",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: "#0036B1",
                            },
                          }}
                          onClick={() => {
                            setModalData(req);
                            setModalType(req.service_name);
                            setModalOpen(true);
                          }}>
                          INFO
                        </Button>
                        <Button
                          variant="contained"
                          type="button"
                          sx={{
                            backgroundColor: "#C34444",
                            color: "white",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: "#880808",
                            },
                          }}
                          onClick={() => {
                            handleOpenDialog("cancel", req);
                          }}>
                          CANCEL
                        </Button>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              ) : (
                //NEEDS WORK
                //temporary:
                <div className="float ">
                  <h1 className="">No requests found</h1>
                </div>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2,
          }}>
          <IconButton
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0} // Disable on the first page
            sx={{
              backgroundColor: page === 0 ? "grey.300" : "black",
              color: page === 0 ? "grey.600" : "white",
              marginRight: "10px",
            }}>
            <KeyboardArrowLeft />
          </IconButton>

          <Typography sx={{margin: "0 10px", fontWeight: "bold"}}>
            Page {page + 1} of {totalPages}
          </Typography>

          <IconButton
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages - 1} // Disable on the last page
            sx={{
              backgroundColor: page === totalPages - 1 ? "grey.300" : "black",
              color: page === totalPages - 1 ? "grey.600" : "white",
              marginLeft: "10px",
            }}>
            <KeyboardArrowRight />
          </IconButton>
        </Box>
        {renderModal()}

        <ConfirmationDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          action={currentAction}
          onConfirm={() => cancelRequest()}
          service={""}
        />
      </div>
    </>
  );
};

export default ApprovedRequests;
