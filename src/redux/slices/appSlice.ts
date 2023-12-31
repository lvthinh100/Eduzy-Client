import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const MODAL = {
  CHANGE_PASSWORD: 'CHANGE_PASSWORD' as 'CHANGE_PASSWORD',
  UPDATE_PROFILE: 'UPDATE_PROFILE' as 'UPDATE_PROFILE',
  LOGIN: 'LOGIN' as 'LOGIN',
  REGISTER: 'REGISTER' as 'REGISTER',
};
type Modal = 'CHANGE_PASSWORD' | 'UPDATE_PROFILE' | 'LOGIN' | 'REGISTER';

const initialState = {
  timediff: null as number | null,
  showLoginModal: false,
  showLeaderBoardModal: false,
  showRegisterModal: false,
  showUpdateProfileModal: false,
  showChangePasswordModal: false,
  notification: {
    open: false,
    variant: 'success',
    message: 'Hello world',
  },
  okCancelNotification: {
    open: false,
    isOK: false,
    variant: 'success',
    message: 'Hello world',
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTimeDiff(state, action: PayloadAction<number>) {
      state.timediff = action.payload;
    },
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
    showModal(state, action: PayloadAction<Modal>) {
      switch (action.payload) {
        case MODAL.UPDATE_PROFILE:
          state.showUpdateProfileModal = true;
          break;
        case MODAL.CHANGE_PASSWORD:
          state.showChangePasswordModal = true;
          break;
        case MODAL.LOGIN:
          state.showLoginModal = true;
          break;
        case MODAL.REGISTER:
          state.showRegisterModal = true;
          break;

        default:
          break;
      }
    },
    closeModal(state, action: PayloadAction<Modal>) {
      switch (action.payload) {
        case MODAL.UPDATE_PROFILE:
          state.showUpdateProfileModal = false;
          break;
        case MODAL.CHANGE_PASSWORD:
          state.showChangePasswordModal = false;
          break;
        case MODAL.LOGIN:
          state.showLoginModal = false;
          break;
        case MODAL.REGISTER:
          state.showRegisterModal = false;
          break;

        default:
          break;
      }
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice;
