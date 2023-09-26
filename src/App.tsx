import { useEffect } from 'react';
import './App.css';
import MyRouter from './routes';
import { getMe } from './api';
import { useAppDispatch } from './hooks/redux';
import { authActions } from './redux/slices/authSlice';
import React from 'react';
import dayjs from 'dayjs';
import { appActions } from './redux/slices/appSlice';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: response } = await getMe();
        dispatch(authActions.setUser({ user: response.data.data }));
      } catch (err) {
        console.log(err);
      }
    };
    const fetchTime = () => {
      fetch('http://worldtimeapi.org/api/ip')
        .then((response) => response.json())
        .then((data) => {
          const currentDatetime = data.datetime;
          console.log('Current Datetime:', currentDatetime);
          const timediff = dayjs(currentDatetime).diff(dayjs(), 'seconds');
          console.log('timediff', timediff);
          dispatch(appActions.setTimeDiff(timediff));
        })
        .catch((error) => {
          console.error('Error fetching current time:', error);
        });
    };
    fetchUser();
    fetchTime();
  }, [dispatch]);
  return <MyRouter />;
}

export default App;
