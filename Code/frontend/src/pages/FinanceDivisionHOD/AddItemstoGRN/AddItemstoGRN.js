import styles from "./addItemstoGRN.module.css";
import React, { useEffect, useState } from "react";
import SideNavBar from "../../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Container } from "@mui/system";
import { users } from "../../../users/SystemUsers";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Link as Routerlink, useParams } from "react-router-dom";
import DonePopup from "../../../components/Popups/DonePopup/DonePopup";
import {
  IconButton,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  makeStyles,
  Paper,
  Button,
  Typography,
  TextField,
} from "@mui/material";
//import { Rotate90DegreesCcw } from "@mui/icons-material";
import SelectDropDown from "../../../components/SelectDropDown/SelectDropDown";
import {
  CreateGRN,
  GetPOItemDetailsForGRN,
  GetPoIdList,
} from "../../../services/ProcurementHOD/ProcurementHODServices";
import {user} from "../../Usermanage"

function AddItemstoGRN() {
  //   const classes = useStyles();
  const [leftTableData, setLeftTableData] = useState([]);
  const [rightTableData, setRightTableData] = useState([]);
  const [poIds, setpoIds] = useState([]);
  const [selectedpoId, setSelectedpoId] = useState("");
  const [isGRNCreated, setIsGRNCreated] = useState(false);
  const [grnId, setGrnId] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await GetPoIdList();
        const data = response;
        setpoIds(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetPOItemDetailsForGRN(selectedpoId);
        const data = response;
        setLeftTableData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    // Retrieving arrays from sessionStorage
    const storedArray1 = JSON.parse(sessionStorage.getItem("leftTableData"));
    const storedArray2 = JSON.parse(sessionStorage.getItem("rightTableData"));

    // If arrays exist, we retrieve them from sessionStorage and set them to state.
    if (storedArray1 && storedArray2) {
      setLeftTableData(storedArray1);
      setRightTableData(storedArray2);
    } else {
      fetchData();
    }
  }, [selectedpoId]);

  const handleCreateGRN = async () => {
    try {
     
      const createdGrnId = await CreateGRN(selectedpoId, rightTableData);
      sessionStorage.removeItem("leftTableData");
      sessionStorage.removeItem("rightTableData");
      console.log(user.id);
      setIsGRNCreated(true);
      console.log(createdGrnId);
      console.log(rightTableData);
      setGrnId(createdGrnId); // Set the grnId in state
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickLeftToRight = (row) => {
    setRightTableData([...rightTableData, row]);
    setLeftTableData(
      leftTableData.filter((data) => data.itemId !== row.itemId)
    );
  };

  const handleClickRightToLeft = (row) => {
    setLeftTableData([...leftTableData, row]);
    setRightTableData(
      rightTableData.filter((data) => data.itemId !== row.itemId)
    );
  };

  const handlepoIdChange = (event) => {
    setSelectedpoId(event.target.value);
  };

  const handleReceivedQuantityChange = (itemId, event) => {
    const value = event.target.value;
    setRightTableData((prevData) =>
      prevData.map((row) =>
        row.itemId === itemId ? { ...row, receivedQty: parseInt(value)  } : row
      )
    );
  };


  return (
    <div>
      <Container
        className={styles.main}
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          display: "flex",

          flexDirection: "column",
        }}
      >
        <div className={styles.upperSection}>
          <div className={styles.ManageAuctionPageContainer__header}>
            <Routerlink to={-1}>
              <IconButton
                sx={{ pl: "15px", height: "34px", width: "34px", mt: 3.7 }}
              >
                <ArrowBackIosIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            </Routerlink>
            <h1 className={styles.Header}>Goods Received Note</h1>
          </div>
        </div>
        <div className={styles.OuterMiddle}>
          <div className={styles.flexrow}>
            <div className={styles.header2}>
              <Typography sx={{ marginLeft: 2 }}>PURCHASE ORDER ID*</Typography>
              <SelectDropDown
                list={poIds}
                value={selectedpoId}
                onChange={handlepoIdChange}
              />
            </div>
          </div>
          <Container
            className={styles.MiddleSection}
            sx={{
              display: "flex",
              pt: 4,
              flexDirection: { xs: "column", lg: "row" },
            }}
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <div className={styles.leftTable}>
              <TableContainer
                className={styles.TableContainer}
                component={Paper}
              >
                <Table className={styles.table} aria-label="left table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item ID</TableCell>
                      <TableCell>Item Name</TableCell>
                      <TableCell>Order Quantity</TableCell>
                      <TableCell>Total Received Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leftTableData.map((row) => (
                      <TableRow
                        className={styles.TableRow}
                        key={row.itemId}
                        onClick={() => handleClickLeftToRight(row)}
                      >
                        <TableCell component="th" scope="row">
                          {row.itemId}
                        </TableCell>
                        <TableCell>{row.itemName}</TableCell>
                        <TableCell>{row.orderedQuantity}</TableCell>
                        <TableCell>{row.receivedQuantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div
              className="ArrowSection"
              style={{ alignSelf: "center", margin: 10 }}
            >
              <DoubleArrowIcon
                style={{ fontSize: 50 }}
                sx={{
                  transform: {
                    xs: "rotate(90deg)",
                    sm: "rotate(90deg)",
                    lg: "rotate(0deg)",
                  },
                }}
              />{" "}
            </div>
            <div className={styles.rightTable}>
              <TableContainer
                className={styles.TableContainer}
                component={Paper}
              >
                <Table className={styles.table} aria-label="right table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item Name</TableCell>
                      <TableCell>Order Quantity</TableCell>
                      <TableCell>Received Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rightTableData.map((row) => (
                      <TableRow
                        className={styles.TableRow}
                        key={row.itemId}
                        onClick={() => handleClickRightToLeft(row)}
                      >
                        <TableCell component="th" scope="row">
                          {row.itemName}
                        </TableCell>
                        <TableCell>{row.orderedQuantity}</TableCell>
                        <TableCell>
                          {
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              size="small"
                              id="bidvalue"
                              name="bidvalue"
                              sx={{ width: 100 }}
                              value={row.receivedQty}
                              onClick={(event) => event.stopPropagation()}
                              onChange={(event) =>{
                                event.stopPropagation();
                                handleReceivedQuantityChange(row.itemId, event)
                              }}
                            />
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Container>
        </div>
        <div className={styles.lowerSection}>
          <Container
            className={styles.rightButton}
            sx={{ justifyContent: { xs: "left", sm: "center", lg: "center" } }}
          ><Button
                onClick={() =>{handleCreateGRN()}}
                className={styles.TecAppointButton}
                variant="contained"
                sx={{
                  mt: 4,
                  ml: 110,
                  borderRadius: 4,
                  mb: 0.3,
                  minWidth: "50px",
                }}
              >
                Save
              </Button>
          
            <Routerlink to={`/grn-view/${selectedpoId}/${grnId}`}>
              <Button
                // onClick={() =>{handleCreateGRN()}}
                className={styles.TecAppointButton}
                variant="contained"
                sx={{
                  mt: 4,
                  ml: 110,
                  borderRadius: 4,
                  mb: 0.3,
                  minWidth: "50px",
                }}
              >
                Create GRN
              </Button>
            </Routerlink>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default AddItemstoGRN;
