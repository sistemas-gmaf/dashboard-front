import { configureStore } from "@reduxjs/toolkit";
import { SliceSideMenu } from "./slices/sidemenu";
import { SliceBackdrop } from "./slices/backdrop";
import { SliceTables } from "./slices/tables";

export default configureStore({
  reducer: {
    sidemenu: SliceSideMenu.reducer,
    backdrop: SliceBackdrop.reducer,
    tables: SliceTables.reducer,
  }
})