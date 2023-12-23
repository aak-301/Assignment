import {
  Box,
  Button,
  Modal,
  TextField,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants/constants.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

function Home() {
  const modalObj = {
    Name: "",
    score: "",
    City: "",
    Country: "",
    Passed: "",
    Address: "",
  };

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedRowData, setselectedRowData] = useState(modalObj);
  const [isAddingNewField, setisAddingNewField] = useState(false);
  const [rankModal, setrankModal] = useState([]);

  const [message, setmessage] = useState({
    severity: "",
    msg: "",
    open: false,
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "Name", headerName: "Name", flex: 1, sortable: false },
    { field: "score", headerName: "SAT Score", flex: 1 },
    {
      field: "City",
      headerName: "City",
      sortable: false,
      flex: 1,
    },
    {
      field: "Country",
      headerName: "Country",
      sortable: false,
      flex: 1,
    },
    {
      field: "Passed",
      headerName: "Passed",
      sortable: false,
      flex: 1,
    },
    {
      field: "Address",
      headerName: "Address",
      sortable: false,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <DeleteIcon
              sx={{ color: "red", paddingRight: 1 }}
              onClick={(e) => deleteRow(params["row"])}
              variant="contained"
            >
              Delete
            </DeleteIcon>
            <ModeEditIcon
              sx={{ color: "teal" }}
              onClick={(e) => onSelectRow(params["row"])}
              variant="contained"
            >
              Delete
            </ModeEditIcon>
          </Box>
        );
      },
    },
    {
      field: "rank",
      headerName: "Rank",
      width: 400,
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            sx={{ display: "flex", flexDirection: "row" }}
            onClick={() => setrankModal([params["row"]])}
            border="1px solid #E5E3E3"
            borderRadius={2}
            boxShadow="1px 1px #EEECEC"
            padding={0.4}
            color="#565554"
          >
            Check Rank
          </Box>
        );
      },
    },
  ];

  console.log("rankModal: ", rankModal);

  const editSatScore = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      console.log(e);
      const res = await axios.patch(`${BASE_URL}/`, {
        name: selectedRowData.Name,
        score: selectedRowData.score,
      });
      if (res.data) {
        fetchData();
        closeModal();
        setmessage({
          severity: "success",
          msg: "Score Udated successfully",
          open: true,
        });
      }
    } catch (err) {
      setmessage({
        severity: "error",
        msg: "Error while updating user data",
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (isAddingNewField) {
      setisAddingNewField(false);
    }
    setselectedRowData(modalObj);
    setModal(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/`);
      for (let i = 0; i < res.data.data.length; i++) {
        res.data.data[i]["id"] = i + 1;
      }
      setUserData(res.data.data);
    } catch (err) {
      console.log(err);
      setmessage({ severity: "error", msg: "Error fetching data", open: true });
    } finally {
      setLoading(false);
    }
  };

  const onSelectRow = (e) => {
    console.log(e);
    const data = userData.filter((user) => user.Name === e.Name);
    console.log("data: ", data);
    setselectedRowData(data[0]);
    setModal(true);
  };

  const addNewRow = async (e) => {
    try {
      const res = await axios.post(`${BASE_URL}/`, selectedRowData);
      if (res.data) {
        fetchData();
        closeModal();
        setmessage({
          severity: "success",
          msg: "Successfully added user data",
          open: true,
        });
      }
    } catch (err) {
      setmessage({
        severity: "error",
        msg: "Error while adding user data",
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteRow = async (e) => {
    try {
      setLoading(true);
      console.log(e);
      const res = await axios.delete(`${BASE_URL}?name=${e.Name}`);
      if (res.data) {
        fetchData();
        setmessage({
          severity: "success",
          msg: "Successfully deleted user data",
          open: true,
        });
      }
    } catch (err) {
      setmessage({
        severity: "error",
        msg: "Error while deleting data",
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("isAddingNewField", isAddingNewField);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 20,
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        Loading...
      </Box>
    );

  if (!loading)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          alignItems: "end",
          // height: "40%",
          width: "100%",
          // position: "absolute",
          marginTop: 12,
        }}
      >
        <Box
          sx={{
            width: "98%",
            height: "30%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "end",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "teal", color: "#ffffff" }}
              onClick={() => {
                setisAddingNewField(true);
                setModal(true);
              }}
            >
              Insert Data
            </Button>

            <Button
              variant="contained"
              sx={{ backgroundColor: "teal", color: "#ffffff" }}
              onClick={fetchData}
            >
              Reload List
            </Button>
          </Box>
        </Box>
        <div style={{ height: "auto", width: "100%" }}>
          <DataGrid
            sx={{
              maxHeight: "90%",
              minHeight: userData.length == 0 ? "200%" : "90%",
            }}
            rows={userData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
          {rankModal.length > 0 && (
            <Modal open={rankModal.length > 0} onClose={() => setrankModal([])}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  maxWidth: "50%",
                  maxHeight: "90vh",
                  width: 1000,
                  borderRadius: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>You rank is: {rankModal[0].id}</Box>
                <Box>You score {rankModal[0].score}/1600</Box>
              </Box>
            </Modal>
          )}
          <Modal open={modal} onClose={closeModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                maxWidth: "50%",
                maxHeight: "90vh",
                width: 1000,
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <InputLabel>Name</InputLabel>
                  <TextField
                    title="Name"
                    type="text"
                    name="Name"
                    value={selectedRowData["Name"]}
                    style={{ width: "100%" }}
                    disabled={!isAddingNewField ? true : false}
                    focused={isAddingNewField ? true : false}
                    onChange={(e) => {
                      if (isAddingNewField)
                        setselectedRowData({
                          ...selectedRowData,
                          [e.target.name]: e.target.value,
                        });
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <InputLabel>Sat Score</InputLabel>
                  <TextField
                    title="Sat Score"
                    type="text"
                    name="score"
                    value={selectedRowData["score"]}
                    style={{ width: "100%" }}
                    focused={!isAddingNewField ? true : false}
                    onChange={(e) => {
                      setselectedRowData({
                        ...selectedRowData,
                        [e.target.name]: e.target.value,
                      });
                      if (e.target.value > 1600) {
                        setmessage({
                          severity: "warning",
                          msg: "Please enter score in range of 0-1600",
                          open: true,
                        });
                      }
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  marginTop: 2,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <InputLabel>City</InputLabel>
                  <TextField
                    title="City"
                    type="text"
                    name="City"
                    value={selectedRowData["City"]}
                    style={{ width: "100%" }}
                    disabled={!isAddingNewField ? true : false}
                    onChange={(e) => {
                      if (isAddingNewField)
                        setselectedRowData({
                          ...selectedRowData,
                          [e.target.name]: e.target.value,
                        });
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <InputLabel>Country</InputLabel>
                  <TextField
                    title="Country"
                    type="text"
                    name="Country"
                    value={selectedRowData["Country"]}
                    style={{ width: "100%" }}
                    disabled={!isAddingNewField ? true : false}
                    onChange={(e) => {
                      if (isAddingNewField)
                        setselectedRowData({
                          ...selectedRowData,
                          [e.target.name]: e.target.value,
                        });
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  marginTop: 2,
                }}
              >
                {!isAddingNewField && (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", flex: 1 }}
                  >
                    <InputLabel>Passed</InputLabel>
                    <TextField
                      title="Passed"
                      type="text"
                      value={selectedRowData["Passed"]}
                      style={{ width: "100%" }}
                      disabled={!isAddingNewField ? true : true}
                    />
                  </Box>
                )}
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <InputLabel>Address</InputLabel>
                  <TextField
                    title="Address"
                    type="text"
                    name="Address"
                    value={selectedRowData["Address"]}
                    style={{ width: "100%" }}
                    disabled={!isAddingNewField ? true : false}
                    onChange={(e) => {
                      if (isAddingNewField)
                        setselectedRowData({
                          ...selectedRowData,
                          [e.target.name]: e.target.value,
                        });
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  justifyContent: "end",
                  marginTop: 2,
                }}
              >
                {!isAddingNewField && (
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "teal", color: "#ffffff" }}
                    onClick={editSatScore}
                  >
                    Edit
                  </Button>
                )}
                {isAddingNewField && (
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "teal", color: "#ffffff" }}
                    onClick={addNewRow}
                  >
                    Add
                  </Button>
                )}
              </Box>
            </Box>
          </Modal>
        </div>
        <Snackbar
          open={message.open}
          autoHideDuration={1500}
          onClose={() => {
            setmessage({
              severity: "",
              msg: "",
              open: false,
            });
          }}
        >
          <Alert
            onClose={() => {
              setmessage({
                severity: "",
                msg: "",
                open: false,
              });
            }}
            severity={message.severity}
            sx={{ width: "100%" }}
          >
            {message.msg}
          </Alert>
        </Snackbar>
      </Box>
    );
}

export default Home;
