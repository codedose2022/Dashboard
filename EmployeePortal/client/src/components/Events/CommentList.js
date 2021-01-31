import React from "react";
import useStyles from "./EventPageStyles";
import moment from "moment";
import { List, Tooltip } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";

export default function CommentList(props) {
  const classes = useStyles();
  return (
    <div className={classes.marginStyle}>
      {props.commentsList &&
        props.commentsList.map((comment) => {
          let postedDate = moment(comment.createdAt).format("Do MMMM YYYY");
          let postedTime = moment(comment.createdAt).format("HH:mm");
          return (
            <List key={`${comment._id}list`} className={classes.paddingZero}>
              <ListItem
                key={`${comment._id}listItem`}
                className={classes.paddingZero}
              >
                <ListItemAvatar>
                  <Tooltip
                    title={`${comment.employeeFirstName} ${comment.employeeLastName}`}
                  >
                    <Avatar>
                      <ImageIcon size='small' />
                    </Avatar>
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
