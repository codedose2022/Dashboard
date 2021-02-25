import {
  Button,
  createMuiTheme,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  ThemeProvider,
} from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as api from "../../../api";
import { employeeFormData } from "../../../helper";
import AddBasicInfo from "./AddBasicInfo";
import AddDependenceDetails from "./AddDependenceDetails";
import useStyles from "./AddEmployeeStyles";
import AddPersonalDetails from "./AddPersonalDetails";
import AddProfilePhoto from "./AddProfilePhoto";
import AddWorkDetails from "./AddWorkDetails";

export default function AddEmployee(props) {
  let token = localStorage.getItem("auth-token");
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: green[900],
      },
      secondary: {
        main: grey[500],
      },
    },
  });
  const [errors, setErrors] = useState("");
  const [status, setStatus] = useState("");
  const [addEmployee, setAddEmployee] = useState({
    firstName: props.employee ? props.employee.firstName : "",
    lastName: props.employee ? props.employee.lastName : "",
    email: props.employee ? props.employee.email : "",
    employeeCode: props.employee ? props.employee.employeeCode : "",
    dateOfHire: props.employee
      ? moment(props.employee.dateOfHire).format("YYYY-MM-DD")
      : "",
    deskPhone: props.employee ? props.employee.deskPhone : "",
    workMobile: props.employee ? props.employee.workMobile : "",
    phoneNumber: props.employee ? props.employee.phoneNumber : "",
    dob: props.employee ? moment(props.employee.dob).format("YYYY-MM-DD") : "",
    hobbies: props.employee ? props.employee.hobbies : "",
    gender: props.employee ? props.employee.gender : "",
    dietPath: props.employee ? props.employee.dietPath : "",
    maritalStatus: props.employee ? props.employee.maritalStatus : "",
    designation: props.employee ? props.employee.designation : "",
    department: props.employee ? props.employee.department : "",
    division: props.employee ? props.employee.division : "",
    nationality: props.employee ? props.employee.nationality : "",
    selectedFile: props.employee ? props.employee.selectedFile : "",
  });
  let [dependence, setDependence] = useState(
    props.employee
      ? props.employee.dependenceDetails
      : [{ dependenceName: "", dependenceRelationship: "", dependenceDob: "" }]
  );

  const validate = (fieldValues = addEmployee) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues) {
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";
    }
    if ("lastName" in fieldValues) {
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";
    }
    if ("email" in fieldValues) {
      temp.email = /.+@.+..+/.test(fieldValues.email) ? "" : "Invalid Email.";
    }
    if ("employeeCode" in fieldValues) {
      temp.employeeCode = fieldValues.employeeCode
        ? ""
        : "This field is required.";
    }
    if ("deskPhone" in fieldValues) {
      temp.deskPhone = fieldValues.deskPhone
        ? fieldValues.deskPhone.toString().length === 4
          ? ""
          : "4-digits required."
        : "This field is required";
    }
    if ("workMobile" in fieldValues) {
      temp.workMobile = fieldValues.workMobile
        ? fieldValues.workMobile.toString().length === 10
          ? ""
          : "10-digits required."
        : "This field is required";
    }

    if ("dateOfHire" in fieldValues) {
      temp.dateOfHire = fieldValues.dateOfHire ? "" : "This field is required.";
    }
    if ("nationality" in fieldValues) {
      temp.nationality = fieldValues.nationality
        ? ""
        : "This field is required.";
    }
    if ("department" in fieldValues) {
      temp.department = fieldValues.department ? "" : "This field is required.";
    }
    if ("designation" in fieldValues) {
      temp.designation = fieldValues.designation
        ? ""
        : "This field is required.";
    }
    if ("division" in fieldValues) {
      temp.division = fieldValues.division ? "" : "This field is required.";
    }
    if ("gender" in fieldValues) {
      temp.gender = fieldValues.gender ? "" : "This field is required.";
    }
    if ("maritalStatus" in fieldValues) {
      temp.maritalStatus = fieldValues.maritalStatus
        ? ""
        : "This field is required.";
    }
    if ("dob" in fieldValues) {
      temp.dob = fieldValues.dob ? "" : "This field is required.";
    }
    if ("phoneNumber" in fieldValues) {
      temp.phoneNumber = fieldValues.phoneNumber
        ? fieldValues.phoneNumber.toString().length === 10
          ? ""
          : "10-digits required."
        : "This field is required.";
    }

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const [disableProfile, setDisableProfile] = useState({
    disableInd: false,
  });

  const handleChange = (event) => {
    setDisableProfile({ ...disableProfile, disableInd: event.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (!props.employee) {
        const formData = employeeFormData(addEmployee, dependence);
        try {
          addEmployee.dependenceDetails = dependence;
          await api.createEmployee(token, formData).then((response) => {
            if (response.data.messages.status === "14") {
              setStatus(response.data.messages.message);
              props.handleClose();
              dispatch({
                type: "GET_EMPLOYEES",
                payload: response.data.employees,
              });
            }
            if (response.data.messages.status === "13") {
              setStatus(response.data.messages.message);
            }
          });
        } catch (error) {
          setStatus("Something went wrong, please try again.");
        }
      }
      if (props.employee) {
        try {
          const formData = employeeFormData(addEmployee, dependence);
          formData.append("_id", props.employee._id);

          if (disableProfile.disableInd) {
            addEmployee.disableInd = "Y";
            formData.append("disableInd", "Y");
          } else {
            formData.append("disableInd", "N");
          }
          const data = await api.editEmployee(token, formData);

          if (data.data.messages.status === "15") {
            setStatus(data.data.messages.message);
            props.handleClose();
            dispatch({ type: "GET_EMPLOYEES", payload: data.data.employees });
          }
        } catch (error) {
          setStatus("Something went wrong, please try again.");
        }
      }
    }
  };
  const clear = () => {
    setAddEmployee({
      firstName: "",
      lastName: "",
      email: "",
      employeeCode: "",
      dateOfHire: "",
      deskPhone: "",
      workMobile: "",
      phoneNumber: "",
      dob: "",
      hobbies: "",
      gender: "",
      dietPath: "",
      maritalStatus: "",
      designation: "",
      division: "",
      nationality: "",
      department: "",
      selectedFile: "",
    });
    setDependence([
      { dependenceName: "", dependenceRelationship: "", dependenceDob: "" },
    ]);
    setErrors("");
  };

  return (
    <div>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={classes.root}>
          {status && <Alert severity="error"> {status} </Alert>}
          <ThemeProvider theme={theme}>
            <div className={classes.paper}>
              {props.employee && (
                <Grid container justify="flex-end">
                  <FormGroup row>
                    <FormControlLabel
                      value="disableProfile"
                      control={
                        <Switch
                          checked={disableProfile.disableInd}
                          onChange={handleChange}
                          color="primary"
                          name="disableInd"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      }
                      label="Disable"
                      labelPlacement="start"
                    />
                  </FormGroup>
                </Grid>
              )}

              <Grid>
                <AddBasicInfo
                  errors={errors}
                  disableProfile={disableProfile}
                  setAddEmployee={setAddEmployee}
                  addEmployee={addEmployee}
                  validate={validate}
                />

                <AddWorkDetails
                  errors={errors}
                  disableProfile={disableProfile}
                  setAddEmployee={setAddEmployee}
                  addEmployee={addEmployee}
                  validate={validate}
                />
                <AddPersonalDetails
                  errors={errors}
                  disableProfile={disableProfile}
                  setAddEmployee={setAddEmployee}
                  addEmployee={addEmployee}
                  validate={validate}
                />

                <AddDependenceDetails
                  dependence={dependence}
                  disableProfile={disableProfile}
                  errors={errors}
                  setDependence={setDependence}
                />

                <AddProfilePhoto
                  errors={errors}
                  disableProfile={disableProfile}
                  selectedFile={addEmployee.selectedFile}
                  setAddEmployee={setAddEmployee}
                  addEmployee={addEmployee}
                  validate={validate}
                />
              </Grid>
            </div>
            <Grid>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}></Grid>
                <Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
                  {!props.employee && (
                    <Button
                      className={classes.buttonStyle}
                      variant={"contained"}
                      fullWidth
                      size="small"
                      disableElevation
                      color={"secondary"}
                      onClick={clear}
                    >
                      Reset
                    </Button>
                  )}
                </Grid>
                <Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
                  <Button
                    className={classes.buttonStyle}
                    variant={"contained"}
                    fullWidth
                    size="small"
                    disableElevation
                    color={"primary"}
                    type="submit"
                  >
                    {props.employee ? "UPDATE" : "ADD"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </ThemeProvider>
        </div>
      </form>
    </div>
  );
}
