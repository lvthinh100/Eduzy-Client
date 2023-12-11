import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '..';
import { StudentInfo } from '../../model/Student';

type AuthState = {
  user: StudentInfo | null;
};

const initialState: AuthState = {
  user: null,
};

type AuthPayload = {
  // token: string;
  user: StudentInfo | null;
  // tokenExpires: string;
};

const authSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthPayload>) {
      state.user = { ...action.payload.user } as StudentInfo;
      localStorage.setItem('userId', action.payload.user?._id ?? '');
      // localStorage.setItem(
      //   "expired",
      //   new Date(action.payload.tokenExpires).toISOString()
      // );
      // localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('expired');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },
});

export const retrieveUser = function () {
  //start
  return (dispatch: AppDispatch) => {
    let user = localStorage.getItem('user');
    const outDated = localStorage.getItem('expired');
    const token = localStorage.getItem('token');
    if (!user || !outDated || !token) return;
    const studentInfo = { ...JSON.parse(user) } as StudentInfo;
    const countTimeRemaining = function (outDated: string) {
      const currentDate = new Date().getTime();
      const nextOutDated = new Date(outDated).getTime();

      return nextOutDated - currentDate;
    };

    const timeRemaining = countTimeRemaining(outDated);
    if (timeRemaining <= 1000) {
      localStorage.removeItem('token');
      localStorage.removeItem('expired');
      localStorage.removeItem('user');
      return;
    }
    dispatch(
      authActions.setUser({
        user: studentInfo,
        // tokenExpires: outDated, token
      })
    );
  };
  //end
};

export const authActions = authSlice.actions;

export default authSlice;
