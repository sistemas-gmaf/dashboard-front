import { configureStore } from "@reduxjs/toolkit";
import { SliceSideMenu } from "./slice";

export default configureStore({
  reducer: {
    sidemenu: SliceSideMenu.reducer,
  }
})