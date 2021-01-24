import React, {useState} from 'react';
import {Button,Grid,Paper,useMediaQuery,Link,Dialog,DialogContent,
        DialogActions,Table,TableBody,TableCell,TableContainer,
        TableHead,TablePagination,TableRow} from '@material-ui/core';
import { useSelector} from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import ViewEmployeeModel from './ViewEmployeeModal';
import useStyles from './ListEmployeeStyles';
import AddEmployee from './AddEmployee';
import _ from 'lodash';
import EditEmployeeModel from './EditEmployeeModel';

const columns = [
        { id: 'firstName', label: 'First Name', minWidth: 170},
        { id: 'lastName', label: 'Last Name', minWidth: 170},
        { id: 'employeeCode', label: 'Employee Code', minWidth: 100 },
        {
          id: 'department',
          label: 'Department',
          minWidth: 170,
          align: 'right',
        },
        {
          id: 'designation',
          label: 'Designation',
          minWidth: 170,
          align: 'right',
        
        },
        {
          id: 'division',
          label: 'Division',
          minWidth: 170,
          align: 'right',
        },
        {
          id: 'actions',
          label: 'Actions',
          minWidth: 170,
          align: 'right',
        }
];


export default function ListEmployees() {
      const classes = useStyles();
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(10);
      const state = useSelector(state => state);
      let employeeInfo  =_.get(state,'employees.employeesData',[]);
      const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("xs"));
      const [showViewModel, setShowViewModel] = useState({"index" : {}});
      const [showEditModel, setEditViewModel] = useState({"index" : {}});
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

      function viewProfile(employee,index){
        setShowViewModel({"index" : {
          [index] : true
        }})
      }
      const [open, setOpen] = React.useState(false);
      const handleSubmit = async (e) =>{
          setOpen(true);
      };
      
      const handleClose = () => {
        setOpen(false);
      };

      function editProfile(employee,index){
        setEditViewModel({"index" : {
          [index] : true
        }})
      
      }

  return (
  
    <div>
    <Grid container justify="flex-end">
      <Button
        className ={classes.addButtonStyle}
        color="primary" 
        justify="flex-end"
        variant={isSmallScreen ? 'text'  : 'contained'}
        size = "small"
        onClick={handleSubmit}
        startIcon={<AddIcon className={classes.tableCellStyle}/>}> 
        Add new employee
      </Button>
      <Dialog 
            fullWidth={true}
            maxWidth="md"
            open={open} 
            onClose={handleClose} >
        <DialogContent >
          <AddEmployee />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>

    <Paper className={classes.root}  >
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className = {classes.tableBorder}>
          <TableHead >
            <TableRow  >
              {columns.map((column,index) => (
                <TableCell
                  style = {{borderBottom: '1px solid #1b5e20'}}
                  key={ `${index}_${column.id}`}
                  align='left'
                  className = {classes.tableHeadStyle}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            
            {employeeInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee,employeeIndex) => {
            return (
                <TableRow  hover role="checkbox" tabIndex={-1} key={employee._id}>
                  {columns.map((column,index) => {
                    const value = employee[column.id];
                    return (
                      <TableCell 
                      style = {{borderBottom: '1px solid green'}} 
                      className = {classes.tableCellStyle} 
                      key={ `${employeeIndex}_${column.id}`} 
                      align='left'>
                        {column.id === 'actions' ? 
                        <div>
                          <Link 
                            key={ `${employeeIndex}_viewlink`} 
                            id={ `${employeeIndex}_viewlink`} 
                            href = "#" 
                            style = {{color: 'green'}} 
                            onClick={() => viewProfile(employee,employeeIndex)}>
                          View 
                            </Link> &nbsp; 
                            <Link 
                            key={ `${employeeIndex}_editlink`} 
                            id={ `${employeeIndex}_editlink`} 
                            style = {{color: 'green'}}
                            href="#" 
                            onClick={() => editProfile(employee,employeeIndex)}>
                            Edit </Link>
                            {_.get(showViewModel,`index.${employeeIndex}`, false) &&  <ViewEmployeeModel setShowViewModel = {setShowViewModel} employee = {employee}/>}
                            {_.get(showEditModel,`index.${employeeIndex}`, false) &&  <EditEmployeeModel setEditViewModel = {setEditViewModel} employee = {employee}/>}
                          </div>
                        : value 
                        }
                    </TableCell>
                          );  
                        })}
                </TableRow>
                );
              })
              }
          </TableBody>
        </Table>
        <TablePagination
        className = {classes.tableBorderStyle}
        rowsPerPageOptions={[10,100]}
        component="div"
        count={employeeInfo.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        classes={{
          caption: classes.caption,
          select: classes.caption,
          actions:classes.caption
        }}
      
        />
      </TableContainer>
      
    </Paper>
    </div>
    
  );
}
