import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoginModal: false,
  showLeaderBoardModal: false,
  notification: {
    open: false,
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
    showLoginModal(state) {
      state.showLoginModal = true;
    },
    showNotification(state, action) {
      state.notification = { open: true, ...action.payload };
    },
    hideNotification(state) {
      state.notification = { ...state.notification, open: false };
    },
    toggleShowLeaderBoardModal(state) {
      state.showLeaderBoardModal = !state.showLeaderBoardModal;
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice;