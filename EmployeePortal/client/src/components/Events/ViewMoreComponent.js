import React, { useState } from "react";
import useStyles from "./EventPageStyles";

export default function ViewMoreComponent(props) {
  const classes = useStyles();
  const [linkText, setLinkText] = useState("Read more");

  const showText = () => {
    return (
      <div>
        {linkText === "Read more" ? (
          <>
            {props.text.substring(0, 300)}
            <a
              className={classes.readMoreLink}
              id={`${props.id}readMoreLink`}
              key={`${props.id}readMoreLink`}
              onClick={() => setLinkText("Read less")}
            >
              ...{linkText}
            </a>
          </>
        ) : (
          <>
            {props.text}
            <a
              id={`${props.id}readMore`}
              key={`${props.id}readMore`}
              className={classes.readMoreLink}
              key={props.id}
              onClick={() => setLinkText("Read more")}
            >
              ...{linkText}
            </a>
          </>
        )}
      </div>
    );
  };

  return <>{props.text.length > 300 ? showText() : props.text}</>;
}
