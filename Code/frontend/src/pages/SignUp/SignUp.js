import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { Card, CardContent, Divider } from "@mui/material";
import "./SignUp.css";
import logo from "../../images/logo.png";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { registerVenderToSystem } from "../../services/Vendor/Vendorservices";

const theme = createTheme({
  typography: {
    h5: {
      fontFamily: "Mulish",
      fontWeight: 1000,
    },
    h6: {
      fontFamily: "Mulish",
      fontWeight: 10,
    },
    h7: {
      fontFamily: "Mulish",
      fontWeight: 1000,
      fontSize: 20,
    },
  },
});

export default function Signup() {
  const onSubmit = (data) => {
    console.log(data);
    registerVenderToSystem(data, businessRegistrationFile, taxIdentificationFile, insuranceCertificateFile, otherDocumentsFile);
  };

  const CustomAddCircleOutlineIcon = styled(AddCircleOutlineIcon)(({ theme, isPdf }) => ({
    verticalAlign: 'middle',
    marginLeft: '5px',
    color: isPdf ? theme.palette.primary.main : 'inherit',
  }));

  const form = useForm({
    mode:"onTouched"
  });
  const { register, handleSubmit, control, formState } = form;
  const { errors,isValid } = formState;
  const [businessRegistrationFile, setBusinessRegistrationFile] = useState(null);
  const [taxIdentificationFile, setTaxIdentificationFile] = useState(null);
  const [insuranceCertificateFile, setInsuranceCertificateFile] = useState(null);
  const [otherDocumentsFile, setOtherDocumentsFile] = useState(null);

  const handleFileUpload = (event, fileSetter) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      fileSetter(file);
      // Perform further actions with the PDF file
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center' ,padding:75}}>
      <Card variant="outlined" sx={{ minWidth: 275,maxWidth:600}}>
        <CardContent  >
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item md={12}>
                    <Avatar
                      alt="Avatar"
                      src={logo}
                      sx={{ width: 60, height: 60 }}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <Typography variant="h6">
                      Procurement Management System
                    </Typography>
                  </Grid>
                  <Grid item md={12}>
                    <Typography variant="h6">Vendor Sign Up</Typography>
                  </Grid>
                </Grid>

                {/* Form Start */}

                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
    
                  sx={{ mt: 1 }}
                >
                  <Grid container sx={{ justifyContent: "space-between" }}>
                    <Grid item md={12}>
                      <Typography variant="h7" sx={{ alignSelf: "start" }}>
                        Business Info
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ justifyContent: "space-around" }}>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("companyName", {
                          required: "Company Name Required",
                        })}
                        margin="normal"
                        fullWidth
                        id="companyName"
                        label="Company full name"
                        name="companyName"
                      />
                      <p className="error">{errors.companyName?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("registrationType")}
                        margin="normal"
                        fullWidth
                        id="registrationType"
                        label="Registration Type"
                        name="registrationType"
                      />
                      <p className="error">
                        {errors.registrationType?.message}
                      </p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("businessRegNo", {
                          required: "Business Registration No is required",
                        })}
                        margin="normal"
                        fullWidth
                        id="businessRegNo"
                        label="Business Registration No"
                        name="businessRegNo"
                      />
                      <p className="error">{errors.businessRegNo?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("noofEmployes", {pattern: /^[0-9]*$/})}
                        margin="normal"
                        fullWidth
                        id="noofEmployes"
                        label="No of employees"
                        name="noofEmployes"
                      />
                    </Grid>
                  </Grid>

                  <Grid container sx={{ justifyContent: "space-between" }}>
                    <Grid item>
                      <Typography variant="h7" sx={{ alignSelf: "start" }}>
                        User Sign up info
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ justifyContent: "space-around" }}>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("fName", {
                          required: "Firstname is required",
                        })}
                        margin="normal"
                        fullWidth
                        id="fName"
                        label="First name"
                        name="fName"
                      />
                      <p className="error">{errors.fName?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("lName", {
                          required: "Last Name is required",
                        })}
                        margin="normal"
                        fullWidth
                        id="lName"
                        label="Last name"
                        name="lName"
                      />
                      <p className="error">{errors.lName?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("telNo", {
                          required: "Telephone no is required",
                        })}
                        margin="normal"
                        fullWidth
                        id="telNo"
                        label="Contact no"
                        name="telNo"
                      />
                      <p className="error">{errors.telNo?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("email", {
                          required: "Email Cant be Empty!",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Email format Error!",
                          },
                        })}
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                      />
                      <p className="error">{errors.email?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("jobTitle")}
                        margin="normal"
                        fullWidth
                        id="jobTitle"
                        label="Job title"
                        name="jobTitle"
                      />
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                          {...register("salutation")}
                          margin="normal"
                          fullWidth
                          id="salutation"
                          label="Salutation"
                          name="salutation"
                      />
                    </Grid>



                    <Grid item md={5} xs={11}>
                    <TextField
                        {...register("userName", {
                          required: "UserName is required",
                        })}
                        margin="normal"
                        fullWidth
                        id="userName"
                        label="User Name"
                        name="userName"
                    />
                    <p className="error">{errors.userName?.message}</p>
                      </Grid>

                    <Grid item md={5} xs={11}>
                    <TextField
                        {...register("password", {
                          required: "Password Required",
                          pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d#@$]{8,}$/,
                            message:
                                "Password must contain Minimum eight characters, at least one letter and one number",
                          },
                          minLength: {
                            value: 8,
                            message: "Password not long Enough!",
                          },
                        })}
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />
                    <p className="error">{errors.password?.message}</p>
                    </Grid>












                    <Grid item md={5} xs={11}></Grid>
                  </Grid>
                  <Grid container sx={{ justifyContent: "space-between" }}>
                    <Grid item>
                      <Typography variant="h7" sx={{ alignSelf: "start" }}>
                        Primary Address
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ justifyContent: "space-around" }}>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("address1", {
                          required: "Address Required",
                        })}
                        margin="normal"
                        fullWidth
                        id="address1"
                        label="Address line 1"
                        name="address1"
                      />
                      <p className="error">{errors.address1?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("address2")}
                        margin="normal"
                        fullWidth
                        id="address2"
                        label="Address line 2"
                        name="address2"
                      />
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("address3")}
                        margin="normal"
                        fullWidth
                        id="address3"
                        label="Address line 3"
                        name="address3"
                      />
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("city", { required: "City Required" })}
                        margin="normal"
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                      />
                      <p className="error">{errors.city?.message}</p>
                    </Grid>
                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("state")}
                        margin="normal"
                        fullWidth
                        id="state"
                        label="State"
                        name="state"
                      />
                    </Grid>

                    <Grid item md={5} xs={11}>
                      <TextField
                        {...register("postalCode")}
                        margin="normal"
                        fullWidth
                        id="postalCode"
                        label="Postal code"
                        name="postalCode"
                      />
                    </Grid>
                  </Grid>
                  <Divider />

                  <Grid container>
                    <Grid item md={12}>
                      <Typography variant="h7" sx={{ alignSelf: "start" }}>
                        Upload Required Documents
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container sx={{ justifyContent: 'center' }}>
      <Grid item md={12} padding="5px">
        <Typography variant="h8" sx={{ alignSelf: 'start' }} paddingLeft="35px">
          Business Registration Document
        </Typography>
        <label htmlFor="business-registration-file-upload">
          <CustomAddCircleOutlineIcon
            isPdf={businessRegistrationFile !== null}
            sx={{ verticalAlign: 'middle', ml: '5px' }}
          />
        </label>
        <input
          id="business-registration-file-upload"
          type="file"
          accept="application/pdf"
          style={{ display: 'none' }}
          onChange={(event) => handleFileUpload(event, setBusinessRegistrationFile)}
        />
      </Grid>
      <Grid item md={12} padding="5px">
        <Typography variant="h8" sx={{ alignSelf: 'start' }} paddingLeft="35px">
          Tax identification document
        </Typography>
        <label htmlFor="tax-identification-file-upload">
          <CustomAddCircleOutlineIcon
            isPdf={taxIdentificationFile !== null}
            sx={{ verticalAlign: 'middle', ml: '39.6px' }}
          />
        </label>
        <input
          id="tax-identification-file-upload"
          type="file"
          accept="application/pdf"
          style={{ display: 'none' }}
          onChange={(event) => handleFileUpload(event, setTaxIdentificationFile)}
        />
      </Grid>
      <Grid item md={12} padding="5px">
        <Typography variant="h8" sx={{ alignSelf: 'start' }} paddingLeft="35px">
          Insurance certificate
        </Typography>
        <label htmlFor="insurance-certificate-file-upload">
          <CustomAddCircleOutlineIcon
            isPdf={insuranceCertificateFile !== null}
            sx={{ verticalAlign: 'middle', ml: '93px' }}
          />
        </label>
        <input
          id="insurance-certificate-file-upload"
          type="file"
          accept="application/pdf"
          style={{ display: 'none' }}
          onChange={(event) => handleFileUpload(event, setInsuranceCertificateFile)}
        />
      </Grid>
      <Grid item md={12} padding="5px">
        <Typography variant="h8" sx={{ alignSelf: 'start' }} paddingLeft="35px">
          Other documents
        </Typography>
        <label htmlFor="other-documents-file-upload">
          <CustomAddCircleOutlineIcon
            isPdf={otherDocumentsFile !== null}
            sx={{ verticalAlign: 'middle', ml: '116.6px' }}
          />
        </label>
        <input
          id="other-documents-file-upload"
          type="file"
          accept="application/pdf"
          style={{ display: 'none' }}
          onChange={(event) => handleFileUpload(event, setOtherDocumentsFile)}
        />
      </Grid>
    </Grid>
                  <Divider />
                
                  <div id="outerButton">
                    <Button
                      disabled={!isValid}
                      type="submit"
                      variant="contained"
                      sx={{ mt: 2, mb: 2, borderRadius: 4 }}
                    >
                      Sign In
                    </Button>
                  </div>
                </Box>
                <DevTool control={control} />
              </Box>
            </Container>
          </ThemeProvider>
        </CardContent>
      </Card>
    </div>
  );
}
