import { configureStore } from "@reduxjs/toolkit";
import { SliceSideMenu } from "./slices/sidemenu";
import { SliceBackdrop } from "./slices/backdrop";

export default configureStore({
  reducer: {
    sidemenu: SliceSideMenu.reducer,
    backdrop: SliceBackdrop.reducer
  }
})