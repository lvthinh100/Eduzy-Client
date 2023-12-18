import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { useCallback } from 'react';
import { useAppSelector } from '../hooks/redux';

dayjs.extend(duration);

type PropsType = {
  date: Dayjs;
  onTimeout?: () => void;
};

const Countdown: React.FC<PropsType> = ({ date, onTimeout }) => {
  const [value, setValue] = React.useState('00:00:00');
  const { timediff } = useAppSelector((state) => state.app);
  const startUpdatingCountdown = useCallback(() => {
    if (!dayjs.isDayjs(date)) {
      console.error('Invalid date prop. Please provide a valid dayjs object.');
      return;
    }
    const timer = setInterval(() => {
      const now = dayjs().add(timediff ? timediff : 0, 'second');
      const milisecond = date.diff(now) + 1000;
      // This trigger stop countdown
      if (milisecond < 0) {
        clearInterval(timer);
        if (onTimeout) onTimeout();
        return;
      }

      milisecond > 86400000
        ? setValue(dayjs.duration(milisecond).format('DD:HH:mm:ss'))
        : setValue(dayjs.duration(milisecond).format('HH:mm:ss'));
    }, 1000);
    return timer;
  }, [date, onTimeout, timediff]);

  React.useEffect(() => {
    const now = dayjs().add(timediff ? timediff : 0, 'second');
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
  }, [date, startUpdatingCountdown, timediff]);

  return <React.Fragment>{value}</React.Fragment>;
};

export default Countdown;
