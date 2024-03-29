import { Link, List, Tooltip } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import moment from "moment";
import React, { useState } from "react";
import useStyles from "./EventPageStyles";

export default function CommentList(props) {
  const classes = useStyles();
  const [showComments, setShowComments] = useState(false);
  const showCommentList = () => {
    showComments ? setShowComments(false) : setShowComments(true);
  };

  return (
    <div className={classes.marginStyle}>
      {props.commentsList?.length ? (
        <Link
          style={{ textDecoration: "none" }}
          id={`${props.event._id}showReplies`}
          key={`${props.event._id}showReplies`}
          onClick={showCommentList}
        >
          <div className={classes.repliesStyle}>
            view all {props.commentsList.length} comments
          </div>
        </Link>
      ) : (
        ""
      )}
      {showComments &&
        props.commentsList &&
        props.commentsList.map((comment) => {
          let postedDate = moment(comment.createdAt).format("Do MMMM YYYY");
          let postedTime = moment(comment.createdAt).format("HH:mm");
          return (
            <List key={`${comment._id}list`} className={classes.paddingZero}>
              <ListItem
                key={`${comment._id}listItem`}
                className={classes.paddingZero}
              >
                <ListItemAvatar style={{ minWidth: "30px" }}>
                  <Tooltip
                    title={`${comment.employeeFirstName} ${comment.employeeLastName}`}
                  >
                    <Avatar
                      className={classes.small}
                      src={`http://localhost:5000/${comment.selectedFile}`}
                      color="action"
                    />
                  </Tooltip>
                </ListItemAvatar>
                <ListItemText
                  key={`${comment._id}listItemText`}
                  primary={comment.comments}
                  secondary={`${postedDate}, ${postedTime}`}
                  classes={{
                    secondary: classes.fontSizeSmaller,
                    primary: classes.fontSizeSmall,
                  }}
                  style={{ wordWrap: "break-word" }}
                />
              </ListItem>
            </List>
          );
        })}
    </div>
  );
}
