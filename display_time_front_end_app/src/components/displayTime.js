import React, { useEffect, useCallback, useRef } from "react";
import { socketUrls } from "./urls";
import moment from "moment";
import "./displayTimeStyle.css";

const DisplayTime = () => {
  // const [dateTime, setDateTime] = useState(null);
  const myref = useRef(null);
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondsRef = useRef(null);
  const date = moment(new Date()).format("DD/MM/YYYY");

  const renderClock = useCallback(
    (data) => {
      const hours = hourRef.current;
      const minutes = minuteRef.current;
      const seconds = secondsRef.current;
      console.log(hourRef, secondsRef, minuteRef, "refff");
      console.log(myref.current, "date");
      let d = moment(data).format();
      console.log(d, data);
      var time = new Date(d);
      console.log(time, "tt");

      let h = (time.getHours() % 12) + time.getMinutes() / 59; // 22 % 12 = 10pm
      let m = time.getMinutes(); // 0 - 59
      let s = time.getSeconds(); // 0 - 59

      h *= 30; // 12 * 30 = 360deg
      m *= 6;
      s *= 6; // 60 * 6 = 360deg

      rotation(hours, h);
      rotation(minutes, m);
      rotation(seconds, s);
    },
    [myref]
  );

  const establishConnection = useCallback(() => {
    const socketUrl = socketUrls.ConnectSocket;
    const ws = new WebSocket(socketUrl);

    ws.onopen = function (event) {
      ws.send("Connection established Thanks!");
    };

    ws.onmessage = function (event) {
      console.log("connection opened");
      myref.current = event.data;
      renderClock(event.data);
      console.log("Message recievd");
    };

    ws.onclose = function (event) {
      console.log("connection closed");
    };

    ws.onerror = function (event) {
      console.log("something wemt wrong with connection");
    };
  }, [renderClock]);

  useEffect(() => {
    establishConnection();
  }, [establishConnection]);

  const rotation = (target, val) => {
    target.style.transform = `rotate(${val}deg)`;
  };

  return (
    <div className="parent_container">
      <div className="components">
        <div className="clock">
          <div className="hand hours" ref={hourRef}></div>
          <div className="hand minutes" ref={minuteRef}></div>
          <div className="hand seconds" ref={secondsRef}></div>
          <div className="point"></div>
          <div className="marker">
            <span className="marker__1">12</span>
            <span className="marker__2">6</span>
            <span className="marker__3">9</span>
            <span className="marker__4">3</span>
          </div>
        </div>
        <div className="content_element content_element-2">{date}</div>
      </div>
      ;
    </div>
  );
};

export default DisplayTime;
