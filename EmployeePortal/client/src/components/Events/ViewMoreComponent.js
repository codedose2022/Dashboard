import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStyles from "./EventPageStyles";

export default function ViewMoreComponent(props) {
  const classes = useStyles();
  const [linkText, setLinkText] = useState("Read more");

  const showText = () =>{
    return(
      <div>
      {linkText === "Read more" ? (
        <>
          {props.text.substring(0, 300)}
          <Link className = {classes.readMoreLink} key = {props.id} onClick={() => setLinkText("Read less")}>...{linkText}</Link>
        </>
      ) : (
        <>
          {props.text}
          <Link className = {classes.readMoreLink} key = {props.id} onClick={() => setLinkText("Read more")}>...{linkText}</Link>
        </>
      )}
    </div>
    )
  }

  return (
    <>
    {props.text.length > 300 ?  showText() : props.text }
    </>
  );
}
