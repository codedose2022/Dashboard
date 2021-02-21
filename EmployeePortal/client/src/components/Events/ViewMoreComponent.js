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
            <button
            style={{background: 'none',
              border: 'none',
              padding: '0px',
              fontFamily: 'arial, sans-serif',
              cursor: 'pointer'}}
              className={classes.readMoreLink}
              id={`${props.id}readMoreLink`}
              key={`${props.id}readMoreLink`}
              onClick={() => setLinkText("Read less")}
            >
              ...{linkText}
            </button>
          </>
        ) : (
          <>
            {props.text}
            <button
               style={{background: 'none',
               border: 'none',
               padding: '0px',
               fontFamily: 'arial, sans-serif',
               cursor: 'pointer'}}
              id={`${props.id}readMore`}
              key={`${props.id}readMore`}
              className={classes.readMoreLink}
              onClick={() => setLinkText("Read more")}
            >
              ...{linkText}
            </button>
          </>
        )}
      </div>
    );
  };

  return <>{props.text.length > 300 ? showText() : props.text}</>;
}
