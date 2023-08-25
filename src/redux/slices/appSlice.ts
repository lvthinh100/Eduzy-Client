import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoginModal: false,
  showLeaderBoardModal: false,
  showRegisterModal: false,
  notification: {
    open: false,
    variant: "success",
    message: "Hello world",
  },
  okCancelNotification: {
    open: false,
    isOK: false,
    variant: "success",
    message: "Hello world",
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleShowLoginModal(state) {
      state.showLoginModal = !state.showLoginModal;
    },
    toggleShowRegisterModal(state) {
      state.showRegisterModal = !state.showRegisterModal;
    },
    showLoginModal(state) {
      state.showLoginModal = true;
    },
    showNotification(state, action) {
      state.notification = { open: true, ...action.payload };
    },
    hideNotification(state) {
      state.notification = { ...state.notification, open: false };
    },
    showOKCancelNotification(state, action) {
      state.okCancelNotification = { open: true, ...action.payload };
    },
    hideOKCancelNotification(state, action) {
      state.okCancelNotification = {
        ...state.okCancelNotification,
        open: false,
        isOK: action.payload,
      };
    },
    toggleShowLeaderBoardModal(state) {
      state.showLeaderBoardModal = !state.showLeaderBoardModal;
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice;
