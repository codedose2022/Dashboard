import React, { useEffect, useState } from "react";
import { IconButton } from "@material-ui/core/";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";

import { useDispatch } from "react-redux";
import _ from "lodash";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import * as api from "../../api";
import { getEvents } from "../../actions/events";

export default function LikeDislikeCommentComponent(props) {
  const dispatch = useDispatch();
  let token = localStorage.getItem("auth-token");
  const likesArr = _.get(props.event, "likes", []);
  const dislikesArr = _.get(props.event, "dislikes", []);
  const [Likes, setLikes] = useState(
    likesArr.length ? props.event.likes.length : 0
  );
  const [Dislikes, setDislikes] = useState(
    dislikesArr.length ? props.event.dislikes.length : 0
  );
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  useEffect(() => {
    likesArr.forEach((like) => {
      if (like.employeeId === props.userData.id) {
        setLikeAction("liked");
      }
    });
    dislikesArr.forEach((dislike) => {
      if (dislike.employeeId === props.userData.id) {
        setDislikeAction("disliked");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const onLike = async () => {
    let likeReq = { eventId: props.event._id, employeeId: props.userData.id };
    //if user has already liked then unlike else uplike
    if (LikeAction === null) {
      const response = await api.upLike(token, likeReq);
      response.data.message.forEach((data) => {
        if (["21", "23"].includes(data.status)) {
          setLikes(Likes + 1);
          setLikeAction("liked");
          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
          dispatch(getEvents(token, props.userData.division));
        }
      });
    } else {
      const response = await api.unLike(token, likeReq);
      response.data.message.forEach((data) => {
        if (data.status === "23") {
          setLikes(Likes - 1);
          setLikeAction(null);
          dispatch(getEvents(token, props.userData.division));
        }
      });
    }
  };
  const onDisLike = async () => {
    let dislikeReq = {
      eventId: props.event._id,
      employeeId: props.userData.id,
    };
    //if user has already disliked then undislike else updislike
    if (DislikeAction !== null) {
      const response = await api.unDisLike(token, dislikeReq);
      response.data.message.forEach((data) => {
        if (data.status === "23") {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
          dispatch(getEvents(token, props.userData.division));
        }
      });
    } else {
      const response = await api.upDisLike(token, dislikeReq);
      response.data.message.forEach((data) => {
        if (["21", "23"].includes(data.status)) {
          setDislikes(Dislikes + 1);
          setDislikeAction("disliked");
          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
          dispatch(getEvents(token, props.userData.division));
        }
      });
    }
  };

  return (
    <span>
      <IconButton onClick={() => onLike()}>
        {LikeAction === "liked" ? (
          <ThumbUpIcon fontSize='small' color='primary' />
        ) : (
          <ThumbUpAltOutlinedIcon fontSize='small' />
        )}
        <span style={{ fontSize: "1rem" }}>{Likes}</span>
      </IconButton>
      <IconButton onClick={() => onDisLike()}>
        {DislikeAction === "disliked" ? (
          <ThumbDownIcon fontSize='small' color='primary' />
        ) : (
          <ThumbDownOutlinedIcon fontSize='small' />
        )}
        <span style={{ fontSize: "1rem" }}>{Dislikes}</span>
      </IconButton>
    </span>
  );
}
