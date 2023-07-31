import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import React from "react";

dayjs.extend(duration);

type PropsType = {
  date: Dayjs;
};

const Countdown: React.FC<PropsType> = ({ date }) => {
  const [value, setValue] = React.useState("asdasd");
  React.useEffect(() => {
    const timer = setInterval(() => {
      const milisecond = date.diff();
      setValue(dayjs.duration(milisecond).format("HH:mm:ss"));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [date]);
  return <React.Fragment>{value}</React.Fragment>;
};

export default Countdown;
