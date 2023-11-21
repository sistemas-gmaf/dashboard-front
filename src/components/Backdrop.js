'use client'

import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

export default function BackdropLoading() {
  const open = useSelector(state => state.backdrop.open);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: 2000 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
