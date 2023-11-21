'use client'

import { DRAWER_WIDTH, DRAWER_WIDTH_CLOSED } from "@/utils/constants"
import { Box } from "@mui/material"
import { useSelector } from "react-redux"

function SectionContainer({ children }) {
  const sideMenuOpen = useSelector(state => state.sidemenu.open);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        ml: {
          xs: `${DRAWER_WIDTH_CLOSED}px`,
          md: `${sideMenuOpen ? DRAWER_WIDTH : DRAWER_WIDTH_CLOSED}px`,
        },
        mt: ['48px', '56px', '64px'],
        p: 5,
        transition: 'margin-left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      }}
    >
      {children}
    </Box>
  )
}

export default SectionContainer