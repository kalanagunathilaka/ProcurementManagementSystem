import styles from "./CreateModifyTECCommittee.module.css";
import React, { useEffect, useState } from "react";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Container } from "@mui/system";
import { users } from "../../users/SystemUsers";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import DonePopup from "../../components/Popups/DonePopup/DonePopup";
import { Link as Routerlink, useParams } from "react-router-dom";
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
} from "@mui/material";
import { Rotate90DegreesCcw } from "@mui/icons-material";
import {fetchMembersForTecCommitee, modifyTECCommitteeToDb} from "../../services/ProcurementHOD/ProcurementHODServices";
import{submitTECCommitteeToDb} from "../../services/ProcurementHOD/ProcurementHODServices";
import {fetchAlreadyMembersInTecCommittee} from "../../services/ProcurementHOD/ProcurementHODServices";

const rows = users;

function CreateModifyTECCommittee() {
  const {mppId}= useParams();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const[value,setvalue]=useState("Create TEC Committee");
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await fetchAlreadyMembersInTecCommittee(mppId);

        const data = response;
        setLeftTableData(data.otherEmployees);
        setRightTableData(data.employeesInTECCommittee );
        if(data.employeesInTECCommittee.length>0){
          setvalue("Modify TEC Committee");
        }
     console.log(rightTableData);
      } catch (error) {
        console.log(error);
      }
    };
    if (isFirstRender) {

    fetchData();
  }
   
  }, [isFirstRender]);
  //   const classes = useStyles();
  const [leftTableData, setLeftTableData] = useState(rows);
  const [rightTableData, setRightTableData] = useState([]);


  
  const handleClickLeftToRight = (row) => {
    setRightTableData([...rightTableData, row]);
    setLeftTableData(leftTableData.filter((data) => data.employeeId !== row.employeeId));
  };

  const handleClickRightToLeft = (row) => {
    setLeftTableData([...leftTableData, row]);
    setRightTableData(rightTableData.filter((data) => data.employeeId !== row.employeeId));
  };
  const handleSubmit = () => {
    if(rightTableData.length>0){
      modifyTECCommitteeToDb(mppId,rightTableData.filter(item => item !== null).map((item) => {
        return item.employeeId
        
      }));
    }else{
      submitTECCommitteeToDb(mppId,rightTableData.filter(item => item !== null).map((item) => {
        return item.employeeId
        
      }));
    }
    
    setIsFormSubmitted(true);
  };

  const handleDivClick = (event) => {
    event.stopPropagation();
    if (!isFormSubmitted) {
      handleSubmit();
    }
  };
  const dataNotification = [
    {
      message: 'You have New Master Procurement plan to Evaluate !',
      type: 'New Master Procurement plan for Evaluate',
      mppId: mppId,
      committeeType: 'Tec'
    },
  ];

  
  return (
    <div>

      <Container
        className={styles.main}
        sx={{
          ml: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
          display: "flex",

          flexDirection: "column",
          //   overflowY: "hidden",
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
            <h1 className={styles.Header}>Create TEC Committee</h1>
          </div>
        </div>
        <div className={styles.OuterMiddle}>
          <div className={styles.Ph2}>
            <h4>Master Procurement Id : {mppId}</h4>
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
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Department</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leftTableData.map((row) => (
                      <TableRow
                        className={styles.TableRow}
                        key={row.employeeId}
                        onClick={() => handleClickLeftToRight(row)}
                      >
                        <TableCell component="th" scope="row">
                          {row.employeeId}
                        </TableCell>
                        <TableCell>
                          {row.employeeName}
                        </TableCell>
                        <TableCell>{row.divisionName
}</TableCell>
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
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Department</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rightTableData.map((row) => (
                      <TableRow
                        className={styles.TableRow}
                        key={row.employeeId}
                        onClick={() => handleClickRightToLeft(row)}
                      >
                        <TableCell component="th" scope="row">
                          {row.employeeId}
                        </TableCell>
                        <TableCell>
                          {row.employeeName}
                        </TableCell>
                        <TableCell>{row.divisionName}</TableCell>
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
          ><div
          onClick={handleDivClick}
          
          
          >
            <DonePopup
            CommitteeNotification={true}
            notificationData={dataNotification[0]}
            text={`Successfully ${value}`}
            title={value}
            styles={{
              position: "absolute",
              right: "0",
              bgcolor: "#205295",
              borderRadius: 5,
              height: 60,
              width: 200,
            }}
          />
          </div>
            
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default CreateModifyTECCommittee;
