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
import {useEffect, useState} from "react";
import all from "../../../components/certificate-request-modals/CertificateInfoModal";
import React from "react";
import axios from "axios";
import config from "../../../config";
import util from "../../../utils/DateTimeFormatter";
import PrintCertificate from "../../../components/certificate-request-modals/PrintCertificate";

const CertificateForClaiming = () => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openPrint, setOpenPrint] = useState(false);
  const [modalData, setModalData] = useState({
    certificate_details: [""],
  });
  const rowsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const schedule = (_date, _time) => {
    return (
      util.formatTime(_time) + " ,  " + util.formatDate(_date.slice(0, 10))
    );
  };

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${config.API}/request/retrieve-certs`, {
        params: {
          status: "approved",
          page: page + 1,
          limit: rowsPerPage,
        },
      });
      setTableData(res.data.result);
    } catch (err) {
      console.error("error retrieving pending reqs", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalItems = async () => {
    try {
      const response = await axios.get(`${config.API}/request/count-certs`, {
        params: {
          status: "pending",
        },
      });
      setTotalItems(response.data.count);
      console.log(totalItems);
      console.log(totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const openInfoModal = (cert) => {
    setOpenModal(true);
    setModalType(cert.service_id);
    setModalData(cert);
  };

  const closeInfoModal = () => {
    setOpenModal(false);
  };

  const openPrintModal = () => {
    setOpenPrint(true);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchCertificates();
    fetchTotalItems();
  }, [page]);

  return (
    <div style={{margin: "0 auto"}}>
      {modalType === 2 && (
        <all.ConfirmationCertInfoModal
          open={openModal}
          data={modalData}
          close={closeInfoModal}
        />
      )}
      {modalType === 3 && (
        <all.BaptismCertInfoModal
          open={openModal}
          data={modalData}
          close={closeInfoModal}
        />
      )}
      {modalType === 4 && (
        <all.MarriageCertInfoModal
          open={openModal}
          data={modalData}
          close={closeInfoModal}
        />
      )}
      <PrintCertificate open={openPrint} close={() => setOpenPrint(false)} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
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
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}>
                    REQUESTED BY
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "none",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}>
                    TYPE OF CERTIFICATE
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "none",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}>
                    DATE REQUESTED
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "none",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}>
                    TRANSACTION NO.
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "none",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}>
                    ACTIONS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((cert) => (
                  <React.Fragment key={cert.requestID}>
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
                        {cert.father_name}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          backgroundColor: "#e0e0e0",
                        }}>
                        {cert.service_id == 2
                          ? "Confirmation"
                          : cert.service_id == 3
                          ? "Baptism"
                          : cert.service_id == 4
                          ? "Marriage"
                          : null}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          backgroundColor: "#e0e0e0",
                        }}>
                        {cert.date_requested}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          backgroundColor: "#e0e0e0",
                        }}>
                        {cert.transaction_no}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          padding: "16px",
                          textAlign: "center",
                          borderRadius: "0 15px 15px 0",
                          backgroundColor: "#e0e0e0",
                          display: "flex",
                          justifyContent: "center",
                          gap: 2,
                        }}>
                        <Button
                          type="button"
                          sx={{
                            backgroundColor: "#355173",
                            color: "white",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: "#0036B1",
                            },
                          }}
                          onClick={() => openInfoModal(cert)}>
                          INFO
                        </Button>
                        <Button
                          type="button"
                          onClick={openPrintModal}
                          sx={{
                            backgroundColor: "#44C360",
                            color: "white",
                            borderRadius: "10px",
                            "&:hover": {
                              backgroundColor: "green",
                            },
                          }}>
                          View Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
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
        </>
      )}
    </div>
  );
};

export default CertificateForClaiming;
