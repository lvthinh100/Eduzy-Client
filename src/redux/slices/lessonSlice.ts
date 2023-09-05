import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LessonType, UpcomingLessonType } from "../../model/Lesson";
// import { getUpcomingLesson } from "../../api";
// import { appActions } from "./appSlice";

const initialState = {
  upcoming: {} as UpcomingLessonType,
  type: "LuyenDe",
  fetching: true,
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setUpComingLesson(state, action: PayloadAction<UpcomingLessonType>) {
      console.log(action.payload);
      state.upcoming = action.payload;
      state.type = action.payload.lessonType;
      state.fetching = false;
      // localStorage.setItem("user", JSON.stringify(action.payload.user));
      // localStorage.setItem(
      //   "expired",
      //   new Date(action.payload.tokenExpires).toISOString()
      // );
      // localStorage.setItem("token", action.payload.token);
    },
  },
});

// export const sendCartData = function (cart) {
//   return async (dispatch) => {
//     try {
//       await updateCart(cart);
//     } catch (err) {
//       console.log(err);
//       dispatch(
//         appActions.showNotification({
//           variant: "error",
//           message: "Something wrong happen when updating cart",
//         })
//       );
//     }
//   };
// };

// export const getCartData = function () {
//   return async (dispatch) => {
//     try {
//       const { data } = await getCart();
//       if (data.status === "success")
//         dispatch(
//           appActions.showNotification({
//             variant: "success",
//             message: "Get cart data success",
//           })
//         );
//       dispatch(cartActions.setCart(data.data));
//     } catch (err) {
//       console.log(err);
//       dispatch(
//         appActions.showNotification({
//           variant: "error",
//           messsage: "Something wrong happen when updating cart",
//         })
//       );
//     }
//   };
// };

export const lessonActions = lessonSlice.actions;
export default lessonSlice;
