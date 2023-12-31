import { useEffect } from 'react';
import './App.css';
import MyRouter from './routes';
import { getMe, getStudent, getTime } from './api';
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
        const storedUserData = localStorage.getItem('userId');
        if (storedUserData !== undefined && storedUserData !== null) {
          const userId = storedUserData;
          try {
            const { data: response } = await getStudent(userId);
            dispatch(authActions.setUser({ user: response }));
          } catch (err) {
            console.log(err);
          }
        }
      }
    };
    const fetchTime = async () => {
      try {
        const { data: response } = await getTime();
        const currentDatetime = response.datetime;
        const timediff = dayjs(currentDatetime).diff(dayjs(), 'seconds');
        dispatch(appActions.setTimeDiff(timediff));
      } catch (error) {
        console.error('Error fetching current time:', error);
      }
    };
    fetchUser();
    fetchTime();
  }, [dispatch]);
  return <MyRouter />;
}

export default App;
