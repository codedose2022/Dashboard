import { IconButton, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./EventPageStyles";
import SendIcon from "@material-ui/icons/Send";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment } from "../../api/index";
import { getEvents } from "../../actions/events";

export default function CommentsComponent(props) {
  const classes = useStyles();
  
  const [commentsAdded, setComments] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let commentReq = {
      eventId: props.event._id,
      employeeId: props.userData.id,
      comments: commentsAdded,
      employeeFirstName: props.userData.firstName,
      employeeLastName: props.userData.lastName,
    };
    if (commentsAdded !== "") {
      try {
        const response = await addNewComment(props.token, commentReq);

        if (response.data.status === "23") {
          dispatch(getEvents(props.token, props.userData.division));
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <div className={classes.marginStyle}>
      <Typography variant='caption'>{props.event.comments && props.event.comments.length} Replies</Typography>
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <TextField
          key={`${props.userData.id}_CommentBox`}
          id={`${props.userData.id}_CommentBox`}
          fullWidth
          placeholder='leave your comments'
          value={commentsAdded}
          onChange={(e) => setComments(e.target.value)}
        />
        <IconButton onClick = {handleSubmit}>
          <SendIcon color='primary' />
        </IconButton>
      </form>
    </div>
  );
}
