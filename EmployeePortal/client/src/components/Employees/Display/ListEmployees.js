import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@material-ui/core";
import _ from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { columns } from "../Constants/columns";
import AddEmployeeModel from "./AddEmployeeModel";
import EditEmployeeModel from "./EditEmployeeModel";
import useStyles from "./ListEmployeeStyles";
import ViewEmployeeModel from "./ViewEmployeeModal";

export default function ListEmployees() {
  const classes = useStyles();
  const state = useSelector((state) => state);
  let employeeInfo = _.get(state, "employees.employeesData", []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showViewModel, setShowViewModel] = useState({ index: {} });
  const [showEditModel, setEditViewModel] = useState({ index: {} });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function viewProfile(employee, index) {
    setShowViewModel({
      index: {
        [index]: true,
      },
    });
  }

  function editProfile(employee, index) {
    setEditViewModel({
      index: {
        [index]: true,
      },
    });
  }
  const displayValue = (value) => {
    switch (value) {
      case "EE":
        return "Events";

      case "SA":
        return "Super Admin";

      case "ED":
        return "Editorial";

      case "EM":
        return "Employee";

      default:
        return value;
    }
  };

  return (
    <div>
      <AddEmployeeModel />
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    style={{
                      background: "rgb(47 51 49 / 6%)",
                      position: "inherit",
                    }}
                    key={`${index}_${column.id}`}
                    align="left"
                    className={classes.tableHeadStyle}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeInfo
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee, employeeIndex) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={employee._id}
                    >
                      {columns.map((column, index) => {
                        const value = employee[column.id];
                        return (
                          <TableCell
                            className={classes.tableCellStyle}
                            key={`${employeeIndex}_${column.id}`}
                            align="left"
                          >
                            {column.id === "actions" ? (
                              <div>
                                <Link
                                  key={`${employeeIndex}_viewlink`}
                                  id={`${employeeIndex}_viewlink`}
                                  href="#"
                                  onClick={() =>
                                    viewProfile(employee, employeeIndex)
                                  }
                                >
                                  View
                                </Link>{" "}
                                &nbsp;
                                <Link
                                  key={`${employeeIndex}_editlink`}
                                  id={`${employeeIndex}_editlink`}
                                  href="#"
                                  onClick={() =>
                                    editProfile(employee, employeeIndex)
                                  }
                                >
                                  Edit{" "}
                                </Link>
                                {_.get(
                                  showViewModel,
                                  `index.${employeeIndex}`,
                                  false
                                ) && (
                                  <ViewEmployeeModel
                                    setShowViewModel={setShowViewModel}
                                    employee={employee}
                                  />
                                )}
                                {_.get(
                                  showEditModel,
                                  `index.${employeeIndex}`,
                                  false
                                ) && (
                                  <EditEmployeeModel
                                    setEditViewModel={setEditViewModel}
                                    employee={employee}
                                  />
                                )}
                              </div>
                            ) : (
                              displayValue(value)
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 100]}
            component="div"
            count={employeeInfo.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            classes={{
              caption: classes.caption,
              select: classes.caption,
              actions: classes.caption,
            }}
          />
        </TableContainer>
      </Paper>
    </div>
  );
}
