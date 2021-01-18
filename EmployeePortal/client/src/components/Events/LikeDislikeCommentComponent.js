import React from 'react';
import {IconButton} from '@material-ui/core/';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';

export default function LikeDislikeCommentComponent() {
  return (
    <span>
      
      <IconButton >
        <ThumbUpAltOutlinedIcon fontSize="small"/>
      </IconButton>
      <IconButton  >
        <ThumbDownOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton  >
        <ChatBubbleOutlineOutlinedIcon fontSize="small" />
      </IconButton>
    </span>
  )
}
