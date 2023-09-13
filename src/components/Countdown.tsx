import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import React, { useCallback } from "react";

dayjs.extend(duration);

type PropsType = {
  date: Dayjs;
  onTimeout?: () => void;
};

const Countdown: React.FC<PropsType> = ({ date, onTimeout }) => {
  const [value, setValue] = React.useState("00:00:00");
  const startUpdatingCountdown = useCallback(() => {
    const timer = setInterval(() => {
      const milisecond = date.diff() + 1000;

      // This trigger stop countdown
      if (milisecond < 0) {
        clearInterval(timer);
        if (onTimeout) onTimeout();
        return;
      }

      milisecond > 86400000
        ? setValue(dayjs.duration(milisecond).format("DD:HH:mm:ss"))
        : setValue(dayjs.duration(milisecond).format("HH:mm:ss"));
    }, 1000);
    return timer;
  }, [date, onTimeout]);

  React.useEffect(() => {
    const now = dayjs();
    const timeUntilNextSecond = 1000 - now.millisecond();
    const timeout = setTimeout(() => {
      const timer = startUpdatingCountdown();
      return () => {
        clearInterval(timer);
      };
    }, timeUntilNextSecond);

    return () => {
      clearTimeout(timeout);
    };
  }, [date, startUpdatingCountdown]);

  return <React.Fragment>{value}</React.Fragment>;
};

export default Countdown;
