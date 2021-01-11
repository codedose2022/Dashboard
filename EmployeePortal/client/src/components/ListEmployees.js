import React, {useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,createMuiTheme,Link} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useSelector} from 'react-redux';
import useStyles from './ListEmployeeStyles';
import _ from 'lodash';
import { green} from '@material-ui/core/colors';
import {Button,Grid} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Hidden from '@material-ui/core/Hidden';
import { useMediaQuery } from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import ViewEmployeeModel from './ViewEmployeeModal';


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
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const state = useSelector(state => state);
  let employeeInfo  =_.get(state,'employees.employeesData',[]);
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("xs"));
  const [showViewModel, setShowViewModel] = useState({"index" : {}});
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function viewProfile(employee,index){
    console.log(index)
    setShowViewModel({"index" : {
      [index] : true
    }})
  }

  function editProfile(employee){

  }

  return (
   
    <div>
    <Grid container justify="flex-end">
      
    <Button
      className ={classes.addButtonStyle}
      href="#text-buttons"
      color="primary" 
      justify="flex-end"
      variant={isSmallScreen ? 'text'  : 'contained'}
      size = "small"
      startIcon={<AddIcon className={classes.tableCellStyle}/>}> 
      Add new employee
    </Button>
   
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
                            key={ `${employeeIndex}_link`} 
                            id={ `${employeeIndex}_link`} 
                            href = "#" 
                            style = {{color: 'green'}} 
                            onClick={() => viewProfile(employee,employeeIndex)}>
                           View 
                            </Link> &nbsp; 
                            <Link 
                            style = {{color: 'green'}}
                            href="#" onClick={() => editProfile(employee)}>
                            Edit </Link>
                            {_.get(showViewModel,`index.${employeeIndex}`, false) &&  <ViewEmployeeModel setShowViewModel = {setShowViewModel} employee = {employee}/>}
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
