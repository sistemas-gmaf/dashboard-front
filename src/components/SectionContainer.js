import { DRAWER_WIDTH } from "@/utils/constants"
import { Box } from "@mui/material"

function SectionContainer({ children }) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        ml: `${DRAWER_WIDTH}px`,
        mt: ['48px', '56px', '64px'],
        p: 3,
      }}
    >
      {children}
    </Box>
  )
}

export default SectionContainer