import { IconButton, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getEvents } from "../../actions/events";
import { addNewComment } from "../../api/index";
import useStyles from "./EventPageStyles";

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
      selectedFile: props.userData.selectedFile,
    };
    if (commentsAdded !== "") {
      try {
        const response = await addNewComment(props.token, commentReq);

        if (response.data.status === "23") {
          dispatch(getEvents(props.token, props.userData.division));
          setComments("");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <div className={classes.marginStyle}>
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <TextField
          key={`${props.userData.id}_CommentBox`}
          id={`${props.userData.id}_CommentBox`}
          fullWidth
          InputProps={{
            classes: { input: classes.input },
          }}
          placeholder="leave your comments"
          value={commentsAdded}
          onChange={(e) => setComments(e.target.value)}
        />
        <IconButton onClick={handleSubmit}>
          <SendIcon color="secondary" className={classes.iconStyles} />
        </IconButton>
      </form>
    </div>
  );
}
