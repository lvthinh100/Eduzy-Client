import { createSlice } from "@reduxjs/toolkit";
// import { getUpcomingLesson } from "../../api";
// import { appActions } from "./appSlice";

const initialState = {
  upcoming: {},
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    // async getUpcoming(state, action) {
    //     const data = await getUpcomingLesson();
    // }
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
//           message: "Something wrong happen when updating cart",
//         })
//       );
//     }
//   };
// };

export const cartActions = lessonSlice.actions;
export default lessonSlice;
