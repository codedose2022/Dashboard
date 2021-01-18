import React,{useState} from 'react'
import useStyles from './EventPageStyles';
import {Dialog,DialogActions,DialogContent,
      DialogTitle} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {validateRequired} from '../../helper';
import Alert from '@material-ui/lab/Alert';
import * as api from '../../api'; 
import _ from 'lodash'; 
import FileBase from 'react-file-base64';

import { Button,TextareaAutosize,Grid, TextField  } from "@material-ui/core";
export default function AddEvents(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  let token = localStorage.getItem("auth-token");
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [desc, setDesc] = useState('');

  const [img, setImg] = useState('');
  const [flag, setShowRequired] = useState(false);
  const [error, setError] = useState('');
  
 // const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const handleCancel = () => {
    setOpen(false);
    props.setOpenModel(false);
   
  };
  
  const handleAdd = async () => {
   // setOpen(false);
    //props.setOpenModel(false);
    setShowRequired(true);
    const isFieldEmpty = [title,date,time,desc].includes("")
    if(!isFieldEmpty){
      let event = {title,date,venue,desc,img,desc,time};
     try {
      await api.addEvent(token,event).then(response =>{
          console.log(response);
          const responseData = _.get(response, 'data.responseData','')
          if(responseData.messages.status === '21'){
          dispatch ({type: 'ADD_EVENTS', payload: responseData.events});
          }
      }).catch(error =>{
        console.log(error.response);
        const responseData = _.get(error.response, 'data.responseData','');
        if(responseData.messages.status === '22'){
          setError(responseData.messages.message)
        }
      })
     } catch (error) {
      setError('something went wrong, please try again.')
     }
  };
  }


  const handleClose = () => {
    setOpen(false);
    props.setOpenModel(false);
   
  };
  return (

    <Dialog
    open={open} 
    onClose={handleClose}
    aria-labelledby="form-dialog-title" 
    disableBackdropClick 
      >
     <DialogTitle 
     id="form-dialog-title" 
     style = {{alignSelf:  'center' }}>
     ADD NEW EVENT
     </DialogTitle>
     <div>
    
  <div className = {classes.marginStyle}>
        {error &&   <Alert severity="error"> {error} </Alert>  }
  <form className={classes.root}  autoComplete="off">
  <Grid container spacing={2}>
      <Grid  item xs={12}>
        <TextField 
        fullWidth
        required
        FormHelperTextProps={{
          className: classes.helperTextColor
        }}
        type = "text"
        id="Title" 
        helperText = {flag && validateRequired(title)}
        value = {title}
        onChange={(e) => (setTitle(
            e.target.value
        ))}
        label="Title" />
     </Grid>  
   </Grid>  

   <Grid container spacing={2}>
   
      <Grid item md={6}>
        <TextField 
        required
        fullWidth
        FormHelperTextProps={{
          className: classes.helperTextColor
        }}
        id="Date" 
        helperText = {flag && validateRequired(date)}
        onChange={(e) => setDate( e.target.value)}
        value = {date}
        type="date" 
       
        InputProps={{ inputProps: { max: "2021-05-29" }}}
        label="Event Date" />
   
      </Grid> 
      
     <Grid item md={6}>
        <TextField 
        required
        fullWidth
        FormHelperTextProps={{
          className: classes.helperTextColor
        }}
        type = "time"
        helperText = {flag && validateRequired(date)}
        id="Event Time" 
        onChange={(e) => setTime( e.target.value)}
        value = {time}
        label="Event Time" />
     
      </Grid>
    </Grid>
    <Grid container >
     <Grid>
    
        <TextField 
        required
        fullWidth
        FormHelperTextProps={{
          className: classes.helperTextColor
        }}
        id="Venue" 
        type = "text"
        helperText = {flag && validateRequired(venue)}
        onChange={(e) => setVenue( e.target.value)}
        value = {venue}
        label="Venue" />
     </Grid>  
     <Grid container spacing={2}>
      <Grid  item xs={12}> 
     <div className={classes.fileInput}>
       <FileBase type="file" multiple={false} onDone={({base64}) =>setImg({base64})} />
       </div>
       </Grid>
       </Grid>
     </Grid>
     <Grid container>

  {/* <div className = {classes.textEditor} >
     <Editor
   
    editorState={editorState}
    toolbarClassName="toolbarClassName"
    wrapperClassName="wrapperClassName"
    editorClassName="editorClassName"
    onEditorStateChange={(editorState) => setEditorState(editorState)}
    />
  </div> */}
    <Grid  className="editor">
    <TextareaAutosize 
     onChange={(e) => setDesc( e.target.value)}
      value = {desc } 
    className = {classes.textAreaStyle}
    aria-label="minimum height" 
    rowsMin={10} placeholder="Description" />
    </Grid>
    
      </Grid>
  </form>
  </div>
 
  </div>
  <DialogActions>
          <Button size = "small" variant= "contained" onClick={handleCancel} color="primary">
            cancel
          </Button>
          <Button size = "small" variant= "contained" onClick={handleAdd} color="primary" autoFocus>
            Add 
          </Button>
        </DialogActions>
      </Dialog>
  )
}
