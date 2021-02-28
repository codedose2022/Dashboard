import React, { useRef } from "react";
import IdleTimer from "react-idle-timer";

export default function IdleTimerContainer(props) {
  const idleTimerRef = useRef(null);
  const onIdle = () => {
    localStorage.setItem("auth-token", "");
    props.dispatch({ type: "RESET_STORE" });
    localStorage.setItem("master_class", "");
    props.history.push("/login");
  };

  return (
    <div>
      <IdleTimer
        ref={idleTimerRef}
        timeout={1200 * 1000}
        onIdle={onIdle}
      ></IdleTimer>
    </div>
  );
}
